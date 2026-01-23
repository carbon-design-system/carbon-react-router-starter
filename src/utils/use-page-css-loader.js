/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { loadPageCss } from './css-loader';

/**
 * Custom hook that handles dynamic CSS loading during client-side navigation
 * Listens to route changes and loads appropriate page-specific CSS
 *
 * This hook should be used at the root level of the client-side app
 * to ensure CSS is loaded on navigation without breaking SSR hydration
 */
export function usePageCssLoader() {
  const location = useLocation();

  useEffect(() => {
    // Load appropriate CSS when route changes
    loadPageCss(location.pathname);
  }, [location.pathname]);
}
