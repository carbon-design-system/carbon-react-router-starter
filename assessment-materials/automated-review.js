#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Automated Review Script for Carbon Figma to React Mode Assessment
 *
 * This script performs automated checks on the implementation to verify
 * adherence to Carbon Design System patterns and best practices.
 *
 * Usage: node automated-review.js <path-to-implementation>
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class AutomatedReview {
  constructor(implementationPath) {
    this.implementationPath = implementationPath;
    this.results = {
      passed: [],
      failed: [],
      warnings: [],
      score: 0,
      maxScore: 0,
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  pass(check, points = 1) {
    this.results.passed.push(check);
    this.results.score += points;
    this.results.maxScore += points;
    this.log(`✓ ${check}`, 'green');
  }

  fail(check, points = 1, reason = '') {
    this.results.failed.push({ check, reason });
    this.results.maxScore += points;
    this.log(`✗ ${check}${reason ? ': ' + reason : ''}`, 'red');
  }

  warn(message) {
    this.results.warnings.push(message);
    this.log(`⚠ ${message}`, 'yellow');
  }

  readFile(filePath) {
    try {
      const fullPath = path.join(this.implementationPath, filePath);
      return fs.readFileSync(fullPath, 'utf-8');
    } catch {
      return null;
    }
  }

  fileExists(filePath) {
    try {
      const fullPath = path.join(this.implementationPath, filePath);
      return fs.existsSync(fullPath);
    } catch {
      return false;
    }
  }

  checkFileStructure() {
    this.log('\n=== File Structure Checks ===', 'cyan');

    const requiredFiles = [
      'NewWelcome.jsx',
      'NewWelcomeHeader.jsx',
      'JumpBackIn.jsx',
      'RecentlyRunJobs.jsx',
      'ConnectionsSection.jsx',
      'new-welcome.scss',
    ];

    requiredFiles.forEach((file) => {
      if (this.fileExists(file)) {
        this.pass(`File exists: ${file}`);
      } else {
        this.fail(`File exists: ${file}`, 1, 'File not found');
      }
    });
  }

  checkCopyrightHeaders() {
    this.log('\n=== Copyright Header Checks ===', 'cyan');

    const files = [
      'NewWelcome.jsx',
      'NewWelcomeHeader.jsx',
      'JumpBackIn.jsx',
      'RecentlyRunJobs.jsx',
      'ConnectionsSection.jsx',
      'new-welcome.scss',
    ];

    const copyrightPattern = /Copyright IBM Corp\. \d{4}/;

    files.forEach((file) => {
      const content = this.readFile(file);
      if (content) {
        if (copyrightPattern.test(content)) {
          this.pass(`Copyright header in ${file}`);
        } else {
          this.fail(`Copyright header in ${file}`, 1, 'Missing or incorrect');
        }
      }
    });
  }

  checkCarbonImports() {
    this.log('\n=== Carbon Component Import Checks ===', 'cyan');

    const files = {
      'NewWelcomeHeader.jsx': [
        'Grid',
        'Column',
        'Button',
        'ClickableTile',
        'ChevronDown',
      ],
      'JumpBackIn.jsx': ['Grid', 'Column', 'Link', 'RecentlyViewed'],
      'RecentlyRunJobs.jsx': [
        'Grid',
        'Column',
        'ClickableTile',
        'Link',
        'ArrowRight',
      ],
      'ConnectionsSection.jsx': [
        'Grid',
        'Column',
        'Search',
        'DataTable',
        'Pagination',
      ],
    };

    Object.entries(files).forEach(([file, expectedImports]) => {
      const content = this.readFile(file);
      if (content) {
        expectedImports.forEach((importName) => {
          if (content.includes(importName)) {
            this.pass(`${file} imports ${importName}`);
          } else {
            this.fail(
              `${file} imports ${importName}`,
              1,
              'Import not found or component not used',
            );
          }
        });
      }
    });
  }

  checkGridUsage() {
    this.log('\n=== Grid System Usage Checks ===', 'cyan');

    const files = [
      'NewWelcomeHeader.jsx',
      'JumpBackIn.jsx',
      'RecentlyRunJobs.jsx',
      'ConnectionsSection.jsx',
    ];

    files.forEach((file) => {
      const content = this.readFile(file);
      if (content) {
        // Check for multiple Grid components (separate grids for logical groups)
        const gridMatches = content.match(/<Grid/g);
        if (gridMatches && gridMatches.length >= 2) {
          this.pass(`${file} uses multiple Grid components`, 2);
        } else if (gridMatches && gridMatches.length === 1) {
          this.warn(
            `${file} uses only one Grid - may need separate Grids for logical groups`,
          );
        } else {
          this.fail(`${file} uses Grid components`, 2, 'No Grid found');
        }

        // Check for responsive column props (sm, md, lg)
        const columnPattern =
          /<Column[^>]*sm=\{[^}]+\}[^>]*md=\{[^}]+\}[^>]*lg=\{[^}]+\}/g;
        const responsiveColumns = content.match(columnPattern);
        if (responsiveColumns && responsiveColumns.length > 0) {
          this.pass(`${file} uses responsive Column props (sm, md, lg)`, 2);
        } else {
          this.fail(
            `${file} uses responsive Column props`,
            2,
            'Missing sm, md, or lg props',
          );
        }

        // Check for Grid variants (narrow, condensed)
        if (content.includes('narrow') || content.includes('condensed')) {
          this.pass(`${file} uses Grid variants (narrow/condensed)`);
        } else {
          this.warn(`${file} may benefit from Grid variants`);
        }
      }
    });
  }

  checkCarbonTokens() {
    this.log('\n=== Carbon Token Usage Checks ===', 'cyan');

    const scssContent = this.readFile('new-welcome.scss');
    if (scssContent) {
      // Check for spacing token imports
      if (scssContent.includes("@use '@carbon/react/scss/spacing'")) {
        this.pass('SCSS imports spacing tokens');
      } else {
        this.fail('SCSS imports spacing tokens', 1, 'Import not found');
      }

      // Check for theme token imports
      if (scssContent.includes("@use '@carbon/react/scss/theme'")) {
        this.pass('SCSS imports theme tokens');
      } else {
        this.fail('SCSS imports theme tokens', 1, 'Import not found');
      }

      // Check for type token imports
      if (scssContent.includes("@use '@carbon/react/scss/type'")) {
        this.pass('SCSS imports type tokens');
      } else {
        this.fail('SCSS imports type tokens', 1, 'Import not found');
      }

      // Check for spacing token usage
      const spacingTokenPattern = /\$spacing-\d{2}/g;
      const spacingTokens = scssContent.match(spacingTokenPattern);
      if (spacingTokens && spacingTokens.length >= 5) {
        this.pass('SCSS uses spacing tokens extensively', 2);
      } else if (spacingTokens && spacingTokens.length > 0) {
        this.warn('SCSS uses some spacing tokens but could use more');
      } else {
        this.fail('SCSS uses spacing tokens', 2, 'No spacing tokens found');
      }

      // Check for type-style mixin usage
      const typeStylePattern = /@include type-style\(['"]\w+['"]\)/g;
      const typeStyles = scssContent.match(typeStylePattern);
      if (typeStyles && typeStyles.length >= 5) {
        this.pass('SCSS uses type-style mixins extensively', 2);
      } else if (typeStyles && typeStyles.length > 0) {
        this.warn('SCSS uses some type-style mixins but could use more');
      } else {
        this.fail(
          'SCSS uses type-style mixins',
          2,
          'No type-style mixins found',
        );
      }

      // Check for theme token usage
      const themeTokenPattern = /\$(layer|text-|icon-|border-|background)/g;
      const themeTokens = scssContent.match(themeTokenPattern);
      if (themeTokens && themeTokens.length >= 5) {
        this.pass('SCSS uses theme tokens extensively', 2);
      } else if (themeTokens && themeTokens.length > 0) {
        this.warn('SCSS uses some theme tokens but could use more');
      } else {
        this.fail('SCSS uses theme tokens', 2, 'No theme tokens found');
      }

      // Check for hardcoded values (potential issue)
      const hardcodedPixels = scssContent.match(/:\s*\d+px/g);
      if (hardcodedPixels && hardcodedPixels.length > 5) {
        this.warn(
          `Found ${hardcodedPixels.length} hardcoded pixel values - consider using tokens`,
        );
      }
    }
  }

  checkComponentUsage() {
    this.log('\n=== Carbon Component Usage Checks ===', 'cyan');

    const checks = [
      {
        file: 'NewWelcomeHeader.jsx',
        component: 'ClickableTile',
        description: 'Uses ClickableTile for feature tiles',
      },
      {
        file: 'RecentlyRunJobs.jsx',
        component: 'ClickableTile',
        description: 'Uses ClickableTile for job tiles',
      },
      {
        file: 'ConnectionsSection.jsx',
        component: 'DataTable',
        description: 'Uses DataTable for connections',
      },
      {
        file: 'ConnectionsSection.jsx',
        component: 'Pagination',
        description: 'Uses Pagination component',
      },
      {
        file: 'ConnectionsSection.jsx',
        component: 'Search',
        description: 'Uses Search component',
      },
      {
        file: 'ConnectionsSection.jsx',
        component: 'TabsVertical',
        description: 'Uses TabsVertical for filtering',
      },
    ];

    checks.forEach(({ file, component, description }) => {
      const content = this.readFile(file);
      if (content && content.includes(component)) {
        this.pass(description, 2);
      } else {
        this.fail(description, 2, `${component} not found in ${file}`);
      }
    });
  }

  checkAccessibility() {
    this.log('\n=== Accessibility Checks ===', 'cyan');

    const files = [
      'NewWelcomeHeader.jsx',
      'JumpBackIn.jsx',
      'RecentlyRunJobs.jsx',
      'ConnectionsSection.jsx',
    ];

    files.forEach((file) => {
      const content = this.readFile(file);
      if (content) {
        // Check for semantic HTML
        if (
          content.includes('<h1>') ||
          content.includes('<h2>') ||
          content.includes('<h3>')
        ) {
          this.pass(`${file} uses semantic heading tags`);
        } else {
          this.warn(`${file} may be missing semantic heading tags`);
        }

        // Check for aria-label
        if (content.includes('aria-label')) {
          this.pass(`${file} includes ARIA labels`);
        } else {
          this.warn(`${file} may benefit from ARIA labels`);
        }

        // Check for button type
        if (content.includes('type="button"')) {
          this.pass(`${file} specifies button types`);
        }
      }
    });
  }

  checkCodeOrganization() {
    this.log('\n=== Code Organization Checks ===', 'cyan');

    // Check for data separation
    if (this.fileExists('connectionsData.js')) {
      this.pass('Data extracted to separate file', 2);
    } else {
      this.warn('Consider extracting data to separate file');
    }

    // Check main component structure
    const mainContent = this.readFile('NewWelcome.jsx');
    if (mainContent) {
      if (mainContent.includes('PageLayout')) {
        this.pass('Uses PageLayout component', 2);
      } else {
        this.fail('Uses PageLayout component', 2, 'PageLayout not found');
      }

      // Check for section component imports
      const sectionComponents = [
        'NewWelcomeHeader',
        'JumpBackIn',
        'RecentlyRunJobs',
        'ConnectionsSection',
      ];
      const importedSections = sectionComponents.filter((comp) =>
        mainContent.includes(comp),
      );
      if (importedSections.length === sectionComponents.length) {
        this.pass('All section components imported and used', 2);
      } else {
        this.fail(
          'All section components imported',
          2,
          `Missing: ${sectionComponents.filter((c) => !importedSections.includes(c)).join(', ')}`,
        );
      }
    }
  }

  generateReport() {
    this.log('\n' + '='.repeat(60), 'blue');
    this.log('AUTOMATED REVIEW REPORT', 'blue');
    this.log('='.repeat(60), 'blue');

    const percentage = (
      (this.results.score / this.results.maxScore) *
      100
    ).toFixed(1);

    this.log(
      `\nScore: ${this.results.score}/${this.results.maxScore} (${percentage}%)`,
      'cyan',
    );

    this.log(`\n✓ Passed: ${this.results.passed.length}`, 'green');
    this.log(`✗ Failed: ${this.results.failed.length}`, 'red');
    this.log(`⚠ Warnings: ${this.results.warnings.length}`, 'yellow');

    if (this.results.failed.length > 0) {
      this.log('\nFailed Checks:', 'red');
      this.results.failed.forEach(({ check, reason }) => {
        this.log(`  • ${check}${reason ? ': ' + reason : ''}`, 'red');
      });
    }

    if (this.results.warnings.length > 0) {
      this.log('\nWarnings:', 'yellow');
      this.results.warnings.forEach((warning) => {
        this.log(`  • ${warning}`, 'yellow');
      });
    }

    this.log('\n' + '='.repeat(60), 'blue');

    // Grade
    let grade;
    if (percentage >= 90) grade = 'Excellent';
    else if (percentage >= 80) grade = 'Good';
    else if (percentage >= 70) grade = 'Satisfactory';
    else if (percentage >= 60) grade = 'Needs Improvement';
    else grade = 'Unsatisfactory';

    this.log(
      `\nGrade: ${grade}`,
      percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red',
    );
    this.log('='.repeat(60) + '\n', 'blue');

    return {
      score: this.results.score,
      maxScore: this.results.maxScore,
      percentage: parseFloat(percentage),
      grade,
      passed: this.results.passed.length,
      failed: this.results.failed.length,
      warnings: this.results.warnings.length,
    };
  }

  run() {
    this.log('\n' + '='.repeat(60), 'blue');
    this.log('CARBON FIGMA TO REACT - AUTOMATED REVIEW', 'blue');
    this.log('='.repeat(60) + '\n', 'blue');

    this.log(`Implementation Path: ${this.implementationPath}`, 'cyan');

    this.checkFileStructure();
    this.checkCopyrightHeaders();
    this.checkCarbonImports();
    this.checkGridUsage();
    this.checkCarbonTokens();
    this.checkComponentUsage();
    this.checkAccessibility();
    this.checkCodeOrganization();

    return this.generateReport();
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node automated-review.js <path-to-implementation>');
    console.log('Example: node automated-review.js src/pages/new-welcome');
    process.exit(1);
  }

  const implementationPath = args[0];
  const review = new AutomatedReview(implementationPath);
  const results = review.run();

  // Exit with error code if score is below 60%
  process.exit(results.percentage < 60 ? 1 : 0);
}

module.exports = AutomatedReview;
