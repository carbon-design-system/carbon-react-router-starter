/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { index, route } from '@react-router/dev/routes';

/**
 * Route configuration for React Router Framework mode.
 *
 * This configuration defines all application routes using the file-based routing convention.
 * Each route maps to a module in the app/routes directory.
 *
 * Route Naming Conventions:
 * - `home.jsx` - Index route (/)
 * - `dashboard.jsx` - Static route (/dashboard)
 * - `dashboard.$id.jsx` - Dynamic segment (/dashboard/:id)
 * - `link-4.jsx` - Layout route for nested routes
 * - `link-4.sub-link-1.jsx` - Nested route (/link-4/sub-link-1)
 * - `$.jsx` - Catch-all/splat route (*)
 *
 * @see https://reactrouter.com/start/framework/routing
 * @see https://reactrouter.com/start/framework/route-module
 */
export default [
  // Index route - Welcome/Home page
  index('routes/home.jsx'),

  // Dashboard routes
  route('dashboard', 'routes/dashboard.jsx'),
  route('dashboard/:id', 'routes/dashboard.$id.jsx'),

  // Simple link routes (Link 1, 2, 3)
  route('link-1', 'routes/link-1.jsx'),
  route('link-2', 'routes/link-2.jsx'),
  route('link-3', 'routes/link-3.jsx'),

  // API Resource Routes
  // These routes return JSON data instead of rendering components
  route('api/post/:id', 'routes/api.post.$id.jsx'),
  route('api/comments', 'routes/api.comments.jsx'),
  route('api/external/post/:id', 'routes/api.external.post.$id.jsx'),
  route('api/external/comments', 'routes/api.external.comments.jsx'),

  // Link 4 with nested routes
  // The parent route acts as a layout for its children
  route('link-4', 'routes/link-4.jsx', [
    index('routes/link-4._index.jsx'),
    route('sub-link-1', 'routes/link-4.sub-link-1.jsx'),
    route('sub-link-2', 'routes/link-4.sub-link-2.jsx'),
    route('sub-link-3', 'routes/link-4.sub-link-3.jsx'),
  ]),

  // Catch-all route for 404 pages
  // Must be last in the array to act as fallback
  route('*', 'routes/$.jsx'),
];

// Made with Bob
