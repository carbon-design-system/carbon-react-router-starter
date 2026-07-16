/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import i18nextLoader from 'vite-plugin-i18next-loader';

// https://vite.dev/config/
export default defineConfig({
  build: {
    /**
     * Expected chunk size breakdown:
     *   vendor-carbon  — large, expected, see threshold comment below
     *   index          — app shell (Nav, routing, i18n bootstrap)
     *   page chunks    — small, one per route (Welcome, Dashboard, etc.)
     *
     * Threshold is set to 3× the measured vendor-carbon baseline to give ample
     * headroom for a full-featured IBM product UI using most of Carbon's
     * component library. Revisit if vendor-carbon consistently approaches the
     * limit after adding many new Carbon dependencies.
     *
     * Baseline measured on this starter: vendor-carbon = 298 kB (86 kB gzip).
     * 3× = 894 kB → rounded up to 1,000 kB.
     */
    chunkSizeWarningLimit: 1000,
    /**
     * build.rolldownOptions replaces the deprecated build.rollupOptions in
     * Vite 8 (Rolldown-based). The API is a superset of Rollup's options.
     */
    rolldownOptions: {
      output: {
        /**
         * Isolate all Carbon, IBM, and Carbon Labs packages into a single
         * vendor chunk. This chunk is large but cached permanently after the
         * first visit — application-code deploys no longer bust the browser
         * cache for the entire library.
         *
         * codeSplitting.groups replaces the deprecated manualChunks function
         * in Vite 8 / Rolldown. The test regex matches the same packages.
         *
         * CSS from Carbon stays in index.css (via src/index.scss). This only
         * affects JS chunking.
         */
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/@carbon\/|node_modules\/@ibm\/|node_modules\/@carbon-labs\//,
              name: 'vendor-carbon',
            },
          ],
        },
      },
      /**
       * Suppress the expected LARGE_BUNDLE warning for vendor-carbon and
       * surface an actionable error for any other unexpectedly large chunk.
       * The most likely cause is a page component importing '@carbon/react'
       * or '@carbon/ibm-products' directly — see src/index.scss for the
       * correct import pattern and .stylelintrc.json for the lint rule that
       * catches this before build time.
       */
      onwarn(warning, warn) {
        if (
          warning.code === 'LARGE_BUNDLE' &&
          warning.message?.includes('vendor-carbon')
        ) {
          return; // expected — vendor-carbon is intentionally large
        }
        if (warning.code === 'LARGE_BUNDLE') {
          warn(
            `${warning.message}\n` +
              `  Unexpected large chunk detected. If a page chunk is oversized, ` +
              `check that it does not import '@carbon/react' or '@carbon/ibm-products' ` +
              `directly. Those imports belong only in src/index.scss. ` +
              `See the Stylelint rule in .stylelintrc.json for automated enforcement.`,
          );
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [
    react(),
    /**
     * Loads i18n translation JSON files from src/locales at build time.
     * Files are resolved by basename (e.g., de.json becomes the 'de' namespace),
     * making translations available to i18next without runtime file fetching.
     */
    i18nextLoader({
      paths: ['./src/locales'],
      namespaceResolution: 'basename',
    }),
  ],
  server: {
    // Automatically find an available port if the default is in use
    strictPort: false,
    hmr: {
      // Let Vite automatically find an available port for WebSocket/HMR
      // This prevents "Port is already in use" errors for the WebSocket server
      clientPort: undefined,
    },
  },
  preview: {
    // Automatically find an available port if the default is in use
    strictPort: false,
  },
  ssr: {
    // Ensure proper handling of external dependencies in SSR
    noExternal: [],
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
