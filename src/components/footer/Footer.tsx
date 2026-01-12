/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column, Grid } from '@carbon/react';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Grid as="footer" className="cs--footer">
      <Column sm={4} md={8} lg={8}>
        <AspectRatio ratio="16x9">
          <p>Footer</p>
          <p>Copyright IBM 2025</p>
        </AspectRatio>
      </Column>
    </Grid>
  );
};
