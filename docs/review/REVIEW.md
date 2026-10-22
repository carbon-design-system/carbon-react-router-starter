<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Review summary

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Overall score:** 66.1 / 100, Fair (provisional)

**Dimensions assessed:** 7 of 7 · **Findings:** 206 (3 High, 79 Medium, 121 Low, 3 Info)
**Trend:** First run: no previous run to compare with.

Overall 66.1 / 100, Fair (provisional). 7 of 7 dimensions assessed; 206 findings. Lowest: Code quality 31, Security 35.

## Scores by dimension

| Dimension | Score | Band | Confidence | Change |
|---|---|---|---|---|
| Performance | 81 | Good | Medium, provisional | first run |
| Accessibility | 60.6 | Fair | Low, provisional | first run |
| Responsive design | 96.7 | Strong | Medium, provisional | first run |
| UX | 93.7 | Strong | Medium, provisional | first run |
| Code quality | 31 | Weak | High | first run |
| Testing | 80 | Good | High | first run |
| Security | 35 | Weak | Medium, provisional | first run |



## Performance

**Score:** 81 / 100 (Good, confidence Medium), provisional · **Trend:** first run

Score 81 / 100 (Good, confidence Medium, provisional). 4 findings: 1 High, 2 Medium, 1 Low. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| BUN-02: Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) | High | 10 | M | Purge duplicate design system stylesheets and remove unused global component CSS. |
| PERF-10: 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) | Medium | 4 | S | Provide explicit width and height attributes or CSS aspect-ratio on all <img> elements. |
| PERF-15: Informational audit 'has-hsts' has score 1 but reports: No HSTS header found | Medium | 4 | S | Inspect audit details and send Strict-Transport-Security header on HTTPS responses. |
| BUN-09: No source maps generated for build output (hinders performance tracing and error analysis) | Low | 1 | S | Configure devtool: "hidden-source-map" in production webpack builds. |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| BUN-CSS-PAYLOAD-1 | High | Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) | bundle:totalCssBytesRaw:2049018 (Measured) |  | M | Purge duplicate design system stylesheets and remove unused global component CSS. |
| PERF-STATIC-IMG-SIZE-1 | Medium | 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) | static:src/components/commonHeader/CommonHeader.jsx:24 (Measured) |  | S | Provide explicit width and height attributes or CSS aspect-ratio on all <img> elements. |
| PERF-INFO-HSTS-1 | Medium | Informational audit 'has-hsts' has score 1 but reports: No HSTS header found | lighthouse:has-hsts:No HSTS header found (Measured) |  | S | Inspect audit details and send Strict-Transport-Security header on HTTPS responses. |
| BUN-SOURCEMAPS-2 | Low | No source maps generated for build output (hinders performance tracing and error analysis) | bundle:sourceMapCount:0 (Measured) |  | S | Configure devtool: "hidden-source-map" in production webpack builds. |



### Not assessed


| Check | Evidence needed |
|---|---|
| CWV-02 | Live user interaction trace (Chrome DevTools Performance panel trace or RUM telemetry) |
| CWV-08 | Chrome User Experience Report (CrUX) or Real User Monitoring (RUM) field data |




## Accessibility

**Score:** 60.6 / 100 (Fair, confidence Low), provisional · **Trend:** first run

Score 60.6 / 100 (Fair, confidence Low, provisional). 4 findings: 3 Medium, 1 Low. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| A11Y-H01-JSX-A11Y: eslint-plugin-jsx-a11y configured but canary did not catch a known violation — possibly misconfigured | High | 20 | M | Verify the plugin is active in the rules. Check that jsx-a11y/click-events-have-key-events is enabled. |
| A11Y-08: Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard | Medium | 6.4 | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| A11Y-07: Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ | Medium | 4 | S | Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.12/heading-order). |
| A11Y-H03-AXE-TEST: No automated a11y test runner (jest-axe, @axe-core/playwright, @axe-core/react, cypress-axe) found | Medium | 4 | M | Add jest-axe and call axe(container) in at least one smoke test per route. |
| A11Y-H02-STYLELINT-A11Y: stylelint-a11y plugin absent | Medium | 4 | M | Install stylelint-a11y and enable a11y/no-outline-none, a11y/media-prefers-reduced-motion. |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| LH-R01-001 | Medium | Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/dashboard-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:14:02.909Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/dashboard-mobile-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:15:59.465Z) — mobile run confirms (Measured) | WCAG 2.4.1 (A) | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| LH-R03-003 | Medium | Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.heading-order; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-mobile-run1.json#audits.heading-order; Lighthouse 13.4.1 (2026-10-22T09:13:23.504Z) — mobile run confirms (Measured) | WCAG 1.3.1 (A) | S | Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.12/heading-order). |
| LH-R03-004 | Medium | Skip links are not focusable. (1 instance) on http://localhost:5173/ | /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z); /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-mobile-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:13:23.504Z) — mobile run confirms (Measured) | WCAG 2.4.1 (A) | S | Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.12/skip-link). |
| MAN-001 | Low | Focus management in modals and panels — Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. | Notes: Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. (Observed) |  | S | After the skip link is activated, programmatically move focus to the #main-content target element (e.g. mainRef.current.focus()). Ensure the target has tabIndex=-1 so it is focusable programmatically. |



### Not assessed


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




## Responsive design

**Score:** 96.7 / 100 (Strong, confidence Medium), provisional · **Trend:** first run

Score 96.7 / 100 (Strong, confidence Medium, provisional). 6 findings: 6 Low. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| RESP-05: Grid container lacks withRowGap or vertical row-gap configuration | Low | 2.3 | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-03: Carbon Column missing responsive props: sm, md, lg | Low | 1 | S | Specify explicit sm, md, and lg span props on every Carbon Column. |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| RESP-1 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/components/commonHeader/CommonHeader.jsx:14 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-2 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/components/footer/Footer.jsx:15 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-3 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardNumberTiles.jsx:30 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-4 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardURLParameters.jsx:24 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-5 | Low | Grid container lacks withRowGap or vertical row-gap configuration | src/pages/dashboard/DashboardVisualizations.jsx:22 (Measured) |  | S | Add withRowGap prop to <Grid> or specify row-gap in SCSS. |
| RESP-6 | Low | Carbon Column missing responsive props: sm, md, lg | src/pages/welcome/WelcomeFetchingSection.jsx:61 (Measured) |  | S | Specify explicit sm, md, and lg span props on every Carbon Column. |



### Not assessed


| Check | Evidence needed |
|---|---|
| RESP-06 | Live browser viewport sweep across 320, 480, 768, 1056, 1312, 1584 px using Chrome DevTools MCP |
| RESP-07 | Live browser reflow test at 400% zoom (1280x1024 / 320 CSS px) for WCAG 1.4.10 compliance |
| RESP-08 | Live browser text zoom test at 200% (WCAG 1.4.4) |




## UX

**Score:** 93.7 / 100 (Strong, confidence Medium), provisional · **Trend:** first run

Score 93.7 / 100 (Strong, confidence Medium, provisional). 6 findings: 1 Medium, 5 Low. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| UX-10: Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | Medium | 4 | M | Consolidate nested single-child div wrappers into unified layout containers. |
| UX-01: Hard-coded user-visible string in JSX: "Page Content" | Low | 2.3 | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| UX-DOM-1 | Medium | Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | src/components/profilePanel/ProfilePanel.jsx:50; src/components/profilePanel/ProfilePanel.jsx:54 (Measured) |  | M | Consolidate nested single-child div wrappers into unified layout containers. |
| UX-1 | Low | Hard-coded user-visible string in JSX: "Page Content" | src/layouts/page-layout.jsx:25 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-2 | Low | Hard-coded user-visible string in JSX: "Loading welcome page..." | src/pages/welcome/Welcome.jsx:22 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-3 | Low | Hard-coded user-visible string in JSX: "Blog data retrieval example" | src/pages/welcome/post/PostComponent.jsx:52 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-4 | Low | Hard-coded user-visible string in JSX: "Comments" | src/pages/welcome/post/PostComponent.jsx:63 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |
| UX-5 | Low | Hard-coded user-visible string in JSX: "Something went wrong" | src/server.js:117 (Measured) |  | S | Extract string to NLS resource file and wrap with translation function (e.g. locale.s). |



### Not assessed


| Check | Evidence needed |
|---|---|
| UX-07 | Visual audit of page header patterns across active routes to verify header consistency |
| UX-08 | Live test of empty, loading, and error states under simulated network/API failure |
| UX-DOM-LIVE-DEPTH | Live DOM tree inspection snippet run via chrome-devtools evaluate_script to verify rendered browser depth |




## Code quality

**Score:** 31 / 100 (Weak, confidence High) · **Trend:** first run

Score 31 / 100 (Weak, confidence High). 5 findings: 4 Medium, 1 Low. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| CODE-ESLINT: ESLint configured, runs clean, jsx-a11y enabled, --max-warnings 0 | High | 10 | M | Install ESLint with jsx-a11y; add --max-warnings 0; run in pre-commit and CI. |
| CODE-STYLELINT: Stylelint with carbon-tokens, a11y, logical plugins configured and clean | High | 10 | M | Add stylelint-plugin-carbon-tokens, @double-great/stylelint-a11y, stylelint-use-logical; run in pre-commit and CI. |
| CODE-CSS-STYLELINT-POLICY: Stylelint policy effective for CSS (carbon-tokens plugin catches violations) | High | 10 | M | Install stylelint-plugin-carbon-tokens and enable reportDescriptionlessDisables. |
| CODE-TYPECHECK: TypeScript type check (tsc --noEmit) runs clean | High | 10 | M | Add a typecheck script (tsc --noEmit); run in CI. |
| CODE-NODE-PIN: Node version pinned and consistent across .nvmrc, engines, Dockerfile | High | 10 | M | Add .nvmrc; set engines.node; pin Dockerfile FROM to the same major. |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| SCAN-CONSOLE | Medium | 18 console.log/error/warn calls in source | code-static-scan.js (Measured) |  | S | Remove debug console calls from source files. |
| SCAN-REACT-DEP | Medium | 3 file(s) with deprecated React APIs (findDOMNode, componentWill*, legacy context, string refs) | code-static-scan.js (Measured) |  | M | Migrate to current React patterns. Use useEffect/useRef instead of findDOMNode; use createContext instead of legacy context. |
| css-eval:src/components/commonHeader/commonHeader.scss:rgbColors | Medium | Hardcoded RGB colors | carbon-css-evaluator; src/components/commonHeader/commonHeader.scss (Measured) |  | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |
| css-eval:src/layouts/page-layout.scss:hexColors | Medium | Hardcoded hex colors | carbon-css-evaluator; src/layouts/page-layout.scss (Measured) |  | S | Replace with Carbon design tokens. See rubric.md §CSS checks. |
| SCAN-PROPTYPES | Low | 1 PropTypes mutation(s) (ComponentName.propTypes = ...) | code-static-scan.js (Measured) |  | S | Remove propTypes mutations on external components. Use TypeScript types for prop validation. |



### Not assessed


Nothing was skipped.



## Testing

**Score:** 80 / 100 (Good, confidence High) · **Trend:** first run

Score 80 / 100 (Good, confidence High). No findings. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| TEST-RUNNER: Unit/component test suite runs and passes; framework matches React version | High | 10 | M | Configure a test runner; run in CI. |
| TEST-COVERAGE-THRESH: Coverage thresholds set above zero and enforced | High | 10 | M | Configure coverageThreshold in jest.config.js with non-zero values. |



### Findings


No findings.


### Not assessed


Nothing was skipped.



## Security

**Score:** 35 / 100 (Weak, confidence Medium), provisional · **Trend:** first run

Score 35 / 100 (Weak, confidence Medium, provisional). 181 findings: 2 High, 69 Medium, 107 Low, 3 Info. Trend: first run.

### Biggest point-losers


| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| DEP-03: handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) | High | 16 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-03: @double-great/stylelint-a11y: high advisory (dev-only), via stylelint | Medium | 10 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-13: ansi-styles is installed in 4 major versions (3, 4, 5, 6) | Medium | 10 | M | Align on one major; use overrides only as a stop-gap. |
| DEP-19: 27 package(s) have patch or minor updates pending | Medium | 4 | S | Batch the updates (Renovate group) and run the tests. |
| SEC-06: No Content-Security-Policy header | Medium | 4 | M | Add an enforcing CSP; roll out as report-only first. |



### Findings


| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| DEP-AN-22 | High | handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) | npm audit: handlebars critical (3.0.0 - 4.7.9) Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937); https://github.com/advisories/GHSA-xw65-4hp5-5hc7 (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-38 | High | shell-quote: critical advisory (dev-only), shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token | npm audit: shell-quote critical (1.8.4 - 1.10.0) shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token; https://github.com/advisories/GHSA-pqg4-j6r4-53mv (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-1 | Medium | @double-great/stylelint-a11y: high advisory (dev-only), via stylelint | npm audit: @double-great/stylelint-a11y high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-2 | Medium | @lhci/utils: high advisory (dev-only), via js-yaml, lighthouse | npm audit: @lhci/utils high (>=0.3.6) via js-yaml, lighthouse (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-3 | Medium | @puppeteer/browsers: high advisory (dev-only), via extract-zip, proxy-agent | npm audit: @puppeteer/browsers high (*) via extract-zip, proxy-agent (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-4 | Medium | @semantic-release/changelog: high advisory (dev-only), via semantic-release | npm audit: @semantic-release/changelog high (>=6.0.0) via semantic-release (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-5 | Medium | @semantic-release/commit-analyzer: high advisory (dev-only), via micromatch, semantic-release | npm audit: @semantic-release/commit-analyzer high (>=7.0.0-beta.1) via micromatch, semantic-release (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-6 | Medium | @semantic-release/git: high advisory (dev-only), via micromatch, semantic-release | npm audit: @semantic-release/git high (*) via micromatch, semantic-release (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-7 | Medium | @semantic-release/github: high advisory (dev-only), via semantic-release | npm audit: @semantic-release/github high (5.3.0-beta.1 - 5.3.0-beta.8 \|\| 5.4.0-beta.1 \|\| 5.5.0-beta.1 \|\| >=5.6.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-8 | Medium | @semantic-release/npm: high advisory (dev-only), via semantic-release | npm audit: @semantic-release/npm high (>=6.0.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-9 | Medium | @semantic-release/release-notes-generator: high advisory (dev-only), via semantic-release | npm audit: @semantic-release/release-notes-generator high (>=10.0.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-10 | Medium | @unlighthouse/cli: high advisory (dev-only), via @lhci/utils, @unlighthouse/core, @unlighthouse/server | npm audit: @unlighthouse/cli high (0.3.8 - 0.3.15 \|\| >=0.4.3) via @lhci/utils, @unlighthouse/core, @unlighthouse/server (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-11 | Medium | @unlighthouse/core: high advisory (dev-only), via @puppeteer/browsers, lighthouse, puppeteer-cluster | npm audit: @unlighthouse/core high (0.8.7 - 0.19.1) via @puppeteer/browsers, lighthouse, puppeteer-cluster (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-12 | Medium | @unlighthouse/server: high advisory (dev-only), via @unlighthouse/core, listhen | npm audit: @unlighthouse/server high (0.3.8 - 0.3.15 \|\| >=0.4.3) via @unlighthouse/core, listhen (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-14 | Medium | basic-ftp: high advisory (dev-only), basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory-listing parser (RE_LINE backtracking) | npm audit: basic-ftp high (<=6.2.0) basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory-listing parser (RE_LINE backtracking); https://github.com/advisories/GHSA-c475-qrg2-pj4r (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-15 | Medium | brace-expansion: high advisory (dev-only), brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service; brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion | npm audit: brace-expansion high (4.0.0 - 5.0.11) brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service; brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion; https://github.com/advisories/GHSA-q2hr-2g5m-vwhr (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-16 | Medium | braces: high advisory (dev-only), braces vulnerable to stack-exhaustion denial of service through deeply nested patterns | npm audit: braces high (*) braces vulnerable to stack-exhaustion denial of service through deeply nested patterns; https://github.com/advisories/GHSA-vfj7-8cjw-p6xm (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-18 | Medium | extract-zip: high advisory (dev-only), extract-zip unvalidated symlink path traversal; extract-zip allows arbitrary file writes through symlink archive entries | npm audit: extract-zip high (*) extract-zip unvalidated symlink path traversal; extract-zip allows arbitrary file writes through symlink archive entries; https://github.com/advisories/GHSA-jmr9-qjv8-65gv (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-19 | Medium | fast-glob: high advisory (dev-only), via micromatch | npm audit: fast-glob high (*) via micromatch (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-20 | Medium | get-uri: high advisory (dev-only), via basic-ftp | npm audit: get-uri high (>=5.0.0) via basic-ftp (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-21 | Medium | globby: high advisory (dev-only), via fast-glob, micromatch | npm audit: globby high (>=8.0.0) via fast-glob, micromatch (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-23 | Medium | http-cache-semantics: high advisory (dev-only), http-cache-semantics max-stale handling can disclose cross-user cached responses | npm audit: http-cache-semantics high (<=4.2.0) http-cache-semantics max-stale handling can disclose cross-user cached responses; https://github.com/advisories/GHSA-ch52-4w7c-c8xp (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-26 | Medium | launch-editor: high advisory (dev-only), launch-editor: escapeCmdArgs() omits % escaping on Windows; launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors | npm audit: launch-editor high (<=2.14.1) launch-editor: escapeCmdArgs() omits % escaping on Windows; launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors; https://github.com/advisories/GHSA-698v-4r3x-3vcv (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-27 | Medium | lighthouse: high advisory (dev-only), via puppeteer-core, puppeteer-core | npm audit: lighthouse high (10.1.1-dev.20230414 - 10.1.1-dev.20230503 \|\| >=10.2.0-dev.20230504) via puppeteer-core, puppeteer-core (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-28 | Medium | listhen: high advisory (dev-only), via node-forge | npm audit: listhen high (>=0.3.0) via node-forge (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-29 | Medium | micromatch: high advisory (dev-only), via braces | npm audit: micromatch high (>=0.2.0) via braces (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-30 | Medium | node-forge: high advisory (dev-only), node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements | npm audit: node-forge high (*) node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements; https://github.com/advisories/GHSA-86w9-cpqp-85rv (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-31 | Medium | pac-proxy-agent: high advisory (dev-only), via get-uri | npm audit: pac-proxy-agent high (>=6.0.0) via get-uri (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-33 | Medium | proxy-agent: high advisory (dev-only), via pac-proxy-agent | npm audit: proxy-agent high (>=6.0.0) via pac-proxy-agent (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-34 | Medium | puppeteer: high advisory (dev-only), via @puppeteer/browsers, puppeteer-core | npm audit: puppeteer high (>=20.4.0) via @puppeteer/browsers, puppeteer-core (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-35 | Medium | puppeteer-cluster: high advisory (dev-only), via puppeteer | npm audit: puppeteer-cluster high (>=0.24.0) via puppeteer (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-36 | Medium | puppeteer-core: high advisory (dev-only), via @puppeteer/browsers, @puppeteer/browsers | npm audit: puppeteer-core high (>=19.8.4) via @puppeteer/browsers, @puppeteer/browsers (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-37 | Medium | semantic-release: high advisory (dev-only), via @semantic-release/commit-analyzer, @semantic-release/github, @semantic-release/npm | npm audit: semantic-release high (>=16.0.0-beta.1) via @semantic-release/commit-analyzer, @semantic-release/github, @semantic-release/npm (Measured) | A06:2021, CWE-1395 | S | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-40 | Medium | stylelint: high advisory (dev-only), via fast-glob, globby, micromatch | npm audit: stylelint high (>=7.7.1) via fast-glob, globby, micromatch (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-41 | Medium | stylelint-config-recommended: high advisory (dev-only), via stylelint | npm audit: stylelint-config-recommended high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-42 | Medium | stylelint-config-recommended-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended, stylelint-scss | npm audit: stylelint-config-recommended-scss high (*) via stylelint, stylelint-config-recommended, stylelint-scss (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-43 | Medium | stylelint-config-standard: high advisory (dev-only), via stylelint, stylelint-config-recommended | npm audit: stylelint-config-standard high (>=16.0.0) via stylelint, stylelint-config-recommended (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-44 | Medium | stylelint-config-standard-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended-scss, stylelint-config-standard | npm audit: stylelint-config-standard-scss high (*) via stylelint, stylelint-config-recommended-scss, stylelint-config-standard (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-45 | Medium | stylelint-plugin-carbon-tokens: high advisory (dev-only), via stylelint | npm audit: stylelint-plugin-carbon-tokens high (>=3.0.0-rc.0) via stylelint (Measured) | A06:2021, CWE-1395 | S | Upgrade stylelint-plugin-carbon-tokens to 2.8.0 (breaking); run the tests. |
| DEP-AN-46 | Medium | stylelint-scss: high advisory (dev-only), via stylelint | npm audit: stylelint-scss high (>=2.0.0) via stylelint (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-47 | Medium | stylelint-use-logical: high advisory (dev-only), via stylelint | npm audit: stylelint-use-logical high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-48 | Medium | undici: high advisory (dev-only), undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression; undici vulnerable to downstream response splitting via retry interceptor | npm audit: undici high (<=6.28.0) undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression; undici vulnerable to downstream response splitting via retry interceptor; https://github.com/advisories/GHSA-3wwx-pv8p-q78v (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-49 | Medium | unlighthouse: high advisory (dev-only), via @unlighthouse/cli, @unlighthouse/core | npm audit: unlighthouse high (0.3.13 - 0.3.15 \|\| 0.4.3 - 0.19.1) via @unlighthouse/cli, @unlighthouse/core (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-53 | Medium | 27 package(s) have patch or minor updates pending | npm outdated: current differs from latest within the same major (Measured) |  | S | Batch the updates (Renovate group) and run the tests. |
| DEP-AN-54 | Medium | ansi-styles is installed in 4 major versions (3, 4, 5, 6) | lockfile: ansi-styles majors 3, 4, 5, 6, 9 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-55 | Medium | chalk is installed in 4 major versions (2, 4, 5, 6) | lockfile: chalk majors 2, 4, 5, 6, 6 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-56 | Medium | get-stream is installed in 4 major versions (5, 6, 8, 9) | lockfile: get-stream majors 5, 6, 8, 9, 7 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-57 | Medium | lru-cache is installed in 4 major versions (5, 7, 10, 11) | lockfile: lru-cache majors 5, 7, 10, 11, 11 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-58 | Medium | react-is is installed in 4 major versions (16, 17, 18, 19) | lockfile: react-is majors 16, 17, 18, 19, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-59 | Medium | supports-color is installed in 4 major versions (5, 7, 8, 10) | lockfile: supports-color majors 5, 7, 8, 10, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-60 | Medium | type-fest is installed in 4 major versions (1, 2, 4, 5) | lockfile: type-fest majors 1, 2, 4, 5, 7 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-61 | Medium | cliui is installed in 3 major versions (7, 8, 9) | lockfile: cliui majors 7, 8, 9, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-62 | Medium | dot-prop is installed in 3 major versions (5, 9, 10) | lockfile: dot-prop majors 5, 9, 10, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-63 | Medium | emoji-regex is installed in 3 major versions (8, 9, 10) | lockfile: emoji-regex majors 8, 9, 10, 9 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-64 | Medium | escape-string-regexp is installed in 3 major versions (1, 4, 5) | lockfile: escape-string-regexp majors 1, 4, 5, 6 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-65 | Medium | execa is installed in 3 major versions (8, 9, 10) | lockfile: execa majors 8, 9, 10, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-66 | Medium | has-flag is installed in 3 major versions (3, 4, 5) | lockfile: has-flag majors 3, 4, 5, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-67 | Medium | marked is installed in 3 major versions (15, 17, 18) | lockfile: marked majors 15, 17, 18, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-68 | Medium | p-limit is installed in 3 major versions (1, 3, 6) | lockfile: p-limit majors 1, 3, 6, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-69 | Medium | parse-json is installed in 3 major versions (4, 5, 8) | lockfile: parse-json majors 4, 5, 8, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-70 | Medium | parse5 is installed in 3 major versions (5, 6, 8) | lockfile: parse5 majors 5, 6, 8, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-71 | Medium | semver is installed in 3 major versions (5, 6, 7) | lockfile: semver majors 5, 6, 7, 8 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-72 | Medium | string-width is installed in 3 major versions (4, 7, 8) | lockfile: string-width majors 4, 7, 8, 9 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-73 | Medium | undici is installed in 3 major versions (6, 7, 8) | lockfile: undici majors 6, 7, 8, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-74 | Medium | which is installed in 3 major versions (1, 2, 6) | lockfile: which majors 1, 2, 6, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-75 | Medium | yallist is installed in 3 major versions (3, 4, 5) | lockfile: yallist majors 3, 4, 5, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-76 | Medium | yargs is installed in 3 major versions (16, 17, 18) | lockfile: yargs majors 16, 17, 18, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-77 | Medium | yargs-parser is installed in 3 major versions (20, 21, 22) | lockfile: yargs-parser majors 20, 21, 22, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| SEC-HDR-1 | Medium | No Content-Security-Policy header | headers.txt: content-security-policy absent; dashboard-desktop-run1.json: audits.csp-xss — No CSP found in enforcement mode (Measured) | A05:2021, CWE-693 | M | Add an enforcing CSP; roll out as report-only first. |
| SEC-HDR-2 | Medium | No frame control: no frame-ancestors in an enforcing CSP and no X-Frame-Options | headers.txt: x-frame-options absent; no enforcing frame-ancestors; dashboard-desktop-run1.json: audits.clickjacking-mitigation — No frame control policy found (Measured) | A05:2021, CWE-1021 | S | Add frame-ancestors to the CSP, or X-Frame-Options. |
| SEC-HDR-3 | Medium | X-Content-Type-Options: nosniff is not set | headers.txt: x-content-type-options absent (Measured) | A05:2021, CWE-693 | S | Send X-Content-Type-Options: nosniff. |
| DEP-AN-13 | Low | argparse: moderate advisory (dev-only), via sprintf-js | npm audit: argparse moderate (1.0.0 - 1.0.10) via sprintf-js (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-24 | Low | ip-address: moderate advisory (dev-only), ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, allowing SSRF and trust-boundary bypass to on-link hosts; ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, allowing SSRF and trust-boundary bypass | npm audit: ip-address moderate (<=10.7.0) ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, allowing SSRF and trust-boundary bypass to on-link hosts; ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, allowing SSRF and trust-boundary bypass; https://github.com/advisories/GHSA-rpw4-54j3-4h4q (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-25 | Low | js-yaml: moderate advisory (dev-only), via argparse | npm audit: js-yaml moderate (3.2.7 - 3.15.2) via argparse (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-32 | Low | postcss-selector-parser: moderate advisory (dev-only), PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion | npm audit: postcss-selector-parser moderate (<7.1.6) PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion; https://github.com/advisories/GHSA-rj75-hqrm-r3gf (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-39 | Low | sprintf-js: moderate advisory (dev-only), sprintf-js vulnerable to denial of service through unbounded precision specifiers | npm audit: sprintf-js moderate (*) sprintf-js vulnerable to denial of service through unbounded precision specifiers; https://github.com/advisories/GHSA-hp3w-g68c-fv3c (Measured) | A06:2021, CWE-1395 | S | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-50 | Low | @eslint/js 9.39.5 is 1 major version(s) behind 10.0.1 (no documented migration), dev-only | npm outdated: @eslint/js current 9.39.5, latest 10.0.1 (Measured) |  | M | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-51 | Low | eslint 9.39.5 is 1 major version(s) behind 10.13.0 (no documented migration), dev-only | npm outdated: eslint current 9.39.5, latest 10.13.0 (Measured) |  | M | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-52 | Low | msw 2.15.0 is 1 major version(s) behind 3.0.3 (no documented migration), dev-only | npm outdated: msw current 2.15.0, latest 3.0.3 (Measured) |  | M | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-78 | Low | @babel/runtime is installed in 2 major versions (7, 8) | lockfile: @babel/runtime majors 7, 8, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-79 | Low | @octokit/openapi-types is installed in 2 major versions (27, 28) | lockfile: @octokit/openapi-types majors 27, 28, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-80 | Low | @octokit/types is installed in 2 major versions (16, 17) | lockfile: @octokit/types majors 16, 17, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-81 | Low | @puppeteer/browsers is installed in 2 major versions (2, 3) | lockfile: @puppeteer/browsers majors 2, 3, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-82 | Low | @sentry/core is installed in 2 major versions (7, 10) | lockfile: @sentry/core majors 7, 10, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-83 | Low | @sentry/node is installed in 2 major versions (7, 10) | lockfile: @sentry/node majors 7, 10, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-84 | Low | @sindresorhus/is is installed in 2 major versions (4, 5) | lockfile: @sindresorhus/is majors 4, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-85 | Low | @vueuse/core is installed in 2 major versions (10, 14) | lockfile: @vueuse/core majors 10, 14, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-86 | Low | @vueuse/metadata is installed in 2 major versions (10, 14) | lockfile: @vueuse/metadata majors 10, 14, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-87 | Low | @vueuse/shared is installed in 2 major versions (10, 14) | lockfile: @vueuse/shared majors 10, 14, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-88 | Low | agent-base is installed in 2 major versions (7, 9) | lockfile: agent-base majors 7, 9, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-89 | Low | ajv is installed in 2 major versions (6, 8) | lockfile: ajv majors 6, 8, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-90 | Low | ansi-regex is installed in 2 major versions (5, 6) | lockfile: ansi-regex majors 5, 6, 9 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-91 | Low | argparse is installed in 2 major versions (1, 2) | lockfile: argparse majors 1, 2, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-92 | Low | balanced-match is installed in 2 major versions (1, 4) | lockfile: balanced-match majors 1, 4, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-93 | Low | brace-expansion is installed in 2 major versions (1, 5) | lockfile: brace-expansion majors 1, 5, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-94 | Low | chromium-bidi is installed in 2 major versions (14, 17) | lockfile: chromium-bidi majors 14, 17, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-95 | Low | color-convert is installed in 2 major versions (1, 2) | lockfile: color-convert majors 1, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-96 | Low | configstore is installed in 2 major versions (5, 7) | lockfile: configstore majors 5, 7, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-97 | Low | content-type is installed in 2 major versions (1, 2) | lockfile: content-type majors 1, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-98 | Low | cookie is installed in 2 major versions (0, 2) | lockfile: cookie majors 0, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-99 | Low | cookie-es is installed in 2 major versions (1, 3) | lockfile: cookie-es majors 1, 3, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-100 | Low | crypto-random-string is installed in 2 major versions (2, 4) | lockfile: crypto-random-string majors 2, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-101 | Low | debug is installed in 2 major versions (2, 4) | lockfile: debug majors 2, 4, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-102 | Low | entities is installed in 2 major versions (7, 8) | lockfile: entities majors 7, 8, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-103 | Low | env-paths is installed in 2 major versions (2, 4) | lockfile: env-paths majors 2, 4, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-104 | Low | eslint-visitor-keys is installed in 2 major versions (3, 4) | lockfile: eslint-visitor-keys majors 3, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-105 | Low | estree-walker is installed in 2 major versions (2, 3) | lockfile: estree-walker majors 2, 3, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-106 | Low | figures is installed in 2 major versions (2, 6) | lockfile: figures majors 2, 6, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-107 | Low | file-entry-cache is installed in 2 major versions (8, 11) | lockfile: file-entry-cache majors 8, 11, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-108 | Low | find-up is installed in 2 major versions (2, 5) | lockfile: find-up majors 2, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-109 | Low | flat-cache is installed in 2 major versions (4, 6) | lockfile: flat-cache majors 4, 6, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-110 | Low | glob-parent is installed in 2 major versions (5, 6) | lockfile: glob-parent majors 5, 6, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-111 | Low | globals is installed in 2 major versions (14, 17) | lockfile: globals majors 14, 17, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-112 | Low | hookified is installed in 2 major versions (1, 2) | lockfile: hookified majors 1, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-113 | Low | hosted-git-info is installed in 2 major versions (7, 9) | lockfile: hosted-git-info majors 7, 9, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-114 | Low | http-proxy-agent is installed in 2 major versions (7, 9) | lockfile: http-proxy-agent majors 7, 9, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-115 | Low | https-proxy-agent is installed in 2 major versions (7, 9) | lockfile: https-proxy-agent majors 7, 9, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-116 | Low | human-signals is installed in 2 major versions (5, 8) | lockfile: human-signals majors 5, 8, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-117 | Low | ignore is installed in 2 major versions (5, 7) | lockfile: ignore majors 5, 7, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-118 | Low | import-fresh is installed in 2 major versions (3, 4) | lockfile: import-fresh majors 3, 4, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-119 | Low | indent-string is installed in 2 major versions (4, 5) | lockfile: indent-string majors 4, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-120 | Low | ini is installed in 2 major versions (1, 6) | lockfile: ini majors 1, 6, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-121 | Low | is-stream is installed in 2 major versions (3, 4) | lockfile: is-stream majors 3, 4, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-122 | Low | isarray is installed in 2 major versions (1, 2) | lockfile: isarray majors 1, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-123 | Low | isexe is installed in 2 major versions (2, 4) | lockfile: isexe majors 2, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-124 | Low | js-tokens is installed in 2 major versions (4, 10) | lockfile: js-tokens majors 4, 10, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-125 | Low | js-yaml is installed in 2 major versions (3, 4) | lockfile: js-yaml majors 3, 4, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-126 | Low | json-parse-even-better-errors is installed in 2 major versions (2, 5) | lockfile: json-parse-even-better-errors majors 2, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-127 | Low | json-schema-traverse is installed in 2 major versions (0, 1) | lockfile: json-schema-traverse majors 0, 1, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-128 | Low | keyv is installed in 2 major versions (4, 5) | lockfile: keyv majors 4, 5, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-129 | Low | lighthouse is installed in 2 major versions (12, 13) | lockfile: lighthouse majors 12, 13, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-130 | Low | locate-path is installed in 2 major versions (2, 6) | lockfile: locate-path majors 2, 6, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-131 | Low | magic-string is installed in 2 major versions (0, 1) | lockfile: magic-string majors 0, 1, 7 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-132 | Low | meow is installed in 2 major versions (13, 14) | lockfile: meow majors 13, 14, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-133 | Low | mimic-response is installed in 2 major versions (3, 4) | lockfile: mimic-response majors 3, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-134 | Low | minimatch is installed in 2 major versions (3, 10) | lockfile: minimatch majors 3, 10, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-135 | Low | minipass is installed in 2 major versions (3, 7) | lockfile: minipass majors 3, 7, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-136 | Low | negotiator is installed in 2 major versions (0, 1) | lockfile: negotiator majors 0, 1, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-137 | Low | normalize-package-data is installed in 2 major versions (6, 8) | lockfile: normalize-package-data majors 6, 8, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-138 | Low | normalize-url is installed in 2 major versions (8, 9) | lockfile: normalize-url majors 8, 9, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-139 | Low | npm-run-path is installed in 2 major versions (5, 6) | lockfile: npm-run-path majors 5, 6, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-140 | Low | p-locate is installed in 2 major versions (2, 5) | lockfile: p-locate majors 2, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-141 | Low | path-exists is installed in 2 major versions (3, 4) | lockfile: path-exists majors 3, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-142 | Low | path-key is installed in 2 major versions (3, 4) | lockfile: path-key majors 3, 4, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-143 | Low | picomatch is installed in 2 major versions (2, 4) | lockfile: picomatch majors 2, 4, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-144 | Low | pkg-types is installed in 2 major versions (1, 2) | lockfile: pkg-types majors 1, 2, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-145 | Low | puppeteer-core is installed in 2 major versions (24, 25) | lockfile: puppeteer-core majors 24, 25, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-146 | Low | read-package-up is installed in 2 major versions (11, 12) | lockfile: read-package-up majors 11, 12, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-147 | Low | read-pkg is installed in 2 major versions (9, 10) | lockfile: read-pkg majors 9, 10, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-148 | Low | resolve-from is installed in 2 major versions (4, 5) | lockfile: resolve-from majors 4, 5, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-149 | Low | signal-exit is installed in 2 major versions (3, 4) | lockfile: signal-exit majors 3, 4, 9 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-150 | Low | socks-proxy-agent is installed in 2 major versions (8, 10) | lockfile: socks-proxy-agent majors 8, 10, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-151 | Low | spdx-expression-parse is installed in 2 major versions (3, 4) | lockfile: spdx-expression-parse majors 3, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-152 | Low | strip-ansi is installed in 2 major versions (6, 7) | lockfile: strip-ansi majors 6, 7, 8 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-153 | Low | strip-final-newline is installed in 2 major versions (3, 4) | lockfile: strip-final-newline majors 3, 4, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-154 | Low | strip-json-comments is installed in 2 major versions (2, 3) | lockfile: strip-json-comments majors 2, 3, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-155 | Low | supports-hyperlinks is installed in 2 major versions (3, 4) | lockfile: supports-hyperlinks majors 3, 4, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-156 | Low | tldts-core is installed in 2 major versions (6, 7) | lockfile: tldts-core majors 6, 7, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-157 | Low | tldts-icann is installed in 2 major versions (6, 7) | lockfile: tldts-icann majors 6, 7, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-158 | Low | tr46 is installed in 2 major versions (0, 7) | lockfile: tr46 majors 0, 7, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-159 | Low | unctx is installed in 2 major versions (2, 3) | lockfile: unctx majors 2, 3, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-160 | Low | unique-string is installed in 2 major versions (2, 3) | lockfile: unique-string majors 2, 3, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-161 | Low | unplugin is installed in 2 major versions (2, 3) | lockfile: unplugin majors 2, 3, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-162 | Low | webidl-conversions is installed in 2 major versions (3, 8) | lockfile: webidl-conversions majors 3, 8, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-163 | Low | whatwg-url is installed in 2 major versions (5, 17) | lockfile: whatwg-url majors 5, 17, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-164 | Low | wrap-ansi is installed in 2 major versions (7, 9) | lockfile: wrap-ansi majors 7, 9, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-165 | Low | write-file-atomic is installed in 2 major versions (3, 7) | lockfile: write-file-atomic majors 3, 7, 3 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-166 | Low | ws is installed in 2 major versions (7, 8) | lockfile: ws majors 7, 8, 5 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-167 | Low | xdg-basedir is installed in 2 major versions (4, 5) | lockfile: xdg-basedir majors 4, 5, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-168 | Low | yocto-queue is installed in 2 major versions (0, 1) | lockfile: yocto-queue majors 0, 1, 2 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-169 | Low | zod is installed in 2 major versions (3, 4) | lockfile: zod majors 3, 4, 4 copies (Measured) |  | M | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-170 | Low | @ibm/plex is declared but not imported (heuristic, verify before removing) | import scan of 69 file(s): no import of @ibm/plex (Measured) |  | S | Remove the package. |
| DEP-AN-171 | Low | react-is is declared but not imported (heuristic, verify before removing) | import scan of 69 file(s): no import of react-is (Measured) |  | S | Remove the package. |
| DEP-AN-172 | Low | @cspell/dict-de-de is licensed LGPL-3.0 (copyleft) | license data: @cspell/dict-de-de LGPL-3.0 (Measured) |  | M | Ask legal to confirm, or replace the package. |
| DEP-AN-173 | Low | node-forge is licensed (BSD-3-Clause OR GPL-2.0) (dual (check the permissive option)) | license data: node-forge (BSD-3-Clause OR GPL-2.0) (Measured) |  | M | Ask legal to confirm, or replace the package. |
| SEC-HDR-4 | Low | No Referrer-Policy header | headers.txt: referrer-policy absent (Measured) | A05:2021 | S | Send Referrer-Policy: strict-origin-when-cross-origin or stricter. |
| SEC-HDR-5 | Low | No Permissions-Policy header | headers.txt: permissions-policy absent (Measured) | A05:2021 | S | Send a Permissions-Policy that disables unused browser features. |
| SEC-HDR-7 | Low | Response reveals server or framework version | headers.txt: x-powered-by: Express (Measured) | A05:2021, CWE-200 | S | Strip build meta tags and version banners from production output. |
| DEP-AN-17 | Info | esbuild: low advisory (dev-only), esbuild allows arbitrary file read when running the development server on Windows | npm audit: esbuild low (0.27.3 - 0.28.0) esbuild allows arbitrary file read when running the development server on Windows; https://github.com/advisories/GHSA-g7r4-m6w7-qqqr (Measured) | A06:2021, CWE-1395 | S | Run npm audit fix or update to the patched version; run the tests. |
| SEC-HDR-6 | Info | Optional isolation headers not set: COOP, COEP | headers.txt: COOP, COEP absent; dashboard-desktop-run1.json: audits.origin-isolation — No COOP header found; dashboard-desktop-run1.json: audits.trusted-types-xss — No CSP Trusted Types directive found (Measured) | A05:2021 | S | Consider COOP and Trusted Types once the CSP is enforcing. |
| SEC-HDR-9 | Info | Lighthouse: No HSTS header found (not applicable until the site uses HTTPS) | dashboard-desktop-run1.json: audits.has-hsts.details item "No HSTS header found" (score 1 not used) (Measured) | A02:2021, CWE-319 | S | Send Strict-Transport-Security with max-age of at least 15552000 on HTTPS responses. |



### Not assessed


| Check | Evidence needed |
|---|---|
| SEC-04 | The page URL (pass --page-url or use --url) |




## Dimensions without evidence


Every dimension has evidence.


## Method and tool versions


| Step | Script | Status | Duration | Covers | Tool versions |
|---|---|---|---|---|---|
| perf-static | /Users/leechase/Source/bob/skills/review-performance/scripts/perf-static-scan.js | ok | 0.1 s | performance | node v24.20.0 |
| bundle | /Users/leechase/Source/bob/skills/review-performance/scripts/bundle-analyze.js | ok | 0.1 s | performance | node v24.20.0 |
| lighthouse-perf | /Users/leechase/Source/bob/skills/review-performance/scripts/lighthouse-to-findings.js | ok | 0.1 s | performance | node v24.20.0 |
| a11y-static | /Users/leechase/Source/bob/skills/review-accessibility/scripts/a11y-static-scan.js | ok | 0.1 s | accessibility | node v24.20.0 |
| a11y-lighthouse | /Users/leechase/Source/bob/skills/review-accessibility/scripts/lighthouse-a11y-to-findings.js | ok | 0.1 s | accessibility | node v24.20.0 |
| a11y-hygiene | /Users/leechase/Source/bob/skills/review-accessibility/scripts/a11y-hygiene-probe.js | ok | 0.4 s | accessibility | node v24.20.0 |
| a11y-manual | /Users/leechase/Source/bob/skills/review-accessibility/scripts/manual-evidence-checklist.js | ok | 0.1 s | accessibility | node v24.20.0 |
| responsive-static | /Users/leechase/Source/bob/skills/review-responsive-ux/scripts/responsive-static-scan.js | ok | 0.1 s | responsive | node v24.20.0 |
| ux-static | /Users/leechase/Source/bob/skills/review-responsive-ux/scripts/ux-static-scan.js | ok | 0.1 s | ux | node v24.20.0 |
| dom-structure | /Users/leechase/Source/bob/skills/review-responsive-ux/scripts/dom-structure-scan.js | ok | 0.1 s | responsive, ux | node v24.20.0 |
| code-static | /Users/leechase/Source/bob/skills/review-code-quality/scripts/code-static-scan.js | ok | 0.1 s | code-quality | node v24.20.0 |
| css-eval | /Users/leechase/Source/bob/skills/review-code-quality/scripts/css-eval-wrapper.js | ok | 0.1 s | code-quality | node v24.20.0 |
| tooling | /Users/leechase/Source/bob/skills/review-code-quality/scripts/tooling-discovery.js | ok | 0.0 s | code-quality, testing | node v24.20.0 |
| hygiene | /Users/leechase/Source/bob/skills/review-code-quality/scripts/hygiene-run.js | failed | 0.0 s | — | node v24.20.0 |
| secrets | /Users/leechase/Source/bob/skills/review-security-deps/scripts/secrets-scan.js | ok | 0.1 s | security | node v24.20.0 |
| docker | /Users/leechase/Source/bob/skills/review-security-deps/scripts/docker-scan.js | ok | 0.1 s | security | node v24.20.0 |
| carbon-split | /Users/leechase/Source/bob/skills/review-security-deps/scripts/carbon-version-split.js | ok | 0.1 s | code-quality, security | node v24.20.0 |
| deps | /Users/leechase/Source/bob/skills/review-security-deps/scripts/deps-analyze.js | ok | 0.1 s | security | node v24.20.0 |
| headers | /Users/leechase/Source/bob/skills/review-security-deps/scripts/headers-check.js | ok | 0.1 s | security | node v24.20.0 |



## Related documents

- [security.md](security.md): Security review
- [dependency-review.md](dependency-review.md): Dependency review
- [css-evaluation.md](css-evaluation.md): CSS evaluation
- [code-quality.md](code-quality.md): Code quality review
- [testing.md](testing.md): Testing review
- [core-web-vitals.md](core-web-vitals.md): Core Web Vitals review
- [bundle-analysis.md](bundle-analysis.md): Bundle analysis
- [accessibility.md](accessibility.md): Accessibility review
- [responsive.md](responsive.md): Responsive design review
- [ux.md](ux.md): UX review
- [dom-structure.md](dom-structure.md): DOM structure review

