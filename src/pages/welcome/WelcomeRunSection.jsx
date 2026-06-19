/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { WelcomeCallout } from './WelcomeCallout';
import { WelcomeCommandSnippet } from './WelcomeCommandSnippet';

export const WelcomeRunSection = () => {
  const { t } = useTranslation();

  return (
    <WelcomeCallout
      className="cs--welcome__run"
      heading={t('welcome.run.heading', 'Run the template')}
    >
      <Column className="cs--welcome__run-content" sm={4} md={4} lg={8} xlg={8}>
        <p>
          {t('welcome.run.nodeRequirement', 'This code requires node v.24')}
        </p>
        <WelcomeCommandSnippet command="npm i" />
        <WelcomeCommandSnippet command="npm run dev" />
      </Column>
    </WelcomeCallout>
  );
};
