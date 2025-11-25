/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRequestListener } from '@react-router/node';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const build = await import('./build/server/index.js');

const server = createServer(async (req, res) => {
  // Try to serve static files from build/client
  // Only for requests that look like static assets (have file extensions)
  const hasFileExtension = /\.[a-zA-Z0-9]+(\?.*)?$/.test(req.url);

  if (hasFileExtension && !req.url.startsWith('/api/')) {
    try {
      // Remove query string for file path
      const urlPath = req.url.split('?')[0];

      // Sanitize path to prevent directory traversal attacks
      const safePath = urlPath.replace(/^\/+/, '').replace(/\.\./g, '');
      const filePath = join(process.cwd(), 'build/client', safePath);

      // Verify the resolved path is still within build/client
      const buildDir = join(process.cwd(), 'build/client');
      if (!filePath.startsWith(buildDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      const content = readFileSync(filePath);
      const ext = urlPath.split('.').pop();
      const contentTypes = {
        js: 'application/javascript',
        css: 'text/css',
        svg: 'image/svg+xml',
        woff2: 'font/woff2',
        woff: 'font/woff',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
      };
      res.setHeader(
        'Content-Type',
        contentTypes[ext] || 'application/octet-stream',
      );
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.end(content);
      return;
    } catch {
      // File not found - return 404 for static assets
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
  }

  // Handle all other requests (routes) with React Router
  const listener = createRequestListener({ build });
  listener(req, res);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Made with Bob
