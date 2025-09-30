/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalTheme, Theme } from '@carbon/react';
import { Outlet } from 'react-router';
import { useThemeContext } from '../context/ThemeContext';

export const ThemeLayout = () => {
  const { themeMenu, ready } = useThemeContext();

  return (
    ready && (
      <GlobalTheme theme={themeMenu}>
        <Theme theme={themeMenu}>
          <Outlet />
        </Theme>
      </GlobalTheme>
    )
  );
};
