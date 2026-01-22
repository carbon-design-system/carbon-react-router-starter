/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generate CSS manifest for production builds
 * This script reads the built CSS files and creates a mapping
 * from bundle names to their hashed filenames
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssDir = path.join(__dirname, '../dist/client/assets/css');
const outputPath = path.join(__dirname, '../dist/client/css-manifest.json');

try {
  // Read all CSS files in the assets/css directory
  const files = fs.readdirSync(cssDir);

  const manifest = {};

  files.forEach((file) => {
    if (file.endsWith('.css')) {
      // Extract the bundle name from the filename
      // e.g., "welcome-BcBpZF3p.css" -> "welcome"
      const match = file.match(/^(.+?)-[a-zA-Z0-9]+\.css$/);
      if (match) {
        const bundleName = match[1];
        manifest[bundleName] = `assets/css/${file}`;
      }
    }
  });

  // Write the manifest file
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  console.log('✓ CSS manifest generated successfully');
  console.log(`  Location: ${outputPath}`);
  console.log(`  Bundles: ${Object.keys(manifest).join(', ')}`);
} catch (error) {
  console.error('Error generating CSS manifest:', error);
  process.exit(1);
}
