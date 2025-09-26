/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { routes } from './config.js';

/**
 * Finds the matching route for a given URL path
 * @param {string} pathname - The URL path to match against
 * @returns {Object|null} The matched route or null if no match is found
 */
export function findMatchingRoute(pathname) {
  // Clean up the pathname
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  // Try to find an exact match first
  for (const route of routes) {
    if (!route.path) continue;

    // Skip the wildcard route for now
    if (route.path === '*') continue;

    // Simple path matching logic
    if (
      route.path === path ||
      (route.path.endsWith('*') && path.startsWith(route.path.slice(0, -1)))
    ) {
      return route;
    }
  }

  // If no exact match, find the wildcard route (404)
  return routes.find((route) => route.path === '*') || null;
}

/**
 * Gets the HTTP status code for a given URL path
 * @param {string} pathname - The URL path to get the status code for
 * @returns {number} The HTTP status code (default: 200)
 */
export function getStatusCodeForPath(pathname) {
  const route = findMatchingRoute(pathname);
  return route?.status || 200;
}
