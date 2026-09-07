/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Page-specific styles are imported here, not in index.scss, so Vite emits
// them as a separate CSS chunk loaded only when this route is visited.
import './dashboard.scss';

import { useTranslation } from 'react-i18next';

import { Footer } from '../../components/footer/Footer';
import { PageLayout } from '../../layouts/page-layout';
import { PageHeader } from '@carbon/ibm-products';
import DashboardURLParameters from './DashboardURLParameters';
import DashboardNumberTiles from './DashboardNumberTiles';
import DashboardVisualizations from './DashboardVisualizations';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      className="cs--dashboard"
      fallback={<p>{t('dashboard.loading', 'Loading dashboard page...')}</p>}
    >
      <PageHeader
        title={t('dashboard.title', 'Dashboard')}
        className="cs--dashboard__header"
      />

      <DashboardURLParameters />

      <DashboardNumberTiles />

      <DashboardVisualizations />

      <Footer />
    </PageLayout>
  );
};

export default Dashboard;
