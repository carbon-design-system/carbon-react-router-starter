/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Outlet } from 'react-router';

export const ThemeLayout = () => {
  // Theme is now handled by CSS reading HTML attributes
  // No React components needed
  return <Outlet />;
};

// Made with Bob
