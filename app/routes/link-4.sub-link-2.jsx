/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Placeholder from '../../src/pages/placeholder/Placeholder';

/**
 * Link 4 Sub-link 2 route (/link-4/sub-link-2)
 *
 * A nested route under Link 4, demonstrating submenu navigation.
 *
 * @returns {JSX.Element} The placeholder component
 * @see https://reactrouter.com/start/framework/routing#nested-routes
 */
export default function Link4SubLink2Route() {
  return <Placeholder />;
}

/**
 * Metadata for Link 4 Sub-link 2 route
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Sub-link 2 - Carbon React Router Starter' },
    { name: 'description', content: 'Link 4 Sub-link 2 page' },
  ];
}

// Made with Bob
