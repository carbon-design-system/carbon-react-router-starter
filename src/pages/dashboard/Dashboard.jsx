/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tile } from '@carbon/react';

import { Footer } from '../../components/footer/Footer';
import { PageLayout } from '../../layouts/page-layout';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.

const NumberTile = () => {
  return (
    <Column sm={4} md={4} lg={4} xlg={4}>
      <Tile className="cs--dashboard__tile cs--dashboard__tile--number">
        <dl>
          <dt>Active users</dt>
          <dd>{Math.round(Math.random() * 1000)}</dd>
        </dl>
      </Tile>
    </Column>
  );
};

const Dashboard = () => {
  return (
    <PageLayout
      className="cs--dashboard"
      fallback={<p>Loading dashboard page...</p>}
    >
      <Grid>
        <NumberTile />
        <NumberTile />
        <NumberTile />
        <NumberTile />

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
        <Footer />
      </Grid>
    </PageLayout>
  );
};

export default Dashboard;
