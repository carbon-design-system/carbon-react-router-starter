/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, ClickableTile, Link } from '@carbon/react';
import { Connect, Hashtag, ArrowRight, Information } from '@carbon/icons-react';

export const RecentlyRunJobs = () => {
  const jobs = [
    {
      icon: Connect,
      label: 'Masking worksheet',
      title: 'Masking title',
      caption: 'Saved by: YYYY/MM/DD HH:mm',
    },
    {
      icon: Hashtag,
      label: 'Masking worksheet',
      title: 'Masking title',
      caption: 'Saved by: YYYY/MM/DD HH:mm',
    },
    {
      icon: Connect,
      label: 'Masking worksheet',
      title: 'Masking title',
      caption: 'Saved by: YYYY/MM/DD HH:mm',
    },
    {
      icon: Hashtag,
      label: 'Masking worksheet',
      title: 'Masking title',
      caption: 'Saved by: YYYY/MM/DD HH:mm',
    },
  ];

  return (
    <div className="recently-run-jobs">
      <Grid narrow className="narrow-grid-adjustment">
        <Column sm={4} md={8} lg={16}>
          <div className="recently-run-jobs__header">
            <div className="recently-run-jobs__title-wrapper">
              <h2 className="recently-run-jobs__title">Recently run jobs</h2>
              <button
                type="button"
                className="recently-run-jobs__tooltip-button"
                aria-label="More information"
              >
                <Information size={16} />
              </button>
            </div>
            <Link href="#">View all</Link>
          </div>
        </Column>
      </Grid>

      <Grid narrow className="narrow-grid-adjustment recently-run-jobs__tiles">
        {jobs.map((job, index) => {
          const Icon = job.icon;
          return (
            <Column key={index} sm={4} md={4} lg={4}>
              <ClickableTile className="recently-run-jobs__tile">
                <div className="recently-run-jobs__tile-main">
                  <div className="recently-run-jobs__tile-icon">
                    <Icon size={48} />
                  </div>
                  <div className="recently-run-jobs__tile-text">
                    <span className="recently-run-jobs__tile-label">
                      {job.label}
                    </span>
                    <h3 className="recently-run-jobs__tile-title">
                      {job.title}
                    </h3>
                    <span className="recently-run-jobs__tile-caption">
                      {job.caption}
                    </span>
                  </div>
                </div>
                <div className="recently-run-jobs__tile-arrow">
                  <ArrowRight size={20} />
                </div>
              </ClickableTile>
            </Column>
          );
        })}
      </Grid>
    </div>
  );
};
