/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalTheme, Theme } from '@carbon/react';

import { useThemes } from '../hooks/useThemes';
import { Outlet } from 'react-router';

export const ThemeLayout = () => {
  const { primaryTheme, themeReady } = useThemes();

  return themeReady ? (
    <GlobalTheme theme={primaryTheme}>
      <Theme theme={primaryTheme}>
        <Outlet />
      </Theme>
    </GlobalTheme>
  ) : (
    <Outlet />
  );
};
