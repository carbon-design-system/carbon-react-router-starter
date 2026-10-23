<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->
<!--
  Template: accessibility.md.tmpl
  Render command:
    node review-core/scripts/report-data.js findings.json scores.json \
         [--comparison comparison.json] > data.json
    node review-core/scripts/report-data.js findings.json scores.json \
         | node review-core/scripts/render.js templates/accessibility.md.tmpl /dev/stdin \
           --strict --out docs/review/accessibility.md

  Alternatively use precursor() from report-data.js for a single-dimension render:
    node -e "
      const {precursor} = require('./review-core/scripts/report-data.js');
      const f = require('./findings.json');
      const s = require('./scores.json');
      process.stdout.write(JSON.stringify(precursor({
        dimension: 'accessibility',
        title: 'Accessibility review',
        findings: f, scores: s,
        summary: 'Automated and manual accessibility assessment.',
        method: 'Lighthouse 13.4.1 + axe-core, static scan, manual keyboard and screen-reader passes.',
        tools: 'Lighthouse 13.4.1, Chrome 153, axe-core 4.12.1',
        commit: 'HEAD',
      }), null, 2));
    " | node review-core/scripts/render.js templates/accessibility.md.tmpl /dev/stdin \
        --strict --out docs/review/accessibility.md

  Render engine syntax: see review-core/scripts/render.js for the template language.
  Supported: value interpolation, each loops, if/else blocks, filters (fixed1, pct,
  upper, lower, json, escape), parent-scope references with ../ prefix.
-->

# Accessibility review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 60.6 / 100 (Fair, confidence Low), **provisional** — manual checks not yet supplied
**Trend:** first run

> **Important:** Automated tools find approximately 30–40% of accessibility issues. A high Lighthouse score does not mean no serious failures exist. This score is provisional until Phase 3 manual evidence is attached.

Score 60.6 / 100 (Fair, confidence Low, provisional). 4 findings: 3 Medium, 1 Low. Trend: first run.

## Biggest point-losers

| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| A11Y-H01-JSX-A11Y: eslint-plugin-jsx-a11y configured but canary did not catch a known violation — possibly misconfigured | High | 20 | M | Verify the plugin is active in the rules. Check that jsx-a11y/click-events-have-key-events is enabled. |
| A11Y-08: Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard | Medium | 6.4 | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| A11Y-07: Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ | Medium | 4 | S | Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.12/heading-order). |
| A11Y-H03-AXE-TEST: No automated a11y test runner (jest-axe, @axe-core/playwright, @axe-core/react, cypress-axe) found | Medium | 4 | M | Add jest-axe and call axe(container) in at least one smoke test per route. |
| A11Y-H02-STYLELINT-A11Y: stylelint-a11y plugin absent | Medium | 4 | M | Install stylelint-a11y and enable a11y/no-outline-none, a11y/media-prefers-reduced-motion. |


## WCAG coverage by principle

| Principle | Checks covered | Status |
|---|---|---|
| 1. Perceivable | A11Y-02 (list), A11Y-03 (tables), A11Y-07 (headings), A11Y-15 (contrast), A11Y-16 (target size), A11Y-17 (reflow), A11Y-18 (text spacing), A11Y-20 (lang) | Partially automated |
| 2. Operable | A11Y-08 (skip link), A11Y-09 (focus indicator), A11Y-10 (focus management), A11Y-11 (tabindex), A11Y-12 (clickable divs), A11Y-16 (target size), A11Y-19 (reduced motion) | Requires manual pass |
| 3. Understandable | A11Y-13 (form labels, autocomplete), A11Y-20 (lang) | Partially automated |
| 4. Robust | A11Y-04 (ARIA children), A11Y-05 (accessible names), A11Y-06 (landmarks), A11Y-11 (ARIA), A11Y-14 (live regions), A11Y-21 (status), A11Y-22 (ARIA validity) | Partially automated |

## Findings

| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| LH-R01-001 | Medium | Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/dashboard-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:14:02.909Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/dashboard-mobile-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:15:59.465Z) — mobile run confirms (Measured) | WCAG 2.4.1 (A) | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| LH-R03-003 | Medium | Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.heading-order; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-mobile-run1.json#audits.heading-order; Lighthouse 13.4.1 (2026-10-22T09:13:23.504Z) — mobile run confirms (Measured) | WCAG 1.3.1 (A) | S | Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.12/heading-order). |
| LH-R03-004 | Medium | Skip links are not focusable. (1 instance) on http://localhost:5173/ | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-mobile-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:13:23.504Z) — mobile run confirms (Measured) | WCAG 2.4.1 (A) | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| MAN-001 | Low | Focus management in modals and panels — Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. | Notes: Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. (Observed) |  | S | After the skip link is activated, programmatically move focus to the #main-content target element (e.g. mainRef.current.focus()). Ensure the target has tabIndex=-1 so it is focusable programmatically. |


## Manual evidence table

| Check | Evidence supplied | Status | Notes |
|---|---|---|---|
| A11Y-09 Focus indicator | — | Not assessed | Requires keyboard run in browser |
| A11Y-10 Focus management | — | Not assessed | Requires keyboard Tab into/out of modals |
| A11Y-12 Screen reader | — | Not assessed | Requires VoiceOver or NVDA run |
| A11Y-17 Reflow 320px | — | Not assessed | Requires viewport resize |
| A11Y-18 Text spacing | — | Not assessed | Requires 1.4.12 bookmarklet |
| A11Y-19 Reduced motion | — | Not assessed | Requires DevTools prefers-reduced-motion emulation |
| A11Y-FORCED-COLOURS | — | Not assessed | Requires DevTools forced colours emulation |

*(Fill this table with evidence paths or observation notes from Phase 3 of the workflow.)*

## Method

Evidence for this dimension came from 4 step(s): a11y-static (/Users/leechase/Source/bob/skills/review-accessibility/scripts/a11y-static-scan.js, ok, 0.1 s); a11y-lighthouse (/Users/leechase/Source/bob/skills/review-accessibility/scripts/lighthouse-a11y-to-findings.js, ok, 0.1 s); a11y-hygiene (/Users/leechase/Source/bob/skills/review-accessibility/scripts/a11y-hygiene-probe.js, ok, 0.4 s); a11y-manual (/Users/leechase/Source/bob/skills/review-accessibility/scripts/manual-evidence-checklist.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not assessed


| Check | Evidence needed |
|---|---|
| A11Y-09 | Manual focus-visible check in browser to confirm outline:0 has no visible replacement style. |
| A11Y-15 | Contrast ratio measurement in each Carbon theme (white, g10, g90, g100) using axe or DevTools. |
| A11Y-17 | 320px viewport screenshot or scrollWidth check confirming no horizontal scrollbar. |
| A11Y-18 | Text-spacing bookmarklet (1.4.12) applied; screenshot confirming no content loss. |
| A11Y-21 | Screen reader pass: in-page status messages announced via live region. |
| A11Y-LH-focusable-controls | Manual verification of "Interactive controls are keyboard focusable" on http://localhost:5173/dashboard. Lighthouse audit: focusable-controls. |
| A11Y-LH-interactive-element-affordance | Manual verification of "Interactive elements indicate their purpose and state" on http://localhost:5173/dashboard. Lighthouse audit: interactive-element-affordance. |
| A11Y-LH-logical-tab-order | Manual verification of "The page has a logical tab order" on http://localhost:5173/dashboard. Lighthouse audit: logical-tab-order. |
| A11Y-LH-visual-order-follows-dom | Manual verification of "Visual order on the page follows DOM order" on http://localhost:5173/dashboard. Lighthouse audit: visual-order-follows-dom. |
| A11Y-LH-focus-traps | Manual verification of "User focus is not accidentally trapped in a region" on http://localhost:5173/dashboard. Lighthouse audit: focus-traps. |
| A11Y-LH-managed-focus | Manual verification of "The user's focus is directed to new content added to the page" on http://localhost:5173/dashboard. Lighthouse audit: managed-focus. |
| A11Y-LH-use-landmarks | Manual verification of "HTML5 landmark elements are used to improve navigation" on http://localhost:5173/dashboard. Lighthouse audit: use-landmarks. |
| A11Y-LH-offscreen-content-hidden | Manual verification of "Offscreen content is hidden from assistive technology" on http://localhost:5173/dashboard. Lighthouse audit: offscreen-content-hidden. |
| A11Y-LH-custom-controls-labels | Manual verification of "Custom controls have associated labels" on http://localhost:5173/dashboard. Lighthouse audit: custom-controls-labels. |
| A11Y-LH-custom-controls-roles | Manual verification of "Custom controls have ARIA roles" on http://localhost:5173/dashboard. Lighthouse audit: custom-controls-roles. |
| A11Y-LH-focusable-controls-home | Manual verification of "Interactive controls are keyboard focusable" on http://localhost:5173/. Lighthouse audit: focusable-controls. |
| A11Y-LH-interactive-element-affordance-home | Manual verification of "Interactive elements indicate their purpose and state" on http://localhost:5173/. Lighthouse audit: interactive-element-affordance. |
| A11Y-LH-logical-tab-order-home | Manual verification of "The page has a logical tab order" on http://localhost:5173/. Lighthouse audit: logical-tab-order. |
| A11Y-LH-visual-order-follows-dom-home | Manual verification of "Visual order on the page follows DOM order" on http://localhost:5173/. Lighthouse audit: visual-order-follows-dom. |
| A11Y-LH-focus-traps-home | Manual verification of "User focus is not accidentally trapped in a region" on http://localhost:5173/. Lighthouse audit: focus-traps. |
| A11Y-LH-managed-focus-home | Manual verification of "The user's focus is directed to new content added to the page" on http://localhost:5173/. Lighthouse audit: managed-focus. |
| A11Y-LH-use-landmarks-home | Manual verification of "HTML5 landmark elements are used to improve navigation" on http://localhost:5173/. Lighthouse audit: use-landmarks. |
| A11Y-LH-offscreen-content-hidden-home | Manual verification of "Offscreen content is hidden from assistive technology" on http://localhost:5173/. Lighthouse audit: offscreen-content-hidden. |
| A11Y-LH-custom-controls-labels-home | Manual verification of "Custom controls have associated labels" on http://localhost:5173/. Lighthouse audit: custom-controls-labels. |
| A11Y-LH-custom-controls-roles-home | Manual verification of "Custom controls have ARIA roles" on http://localhost:5173/. Lighthouse audit: custom-controls-roles. |



## How to raise this score


To reach 80.6:

1. eslint-plugin-jsx-a11y configured but canary did not catch a known violation — possibly misconfigured (+20 points, effort M)



> **Note on confidence:** If only Lighthouse and static-scan results are present (no Phase 3 evidence), the dimension confidence is capped at **Medium** and the score is **provisional**. Add manual evidence to unlock High confidence and remove the provisional flag.
