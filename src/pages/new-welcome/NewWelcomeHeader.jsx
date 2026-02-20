/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, Button, ClickableTile } from '@carbon/react';
import {
  ChevronDown,
  Connect,
  Hashtag,
  Bee,
  JobRun,
} from '@carbon/icons-react';

export const NewWelcomeHeader = () => {
  return (
    <div className="new-welcome-header">
      <Grid narrow className="narrow-grid-adjustment">
        <Column sm={4} md={8} lg={16}>
          <h1 className="new-welcome-header__title">Welcome, [user]</h1>
        </Column>
      </Grid>

      <Grid
        narrow
        className="narrow-grid-adjustment new-welcome-header__content"
      >
        <Column sm={4} md={8} lg={4}>
          <div className="new-welcome-header__intro">
            <p className="new-welcome-header__value-prop">
              This is a value prop that should not exceed two lines.
            </p>
            <Button renderIcon={ChevronDown} kind="primary">
              Customize your journey
            </Button>
          </div>
        </Column>

        <Column sm={4} md={8} lg={12}>
          <Grid narrow className="new-welcome-header__tiles">
            <Column sm={4} md={4} lg={3}>
              <ClickableTile className="new-welcome-header__tile">
                <div className="new-welcome-header__tile-icon">
                  <Connect size={24} />
                </div>
                <h3 className="new-welcome-header__tile-title">
                  Discover your data
                </h3>
                <p className="new-welcome-header__tile-description">
                  Explore relationships between data objects and set access
                  definitions.
                </p>
              </ClickableTile>
            </Column>

            <Column sm={4} md={4} lg={3}>
              <ClickableTile className="new-welcome-header__tile">
                <div className="new-welcome-header__tile-icon">
                  <Hashtag size={24} />
                </div>
                <h3 className="new-welcome-header__tile-title">Data masking</h3>
                <p className="new-welcome-header__tile-description">
                  Set privacy conditions based on existing data objects and
                  access definitions
                </p>
              </ClickableTile>
            </Column>

            <Column sm={4} md={4} lg={3}>
              <ClickableTile className="new-welcome-header__tile">
                <div className="new-welcome-header__tile-icon">
                  <JobRun size={24} />
                </div>
                <h3 className="new-welcome-header__tile-title">Jobs</h3>
                <p className="new-welcome-header__tile-description">
                  View all jobs in the jobs list page.
                </p>
              </ClickableTile>
            </Column>

            <Column sm={4} md={4} lg={3}>
              <ClickableTile className="new-welcome-header__tile">
                <div className="new-welcome-header__tile-icon">
                  <Bee size={24} />
                </div>
                <h3 className="new-welcome-header__tile-title">
                  watsonx.optim out now
                </h3>
                <p className="new-welcome-header__tile-description">
                  Get all the latest updates here!
                </p>
              </ClickableTile>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </div>
  );
};
