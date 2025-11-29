/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Outlet } from 'react-router';

/**
 * Link 4 layout route (/link-4)
 *
 * This is a layout route that renders an Outlet for nested child routes.
 * It doesn't render its own content, but provides a container for:
 * - /link-4 (index) → link-4._index.jsx
 * - /link-4/sub-link-1 → link-4.sub-link-1.jsx
 * - /link-4/sub-link-2 → link-4.sub-link-2.jsx
 * - /link-4/sub-link-3 → link-4.sub-link-3.jsx
 *
 * @returns {JSX.Element} Outlet for nested routes
 * @see https://reactrouter.com/start/framework/routing#layout-routes
 */
export default function Link4Layout() {
  return <Outlet />;
}

/**
 * Metadata for Link 4 layout route
 * This will be inherited by child routes unless they override it
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Link 4 - Carbon React Router Starter' },
    { name: 'description', content: 'Link 4 section with nested routes' },
  ];
}

// Made with Bob
