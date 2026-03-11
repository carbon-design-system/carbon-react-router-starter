#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const CURRENT_YEAR = new Date().getFullYear();

// File extensions that should have copyright headers
const EXTENSIONS_REQUIRING_COPYRIGHT = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.scss',
  '.css',
  '.html',
  '.yml',
  '.yaml',
];

// Comment styles for different file types
const COMMENT_STYLES = {
  block: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    start: '/**',
    middle: ' *',
    end: ' */',
  },
  html: {
    extensions: ['.html'],
    start: '<!--',
    middle: '',
    end: '-->',
  },
  hash: {
    extensions: ['.yml', '.yaml'],
    start: '#',
    middle: '#',
    end: '#',
  },
};

/**
 * Get comment style for a file
 */
function getCommentStyle(filePath) {
  for (const [style, config] of Object.entries(COMMENT_STYLES)) {
    if (config.extensions.some((ext) => filePath.endsWith(ext))) {
      return { style, ...config };
    }
  }
  return COMMENT_STYLES.block; // Default to block comments
}

// Files/directories to exclude
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  '.vite',
  'coverage',
  'public',
  '.husky',
  'scripts/check-copyright.js', // Exclude this script itself
];

/**
 * Get the creation year of a file from git history
 */
function getFileCreationYear(filePath) {
  try {
    // Get the year from the first commit that added this file
    const result = execSync(
      `git log --follow --format=%ad --date=format:%Y --diff-filter=A -- "${filePath}" | tail -1`,
      { encoding: 'utf-8' },
    ).trim();

    if (result) {
      return parseInt(result, 10);
    }
  } catch {
    // If git command fails, file might be new/untracked
  }

  // Fallback to current year for new files
  return CURRENT_YEAR;
}

/**
 * Check if file has uncommitted changes
 */
function hasUncommittedChanges(filePath) {
  try {
    const result = execSync(`git status --porcelain "${filePath}"`, {
      encoding: 'utf-8',
    }).trim();
    return result.length > 0;
  } catch {
    return false;
  }
}

/**
 * Get the last modification year of a file from git history
 */
function getFileModificationYear(filePath) {
  // If file has uncommitted changes, use current year
  if (hasUncommittedChanges(filePath)) {
    return CURRENT_YEAR;
  }

  try {
    // Get the year from the most recent commit
    const result = execSync(
      `git log -1 --format=%ad --date=format:%Y -- "${filePath}"`,
      { encoding: 'utf-8' },
    ).trim();

    if (result) {
      return parseInt(result, 10);
    }
  } catch {
    // If git command fails, use current year
  }

  return CURRENT_YEAR;
}

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some((pattern) => filePath.includes(pattern));
}

/**
 * Check if file extension requires copyright
 */
function requiresCopyright(filePath) {
  return EXTENSIONS_REQUIRING_COPYRIGHT.some((ext) => filePath.endsWith(ext));
}

/**
 * Get expected copyright header for a file
 */
function getExpectedCopyright(filePath) {
  const creationYear = getFileCreationYear(filePath);
  const modificationYear = getFileModificationYear(filePath);
  const commentStyle = getCommentStyle(filePath);

  let yearRange;
  if (creationYear === modificationYear) {
    yearRange = `${creationYear}`;
  } else {
    yearRange = `${creationYear}, ${modificationYear}`;
  }

  const copyrightText = `Copyright IBM Corp. ${yearRange}`;
  const licenseText =
    'This source code is licensed under the Apache-2.0 license found in the';
  const licenseText2 =
    'LICENSE file in the root directory of this source tree.';

  if (commentStyle.style === 'block') {
    return `/**
 * ${copyrightText}
 *
 * ${licenseText}
 * ${licenseText2}
 */`;
  } else if (commentStyle.style === 'html') {
    return `<!--
  ${copyrightText}

  ${licenseText}
  ${licenseText2}
-->`;
  } else if (commentStyle.style === 'hash') {
    return `# ${copyrightText}
#
# ${licenseText}
# ${licenseText2}`;
  }

  // Fallback to block comment
  return `/**
 * ${copyrightText}
 *
 * ${licenseText}
 * ${licenseText2}
 */`;
}

/**
 * Extract copyright header from file content
 */
function extractCopyrightHeader(content, filePath) {
  const commentStyle = getCommentStyle(filePath);

  if (commentStyle.style === 'block') {
    // Match the copyright block comment at the start of the file
    const match = content.match(/^\/\*\*\s*\n(\s*\*[^\n]*\n)+\s*\*\//);
    return match ? match[0] : null;
  } else if (commentStyle.style === 'html') {
    // Match HTML comment at the start of the file
    const match = content.match(/^<!--[\s\S]*?-->/);
    return match ? match[0] : null;
  } else if (commentStyle.style === 'hash') {
    // Match hash comments at the start of the file
    const match = content.match(/^(#[^\n]*\n)+/);
    return match ? match[0] : null;
  }

  return null;
}

/**
 * Parse year range from copyright header
 */
function parseYearRange(header) {
  const match = header.match(/Copyright IBM Corp\. (\d{4})(?:, (\d{4}))?/);
  if (!match) return null;

  return {
    startYear: parseInt(match[1], 10),
    endYear: match[2] ? parseInt(match[2], 10) : parseInt(match[1], 10),
  };
}

/**
 * Check if copyright header is valid
 */
function validateCopyright(filePath, content) {
  const header = extractCopyrightHeader(content, filePath);

  if (!header) {
    return {
      valid: false,
      error: 'Missing copyright header',
      expected: getExpectedCopyright(filePath),
    };
  }

  // Check if it contains the required IBM copyright text
  if (!header.includes('Copyright IBM Corp.')) {
    return {
      valid: false,
      error: 'Copyright header does not contain "Copyright IBM Corp."',
      expected: getExpectedCopyright(filePath),
    };
  }

  // Check if it contains the Apache license reference
  if (!header.includes('Apache-2.0 license')) {
    return {
      valid: false,
      error: 'Copyright header does not reference Apache-2.0 license',
      expected: getExpectedCopyright(filePath),
    };
  }

  // Parse and validate year range
  const yearRange = parseYearRange(header);
  if (!yearRange) {
    return {
      valid: false,
      error: 'Could not parse year range from copyright header',
      expected: getExpectedCopyright(filePath),
    };
  }

  const creationYear = getFileCreationYear(filePath);
  const modificationYear = getFileModificationYear(filePath);

  // Validate start year matches creation year
  if (yearRange.startYear !== creationYear) {
    return {
      valid: false,
      error: `Start year ${yearRange.startYear} does not match file creation year ${creationYear}`,
      expected: getExpectedCopyright(filePath),
    };
  }

  // Validate end year matches modification year
  if (yearRange.endYear !== modificationYear) {
    return {
      valid: false,
      error: `End year ${yearRange.endYear} does not match file modification year ${modificationYear}`,
      expected: getExpectedCopyright(filePath),
    };
  }

  return { valid: true };
}

/**
 * Fix copyright header in a file
 */
function fixCopyrightHeader(filePath, content) {
  const expectedHeader = getExpectedCopyright(filePath);
  const existingHeader = extractCopyrightHeader(content, filePath);

  if (existingHeader) {
    // Replace existing header
    const updatedContent = content.replace(existingHeader, expectedHeader);
    return updatedContent;
  } else {
    // Add header at the beginning
    return expectedHeader + '\n\n' + content;
  }
}

function main() {
  const args = process.argv.slice(2);
  const fixMode = args.includes('--fix');
  const files = args.filter((arg) => arg !== '--fix');

  if (files.length === 0) {
    console.log('No files to check');
    process.exit(0);
  }

  let hasErrors = false;
  let fixedCount = 0;
  const errors = [];

  for (const filePath of files) {
    // Skip excluded files
    if (shouldExclude(filePath)) {
      continue;
    }

    // Skip files that don't require copyright
    if (!requiresCopyright(filePath)) {
      continue;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      const result = validateCopyright(filePath, content);

      if (!result.valid) {
        if (fixMode) {
          // Fix the copyright header
          const fixedContent = fixCopyrightHeader(filePath, content);
          writeFileSync(filePath, fixedContent, 'utf-8');
          console.log(`✓ Fixed copyright header in ${filePath}`);
          fixedCount++;
        } else {
          hasErrors = true;
          errors.push({
            file: filePath,
            error: result.error,
            expected: result.expected,
          });
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
      hasErrors = true;
    }
  }

  if (fixMode && fixedCount > 0) {
    console.log(`\n✅ Fixed copyright headers in ${fixedCount} file(s)`);
    process.exit(0);
  }

  if (hasErrors) {
    console.error('\n❌ Copyright header validation failed:\n');

    for (const { file, error, expected } of errors) {
      console.error(`File: ${file}`);
      console.error(`Error: ${error}`);
      console.error(`Expected header:\n${expected}\n`);
    }

    console.error('\nRun with --fix flag to automatically correct headers');
    process.exit(1);
  }

  console.log('✅ All copyright headers are valid');
  process.exit(0);
}

main();
