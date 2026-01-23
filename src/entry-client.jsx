/**
 * Copyright IBM Corp. 2025, 2026
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

/**
 * Initializes the theme on client load by reading the user's preference
 * from localStorage or system settings and applying the appropriate
 * Carbon theme class to the document.
 */
initializeTheme();

/**
 * Synchronize client-side i18next with the server's translation state.
 *
 * When a page is server-rendered, the server detects the user's preferred
 * language and uses i18next to render content in that language. To allow
 * the client to continue where the server left off, the server embeds its
 * translation data into window.__INITIAL_I18N_STATE__.
 *
 * Before React hydration begins, we read this state and load it into the
 * client's i18next instance. This ensures React hydrates with the same
 * translations the server used, preventing a mismatch that would otherwise
 * cause a brief flash of English (the fallback language) before the
 * correct translations appear.
 */
const { initialI18nStore, initialLanguage } =
  window.__INITIAL_I18N_STATE__ || {};

if (initialI18nStore && initialLanguage) {
  Object.keys(initialI18nStore).forEach((lng) => {
    Object.keys(initialI18nStore[lng]).forEach((ns) => {
      i18n.addResourceBundle(lng, ns, initialI18nStore[lng][ns], true, true);
    });
  });
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
