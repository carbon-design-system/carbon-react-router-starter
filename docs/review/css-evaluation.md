<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# CSS Evaluation — carbon-react-starter

**Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Rubric score (code-quality, CSS checks):** 31 / 100 (Weak)
**Evaluator score (informational):** 98 / 100

Score 31 / 100 (Weak, confidence High). 2 findings: 2 Medium. Trend: first run.

## Evaluator score vs rubric score

The carbon-css-evaluator score (98/100) and the rubric score are
**intentionally different**:

| Aspect | Evaluator | Rubric |
|---|---|---|
| Method | Simple average across all files; fixed weight scheme | Shared penalty model with diminishing returns |
| Physical props floor | `badPractices = 0` on good files with physical props ("70-ceiling") | Low/Medium findings; DR caps total deduction |
| Scope | One score for all issue types | Critical/High/Medium/Low/Info per issue type |
| Can reach 0? | Yes (floor on each category) | No (diminishing returns prevent single category from zeroing dimension) |



## Files analysed

7 files · Scanned directory: `.`

## Category scores (evaluator)

| Category | Score | Max |
|---|---|---|
| Token usage | 39 | 40 |
| Bad practices | 30 | 30 |
| Complexity | 29 | 30 |

## Findings

| Id | Check | Severity | Finding | Files | Effort | Fix |
|---|---|---|---|---|---|---|
| css-eval:src/components/commonHeader/commonHeader.scss:rgbColors | CODE-CSS-RGBCOLORS | Medium | Hardcoded RGB colors | src/components/commonHeader/commonHeader.scss | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |
| css-eval:src/layouts/page-layout.scss:hexColors | CODE-CSS-HEXCOLORS | Medium | Hardcoded hex colors | src/layouts/page-layout.scss | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |


## Not assessed


All CSS checks were assessed.


## How to improve

See rubric.md §CSS checks for the "how to earn these points" steps per check.
Priority order: fix Critical/High issues first (carbonInternalClassWrite, v10 imports),
then Medium (hardcoded values, !important density), then Low (logical properties, BEM construction).
