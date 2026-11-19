/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from '@carbon/react';
import { Suspense, type ReactNode } from 'react';
import { Nav } from '../components/nav/Nav';
import classNames from 'classnames';

/**
 * PageLayout component provides a consistent layout structure for pages in the application.
 * It includes the navigation component and wraps content in Carbon's Content component.
 *
 * @example
 * <PageLayout>
 *   <h1>Page Content</h1>
 * </PageLayout>
 *
 */
interface PageLayoutProps {
  children: ReactNode;
  /** Additional CSS class names to apply to the layout container */
  className?: string;
  /** Fallback content to display while Suspense is loading */
  fallback?: ReactNode;
}

export const PageLayout = ({ children, className, fallback }: PageLayoutProps) => {
  return (
    <Suspense fallback={fallback}>
      <div className={classNames('cs--page-layout', className)}>
        <Nav />
        <Content className="cs--content cs--page-layout__content">{children}</Content>
      </div>
    </Suspense>
  );
};
