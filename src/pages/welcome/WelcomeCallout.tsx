/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';
import { Column, Grid, Heading, Section } from '@carbon/react';
import classNames from 'classnames';

interface WelcomeCalloutProps {
  children?: ReactNode;
  className?: string;
  heading: string;
}

export const WelcomeCallout = ({ children, className, heading }: WelcomeCalloutProps) => {
  return (
    <Section as={Grid} className={classNames('cs--welcome__callout', className)}>
      <Column sm={4} md={4} lg={8} xlg={4}>
        <Heading className="cs--welcome__heading">↳ {heading}</Heading>
      </Column>
      {children}
    </Section>
  );
};
