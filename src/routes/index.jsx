/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Route, Routes } from 'react-router';

import Welcome from '../pages/welcome/Welcome.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import { ThemeLayout } from '../layouts/theme-layout.jsx';

export const Router = () => {
  return (
    <Routes>
      <Route element={<ThemeLayout />}>
        <Route index path="/" element={<Welcome />} />
        <Route index path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
