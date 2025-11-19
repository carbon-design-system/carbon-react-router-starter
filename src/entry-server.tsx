/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import { StaticRouter } from 'react-router';

// App level imports
import { Router } from './routes/index';
import { getStatusCodeForPath } from './routes/utils';
import { getThemeFromCookies } from './utils/cookies.js';
import type { RenderResult } from './types/server';

export function render(
  _url: string,
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
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </StrictMode>,
    options,
  );

  const head = '<meta name="description" content="Server-side rendered page">';

  return { pipe, head, abort, statusCode, themeAttr: themeAttrs };
}
