/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tile } from '@carbon/react';
import { useSyncExternalStore, useMemo, FC } from 'react';

// Simulated external data source - generates data once per tile instance
// In a real app, this would be an API call or WebSocket subscription
const createDataSource = () => {
  let value: number | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(callback: () => void) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot(): number | null {
      if (value === null && typeof window !== 'undefined') {
        value = Math.round(Math.random() * 1000);
      }
      return value;
    },
    getServerSnapshot(): null {
      return null;
    },
  };
};

const NumberTile: FC = () => {
  // Create a stable data source instance per component
  const dataSource = useMemo(() => createDataSource(), []);

  // Use useSyncExternalStore to read from the external data source
  const activeUsers = useSyncExternalStore(
    dataSource.subscribe,
    dataSource.getSnapshot,
    dataSource.getServerSnapshot,
  );

  return (
    <Column sm={4} md={4} lg={4} xlg={4}>
      <Tile className="cs--dashboard__tile cs--dashboard__tile--number">
        <dl>
          <dt>Active users</dt>
          <dd>{activeUsers ?? '---'}</dd>
        </dl>
      </Tile>
    </Column>
  );
};

const DashboardNumberTiles: FC = () => {
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

// Made with Bob
