/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Heading, Section } from '@carbon/react';
import classNames from 'classnames';

/**
 * Callout section component for highlighting important content on the welcome page.
 * Displays a heading with an arrow prefix and child content in a responsive grid.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the callout section
 * @param {string} [props.className] - Optional CSS class name for custom styling
 * @param {string} props.heading - Heading text displayed with arrow prefix
 * @returns {JSX.Element} Rendered callout section with heading and content
 *
 * @example
 * <WelcomeCallout heading="Get Started" className="custom-callout">
 *   <p>Follow these steps...</p>
 * </WelcomeCallout>
 */
export const WelcomeCallout = ({ children, className, heading }) => {
  return (
    <Section as={Grid} className={classNames('cs--welcome__run', className)}>
      <Column sm={4} md={4} lg={8} xlg={4}>
        <Heading className="cs--welcome__heading">↳ {heading}</Heading>
      </Column>
      {children}
    </Section>
  );
};
