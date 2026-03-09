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
 * <PageLayout>
 *   <h1>Page Content</h1>
 * </PageLayout>
 *
 */

export const PageLayout = ({ children, className, fallback }) => {
  return (
    <Suspense fallback={fallback}>
      <div className={classNames('cs--page-layout', className)}>
        <Nav />
        <Content className="cs--content">
          <div className="cs--page-layout__content">{children}</div>
        </Content>
      </div>
    </Suspense>
  );
};
