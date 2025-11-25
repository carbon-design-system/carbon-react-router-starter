/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dashboard from '../../src/pages/dashboard/Dashboard';

/**
 * Dashboard detail route (/dashboard/:id)
 *
 * Displays the dashboard page with a specific ID parameter.
 * The Dashboard component uses useParams() to access the :id parameter.
 *
 * Example URLs:
 * - /dashboard/1234
 * - /dashboard/abc-xyz
 * - /dashboard/1234?q=search&name=John
 *
 * @returns {JSX.Element} The dashboard component
 * @see https://reactrouter.com/start/framework/route-module
 */
export default function DashboardDetailRoute() {
  return <Dashboard />;
}

/**
 * Metadata for the dashboard detail route
 * Uses the route params to customize the page title
 *
 * @param {Object} params - Route parameters
 * @param {string} params.params.id - The dashboard ID from the URL
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta({ params }) {
  return [
    { title: `Dashboard ${params.id} - Carbon React Router Starter` },
    { name: 'description', content: `Dashboard detail page for ${params.id}` },
  ];
}

// Made with Bob
