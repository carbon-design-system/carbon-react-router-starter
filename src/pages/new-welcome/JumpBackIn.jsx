/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, Link } from '@carbon/react';
import { RecentlyViewed } from '@carbon/icons-react';

export const JumpBackIn = () => {
  const paths = [
    {
      label: 'Subsetting worksheet /',
      link: 'CSTMR_Group13',
      href: '#',
    },
    {
      label: 'Masking worksheet /',
      link: 'CSTMR_Data1',
      href: '#',
    },
    {
      label: 'Data discovery /',
      link: 'CSTMR_Group26',
      href: '#',
    },
    {
      label: 'Masking worksheet /',
      link: 'CSTMR_DataGroup2',
      href: '#',
    },
  ];

  return (
    <div className="jump-back-in">
      <Grid narrow className="narrow-grid-adjustment">
        <Column sm={4} md={8} lg={4}>
          <div className="jump-back-in__header">
            <h2 className="jump-back-in__title">Jump back in</h2>
            <div className="jump-back-in__label">
              <RecentlyViewed size={16} />
              <span>Recently visited worksheets</span>
            </div>
          </div>
        </Column>

        <Column sm={4} md={8} lg={12}>
          <Grid narrow className="jump-back-in__paths">
            {paths.map((path, index) => (
              <Column key={index} sm={4} md={4} lg={3}>
                <div className="jump-back-in__path-item">
                  <span className="jump-back-in__path-label">{path.label}</span>
                  <Link href={path.href}>{path.link}</Link>
                </div>
              </Column>
            ))}
          </Grid>
        </Column>
      </Grid>
    </div>
  );
};
