/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import type { ViteDevServer } from 'vite';
import { getRoutes } from './routes/routes.ts';
import { base, getServerConfig } from './config/server-config.ts';
import { handle as i18nextHandle } from 'i18next-http-middleware';
import i18n from './i18n.server.ts';
import { setBaseUrl } from './service/postHandlers.ts';

type EntryServer = { render: typeof import('./entry-server.tsx').render };

const toError = (value: unknown): Error => (value instanceof Error ? value : new Error(String(value)));

// Constants
const isProduction = process.env['NODE_ENV'] === 'production';
const ABORT_DELAY = 10000;

// Get available port
const { port, baseUrl } = await getServerConfig();

// Set the base URL for post handlers to use
setBaseUrl(baseUrl);

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite: ViteDevServer | undefined;
if (!isProduction) {
  const { createServer } = await import('vite');
  const { findAvailablePort } = await import('./utils/port.ts');

  // Find an available port for Vite's HMR WebSocket server
  let hmrPort: number;
  try {
    hmrPort = await findAvailablePort(24678);
  } catch (error) {
    console.error('Failed to find available port for Vite HMR:', error);
    throw new Error('Unable to start development server: Could not find available port for HMR');
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
  i18nextHandle(i18n, {
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

    let template: string;
    let render: EntryServer['render'];
    if (vite) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      // Transform HTML for SSR - Vite 8 requires the full URL path
      // Ensure we always have a valid path (default to '/' for root)
      const transformUrl = url || '/';
      template = await vite.transformIndexHtml(transformUrl, template);
      render = ((await vite.ssrLoadModule('/src/entry-server.tsx')) as EntryServer).render;
    } else {
      template = await fs.readFile('./dist/client/index.html', 'utf-8');
      // Built output; the specifier is a variable so type checking does not require a build
      const entryServerPath = '../dist/server/entry-server.js';
      render = ((await import(entryServerPath)) as EntryServer).render;
    }

    const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
    if (htmlStart === undefined || htmlEnd === undefined) {
      throw new Error('index.html is missing the <!--app-html--> placeholder');
    }

    let didError = false;

    const { pipe, head, abort, statusCode, themeAttr } = render(
      url,
      req.i18n,
      {
        onShellError(shellError) {
          const error = toError(shellError);
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

          // Inject head content (i18n state) and theme attribute into the html tag
          let htmlStartProcessed = htmlStart.replace('<!--app-head-->', head);
          htmlStartProcessed = themeAttr
            ? htmlStartProcessed.replace('<html', `<html${themeAttr}`)
            : htmlStartProcessed;

          res.write(htmlStartProcessed);

          transformStream.on('finish', () => {
            res.end(htmlEnd);
          });

          pipe(transformStream);
        },
        onError(streamError) {
          const error = toError(streamError);
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
    const error = toError(e);
    vite?.ssrFixStacktrace(error);
    // Enhanced error logging with full context
    console.error('Server error:', {
      url: req.originalUrl,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    res.status(500).set('Content-Type', 'text/plain').end('Internal Server Error');
  }
});

// Start http server
const server = app.listen(port, () => {
  console.log(`Server started at: ${baseUrl}`);
});

// Graceful shutdown handler
function gracefulShutdown(signal: NodeJS.Signals): void {
  console.log(`\n${signal} received. Closing server gracefully...`);

  server.close(() => {
    console.log('HTTP server closed');

    // Close Vite dev server if running
    if (vite) {
      vite.close().then(
        () => {
          console.log('Vite dev server closed');
          process.exit(0);
        },
        (error: unknown) => {
          console.error('Failed to close Vite dev server:', error);
          process.exit(1);
        },
      );
    } else {
      process.exit(0);
    }
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
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
