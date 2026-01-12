/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from '@carbon/react';
import { Children, Suspense } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';

/**
 * Main page layout component providing consistent structure across pages.
 * Includes navigation, content area, and support for a header section.
 * Wraps content in Suspense for lazy loading support.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content, can include PageLayout.Header
 * @param {string} [props.className] - Optional CSS class name for custom styling
 * @param {React.ReactNode} [props.fallback] - Fallback UI to show while content is loading
 * @returns {JSX.Element} Rendered page layout with navigation and content
 *
 * @example
 * <PageLayout className="custom-page" fallback={<p>Loading...</p>}>
 *   <PageLayout.Header>
 *     <h1>Page Title</h1>
 *   </PageLayout.Header>
 *   <p>Page content</p>
 * </PageLayout>
 */
export const PageLayout = ({ children, className, fallback }) => {
  const childArray = Children.toArray(children);
  const otherChildren = childArray.filter(
    (child) =>
      typeof child === 'object' &&
      'type' in child &&
      child.type !== PageLayoutHeader,
  );
  const Header = childArray.find(
    (child) =>
      typeof child === 'object' &&
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

/**
 * Header section component for PageLayout.
 * Used as PageLayout.Header to provide a dedicated header area.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @returns {JSX.Element} Rendered header section
 */
const PageLayoutHeader = ({ children }) => (
  <div className="cs--page-layout__content-header">{children}</div>
);
PageLayoutHeader.displayName = 'PageLayoutHeader';
PageLayout.Header = PageLayoutHeader;
