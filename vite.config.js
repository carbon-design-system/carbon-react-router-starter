/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import i18nextLoader from 'vite-plugin-i18next-loader';

// https://vite.dev/config/
export default defineConfig({
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
