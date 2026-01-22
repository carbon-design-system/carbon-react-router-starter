/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react';

import { ArrowRight } from '@carbon/icons-react';
import { CommonHeader } from '../../components/commonHeader/CommonHeader';
export const WelcomeHeader = () => {
  return (
    <CommonHeader
      title={'Welcome to the Carbon React Router starter'}
      paragraphs={[
        <>
          This is a boilerplate and a living guide for creating React
          applications with the Carbon Design System. Change it as you see
          needed.
        </>,
        <>Maintained by fed-at-ibm, a chapter of the OIC.</>,
        <>
          <Button
            renderIcon={ArrowRight}
            href="https://github.com/carbon-design-system/carbon-react-router-starter"
          >
            Use this template
          </Button>
        </>,
      ]}
    />
  );
};
