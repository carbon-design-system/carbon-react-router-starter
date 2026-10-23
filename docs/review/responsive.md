<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Responsive design review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 96.7 / 100 (Strong, confidence Medium), provisional
**Trend:** first run

Score 96.7 / 100 (Strong, confidence Medium, provisional). 6 findings: 6 Low. Trend: first run.

## Biggest point-losers

| Check | Severity | Points lost | Effort |
|---|---|---|---|
| RESP-05: Grid container lacks withRowGap or vertical row-gap configuration | Low | 2.3 | S |
| RESP-03: Carbon Column missing responsive props: sm, md, lg | Low | 1 | S |


## Responsive findings

| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| RESP-1 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/components/commonHeader/CommonHeader.jsx:14 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-2 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/components/footer/Footer.jsx:15 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-3 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardNumberTiles.jsx:30 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-4 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardURLParameters.jsx:24 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-5 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardVisualizations.jsx:22 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-6 | Low | Carbon Column missing responsive props: sm, md, lg | src/pages/welcome/WelcomeFetchingSection.jsx:61 (Measured) |  | S | Specify explicit sm, md, and lg span props on every Carbon Column. |


## Method

Evidence for this dimension came from 2 step(s): responsive-static (/Users/leechase/Source/bob/skills/review-responsive-ux/scripts/responsive-static-scan.js, ok, 0.1 s); dom-structure (/Users/leechase/Source/bob/skills/review-responsive-ux/scripts/dom-structure-scan.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not assessed


| Check | Evidence needed |
|---|---|
| RESP-06 | Live browser viewport sweep across 320, 480, 768, 1056, 1312, 1584 px using Chrome DevTools MCP |
| RESP-07 | Live browser reflow test at 400% zoom (1280x1024 / 320 CSS px) for WCAG 1.4.10 compliance |
| RESP-08 | Live browser text zoom test at 200% (WCAG 1.4.4) |



## How to raise this score


To reach 100:

1. Grid container lacks withRowGap or vertical row-gap configuration (+2.3 points, effort S)
1. Carbon Column missing responsive props: sm, md, lg (+1 points, effort S)


