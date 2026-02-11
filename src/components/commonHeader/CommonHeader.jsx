/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column, Grid, Heading } from '@carbon/react';

export const CommonHeader = ({ title, paragraphs, action }) => {
  return (
    <Grid as="header" className="cs--common-header">
      <Column sm={4} md={8} lg={16}>
        <div className="cs--common-header__content">
          <Heading className="cs--common-header__title">{title}</Heading>
          <div className="cs--common-header__other">
            {paragraphs.map((paragraph, i) => (
              <p key={`common-header-paragraph-${i}`}>{paragraph}</p>
            ))}
          </div>
          <div className="cs--common-header__image-banner">
            <img
              src="/icon.dark.svg?version=0.1.0"
              className="cs--common-header__logo"
              alt="fed-at-ibm logo"
            />
          </div>
          {action}
        </div>
      </Column>
    </Grid>
  );
};
