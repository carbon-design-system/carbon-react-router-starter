/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';

// App level imports
import { Router } from './routes/index.jsx';

/**
 * @param {string} url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(_url, options) {
  const url = `/${_url}`;

  const { pipe, abort } = renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </StrictMode>,
    options,
  );

  const head = '<meta name="description" content="Server-side rendered page">';

  return { pipe, head, abort };
}
