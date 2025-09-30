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
import { useThemes } from '../hooks/useThemes';

export const PageLayout = ({ children, className, fallback }) => {
  const { primaryTheme, themeReady } = useThemes();

  return (
    themeReady && (
      <Suspense fallback={fallback}>
        <div className={classNames('cs--page-layout', className)}>
          <Nav />
          <Theme theme={primaryTheme} as={Content}>
            <Content className="cs--page-layout-content">{children}</Content>
          </Theme>
        </div>
      </Suspense>
    )
  );
};
