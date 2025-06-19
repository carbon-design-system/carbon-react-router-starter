/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/not-found/NotFound';
import Welcome from '../pages/welcome/Welcome';

export const routes = [
  {
    index: true,
    path: '/',
    element: Welcome,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    carbon: {
      inHeader: true,
    },
  },
  {
    path: '*',
    element: NotFound,
  },
];
