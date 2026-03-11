/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Load translation files dynamically
  .use(
    resourcesToBackend((language) => {
      // Only load non-English translations from files
      // English is provided as defaultValue in components
      if (language === 'en') {
        return Promise.resolve({});
      }
      return import(`./locales/${language}.json`);
    }),
  )
  // Init i18next
  .init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],

    // useSuspense controls what happens when useTranslation() is called
    // but translations aren't loaded yet. When true (the default), React
    // suspends the component until translations are ready. When false,
    // the component renders immediately and useTranslation returns ready: false.
    //
    // On the client, we load translations from the server's state before
    // React hydrates (see entry-client.jsx). However, this i18next instance
    // initializes before that happens. Setting useSuspense to false ensures
    // components never suspend during hydration, which would cause a mismatch
    // with the server-rendered HTML.
    //
    // Note: Both i18n.client.js and i18n.server.js need this setting because
    // they are separate i18next instances that run in different environments.
    useSuspense: false,

    // Return key if translation missing (useful with defaultValue pattern)
    returnNull: false,
    returnEmptyString: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of language detection
      order: ['navigator', 'htmlTag'],
      // Don't cache language in cookies/localStorage for this boilerplate
      caches: [],
    },
  });

export default i18next;
