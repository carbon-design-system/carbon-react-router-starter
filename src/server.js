/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { getRoutes } from './routes/routes.js';
import { routes } from './routes/config.js';
import { base, getServerConfig } from './config/server-config.js';
import i18nextMiddleware from 'i18next-http-middleware';
import i18n from './i18n.server.js';
import { setBaseUrl } from './service/postHandlers.js';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const ABORT_DELAY = 10000;

/**
 * In production, read and pre-process the index.html template once at startup.
 *
 * Two transformations are applied:
 *
 * 1. NON-BLOCKING STYLESHEET
 *    Vite emits `<link rel="stylesheet" href="/assets/index-[hash].css">` into
 *    index.html. We rewrite it to `<link rel="preload" as="style">` at startup,
 *    then the onload handler promotes it to a stylesheet once downloaded —
 *    eliminating ~1,500 ms of render-blocking time.
 *    body stays visibility:hidden until entry-client.jsx sets body.ready,
 *    which it defers until the stylesheet is confirmed applied.
 *
 * 2. SSR MANIFEST
 *    The Vite SSR manifest maps source module paths to their hashed built asset
 *    filenames. It is serialized into window.__SSR_MANIFEST__ so the client-side
 *    prefetchRoutes() utility can resolve asset URLs for non-active routes.
 *    The same manifest is used server-side to inject modulepreload / preload
 *    hints for the current page's chunks.
 */
let productionTemplate = null;
let ssrManifest = null;
if (isProduction) {
  try {
    const raw = await fs.readFile('./dist/client/index.html', 'utf-8');
    // Find the Carbon stylesheet link Vite emitted and convert it to a preload.
    // The onload attribute promotes it to a real stylesheet once fetched.
    // The <noscript> fallback covers environments with JS disabled.
    productionTemplate = raw.replace(
      /(<link rel="stylesheet" [^>]*assets\/index-[^>]*>)/,
      (match) => {
        const preload = match
          .replace('rel="stylesheet"', 'rel="preload" as="style"')
          .replace('>', ' onload="this.onload=null;this.rel=\'stylesheet\'">');
        const href = match.match(/href="([^"]+)"/)?.[1] ?? '';
        return `${preload}\n    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
      },
    );
  } catch {
    console.warn(
      'Could not read production template — falling back to blocking stylesheet.',
    );
  }

  try {
    const manifestRaw = await fs.readFile(
      './dist/client/.vite/ssr-manifest.json',
      'utf-8',
    );
    ssrManifest = JSON.parse(manifestRaw);
  } catch {
    console.warn(
      'SSR manifest not found — preload hints and prefetch will be disabled.',
    );
  }
}

// Get available port
const { port, baseUrl } = await getServerConfig();

// Set the base URL for post handlers to use
setBaseUrl(baseUrl);

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  const { findAvailablePort } = await import('./utils/port.js');

  // Find an available port for Vite's HMR WebSocket server
  let hmrPort;
  try {
    hmrPort = await findAvailablePort(24678);
  } catch (error) {
    console.error('Failed to find available port for Vite HMR:', error);
    throw new Error(
      'Unable to start development server: Could not find available port for HMR',
    );
  }

  vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Add i18next middleware for language detection
app.use(
  i18nextMiddleware.handle(i18n, {
    ignoreRoutes: [], // Don't ignore any routes
    removeLngFromUrl: false,
  }),
);

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
      // Transform HTML for SSR - Vite 8 requires the full URL path
      // Ensure we always have a valid path (default to '/' for root)
      const transformUrl = url || '/';
      template = await vite.transformIndexHtml(transformUrl, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      // productionTemplate is pre-processed at startup:
      //   - Carbon stylesheet rewritten to non-blocking preload
      // Falls back to bare index.html if startup processing failed.
      template =
        productionTemplate ??
        (await fs.readFile('./dist/client/index.html', 'utf-8'));
      render = (await import('../dist/server/entry-server.js')).render;
    }

    let didError = false;

    const { pipe, head, abort, statusCode, themeAttr } = render(
      url,
      req.i18n,
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

          // Inject head content (i18n state) and theme attribute into the html tag
          let htmlStartProcessed = htmlStart.replace('<!--app-head-->', head);
          htmlStartProcessed = themeAttr
            ? htmlStartProcessed.replace('<html', `<html${themeAttr}`)
            : htmlStartProcessed;

          // Inject the SSR manifest for client-side route prefetching and
          // server-side preload hints. Both use the same manifest object.
          if (ssrManifest) {
            // Serialize the manifest into window.__SSR_MANIFEST__ so the
            // client-side prefetchRoutes() utility can resolve asset URLs for
            // non-active routes without bundling the manifest into the JS.
            const manifestScript = `<script>window.__SSR_MANIFEST__ = ${JSON.stringify(ssrManifest).replace(/</g, '\\u003c')}</script>`;

            // Generate <link rel="modulepreload"> and <link rel="preload" as="style">
            // for the current page's chunks. The server knows which route is being
            // rendered before the browser receives any HTML — emitting these hints
            // lets the browser fetch the page chunk in parallel with the stream
            // rather than waiting for the parser to discover the <script> tag.
            const preloadLinks = buildPreloadLinks(url, ssrManifest);

            htmlStartProcessed = htmlStartProcessed.replace(
              '</head>',
              `${preloadLinks}${manifestScript}</head>`,
            );
          }

          res.write(htmlStartProcessed);

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

/**
 * Builds <link rel="modulepreload"> and <link rel="preload" as="style"> tags
 * for the current page's assets using the Vite SSR manifest.
 *
 * The server knows which route is being rendered before the browser receives
 * a single byte of HTML. Emitting these hints causes the browser to fetch the
 * page-specific JS and CSS chunks in parallel with the HTML stream rather than
 * waiting for the parser to discover the <script> tag later.
 *
 * @param {string} url - The current request URL path
 * @param {Object} manifest - The parsed Vite SSR manifest
 * @returns {string} HTML string of <link> tags to inject into <head>
 */
function buildPreloadLinks(url, manifest) {
  // Find the route whose path matches the current URL
  const matchedRoute = routes.find((route) => {
    if (!route.path || !route.element) return false;
    if (route.path === url || route.path === `/${url}`) return true;
    // Match dynamic segments: /dashboard/:id matches /dashboard/123
    const staticPart = route.path.split('/:')[0];
    return staticPart !== route.path && url.startsWith(staticPart);
  });

  if (!matchedRoute?.chunkId) return '';

  // chunkId matches the manifest key exactly (e.g. 'src/pages/welcome/Welcome.jsx')
  const assets = manifest[matchedRoute.chunkId] ?? [];

  return assets
    .map((asset) => {
      const href = asset.startsWith('/') ? asset : `/${asset}`;
      if (asset.endsWith('.js')) {
        return `<link rel="modulepreload" href="${href}">`;
      }
      if (asset.endsWith('.css')) {
        return `<link rel="preload" as="style" href="${href}">`;
      }
      return '';
    })
    .join('\n  ');
}

// Start http server
const server = app.listen(port, () => {
  console.log(`Server started at: ${baseUrl}`);
});

// Graceful shutdown handler
function gracefulShutdown(signal) {
  console.log(`\n${signal} received. Closing server gracefully...`);

  server.close(() => {
    console.log('HTTP server closed');

    // Close Vite dev server if running
    if (vite) {
      vite.close().then(() => {
        console.log('Vite dev server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Windows-specific signals
if (process.platform === 'win32') {
  process.on('SIGBREAK', () => gracefulShutdown('SIGBREAK'));
}
