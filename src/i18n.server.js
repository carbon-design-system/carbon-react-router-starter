/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await i18next
  // Load translation files from filesystem
  .use(Backend)
  // Add language detector for server-side
  .use(i18nextMiddleware.LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    preload: ['en', 'de'], // Preload all languages on server

    // useSuspense controls what happens when useTranslation() is called
    // but translations aren't loaded yet. When true (the default), React
    // suspends the component until translations are ready. When false,
    // the component renders immediately and useTranslation returns ready: false.
    //
    // On the server, translations are preloaded so they should always be
    // available. We set this to false as a safeguard to ensure rendering
    // never suspends unexpectedly, which could cause issues with streaming SSR.
    useSuspense: false,

    // Return key if translation missing (useful with defaultValue pattern)
    returnNull: false,
    returnEmptyString: false,

    // Language detection for server-side (used by i18next-http-middleware)
    detection: {
      order: ['header'],
      lookupHeader: 'accept-language',
      caches: false,
    },

    backend: {
      // Path to translation files
      loadPath: resolve(__dirname, 'locales/{{lng}}.json'),
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18next;
