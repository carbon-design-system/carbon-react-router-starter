/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from '@carbon/react';
import { Children, Suspense, ReactNode, FC, ReactElement } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

interface PageLayoutHeaderProps {
  children: ReactNode;
}

const PageLayoutHeader: FC<PageLayoutHeaderProps> = ({ children }) => (
  <div className="cs--page-layout__content-header">{children}</div>
);
PageLayoutHeader.displayName = 'PageLayoutHeader';

export const PageLayout: FC<PageLayoutProps> & {
  Header: typeof PageLayoutHeader;
} = ({ children, className, fallback }) => {
  const childArray = Children.toArray(children);
  const otherChildren = childArray.filter(
    (child): child is ReactElement =>
      typeof child === 'object' &&
      child !== null &&
      'type' in child &&
      child.type !== PageLayoutHeader,
  );
  const Header = childArray.find(
    (child): child is ReactElement =>
      typeof child === 'object' &&
      child !== null &&
      'type' in child &&
      child.type === PageLayoutHeader,
  );

  return (
    <Suspense fallback={fallback}>
      <div className={classNames('cs--page-layout', className)}>
        <Nav />
        <Content className="cs--content">
          <div className="cs--page-layout__content">
            {Header}
            <div className="cs--page-layout__content-body">{otherChildren}</div>
          </div>
        </Content>
      </div>
    </Suspense>
  );
};

PageLayout.Header = PageLayoutHeader;
