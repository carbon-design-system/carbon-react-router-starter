/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom Stylelint plugin: no-carbon-full-entrypoint
 *
 * Prevents importing the full Carbon or IBM Products entrypoints outside of
 * src/index.scss. Importing them in a component SCSS file silently duplicates
 * the entire Carbon stylesheet (~1.8 MB unminified) into that chunk.
 *
 * Allowed everywhere:
 *   @use '@carbon/react/scss/spacing'    — token/mixin sub-path, emits no CSS
 *   @use '@carbon/react/scss/theme'      — mixin sub-path, emits no CSS
 *   @use '@carbon/react/scss/breakpoint' — mixin sub-path, emits no CSS
 *
 * Disallowed outside src/index.scss:
 *   @use '@carbon/react'               — emits all Carbon component CSS
 *   @use '@carbon/ibm-products'        — emits all IBM Products CSS
 *   @use '@carbon/ibm-products/css/...'— compiled monolith CSS import
 */

const RULE_NAME = 'plugin/no-carbon-full-entrypoint';

// Matches the root entrypoints that emit full CSS — not sub-path SCSS imports
const DISALLOWED_PATTERNS = [
  /^['"]@carbon\/react['"]/,
  /^['"]@carbon\/ibm-products(?!\/scss\/)['"]/,
];

/** @type {import('stylelint').Rule} */
const rule = (primaryOption) => {
  return (root, result) => {
    if (primaryOption === false) return;

    const filePath = root.source?.input?.file ?? '';

    // Allow unrestricted use in the global entry point
    if (filePath.endsWith('index.scss')) return;

    root.walkAtRules('use', (atRule) => {
      const params = atRule.params?.trim() ?? '';
      const isDisallowed = DISALLOWED_PATTERNS.some((pattern) =>
        pattern.test(params),
      );

      if (isDisallowed) {
        result.warn(
          `Do not import the full Carbon entrypoint '${params}' outside src/index.scss. ` +
            `This duplicates all Carbon component CSS into this file's output chunk. ` +
            `Use sub-path imports instead (e.g. '@carbon/react/scss/spacing') — ` +
            `they expose only SCSS variables and mixins with no CSS output.`,
          { node: atRule, ruleName: RULE_NAME, word: params },
        );
      }
    });
  };
};

rule.ruleName = RULE_NAME;
rule.meta = { url: '' };

module.exports = { ruleName: RULE_NAME, rule };
