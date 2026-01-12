/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column, Grid, Heading } from '@carbon/react';

/**
 * Common header component displaying a title and paragraphs with a logo banner.
 * Uses Carbon's Grid system with a 16:9 aspect ratio layout.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Main heading text displayed in the header
 * @param {(string|React.ReactNode)[]} props.paragraphs - Array of paragraph content (strings or React nodes) to display below the title
 * @returns {JSX.Element} Rendered common header with title, paragraphs, and logo banner
 *
 * @example
 * <CommonHeader
 *   title="Welcome to Carbon"
 *   paragraphs={["First paragraph", "Second paragraph"]}
 * />
 */
export const CommonHeader = ({ title, paragraphs }) => {
  return (
    <Grid as="header" className="cs--common-header">
      <Column sm={4} md={8} lg={8}>
        <AspectRatio as="section" ratio="16x9">
          <Heading className="cs--common-header__title">{title}</Heading>
          {paragraphs.map((paragraph, i) => (
            <p key={`common-header-paragraph-${i}`}>{paragraph}</p>
          ))}
        </AspectRatio>
      </Column>
      <Column sm={4} md={8} lg={8}>
        <AspectRatio ratio="16x9" className="cs--common-header__image-banner">
          <img
            src="/icon.dark.svg?version=0.1.0"
            className="cs--common-header__logo"
            alt="fed-at-ibm logo"
          />
        </AspectRatio>
      </Column>
    </Grid>
  );
};
