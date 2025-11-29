/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dashboard from '../../src/pages/dashboard/Dashboard';

/**
 * Dashboard route (/dashboard)
 *
 * Displays the main dashboard page with tiles and visualizations.
 * Demonstrates URL parameter handling (both path and query params).
 *
 * @returns {JSX.Element} The dashboard component
 * @see https://reactrouter.com/start/framework/route-module
 */
export default function DashboardRoute() {
  return <Dashboard />;
}

/**
 * Metadata for the dashboard route
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Dashboard - Carbon React Router Starter' },
    { name: 'description', content: 'Dashboard page with data visualizations' },
  ];
}

// Made with Bob
