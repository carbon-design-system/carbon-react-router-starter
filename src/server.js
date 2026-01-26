/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { getRoutes } from './routes/routes.js';
import { port, base, baseUrl } from './config/server-config.js';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const ABORT_DELAY = 10000;

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;

  // Enable compression (supports both gzip and brotli)
  app.use(compression({ level: 6, brotli: { enabled: true, zlib: {} } }));
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Register API routes
getRoutes(app);

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    // Get cookies from request
    const cookies = req.headers.cookie || '';

    /** @type {string} */
    let template;
    /** @type {import('./entry-server.jsx').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      const templateHtml = isProduction
        ? await fs.readFile('./dist/client/index.html', 'utf-8')
        : '';
      template = templateHtml;
      render = (await import('../dist/server/entry-server.js')).render;
    }

    let didError = false;

    const { pipe, abort, statusCode, themeAttr } = render(
      url,
      {
        onShellError(error) {
          // Improved error handling with debugging context
          console.error('Shell rendering error:', {
            url,
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          });
          res.status(500);
          res.set({ 'Content-Type': 'text/html' });
          res.send('<h1>Something went wrong</h1>');
        },
        onShellReady() {
          res.status(didError ? 500 : statusCode);
          res.set({ 'Content-Type': 'text/html' });

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding);
              callback();
            },
          });

          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

          // Inject theme attribute into the html tag
          const htmlStartWithTheme = themeAttr
            ? htmlStart.replace('<html', `<html${themeAttr}`)
            : htmlStart;

          res.write(htmlStartWithTheme);

          transformStream.on('finish', () => {
            res.end(htmlEnd);
          });

          pipe(transformStream);
        },
        onError(error) {
          didError = true;
          // Enhanced error logging with context
          console.error('Streaming error:', {
            url,
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          });
        },
      },
      cookies,
    );

    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    // Enhanced error logging with full context
    console.error('Server error:', {
      url: req.originalUrl,
      error: e.message,
      stack: e.stack,
      timestamp: new Date().toISOString(),
    });
    res
      .status(500)
      .set('Content-Type', 'text/plain')
      .end('Internal Server Error');
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at: ${baseUrl}`);
});
