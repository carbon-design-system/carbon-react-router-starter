/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content, Theme } from '@carbon/react';
import { Suspense } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';
import { useThemeContext } from '../context/ThemeContext';

export const PageLayout = ({ children, className, fallback }) => {
  const { theme } = useThemeContext();

  return (
    <Suspense fallback={fallback}>
      <div className={classNames('cs--page-layout', className)}>
        <Nav />
        <Theme theme={theme} as={Content}>
          <div className="cs--page-layout-content">{children}</div>
        </Theme>
      </div>
    </Suspense>
  );
};
