/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageLayout } from '../../layouts/page-layout.jsx';
import { Grid, Column } from '@carbon/react';

const NewWelcome = () => {
  return (
    <PageLayout
      className="cs--new-welcome"
      fallback={<p>Loading new welcome page...</p>}
    >
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <h1>New Welcome Page</h1>
          <p>This is a placeholder for the new welcome page.</p>
        </Column>
      </Grid>
    </PageLayout>
  );
};

export default NewWelcome;

// Made with Bob
