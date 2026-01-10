/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Tile } from '@carbon/react';
import { FC, ReactNode } from 'react';

interface WelcomeHighlightTileProps {
  title: string;
  children: ReactNode;
}

export const WelcomeHighlightTile: FC<WelcomeHighlightTileProps> = ({
  title,
  children,
}) => {
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

// Made with Bob
