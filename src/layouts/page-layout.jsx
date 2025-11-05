/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content, Theme } from '@carbon/react';
import { Children, Suspense } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';
import { useThemeContext } from '../context/ThemeContext';

export const PageLayout = ({ children, className, fallback }) => {
  const { theme } = useThemeContext();
  const childArray = Children.toArray(children);
  console.log(childArray);
  const otherChildren = childArray.filter(
    (child) => child.type !== PageLayoutHeader,
  );
  const Header = childArray.find((child) => child.type === PageLayoutHeader);

  console.log(Header);

  return (
    <Suspense fallback={fallback}>
      <div className={classNames('cs--page-layout', className)}>
        <Nav />
        <Theme theme={theme} as={Content}>
          <div className="cs--page-layout__content">
            {Header}
            <div className="cs--page-layout__content-body">{otherChildren}</div>
          </div>
        </Theme>
      </div>
    </Suspense>
  );
};

const PageLayoutHeader = ({ children }) => (
  <div className="cs--page-layout__content-header">{children}</div>
);
PageLayoutHeader.displayName = 'PageLayoutHeader';
PageLayout.Header = PageLayoutHeader;
