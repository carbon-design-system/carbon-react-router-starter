/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Welcome from '../../src/pages/welcome/Welcome';

/**
 * Home route (index route at /)
 *
 * Displays the welcome page with getting started information,
 * features overview, and data fetching example.
 *
 * @returns {JSX.Element} The welcome page component
 * @see https://reactrouter.com/start/framework/route-module
 */
export default function Home() {
  return <Welcome />;
}

/**
 * Metadata for the home route
 * Sets the page title and description for SEO
 *
 * @see https://reactrouter.com/start/framework/route-module#meta
 */
export function meta() {
  return [
    { title: 'Carbon React Router Starter' },
    {
      name: 'description',
      content:
        'A starter template for building React applications with Carbon Design System and React Router',
    },
  ];
}

// Made with Bob
