/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Placeholder from '../../src/pages/placeholder/Placeholder';

/**
 * Link 1 route (/link-1)
 *
 * A placeholder page demonstrating navigation structure.
 *
 * @returns {JSX.Element} The placeholder component
 * @see https://reactrouter.com/start/framework/route-module
 */
export default function Link1Route() {
  return <Placeholder />;
}

/**
 * Metadata for Link 1 route
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Link 1 - Carbon React Router Starter' },
    { name: 'description', content: 'Link 1 placeholder page' },
  ];
}

// Made with Bob
