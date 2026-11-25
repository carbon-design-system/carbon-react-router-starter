/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CodeSnippet } from '@carbon/react';
import type { ReactElement } from 'react';

export interface WelcomeCommandSnippetProps {
  command: string;
}

export const WelcomeCommandSnippet = ({ command }: WelcomeCommandSnippetProps): ReactElement => {
  return (
    <CodeSnippet type="single" feedback="Copied to clipboard">
      {command}
    </CodeSnippet>
  );
};
