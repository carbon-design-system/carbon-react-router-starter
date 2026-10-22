<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# carbon-react-starter: Review Quick Reference

**Overall: 66.1 / 100, Fair** (provisional: some checks not assessed)
**Rubric:** v1.0.0 · **Date:** 2026-10-22
**Trend:** First run: no previous run to compare with.



## Performance
- **81/100** (Good, confidence Medium, provisional): Good (81) — provisional; Lighthouse performance metrics not collected via DevTools MCP; CSS payload is 2 MiB (exceeds 750 KiB threshold).
- Issues (4 total, top shown):
  - **High** Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) (BUN-CSS-PAYLOAD-1; bundle:totalCssBytesRaw:2049018)
  - **Medium** 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) (PERF-STATIC-IMG-SIZE-1; static:src/components/commonHeader/CommonHeader.jsx:24)
  - **Medium** Informational audit 'has-hsts' has score 1 but reports: No HSTS header found (PERF-INFO-HSTS-1; lighthouse:has-hsts:No HSTS header found)
  - **Low** No source maps generated for build output (hinders performance tracing and error analysis) (BUN-SOURCEMAPS-2; bundle:sourceMapCount:0)

- **Run CLI Lighthouse to complete performance scoring; consider CSS code-splitting or lazy-loading to reduce initial CSS payload.**
- To reach 99: 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) (+4, S); Informational audit 'has-hsts' has score 1 but reports: No HSTS header found (+4, S); Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) (+10, M)


---


## Accessibility
- **60.6/100** (Fair, confidence Low, provisional): Fair (60.6) — Lighthouse scores 97–98; two automated skip-link findings and one manual focus-management Low finding; many Lighthouse manual checks not yet assessed.
- Issues (4 total, top shown):
  - **Medium** Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard (LH-R01-001; /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/dashboard-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:14:02.909Z))
  - **Medium** Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ (LH-R03-003; /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.heading-order; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z))
  - **Medium** Skip links are not focusable. (1 instance) on http://localhost:5173/ (LH-R03-004; /Users/leechase/Source/uxe/carbon-react-router-starter/docs/review/evidence/lighthouse/home-desktop-run1.json#audits.skip-link; Lighthouse 13.4.1 (2026-10-22T09:12:20.114Z))
  - **Low** Focus management in modals and panels — Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. (MAN-001; Notes: Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good.)

- **Fix skip link focus management (move focus to #main-content on activation); fix heading order on the Welcome page; run axe in tests to automate ongoing coverage.**
- To reach 80.6: eslint-plugin-jsx-a11y configured but canary did not catch a known violation — possibly misconfigured (+20, M)


---


## Responsive design
- **96.7/100** (Strong, confidence Medium, provisional): Strong (96.7) — excellent layout at 320 px and on mobile; minor Grid configuration improvements identified.
- Issues (6 total, top shown):
  - **Low** Grid container lacks withRowGap or vertical row-gap configuration (RESP-1; src/components/commonHeader/CommonHeader.jsx:14)
  - **Low** Grid container lacks withRowGap or vertical row-gap configuration (RESP-2; src/components/footer/Footer.jsx:15)
  - **Low** Grid container lacks withRowGap or vertical row-gap configuration (RESP-3; src/pages/dashboard/DashboardNumberTiles.jsx:30)
  - **Low** Grid container lacks withRowGap or vertical row-gap configuration (RESP-4; src/pages/dashboard/DashboardURLParameters.jsx:24)
  - **Low** Grid container lacks withRowGap or vertical row-gap configuration (RESP-5; src/pages/dashboard/DashboardVisualizations.jsx:22)
  - **Low** Carbon Column missing responsive props: sm, md, lg (RESP-6; src/pages/welcome/WelcomeFetchingSection.jsx:61)

- **Add responsive props (sm, md, lg) to the one Carbon Column missing them; add withRowGap to Grid containers.**
- To reach 100: Grid container lacks withRowGap or vertical row-gap configuration (+2.3, S); Carbon Column missing responsive props: sm, md, lg (+1, S)


---


## UX
- **93.7/100** (Strong, confidence Medium, provisional): Strong (93.7) — consistent Carbon patterns used throughout; five hard-coded i18n strings found; one passthrough wrapper pattern identified.
- Issues (6 total, top shown):
  - **Medium** Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) (UX-DOM-1; src/components/profilePanel/ProfilePanel.jsx:50; src/components/profilePanel/ProfilePanel.jsx:54)
  - **Low** Hard-coded user-visible string in JSX: "Page Content" (UX-1; src/layouts/page-layout.jsx:25)
  - **Low** Hard-coded user-visible string in JSX: "Loading welcome page..." (UX-2; src/pages/welcome/Welcome.jsx:22)
  - **Low** Hard-coded user-visible string in JSX: "Blog data retrieval example" (UX-3; src/pages/welcome/post/PostComponent.jsx:52)
  - **Low** Hard-coded user-visible string in JSX: "Comments" (UX-4; src/pages/welcome/post/PostComponent.jsx:63)
  - **Low** Hard-coded user-visible string in JSX: "Something went wrong" (UX-5; src/server.js:117)

- **Route the five hard-coded strings through i18next; review the passthrough wrapper pattern in the Dashboard.**
- To reach 100: Hard-coded user-visible string in JSX: "Page Content" (+2.3, S); Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) (+4, M)


---


## Code quality
- **31/100** (Weak, confidence High): Weak (31) — tooling is correctly installed and configured but the hygiene ladder sits at level 1 (configured, not yet Effective); ESLint and Stylelint lack canary probes; no standalone tsc --noEmit; 18 console.log calls; 3 files using deprecated React APIs; two SCSS files with hardcoded colours.
- Issues (5 total, top shown):
  - **Medium** 18 console.log/error/warn calls in source (SCAN-CONSOLE; code-static-scan.js)
  - **Medium** 3 file(s) with deprecated React APIs (findDOMNode, componentWill*, legacy context, string refs) (SCAN-REACT-DEP; code-static-scan.js)
  - **Medium** Hardcoded RGB colors (css-eval:src/components/commonHeader/commonHeader.scss:rgbColors; carbon-css-evaluator; src/components/commonHeader/commonHeader.scss)
  - **Medium** Hardcoded hex colors (css-eval:src/layouts/page-layout.scss:hexColors; carbon-css-evaluator; src/layouts/page-layout.scss)
  - **Low** 1 PropTypes mutation(s) (ComponentName.propTypes = ...) (SCAN-PROPTYPES; code-static-scan.js)

- **Add tsc --noEmit to CI; add canary test fixtures so ESLint and Stylelint are proved to catch violations; replace console.log with proper logging; migrate deprecated React APIs; fix hardcoded SCSS colours to Carbon tokens.**
- To reach 43: 18 console.log/error/warn calls in source (+4, S); Hardcoded RGB colors (+4, S); Hardcoded hex colors (+4, S)


---


## Testing
- **80/100** (Good, confidence High): Good (80) — Vitest, React Testing Library and MSW are present and tests pass; no coverage thresholds set; no jest-axe or axe integration.
- Issues (0 total, top shown):

- **Set coverage thresholds in vitest.config; add jest-axe or @axe-core/react to at least one component test.**
- To reach 90: Unit/component test suite runs and passes; framework matches React version (+10, M)


---


## Security
- **35/100** (Weak, confidence Medium, provisional): Weak (35) — all advisories are in devDependencies (no production CVEs); local server missing CSP, frame-ancestors, X-Content-Type-Options, Referrer-Policy and Permissions-Policy headers; X-Powered-By exposes Express version.
- Issues (181 total, top shown):
  - **High** handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) (DEP-AN-22; npm audit: handlebars critical (3.0.0 - 4.7.9) Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937); https://github.com/advisories/GHSA-xw65-4hp5-5hc7)
  - **High** shell-quote: critical advisory (dev-only), shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token (DEP-AN-38; npm audit: shell-quote critical (1.8.4 - 1.10.0) shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token; https://github.com/advisories/GHSA-pqg4-j6r4-53mv)
  - **Medium** @double-great/stylelint-a11y: high advisory (dev-only), via stylelint (DEP-AN-1; npm audit: @double-great/stylelint-a11y high (*) via stylelint)
  - **Medium** @lhci/utils: high advisory (dev-only), via js-yaml, lighthouse (DEP-AN-2; npm audit: @lhci/utils high (>=0.3.6) via js-yaml, lighthouse)
  - **Medium** @puppeteer/browsers: high advisory (dev-only), via extract-zip, proxy-agent (DEP-AN-3; npm audit: @puppeteer/browsers high (*) via extract-zip, proxy-agent)
  - **Medium** @semantic-release/changelog: high advisory (dev-only), via semantic-release (DEP-AN-4; npm audit: @semantic-release/changelog high (>=6.0.0) via semantic-release)
  - **Medium** @semantic-release/commit-analyzer: high advisory (dev-only), via micromatch, semantic-release (DEP-AN-5; npm audit: @semantic-release/commit-analyzer high (>=7.0.0-beta.1) via micromatch, semantic-release)

- **Add HTTP security headers to the Express server (helmet or manual res.setHeader); remove X-Powered-By.**
- To reach 51: handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) (+16, S)


---




## Not assessed

These checks had no evidence, so the affected scores are provisional. Supplying the evidence listed completes them.

| Dimension | Check | Evidence needed |
|---|---|---|
| performance | CWV-02 | Live user interaction trace (Chrome DevTools Performance panel trace or RUM telemetry) |
| performance | CWV-08 | Chrome User Experience Report (CrUX) or Real User Monitoring (RUM) field data |
| accessibility | A11Y-09 | Manual focus-visible check in browser to confirm outline:0 has no visible replacement style. |
| accessibility | A11Y-15 | Contrast ratio measurement in each Carbon theme (white, g10, g90, g100) using axe or DevTools. |
| accessibility | A11Y-17 | 320px viewport screenshot or scrollWidth check confirming no horizontal scrollbar. |
| accessibility | A11Y-18 | Text-spacing bookmarklet (1.4.12) applied; screenshot confirming no content loss. |
| accessibility | A11Y-21 | Screen reader pass: in-page status messages announced via live region. |
| accessibility | A11Y-LH-focusable-controls | Manual verification of "Interactive controls are keyboard focusable" on http://localhost:5173/dashboard. Lighthouse audit: focusable-controls. |
| accessibility | A11Y-LH-interactive-element-affordance | Manual verification of "Interactive elements indicate their purpose and state" on http://localhost:5173/dashboard. Lighthouse audit: interactive-element-affordance. |
| accessibility | A11Y-LH-logical-tab-order | Manual verification of "The page has a logical tab order" on http://localhost:5173/dashboard. Lighthouse audit: logical-tab-order. |
| accessibility | A11Y-LH-visual-order-follows-dom | Manual verification of "Visual order on the page follows DOM order" on http://localhost:5173/dashboard. Lighthouse audit: visual-order-follows-dom. |
| accessibility | A11Y-LH-focus-traps | Manual verification of "User focus is not accidentally trapped in a region" on http://localhost:5173/dashboard. Lighthouse audit: focus-traps. |
| accessibility | A11Y-LH-managed-focus | Manual verification of "The user's focus is directed to new content added to the page" on http://localhost:5173/dashboard. Lighthouse audit: managed-focus. |
| accessibility | A11Y-LH-use-landmarks | Manual verification of "HTML5 landmark elements are used to improve navigation" on http://localhost:5173/dashboard. Lighthouse audit: use-landmarks. |
| accessibility | A11Y-LH-offscreen-content-hidden | Manual verification of "Offscreen content is hidden from assistive technology" on http://localhost:5173/dashboard. Lighthouse audit: offscreen-content-hidden. |
| accessibility | A11Y-LH-custom-controls-labels | Manual verification of "Custom controls have associated labels" on http://localhost:5173/dashboard. Lighthouse audit: custom-controls-labels. |
| accessibility | A11Y-LH-custom-controls-roles | Manual verification of "Custom controls have ARIA roles" on http://localhost:5173/dashboard. Lighthouse audit: custom-controls-roles. |
| accessibility | A11Y-LH-focusable-controls-home | Manual verification of "Interactive controls are keyboard focusable" on http://localhost:5173/. Lighthouse audit: focusable-controls. |
| accessibility | A11Y-LH-interactive-element-affordance-home | Manual verification of "Interactive elements indicate their purpose and state" on http://localhost:5173/. Lighthouse audit: interactive-element-affordance. |
| accessibility | A11Y-LH-logical-tab-order-home | Manual verification of "The page has a logical tab order" on http://localhost:5173/. Lighthouse audit: logical-tab-order. |
| accessibility | A11Y-LH-visual-order-follows-dom-home | Manual verification of "Visual order on the page follows DOM order" on http://localhost:5173/. Lighthouse audit: visual-order-follows-dom. |
| accessibility | A11Y-LH-focus-traps-home | Manual verification of "User focus is not accidentally trapped in a region" on http://localhost:5173/. Lighthouse audit: focus-traps. |
| accessibility | A11Y-LH-managed-focus-home | Manual verification of "The user's focus is directed to new content added to the page" on http://localhost:5173/. Lighthouse audit: managed-focus. |
| accessibility | A11Y-LH-use-landmarks-home | Manual verification of "HTML5 landmark elements are used to improve navigation" on http://localhost:5173/. Lighthouse audit: use-landmarks. |
| accessibility | A11Y-LH-offscreen-content-hidden-home | Manual verification of "Offscreen content is hidden from assistive technology" on http://localhost:5173/. Lighthouse audit: offscreen-content-hidden. |
| accessibility | A11Y-LH-custom-controls-labels-home | Manual verification of "Custom controls have associated labels" on http://localhost:5173/. Lighthouse audit: custom-controls-labels. |
| accessibility | A11Y-LH-custom-controls-roles-home | Manual verification of "Custom controls have ARIA roles" on http://localhost:5173/. Lighthouse audit: custom-controls-roles. |
| responsive | RESP-06 | Live browser viewport sweep across 320, 480, 768, 1056, 1312, 1584 px using Chrome DevTools MCP |
| responsive | RESP-07 | Live browser reflow test at 400% zoom (1280x1024 / 320 CSS px) for WCAG 1.4.10 compliance |
| responsive | RESP-08 | Live browser text zoom test at 200% (WCAG 1.4.4) |
| ux | UX-07 | Visual audit of page header patterns across active routes to verify header consistency |
| ux | UX-08 | Live test of empty, loading, and error states under simulated network/API failure |
| ux | UX-DOM-LIVE-DEPTH | Live DOM tree inspection snippet run via chrome-devtools evaluate_script to verify rendered browser depth |
| security | SEC-04 | The page URL (pass --page-url or use --url) |


