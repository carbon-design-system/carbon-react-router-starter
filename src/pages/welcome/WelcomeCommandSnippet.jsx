/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CodeSnippet } from '@carbon/react';

/**
 * Code snippet component for displaying copyable command-line commands.
 * Uses Carbon's CodeSnippet with single-line type and copy functionality.
 *
 * @param {Object} props - Component props
 * @param {string} props.command - Command text to display and allow copying
 * @returns {JSX.Element} Rendered code snippet with copy button
 *
 * @example
 * <WelcomeCommandSnippet command="npm install" />
 */
export const WelcomeCommandSnippet = ({ command }) => {
  return (
    <CodeSnippet type="single" feedback="Copied to clipboard">
      {command}
    </CodeSnippet>
  );
};
