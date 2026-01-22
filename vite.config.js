/* eslint-disable -- Vite config intentionally uses patterns that trigger ESLint warnings */
/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        // Common CSS bundle
        common: './src/common.scss',
        // Page-specific CSS bundles
        welcome: './src/pages/welcome/welcome.scss',
        dashboard: './src/pages/dashboard/dashboard.scss',
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Organize CSS files in assets/css/ directory
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
