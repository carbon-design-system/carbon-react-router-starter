/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Link, Tile, Stack, Tag } from '@carbon/react';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { Footer } from '../../components/footer/Footer';
import { PageLayout } from '../../layouts/page-layout';
import { PageHeader } from '@carbon/ibm-products';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.

const NumberTile = () => {
  const [activeUsers] = useState(() => Math.round(Math.random() * 1000));

  return (
    <Column sm={4} md={4} lg={4} xlg={4}>
      <Tile className="cs--dashboard__tile cs--dashboard__tile--number">
        <dl>
          <dt>Active users</dt>
          <dd>{activeUsers}</dd>
        </dl>
      </Tile>
    </Column>
  );
};

const Dashboard = () => {
  // Access path parameters (e.g., /dashboard/1234 -> id = "1234")
  const params = useParams();
  const { id } = params;

  // Access query parameters (e.g., /dashboard/1234?q=xxx&name=John -> q = "xxx", name = "John")
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const nameParam = searchParams.get('name');

  return (
    <PageLayout
      className="cs--dashboard"
      fallback={<p>Loading dashboard page...</p>}
    >
      <PageLayout.Header>
        <PageHeader title="Dashboard" />
      </PageLayout.Header>
      <Grid>
        {/* Example: Display URL parameters when present */}
        <Column sm={4} md={8} lg={16}>
          <Tile className="cs--dashboard__tile">
            <Stack gap={5}>
              <strong>URL Parameters Example</strong>
              {nameParam && (
                <h2 style={{ margin: 0 }}>Hello {nameParam}! 👋</h2>
              )}
              <p>
                This demonstrates how to access both path parameters and query
                parameters from the URL. <br />
                Try accessing:{' '}
                <Link href="/dashboard/1234?q=xyz&name=Anne">
                  /dashboard/1234?q=xyz&name=Anne
                </Link>
              </p>
              <Stack gap={3}>
                {id && (
                  <div>
                    <strong>Path Parameter (id):</strong>{' '}
                    <Tag type="blue">{id}</Tag>
                  </div>
                )}
                {queryParam && (
                  <div>
                    <strong>Query Parameter (q):</strong>{' '}
                    <Tag type="green">{queryParam}</Tag>
                  </div>
                )}
                {nameParam && (
                  <div>
                    <strong>Query Parameter (name):</strong>{' '}
                    <Tag type="purple">{nameParam}</Tag>
                  </div>
                )}
              </Stack>
            </Stack>
          </Tile>
        </Column>

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
