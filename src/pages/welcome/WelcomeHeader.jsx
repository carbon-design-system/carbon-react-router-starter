/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react';

import { ArrowRight } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { CommonHeader } from '../../components/commonHeader/CommonHeader';

export const WelcomeHeader = () => {
  const { t } = useTranslation();

  return (
    <CommonHeader
      title={t(
        'welcomeHeader.title',
        'Welcome to the Carbon React starter template',
      )}
      paragraphs={[
        <>
          {t(
            'welcomeHeader.description1',
            'This is a boilerplate and a living guide for creating React applications with the Carbon Design System. Change it as you see needed.',
          )}
        </>,
        <>
          {t(
            'welcomeHeader.maintainer',
            'Maintained by fed-at-ibm, a chapter of the OIC.',
          )}
        </>,
        <>
          <Button
            renderIcon={ArrowRight}
            href="https://github.com/carbon-design-system/carbon-react-router-starter/generate"
          >
            {t('welcomeHeader.button.useTemplate', 'Use this template')}
          </Button>
        </>,
      ]}
    />
  );
};
