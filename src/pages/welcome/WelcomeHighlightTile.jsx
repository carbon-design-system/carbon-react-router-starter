/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Tile } from '@carbon/react';

/**
 * Highlight tile component for displaying featured content on the welcome page.
 * Uses Carbon's Tile component with custom styling for emphasis.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Bold title text displayed at the top of the tile
 * @param {React.ReactNode} props.children - Content to display below the title
 * @returns {JSX.Element} Rendered highlight tile in a responsive column
 *
 * @example
 * <WelcomeHighlightTile title="Featured">
 *   <p>Important content here</p>
 * </WelcomeHighlightTile>
 */
export const WelcomeHighlightTile = ({ title, children }) => {
  return (
    <Column sm={4} md={4} lg={8} xlg={4}>
      <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
        <strong>{title}</strong>
        <br />
        <br />
        {children}
      </Tile>
    </Column>
  );
};
