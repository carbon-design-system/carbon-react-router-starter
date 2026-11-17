/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { renderToPipeableStream, type PipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';
import type { i18n as I18n, Resource } from 'i18next';
import { StaticRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

// App level imports
import { Router } from './routes/index.tsx';
import { getStatusCodeForPath } from './routes/utils.js';
import { getThemeFromCookies } from './utils/cookies.ts';
import type { InitialI18nState } from './i18n.client.ts';

export interface RenderResult {
  pipe: PipeableStream['pipe'];
  abort: PipeableStream['abort'];
  /** Markup to inject at <!--app-head--> */
  head: string;
  statusCode: number;
  /** Attributes to add to the <html> element */
  themeAttr: string;
}

/**
 * @param _url - Request URL relative to the app base
 * @param cookies - Cookie string from request headers
 */
export function render(
  _url: string,
  i18n: I18n,
  options?: RenderToPipeableStreamOptions,
  cookies?: string,
): RenderResult {
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
  const initialI18nStore: Resource = {};
  i18n.languages.forEach((lng) => {
    const resources = i18n.services.resourceStore.data[lng];
    if (resources) initialI18nStore[lng] = resources;
  });

  const initialState: InitialI18nState = {
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
