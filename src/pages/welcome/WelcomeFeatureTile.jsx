/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Tile } from '@carbon/react';

/**
 * Feature tile component for displaying individual features on the welcome page.
 * Uses Carbon's Tile component in a responsive column layout.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Tooltip title for the tile
 * @param {string} props.feature - Feature name displayed in bold
 * @returns {JSX.Element} Rendered feature tile in a responsive column
 *
 * @example
 * <WelcomeFeatureTile title="Routing" feature="React Router" />
 */
export const WelcomeFeatureTile = ({ title, feature }) => {
  return (
    <Column className="cs--welcome__tile" sm={2} md={4} lg={4}>
      <Tile title={title}>
        <strong>{feature}</strong>
      </Tile>
    </Column>
  );
};
