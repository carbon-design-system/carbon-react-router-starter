/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { routes } from './config.js';

/**
 * Converts a route pattern to a regex that matches dynamic parameters
 * @param {string} pattern - Route pattern like '/dashboard/:id'
 * @returns {RegExp} Regular expression to match the pattern
 */
function patternToRegex(pattern) {
  // Escape special regex characters except for :param patterns
  const regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
    .replace(/\*/g, '.*') // Convert * to match anything
    .replace(/:([^/]+)/g, '([^/]+)'); // Convert :param to capture group

  return new RegExp(`^${regexPattern}$`);
}

/**
 * Finds the matching route for a given URL path
 * @param {string} pathname - The URL path to match against
 * @returns {Object|null} The matched route or null if no match is found
 */
export function findMatchingRoute(pathname) {
  // Clean up the pathname
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  // Try to find a match
  for (const route of routes) {
    if (!route.path) continue;

    // Skip the wildcard route for now
    if (route.path === '*') continue;

    // Check for exact match first (most efficient)
    if (route.path === path) {
      return route;
    }

    // Check for pattern match (handles :param and *)
    const regex = patternToRegex(route.path);
    if (regex.test(path)) {
      return route;
    }
  }

  // If no match, find the wildcard route (404)
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
