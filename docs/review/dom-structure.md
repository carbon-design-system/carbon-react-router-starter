<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# DOM structure review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Peak JSX Nesting Depth:** 10 levels (Median: 2)
**Distinct Wrapper Patterns:** 2 · **Shared Layout Shells:** 1 · **Selector Dependencies:** 0

Score 93.7 / 100 (Strong, confidence Medium, provisional). 1 finding: 1 Medium. Trend: first run.

## DOM structure findings

| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| UX-DOM-1 | Medium | Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | src/components/profilePanel/ProfilePanel.jsx:50; src/components/profilePanel/ProfilePanel.jsx:54 (Measured) |  | M | Consolidate nested single-child div wrappers into unified layout containers. |


## Remediation pilot protocol (Decision D4)

Refactoring deeply nested wrappers carries selector breakage risk. A pilot protocol is required prior to full-codebase execution:

1. **Route Selection:** Choose 2–3 representative routes (e.g. 1 simple CRUD table, 1 complex analytical dashboard, 1 modal dialog or flyout panel).
2. **Baseline Measurement:** Record initial DOM nesting depth, passthrough wrappers, and CSS selector dependencies in the pilot scope.
3. **Targeted Refactoring:** Collapse passthrough wrappers, consolidate loadable container shells, and convert deep selector chains into flat BEM classes.
4. **Effort & Risk Calibration:** Measure actual engineering hours, visual regression test outcomes, and accessibility tree improvements.
5. **Rollout:** Apply calibrated estimates to schedule remaining routes across standard feature sprints.

## Not assessed


| Check | Evidence needed |
|---|---|
| UX-07 | Visual audit of page header patterns across active routes to verify header consistency |
| UX-08 | Live test of empty, loading, and error states under simulated network/API failure |
| UX-DOM-LIVE-DEPTH | Live DOM tree inspection snippet run via chrome-devtools evaluate_script to verify rendered browser depth |


