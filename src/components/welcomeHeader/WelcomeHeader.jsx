/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Button, Column, Grid } from '@carbon/react';

import { ArrowRight } from '@carbon/icons-react';

export const WelcomeHeader = () => {
  return (
    <Grid className="cs--welcome-header">
      <Column sm={4} md={8} lg={8}>
        <AspectRatio as="section" ratio="16x9">
          <h1 className="cs--welcome-header__title">
            Welcome to the Carbon React starter template
          </h1>
          <p>
            This is a boilerplate and a living guide for creating React
            applications with the Carbon Design System. Change it as you see
            needed.
          </p>
          <p>Maintained by fed-at-ibm, a chapter of the OIC.</p>
          <p>
            <Button renderIcon={ArrowRight}>Clone the template</Button>
          </p>
        </AspectRatio>
      </Column>
      <Column sm={4} md={8} lg={8}>
        <AspectRatio ratio="16x9" className="cs--welcome-header__image-banner">
          <img
            src="/icon.dark.svg?version=0.1.0"
            className="cs--welcome-header__logo"
            alt="fed-at-ibm logo"
          />
        </AspectRatio>
      </Column>
    </Grid>
  );
};
