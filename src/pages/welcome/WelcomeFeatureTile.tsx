/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Tile } from '@carbon/react';
import type { ReactElement } from 'react';

export interface WelcomeFeatureTileProps {
  title: string;
  feature: string;
}

export const WelcomeFeatureTile = ({ title, feature }: WelcomeFeatureTileProps): ReactElement => {
  return (
    <Column className="cs--welcome__feature-tile" sm={2} md={4} lg={4}>
      <Tile title={title}>
        <strong>{feature}</strong>
      </Tile>
    </Column>
  );
};
