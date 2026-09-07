/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Prefetches the JS and CSS chunks for every route that is not currently
 * active, after the browser has finished its initial work.
 *
 * This mirrors the "prefetch on idle" strategy used by Next.js: the current
 * page loads synchronously, while every other route's assets are fetched
 * speculatively at low priority in the background. When the user navigates,
 * the chunks are already in the browser cache and the transition is instant.
 *
 * Asset URLs are resolved from the Vite SSR manifest, which is injected into
 * window.__SSR_MANIFEST__ by the server using the same pattern as i18n state.
 * The manifest maps source module paths to hashed built asset filenames:
 *   { "src/pages/welcome/Welcome.jsx": ["assets/Welcome-[hash].js", ...] }
 *
 * Only runs in production — in development Vite serves modules dynamically
 * and the manifest is not available.
 *
 * @param {Array} routes - The full routes config array from src/routes/config.js
 * @param {string} currentPathname - The pathname of the currently active route
 */
export function prefetchRoutes(routes, currentPathname) {
  if (!import.meta.env.PROD) return;

  const manifest = window.__SSR_MANIFEST__;
  if (!manifest) return;

  const schedule =
    typeof requestIdleCallback !== 'undefined'
      ? (fn) => requestIdleCallback(fn, { timeout: 2000 })
      : (fn) => setTimeout(fn, 200);

  schedule(() => {
    // Only prefetch routes that have a chunkId (real page components).
    // Virtual/external links have no element or chunkId so are skipped.
    const prefetchable = routes.filter(
      (route) =>
        route.chunkId &&
        route.path &&
        !isActiveRoute(route.path, currentPathname),
    );

    prefetchable.forEach((route) => {
      // chunkId matches the manifest key exactly, e.g. 'src/pages/welcome/Welcome.jsx'
      const assets = manifest[route.chunkId] ?? [];
      assets.forEach(insertPrefetchLink);
    });
  });
}

/**
 * Returns true if the route path matches the current pathname.
 * Uses a simple prefix check for dynamic segments (e.g. /dashboard/:id).
 *
 * @param {string} routePath
 * @param {string} currentPathname
 * @returns {boolean}
 */
function isActiveRoute(routePath, currentPathname) {
  if (routePath === currentPathname) return true;
  // Treat /path/:param routes as active when /path/* is current
  const staticPart = routePath.split('/:')[0];
  return staticPart !== routePath && currentPathname.startsWith(staticPart);
}

/**
 * Inserts a <link rel="prefetch"> element for the given asset URL if one
 * does not already exist in the document head.
 *
 * @param {string} asset - Relative asset path from the manifest
 */
function insertPrefetchLink(asset) {
  const href = asset.startsWith('/') ? asset : `/${asset}`;
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;

  if (href.endsWith('.css')) {
    link.as = 'style';
  } else if (href.endsWith('.js')) {
    link.as = 'script';
  }

  document.head.appendChild(link);
}
