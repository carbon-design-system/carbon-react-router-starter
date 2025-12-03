/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tile } from '@carbon/react';

const DashboardVisualizations = () => {
  return (
    <Grid>
      <Column sm={4} md={4} lg={8} xlg={8}>
        <Tile className="cs--dashboard__tile cs--dashboard__tile--data">
          <strong>Visualization</strong>
        </Tile>
      </Column>
      <Column sm={4} md={4} lg={8} xlg={8}>
        <Tile className="cs--dashboard__tile cs--dashboard__tile--data">
          <strong>Cool table</strong>
        </Tile>
      </Column>
    </Grid>
  );
};

export default DashboardVisualizations;

// Made with Bob
