/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Route, Routes } from 'react-router';

import { routes } from './config.js';

/**
 * Main application router component.
 * Dynamically generates routes from the routes configuration,
 * rendering each route's element component.
 *
 * @returns {JSX.Element} React Router Routes component with all configured routes
 */
export const Router = () => {
  return (
    <Routes>
      {routes.map(({ element: Element, ...rest }) => (
        <Route key={rest.path} {...rest} element={Element && <Element />} />
      ))}
    </Routes>
  );
};
