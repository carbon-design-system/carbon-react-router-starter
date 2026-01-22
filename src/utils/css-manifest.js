/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * CSS MANIFEST UTILITY
 * This utility automatically generates a CSS manifest from route configuration.
 * The cssBundle property in routes/config.js determines which CSS file to load.
 *
 * Convention: CSS files are located at src/pages/{cssBundle}/{cssBundle}.scss
 * Example: cssBundle: 'welcome' -> src/pages/welcome/welcome.scss
 *
 * To add CSS for a new page:
 * 1. Add cssBundle property to the route in src/routes/config.js
 * 2. Ensure the CSS file exists at src/pages/{cssBundle}/{cssBundle}.scss
 * 3. The manifest will be automatically generated from the route config
 */

import { routes } from '../routes/config.js';

/**
 * Automatically generate CSS manifest from route configuration
 * This function is called on module import to create the manifest object
 * @returns {Object} Map of route paths to CSS file paths
 */
function generateCssManifest() {
  const manifest = {};

  routes.forEach((route) => {
    if (route.path && route.cssBundle) {
      // Generate CSS path from cssBundle identifier
      // e.g., 'welcome' -> 'src/pages/welcome/welcome.scss'
      manifest[route.path] =
        `src/pages/${route.cssBundle}/${route.cssBundle}.scss`;
    }
  });

  return manifest;
}

// Auto-generated manifest object - regenerated on each module import
export const cssManifest = generateCssManifest();

/**
 * Get the CSS bundle path for a given route
 * @param {string} path - The route path
 * @returns {string|null} - The CSS file path or null if no specific CSS needed
 */
export function getCssForRoute(path) {
  // Direct match
  if (cssManifest[path]) {
    return cssManifest[path];
  }

  // Pattern match for dynamic routes (e.g., /dashboard/:id)
  for (const [pattern, cssPath] of Object.entries(cssManifest)) {
    if (pattern.includes(':')) {
      // Convert route pattern to regex (e.g., /dashboard/:id -> /dashboard/[^/]+)
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
      if (regex.test(path)) {
        return cssPath;
      }
    }
  }

  // Default fallback - no specific CSS
  return null;
}

/**
 * Get the CSS bundle identifier from a route
 * @param {string} path - The route path
 * @returns {string|null} - The CSS bundle identifier or null
 */
export function getCssBundleId(path) {
  const route = routes.find((r) => r.path === path);
  return route?.cssBundle || null;
}
