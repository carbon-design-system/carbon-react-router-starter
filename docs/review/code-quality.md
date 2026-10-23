<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Code Quality Review — carbon-react-starter

**Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 31 / 100 (Weak, confidence High)
**Trend:** first run

Score 31 / 100 (Weak, confidence High). 5 findings: 4 Medium, 1 Low. Trend: first run.

## Biggest point-losers

| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| CODE-ESLINT: ESLint configured, runs clean, jsx-a11y enabled, --max-warnings 0 | High | 10 | M | Install ESLint with jsx-a11y; add --max-warnings 0; run in pre-commit and CI. |
| CODE-STYLELINT: Stylelint with carbon-tokens, a11y, logical plugins configured and clean | High | 10 | M | Add stylelint-plugin-carbon-tokens, @double-great/stylelint-a11y, stylelint-use-logical; run in pre-commit and CI. |
| CODE-CSS-STYLELINT-POLICY: Stylelint policy effective for CSS (carbon-tokens plugin catches violations) | High | 10 | M | Install stylelint-plugin-carbon-tokens and enable reportDescriptionlessDisables. |
| CODE-TYPECHECK: TypeScript type check (tsc --noEmit) runs clean | High | 10 | M | Add a typecheck script (tsc --noEmit); run in CI. |
| CODE-NODE-PIN: Node version pinned and consistent across .nvmrc, engines, Dockerfile | High | 10 | M | Add .nvmrc; set engines.node; pin Dockerfile FROM to the same major. |


## Findings

| Id | Severity | Finding | Evidence | Effort | Fix |
|---|---|---|---|---|---|
| SCAN-CONSOLE | Medium | 18 console.log/error/warn calls in source | code-static-scan.js (Measured) | S | Remove debug console calls from source files. |
| SCAN-REACT-DEP | Medium | 3 file(s) with deprecated React APIs (findDOMNode, componentWill*, legacy context, string refs) | code-static-scan.js (Measured) | M | Migrate to current React patterns. Use useEffect/useRef instead of findDOMNode; use createContext instead of legacy context. |
| css-eval:src/components/commonHeader/commonHeader.scss:rgbColors | Medium | Hardcoded RGB colors | carbon-css-evaluator; src/components/commonHeader/commonHeader.scss (Measured) | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |
| css-eval:src/layouts/page-layout.scss:hexColors | Medium | Hardcoded hex colors | carbon-css-evaluator; src/layouts/page-layout.scss (Measured) | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |
| SCAN-PROPTYPES | Low | 1 PropTypes mutation(s) (ComponentName.propTypes = ...) | code-static-scan.js (Measured) | S | Remove propTypes mutations on external components. Use TypeScript types for prop validation. |


## Hygiene practices

| Practice | Level | Severity | Points lost | Note |
|---|---|---|---|---|
| ESLint configured, runs clean, jsx-a11y enabled, --max-warnings 0 | 1 | High | 10 | Install ESLint with jsx-a11y; add --max-warnings 0; run in pre-commit and CI. |
| Stylelint with carbon-tokens, a11y, logical plugins configured and clean | 1 | High | 10 | Add stylelint-plugin-carbon-tokens, @double-great/stylelint-a11y, stylelint-use-logical; run in pre-commit and CI. |
| Stylelint policy effective for CSS (carbon-tokens plugin catches violations) | 1 | High | 10 | Install stylelint-plugin-carbon-tokens and enable reportDescriptionlessDisables. |
| Prettier formatter configured and enforced | 1 | Low | 1 | Configure Prettier; run prettier --check in CI; add to lint-staged. |
| Spell check configured and runs in CI | 0 | Low | 1 | Install cspell; add a spell script; run in CI. |
| TypeScript type check (tsc --noEmit) runs clean | 0 | High | 10 | Add a typecheck script (tsc --noEmit); run in CI. |
| Pre-commit hook installed by prepare script; runs lint-staged | 4 | High |  | Install husky; add prepare: "husky"; create .husky/pre-commit with npx lint-staged. |
| CI pipeline covers build + lint + test + audit; no continue-on-error; last run green | 4 | High |  | Add GitHub Actions workflow with build, lint, test and npm audit steps. |
| Node version pinned and consistent across .nvmrc, engines, Dockerfile | 1 | High | 10 | Add .nvmrc; set engines.node; pin Dockerfile FROM to the same major. |


## CSS evaluation

**Evaluator score:** 98 / 100 (informational)
**Rubric score for CSS:** derived from findings above using the shared penalty model.
**Files analysed:** 7
**Files at 70-point ceiling:** 0

> **Note on evaluator score vs rubric score:** The carbon-css-evaluator produces a simple average
> across all files, with a fixed weight scheme (tokenUsage 40, badPractices 30, complexity 30).
> Physical direction properties alone can floor badPractices to 0 on otherwise compliant files
> ("70-ceiling"). The rubric score uses the shared penalty model with diminishing returns — many
> instances of the same low-severity issue cannot dominate the score the way a single Critical can.

## Method

Evidence for this dimension came from 4 step(s): code-static (/Users/leechase/Source/bob/skills/review-code-quality/scripts/code-static-scan.js, ok, 0.1 s); css-eval (/Users/leechase/Source/bob/skills/review-code-quality/scripts/css-eval-wrapper.js, ok, 0.1 s); tooling (/Users/leechase/Source/bob/skills/review-code-quality/scripts/tooling-discovery.js, ok, 0.0 s); carbon-split (/Users/leechase/Source/bob/skills/review-security-deps/scripts/carbon-version-split.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not assessed


Nothing was skipped.


## How to raise this score


To reach 43:

1. 18 console.log/error/warn calls in source (+4 points, effort S)
1. Hardcoded RGB colors (+4 points, effort S)
1. Hardcoded hex colors (+4 points, effort S)


