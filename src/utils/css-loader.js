/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Client-side CSS loader for dynamic page-specific CSS
 * Manages loading and unloading of page-specific CSS during client-side navigation
 */

import { getCssForRoute } from './css-manifest.js';

const PAGE_CSS_ID = 'page-specific-css';
let currentPageCss = null;

/**
 * Load CSS for a specific route
 * @param {string} pathname - The current route path
 */
export function loadPageCss(pathname) {
  const cssPath = getCssForRoute(pathname);

  // If no CSS for this route, remove any existing page CSS
  if (!cssPath) {
    removePageCss();
    return;
  }

  // If same CSS is already loaded, do nothing
  if (currentPageCss === cssPath) {
    return;
  }

  // Remove old page CSS if exists
  removePageCss();

  // In production, we need to look up the hashed filename
  if (import.meta.env.PROD) {
    loadProductionCss(cssPath);
  } else {
    // In development, load the SCSS file directly
    loadDevelopmentCss(cssPath);
  }

  currentPageCss = cssPath;
}

/**
 * Load CSS in production mode (using manifest)
 * @param {string} cssPath - The CSS file path from manifest
 */
async function loadProductionCss(cssPath) {
  try {
    // Fetch the CSS manifest
    const response = await fetch('/css-manifest.json');
    const manifest = await response.json();

    // Extract bundle name from path
    const bundleName = cssPath.match(/pages\/([^/]+)\//)?.[1];

    if (bundleName && manifest[bundleName]) {
      const cssHref = `/${manifest[bundleName]}`;
      createCssLink(cssHref);
    }
  } catch (error) {
    console.warn('Failed to load page CSS:', error);
  }
}

/**
 * Load CSS in development mode
 * @param {string} cssPath - The CSS file path
 */
function loadDevelopmentCss(cssPath) {
  createCssLink(`/${cssPath}`);
}

/**
 * Create and append a CSS link element
 * @param {string} href - The CSS file URL
 */
function createCssLink(href) {
  const link = document.createElement('link');
  link.id = PAGE_CSS_ID;
  link.rel = 'stylesheet';
  link.href = href;

  // Insert at the end of head to maintain cascade order
  document.head.appendChild(link);
}

/**
 * Remove the current page-specific CSS
 */
function removePageCss() {
  const existingLink = document.getElementById(PAGE_CSS_ID);
  if (existingLink) {
    existingLink.remove();
  }
  currentPageCss = null;
}

/**
 * Initialize page CSS on first load
 * This ensures the server-injected CSS is tracked
 */
export function initializePageCss() {
  const pathname = window.location.pathname;
  const cssPath = getCssForRoute(pathname);
  currentPageCss = cssPath;
}
