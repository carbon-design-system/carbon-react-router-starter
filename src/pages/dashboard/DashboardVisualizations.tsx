/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tile } from '@carbon/react';
interface DataVisualizationProps {
  title: string;
}

const DataVisualization = ({ title }: DataVisualizationProps) => {
  return (
    <Column sm={4} md={4} lg={8} xlg={8}>
      <Tile className="cs--dashboard__tile cs--dashboard__tile--data">
        <strong>{title}</strong>
      </Tile>
    </Column>
  );
};

const DashboardVisualizations = () => {
  return (
    <Grid>
      <DataVisualization title="Visualization" />
      <DataVisualization title="Cool table" />
    </Grid>
  );
};

export default DashboardVisualizations;
