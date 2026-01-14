/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Link, Tile, Stack, Grid } from '@carbon/react';
import { useParams, useSearchParams } from 'react-router';

const DashboardURLParameters = () => {
  // Access path parameters (e.g., /dashboard/1234 -> id = "1234")
  const params = useParams();
  const { id } = params;

  // Access query parameters (e.g., /dashboard/1234?q=xxx&name=John -> q = "xxx", name = "John")
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const nameParam = searchParams.get('name');

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <Tile className="cs--dashboard__tile">
          <Stack gap={5}>
            <strong>URL parameters example</strong>
            {nameParam && <h2 style={{ margin: 0 }}>Hello {nameParam}! 👋</h2>}
            <p>
              This demonstrates how to access both path parameters and query
              parameters from the URL. <br />
              Try accessing:{' '}
              <Link href="/dashboard/1234?q=xyz&name=Anne">
                /dashboard/1234?q=xyz&name=Anne
              </Link>
            </p>
            <dl>
              {id && (
                <>
                  <dt>Path parameter detected (id):</dt>
                  <dd>{id}</dd>
                </>
              )}
              {queryParam && (
                <>
                  <dt>Query parameter detected (q):</dt>
                  <dd>{queryParam}</dd>
                </>
              )}
              {nameParam && (
                <>
                  <dt>Query parameter detected (name):</dt>
                  <dd>{nameParam}</dd>
                </>
              )}
            </dl>
          </Stack>
        </Tile>
      </Column>
    </Grid>
  );
};

export default DashboardURLParameters;

// Made with Bob
