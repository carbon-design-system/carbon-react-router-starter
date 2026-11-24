/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Tile } from '@carbon/react';
import type { ReactElement, ReactNode } from 'react';

export interface WelcomeHighlightTileProps {
  title: string;
  children?: ReactNode;
}

export const WelcomeHighlightTile = ({ title, children }: WelcomeHighlightTileProps): ReactElement => {
  return (
    <Column sm={4} md={4} lg={8} xlg={4}>
      <Tile className="cs--welcome__highlight-tile">
        <strong>{title}</strong>
        <br />
        <br />
        {children}
      </Tile>
    </Column>
  );
};
