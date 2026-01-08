/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Footer } from '../../components/footer/Footer';
import { PageLayout } from '../../layouts/page-layout';
import { PageHeader } from '@carbon/ibm-products';
import DashboardURLParameters from './DashboardURLParameters';
import DashboardNumberTiles from './DashboardNumberTiles';
import DashboardVisualizations from './DashboardVisualizations';
import { FC } from 'react';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.

const Dashboard: FC = () => {
  return (
    <PageLayout
      className="cs--dashboard"
      fallback={<p>Loading dashboard page...</p>}
    >
      <PageLayout.Header>
        <PageHeader title="Dashboard" />
      </PageLayout.Header>

      <DashboardURLParameters />

      <DashboardNumberTiles />

      <DashboardVisualizations />

      <Footer />
    </PageLayout>
  );
};

export default Dashboard;

// Made with Bob
