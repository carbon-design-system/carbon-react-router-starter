/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column } from '@carbon/react';
import { WelcomeCallout } from './WelcomeCallout';
import { WelcomeCommandSnippet } from './WelcomeCommandSnippet';

/**
 * Welcome section displaying instructions to run the template.
 * Shows required Node version and installation/run commands.
 *
 * @returns {JSX.Element} Rendered run instructions section with command snippets
 */
export const WelcomeRunSection = () => {
  return (
    <WelcomeCallout heading="Run the template">
      <Column sm={4} md={8} lg={8} xlg={8}>
        <p>This code requires node v.24</p>
        <WelcomeCommandSnippet command="npm i" />
        <WelcomeCommandSnippet command="npm run dev" />
      </Column>
    </WelcomeCallout>
  );
};
