/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Loading } from '@carbon/react';

import { routes } from './config.js';

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map(({ element: Element, ...rest }) => (
          <Route key={rest.path} {...rest} element={Element && <Element />} />
        ))}
      </Routes>
    </Suspense>
  );
};
