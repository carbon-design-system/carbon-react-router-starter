/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Placeholder from '../../src/pages/placeholder/Placeholder';

/**
 * Link 4 index route (/link-4)
 *
 * This is the index route for the /link-4 path.
 * It renders when the user navigates to /link-4 without any sub-path.
 *
 * @returns {JSX.Element} The placeholder component
 * @see https://reactrouter.com/start/framework/routing#index-routes
 */
export default function Link4IndexRoute() {
  return <Placeholder />;
}

/**
 * Metadata for Link 4 index route
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Link 4 - Carbon React Router Starter' },
    { name: 'description', content: 'Link 4 main page' },
  ];
}

// Made with Bob
