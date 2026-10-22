<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# UX review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 93.7 / 100 (Strong, confidence Medium), provisional
**Trend:** first run

Score 93.7 / 100 (Strong, confidence Medium, provisional). 6 findings: 1 Medium, 5 Low. Trend: first run.

## Biggest point-losers

| Check | Severity | Points lost | Effort |
|---|---|---|---|
| UX-10: Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | Medium | 4 | M |
| UX-01: Hard-coded user-visible string in JSX: "Page Content" | Low | 2.3 | S |


## UX findings

| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| UX-DOM-1 | Medium | Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | src/components/profilePanel/ProfilePanel.jsx:50; src/components/profilePanel/ProfilePanel.jsx:54 (Measured) |  | M | Consolidate nested single-child div wrappers into unified layout containers. |
| UX-1 | Low | Hard-coded user-visible string in JSX: "Page Content" | src/layouts/page-layout.jsx:25 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-2 | Low | Hard-coded user-visible string in JSX: "Loading welcome page..." | src/pages/welcome/Welcome.jsx:22 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-3 | Low | Hard-coded user-visible string in JSX: "Blog data retrieval example" | src/pages/welcome/post/PostComponent.jsx:52 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-4 | Low | Hard-coded user-visible string in JSX: "Comments" | src/pages/welcome/post/PostComponent.jsx:63 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-5 | Low | Hard-coded user-visible string in JSX: "Something went wrong" | src/server.js:117 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |


## Method

Evidence for this dimension came from 2 step(s): ux-static (/Users/leechase/Source/bob/skills/review-responsive-ux/scripts/ux-static-scan.js, ok, 0.1 s); dom-structure (/Users/leechase/Source/bob/skills/review-responsive-ux/scripts/dom-structure-scan.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not assessed


| Check | Evidence needed |
|---|---|
| UX-07 | Visual audit of page header patterns across active routes to verify header consistency |
| UX-08 | Live test of empty, loading, and error states under simulated network/API failure |
| UX-DOM-LIVE-DEPTH | Live DOM tree inspection snippet run via chrome-devtools evaluate_script to verify rendered browser depth |



## How to raise this score


To reach 100:

1. Hard-coded user-visible string in JSX: "Page Content" (+2.3 points, effort S)
1. Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) (+4 points, effort M)


