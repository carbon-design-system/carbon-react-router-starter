/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tile } from '@carbon/react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface NumberTileProps {
  label?: string;
  initialCount?: number;
}

const NumberTile = ({ label, initialCount }: NumberTileProps): ReactElement => {
  const { t } = useTranslation();
  const [activeUsers] = useState<number>(() =>
    initialCount !== undefined ? initialCount : Math.round(Math.random() * 1000),
  );

  return (
    <Column sm={4} md={4} lg={4} xlg={4}>
      <Tile className="cs--dashboard__tile cs--dashboard__tile--number">
        <dl>
          <dt>{label ?? t('dashboard.numberTiles.activeUsers', 'Active users')}</dt>
          <dd>{activeUsers}</dd>
        </dl>
      </Tile>
    </Column>
  );
};

const DashboardNumberTiles = (): ReactElement => {
  return (
    <Grid>
      <NumberTile />
      <NumberTile />
      <NumberTile />
      <NumberTile />
    </Grid>
  );
};

export default DashboardNumberTiles;
