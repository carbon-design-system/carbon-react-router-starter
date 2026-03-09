/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from '@carbon/react';
import { Children, Suspense } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';

/**
 * PageLayout component provides a consistent layout structure for pages in the application.
 * It includes the navigation component and wraps content in Carbon's Content component.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within the layout
 * @param {string} [props.className] - Additional CSS class names to apply to the layout container
 * @param {React.ReactNode} [props.fallback] - Fallback content to display while Suspense is loading
 *
 * @example
 * // Basic usage
 * <PageLayout>
 *   <h1>Page Content</h1>
 * </PageLayout>
 *
 * @example
 * // With PageLayout.Header for flush header positioning
 * // The Header component allows the page header to sit flush against the global header,
 * // which is useful for headers with non-transparent backgrounds (like PageHeader from @carbon/ibm-products)
 * <PageLayout className="my-page" fallback={<p>Loading...</p>}>
 *   <PageLayout.Header>
 *     <PageHeader title="Dashboard" />
 *   </PageLayout.Header>
 *   <div>Main content here</div>
 * </PageLayout>
 */

export const PageLayout = ({ children, className, fallback }) => {
  const childArray = Children.toArray(children);
  const otherChildren = childArray.filter(
    (child) => child.type !== PageLayoutHeader,
  );
  const Header = childArray.find((child) => child.type === PageLayoutHeader);

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
 * PageLayout.Header component for page headers that need to sit flush against the global header.
 *
 * This component is useful when using headers with non-transparent backgrounds (such as
 * PageHeader from @carbon/ibm-products) as it removes the default spacing and allows the
 * header to align directly with the global navigation header.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content (typically a PageHeader component)
 *
 * @example
 * <PageLayout>
 *   <PageLayout.Header>
 *     <PageHeader title="Dashboard" />
 *   </PageLayout.Header>
 *   <div>Page content</div>
 * </PageLayout>
 */
const PageLayoutHeader = ({ children }) => (
  <div className="cs--page-layout__content-header">{children}</div>
);

PageLayoutHeader.displayName = 'PageLayoutHeader';
PageLayout.Header = PageLayoutHeader;
