/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { Router } from './routes';

// App level imports
import { initializeTheme } from './utils/theme';
import i18n from './i18n.client.js';

// Initialize theme on client load
initializeTheme();

// Hydrate i18n with server state to prevent flicker
const { initialI18nStore, initialLanguage } =
  window.__INITIAL_I18N_STATE__ || {};

if (initialI18nStore && initialLanguage) {
  // Add server translations to client instance
  Object.keys(initialI18nStore).forEach((lng) => {
    Object.keys(initialI18nStore[lng]).forEach((ns) => {
      i18n.addResourceBundle(lng, ns, initialI18nStore[lng][ns], true, true);
    });
  });
  // Set the language from server
  i18n.changeLanguage(initialLanguage);
}

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>,
);

// Remove visibility hidden after hydration to prevent FOUC
document.body.classList.add('ready');
