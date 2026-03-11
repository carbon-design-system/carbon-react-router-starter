/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

// App level imports
import { Router } from './routes/index.jsx';
import { getStatusCodeForPath } from './routes/utils.js';
import { getThemeFromCookies } from './utils/cookies.js';

/**
 * @param {string} url
 * @param {import('i18next').i18n} i18n
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 * @param {string} [cookies] - Cookie string from request headers
 */
export function render(_url, i18n, options, cookies) {
  const url = `/${_url}`;
  const statusCode = getStatusCodeForPath(url);

  // Get theme values from cookies
  const { themeSetting, headerInverse } = getThemeFromCookies(cookies);

  // Create HTML attributes for theme settings
  const themeAttrs = ` data-theme-setting="${themeSetting}" data-header-inverse="${headerInverse}"`;

  const { pipe, abort } = renderToPipeableStream(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={url}>
          <Router />
        </StaticRouter>
      </I18nextProvider>
    </StrictMode>,
    options,
  );

  // Serialize i18n state to pass to client
  const initialI18nStore = {};
  i18n.languages.forEach((lng) => {
    initialI18nStore[lng] = i18n.services.resourceStore.data[lng];
  });

  const initialState = {
    initialI18nStore,
    initialLanguage: i18n.language,
  };

  /**
   * Embed the i18n state into the HTML so the client can load it before
   * React hydration. This allows the client's i18next instance to use the
   * same translations the server used when rendering this page.
   *
   * The .replace() escapes '<' characters to prevent XSS if any translation
   * strings contain HTML-like content.
   */
  const head = `<meta name="description" content="Server-side rendered page">
<script>window.__INITIAL_I18N_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>`;

  return { pipe, head, abort, statusCode, themeAttr: themeAttrs };
}
