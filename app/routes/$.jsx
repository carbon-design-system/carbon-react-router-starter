/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NotFound from '../../src/pages/not-found/NotFound';

/**
 * Catch-all/Splat route (*)
 *
 * This route handles all unmatched URLs and displays a 404 Not Found page.
 * The $ in the filename represents the splat parameter in React Router.
 *
 * @returns {JSX.Element} The not found component
 * @see https://reactrouter.com/start/framework/routing#splats
 */
export default function NotFoundRoute() {
  return <NotFound />;
}

/**
 * Metadata for the 404 route
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: '404 Not Found - Carbon React Router Starter' },
    { name: 'description', content: 'Page not found' },
  ];
}

// Made with Bob
