<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# carbon-react-starter: Executive Summary

**Review date:** 2026-10-22 · **Rubric:** v1.0.0
**Trend:** First run: no previous run to compare with.

---

## 1. Purpose and scope

carbon-react-starter is a reference implementation of good front-end development practice built on Carbon Design System, React 19, React Router v8, Vite 8 and Express. It is used as a starting template for new IBM front-end projects.

The review produced **206 findings**: 0 Critical, 3 High, 79 Medium, 121 Low. This document translates them into business risk, proposed action and investment.

---

## 2. Overall technical health

| | |
|---|---|
| **Health rating** | Fair (66.1 / 100), provisional |
| **Overall score** | 66.1 / 100 (Fair, provisional) |
| **Accessibility (Lighthouse automated)** | 97–98 / 100 on home and dashboard |
| **Responsive** | 96.7 / 100 (Strong) |
| **Node version** | 24.21.0 |
| **Critical CVEs in production deps** | 0 |
| **Security header findings** | 3 Medium (CSP absent, no frame-ancestors, no X-Content-Type-Options) |


The product scores 66.1 / 100 (Fair, provisional) on its first automated review. Responsive and UX dimensions are Strong; performance and testing are Good. The overall score is held back by two Weak dimensions: code quality (31) and security (35). Code quality is weak primarily because the hygiene ladder shows tooling that is configured but not yet at the Effective level — ESLint, Stylelint and the type checker run clean but canary probes could not confirm that violations are caught before merge. Security is weak because the local Express server ships without the HTTP security headers required by OWASP A05. Both are readily fixable. The score is provisional because Lighthouse performance metrics were not collected (the DevTools MCP `lighthouse_audit` tool does not return performance category scores; a CLI Lighthouse run is needed for full performance scoring).

### Scores by dimension

| Dimension | Score | Band | Confidence | Change |
|---|---|---|---|---|
| Performance | 81 | Good | Medium (provisional) |  |
| Accessibility | 60.6 | Fair | Low (provisional) |  |
| Responsive design | 96.7 | Strong | Medium (provisional) |  |
| UX | 93.7 | Strong | Medium (provisional) |  |
| Code quality | 31 | Weak | High |  |
| Testing | 80 | Good | High |  |
| Security | 35 | Weak | Medium (provisional) |  |


A score of 90 or more means no Critical or High issues and the stated standard is met. Each dimension's quick-reference entry lists the points available and the actions that earn them.

---

## 3. Key findings and business impact

| Area | Key finding | Business exposure | Priority |
|---|---|---|---|
| **Code quality — tooling hygiene** | ESLint, Stylelint and the TypeScript checker are installed and run clean, but there is no standalone tsc --noEmit in CI and no canary probes confirming that violations are actually caught. The hygiene ladder rates this as level 1 (configured) rather than level 3 (effective), which is the primary driver of the Weak code quality score. | Regressions in type safety and lint rules could reach the main branch undetected. | **High — foundational for a template repo that sets the bar for new projects** |
| **Security — HTTP headers** | The Express server does not send Content-Security-Policy, X-Content-Type-Options, frame-ancestors (or X-Frame-Options), Referrer-Policy or Permissions-Policy. X-Powered-By reveals Express is in use. | Projects forked from this template will inherit the missing headers. For a local dev/demo server the direct risk is low; for any deployment the risk is Medium. | **Medium — easy to fix; one helmet.js call or five res.setHeader calls in server.js** |
| **Performance — CSS payload** | The initial CSS bundle is 2001 KiB (2 MiB), against a threshold of 750 KiB. This is largely caused by the full @carbon/react stylesheet being imported. Lighthouse performance category scores were not captured in this run. | Slow first-paint on lower-end devices or constrained networks. | **Medium — a Vite CSS code-split or per-component import strategy could reduce this significantly** |
| **Accessibility — skip link** | The skip-to-content link updates the URL hash on activation but does not move keyboard focus to the main content region. This is a WCAG 2.4.1 (A) violation. Lighthouse also reports that the skip link element is not keyboard-focusable. | Keyboard-only users cannot skip repetitive navigation, which is a core accessibility failure. | **Low effort, High standards impact — one component-fix of size S** |


---

## 4. Remediation plan and roadmap

Three phases ordered by impact-to-effort ratio. Phase 1 completes in a single sprint and raises the score by roughly 15 points. Phases 2 and 3 address the CSS payload, test coverage and remaining dependency hygiene.

### Phase 1 — Security headers and tooling foundations (1 sprint)

All items are S or M effort with no architectural risk. Bob can draft and verify most of these.

- Add helmet (or equivalent) to Express server to set CSP, X-Content-Type-Options, frame-ancestors, Referrer-Policy, Permissions-Policy; disable X-Powered-By.
- Add tsc --noEmit to CI (builds on the TypeScript branch next; pave the way).
- Add canary test fixtures for ESLint and Stylelint (one file that deliberately breaks a rule; CI checks that lint fails).
- Fix skip-link focus management: move focus to #main-content on activation.
- Fix heading order on the Welcome page.
- Replace 18 console.log/warn/error calls with a logger or remove them.


### Phase 2 — Code quality and test coverage (1–2 sprints)

Addresses the remaining hygiene gaps and establishes the test safety net needed before larger changes.

- Migrate 3 files using deprecated React APIs (findDOMNode, componentWillMount, legacy lifecycle methods).
- Fix 2 SCSS files with hardcoded hex/RGB colours — replace with Carbon design tokens.
- Set coverage thresholds in vitest.config (suggest 70 % line as an initial baseline).
- Add jest-axe or @axe-core/react to at least one component test.
- Route 5 hard-coded i18n strings through i18next.


### Phase 3 — Performance and dependency hygiene (ongoing)

Longer-horizon work that benefits from the TypeScript branch progressing.

- Investigate CSS code-splitting to reduce the 2 MiB initial CSS payload (per-component @carbon/react imports or lazy-loaded route CSS).
- Run CLI Lighthouse (desktop + mobile, 3 runs per page) to complete performance scoring.
- Address the 3 major-version outdated direct devDependencies (ESLint 9→10, MSW 2→3 already on a Renovate schedule).
- Resolve or suppress devDependency advisories via Renovate; confirm none affect the production bundle.



---

## 5. Required investment and expected outcomes


### Effort: unassisted and with IBM Bob

Bob uplift percentages are unvalidated starting assumptions (plan D4). Replace with measured values once three items per work type are complete.

| Work item | Work type | Confidence | Unassisted (weeks) | With Bob (weeks) | Saving |
|---|---|---|---|---|---|
| 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) | dom-structure | Low | 0.5 | 0.3, 0.5 | 10, 40 % |
| Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) | mechanical | High | 1.5 | 0.5, 0.8 | 50, 70 % |
| No source maps generated for build output (hinders performance tracing and error analysis) | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| Informational audit 'has-hsts' has score 1 but reports: No HSTS header found | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| Skip links are not focusable. (1 instance) on http://localhost:5173/dashboard | dom-structure | Low | 0.5 | 0.3, 0.5 | 10, 40 % |
| Heading elements are not in a sequentially-descending order (1 instance) on http://localhost:5173/ | dom-structure | Low | 0.5 | 0.3, 0.5 | 10, 40 % |
| Skip links are not focusable. (1 instance) on http://localhost:5173/ | dom-structure | Low | 0.5 | 0.3, 0.5 | 10, 40 % |
| Focus management in modals and panels — Skip-to-content link updates the URL on activation but does not move focus to the main content region and does not dismiss or hide the button. The main journey (tab through page, interactive elements) is otherwise good. | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Grid container lacks withRowGap or vertical row-gap configuration | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Grid container lacks withRowGap or vertical row-gap configuration | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Grid container lacks withRowGap or vertical row-gap configuration | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Grid container lacks withRowGap or vertical row-gap configuration | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Grid container lacks withRowGap or vertical row-gap configuration | component-fix | High | 0.5 | 0.3, 0.4 | 30, 50 % |
| Carbon Column missing responsive props: sm, md, lg | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hard-coded user-visible string in JSX: "Page Content" | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hard-coded user-visible string in JSX: "Loading welcome page..." | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hard-coded user-visible string in JSX: "Blog data retrieval example" | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hard-coded user-visible string in JSX: "Comments" | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hard-coded user-visible string in JSX: "Something went wrong" | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Identified 2 distinct passthrough wrapper pattern(s) in JSX trees (pilot recommended) | dom-structure | Low | 1.5 | 0.9, 1.4 | 10, 40 % |
| 18 console.log/error/warn calls in source | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| 3 file(s) with deprecated React APIs (findDOMNode, componentWill*, legacy context, string refs) | component-refactor | Medium-High | 1.5 | 0.8, 0.9 | 40, 45 % |
| 1 PropTypes mutation(s) (ComponentName.propTypes = ...) | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hardcoded RGB colors | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| Hardcoded hex colors | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |
| @double-great/stylelint-a11y: high advisory (dev-only), via stylelint | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| @lhci/utils: high advisory (dev-only), via js-yaml, lighthouse | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @puppeteer/browsers: high advisory (dev-only), via extract-zip, proxy-agent | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @semantic-release/changelog: high advisory (dev-only), via semantic-release | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @semantic-release/commit-analyzer: high advisory (dev-only), via micromatch, semantic-release | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @semantic-release/git: high advisory (dev-only), via micromatch, semantic-release | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| @semantic-release/github: high advisory (dev-only), via semantic-release | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @semantic-release/npm: high advisory (dev-only), via semantic-release | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @semantic-release/release-notes-generator: high advisory (dev-only), via semantic-release | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @unlighthouse/cli: high advisory (dev-only), via @lhci/utils, @unlighthouse/core, @unlighthouse/server | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @unlighthouse/core: high advisory (dev-only), via @puppeteer/browsers, lighthouse, puppeteer-cluster | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @unlighthouse/server: high advisory (dev-only), via @unlighthouse/core, listhen | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| argparse: moderate advisory (dev-only), via sprintf-js | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| basic-ftp: high advisory (dev-only), basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory-listing parser (RE_LINE backtracking) | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| brace-expansion: high advisory (dev-only), brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service; brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| braces: high advisory (dev-only), braces vulnerable to stack-exhaustion denial of service through deeply nested patterns | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| extract-zip: high advisory (dev-only), extract-zip unvalidated symlink path traversal; extract-zip allows arbitrary file writes through symlink archive entries | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| fast-glob: high advisory (dev-only), via micromatch | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| get-uri: high advisory (dev-only), via basic-ftp | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| globby: high advisory (dev-only), via fast-glob, micromatch | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| http-cache-semantics: high advisory (dev-only), http-cache-semantics max-stale handling can disclose cross-user cached responses | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| ip-address: moderate advisory (dev-only), ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, allowing SSRF and trust-boundary bypass to on-link hosts; ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, allowing SSRF and trust-boundary bypass | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| js-yaml: moderate advisory (dev-only), via argparse | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| launch-editor: high advisory (dev-only), launch-editor: escapeCmdArgs() omits % escaping on Windows; launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| lighthouse: high advisory (dev-only), via puppeteer-core, puppeteer-core | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| listhen: high advisory (dev-only), via node-forge | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| micromatch: high advisory (dev-only), via braces | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| node-forge: high advisory (dev-only), node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| pac-proxy-agent: high advisory (dev-only), via get-uri | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| postcss-selector-parser: moderate advisory (dev-only), PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| proxy-agent: high advisory (dev-only), via pac-proxy-agent | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| puppeteer: high advisory (dev-only), via @puppeteer/browsers, puppeteer-core | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| puppeteer-cluster: high advisory (dev-only), via puppeteer | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| puppeteer-core: high advisory (dev-only), via @puppeteer/browsers, @puppeteer/browsers | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| semantic-release: high advisory (dev-only), via @semantic-release/commit-analyzer, @semantic-release/github, @semantic-release/npm | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| shell-quote: critical advisory (dev-only), shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| sprintf-js: moderate advisory (dev-only), sprintf-js vulnerable to denial of service through unbounded precision specifiers | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| stylelint: high advisory (dev-only), via fast-glob, globby, micromatch | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-config-recommended: high advisory (dev-only), via stylelint | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-config-recommended-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended, stylelint-scss | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-config-standard: high advisory (dev-only), via stylelint, stylelint-config-recommended | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-config-standard-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended-scss, stylelint-config-standard | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-plugin-carbon-tokens: high advisory (dev-only), via stylelint | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| stylelint-scss: high advisory (dev-only), via stylelint | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| stylelint-use-logical: high advisory (dev-only), via stylelint | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| undici: high advisory (dev-only), undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression; undici vulnerable to downstream response splitting via retry interceptor | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| unlighthouse: high advisory (dev-only), via @unlighthouse/cli, @unlighthouse/core | dependency-major | Low-Medium | 0.5 | 0.4, 0.4 | 20, 25 % |
| @eslint/js 9.39.5 is 1 major version(s) behind 10.0.1 (no documented migration), dev-only | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| eslint 9.39.5 is 1 major version(s) behind 10.13.0 (no documented migration), dev-only | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| msw 2.15.0 is 1 major version(s) behind 3.0.3 (no documented migration), dev-only | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| 27 package(s) have patch or minor updates pending | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| ansi-styles is installed in 4 major versions (3, 4, 5, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| chalk is installed in 4 major versions (2, 4, 5, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| get-stream is installed in 4 major versions (5, 6, 8, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| lru-cache is installed in 4 major versions (5, 7, 10, 11) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| react-is is installed in 4 major versions (16, 17, 18, 19) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| supports-color is installed in 4 major versions (5, 7, 8, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| type-fest is installed in 4 major versions (1, 2, 4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| cliui is installed in 3 major versions (7, 8, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| dot-prop is installed in 3 major versions (5, 9, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| emoji-regex is installed in 3 major versions (8, 9, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| escape-string-regexp is installed in 3 major versions (1, 4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| execa is installed in 3 major versions (8, 9, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| has-flag is installed in 3 major versions (3, 4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| marked is installed in 3 major versions (15, 17, 18) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| p-limit is installed in 3 major versions (1, 3, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| parse-json is installed in 3 major versions (4, 5, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| parse5 is installed in 3 major versions (5, 6, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| semver is installed in 3 major versions (5, 6, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| string-width is installed in 3 major versions (4, 7, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| undici is installed in 3 major versions (6, 7, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| which is installed in 3 major versions (1, 2, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| yallist is installed in 3 major versions (3, 4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| yargs is installed in 3 major versions (16, 17, 18) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| yargs-parser is installed in 3 major versions (20, 21, 22) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @babel/runtime is installed in 2 major versions (7, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @octokit/openapi-types is installed in 2 major versions (27, 28) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @octokit/types is installed in 2 major versions (16, 17) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @puppeteer/browsers is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @sentry/core is installed in 2 major versions (7, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @sentry/node is installed in 2 major versions (7, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @sindresorhus/is is installed in 2 major versions (4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @vueuse/core is installed in 2 major versions (10, 14) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @vueuse/metadata is installed in 2 major versions (10, 14) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @vueuse/shared is installed in 2 major versions (10, 14) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| agent-base is installed in 2 major versions (7, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| ajv is installed in 2 major versions (6, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| ansi-regex is installed in 2 major versions (5, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| argparse is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| balanced-match is installed in 2 major versions (1, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| brace-expansion is installed in 2 major versions (1, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| chromium-bidi is installed in 2 major versions (14, 17) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| color-convert is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| configstore is installed in 2 major versions (5, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| content-type is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| cookie is installed in 2 major versions (0, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| cookie-es is installed in 2 major versions (1, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| crypto-random-string is installed in 2 major versions (2, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| debug is installed in 2 major versions (2, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| entities is installed in 2 major versions (7, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| env-paths is installed in 2 major versions (2, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| eslint-visitor-keys is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| estree-walker is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| figures is installed in 2 major versions (2, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| file-entry-cache is installed in 2 major versions (8, 11) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| find-up is installed in 2 major versions (2, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| flat-cache is installed in 2 major versions (4, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| glob-parent is installed in 2 major versions (5, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| globals is installed in 2 major versions (14, 17) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| hookified is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| hosted-git-info is installed in 2 major versions (7, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| http-proxy-agent is installed in 2 major versions (7, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| https-proxy-agent is installed in 2 major versions (7, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| human-signals is installed in 2 major versions (5, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| ignore is installed in 2 major versions (5, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| import-fresh is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| indent-string is installed in 2 major versions (4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| ini is installed in 2 major versions (1, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| is-stream is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| isarray is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| isexe is installed in 2 major versions (2, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| js-tokens is installed in 2 major versions (4, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| js-yaml is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| json-parse-even-better-errors is installed in 2 major versions (2, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| json-schema-traverse is installed in 2 major versions (0, 1) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| keyv is installed in 2 major versions (4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| lighthouse is installed in 2 major versions (12, 13) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| locate-path is installed in 2 major versions (2, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| magic-string is installed in 2 major versions (0, 1) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| meow is installed in 2 major versions (13, 14) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| mimic-response is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| minimatch is installed in 2 major versions (3, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| minipass is installed in 2 major versions (3, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| negotiator is installed in 2 major versions (0, 1) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| normalize-package-data is installed in 2 major versions (6, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| normalize-url is installed in 2 major versions (8, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| npm-run-path is installed in 2 major versions (5, 6) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| p-locate is installed in 2 major versions (2, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| path-exists is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| path-key is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| picomatch is installed in 2 major versions (2, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| pkg-types is installed in 2 major versions (1, 2) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| puppeteer-core is installed in 2 major versions (24, 25) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| read-package-up is installed in 2 major versions (11, 12) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| read-pkg is installed in 2 major versions (9, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| resolve-from is installed in 2 major versions (4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| signal-exit is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| socks-proxy-agent is installed in 2 major versions (8, 10) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| spdx-expression-parse is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| strip-ansi is installed in 2 major versions (6, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| strip-final-newline is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| strip-json-comments is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| supports-hyperlinks is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| tldts-core is installed in 2 major versions (6, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| tldts-icann is installed in 2 major versions (6, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| tr46 is installed in 2 major versions (0, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| unctx is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| unique-string is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| unplugin is installed in 2 major versions (2, 3) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| webidl-conversions is installed in 2 major versions (3, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| whatwg-url is installed in 2 major versions (5, 17) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| wrap-ansi is installed in 2 major versions (7, 9) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| write-file-atomic is installed in 2 major versions (3, 7) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| ws is installed in 2 major versions (7, 8) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| xdg-basedir is installed in 2 major versions (4, 5) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| yocto-queue is installed in 2 major versions (0, 1) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| zod is installed in 2 major versions (3, 4) | dependency-major | Low-Medium | 1.5 | 1.1, 1.2 | 20, 25 % |
| @ibm/plex is declared but not imported (heuristic, verify before removing) | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| react-is is declared but not imported (heuristic, verify before removing) | dependency-minor | Medium-High | 0.5 | 0.3, 0.3 | 40, 46 % |
| @cspell/dict-de-de is licensed LGPL-3.0 (copyleft) | human-org | High | 1.5 | 1.5, 1.5 | 0, 0 % |
| node-forge is licensed (BSD-3-Clause OR GPL-2.0) (dual (check the permissive option)) | human-org | High | 1.5 | 1.5, 1.5 | 0, 0 % |
| No Content-Security-Policy header | config-infra | High | 1.5 | 0.6, 0.9 | 40, 60 % |
| No frame control: no frame-ancestors in an enforcing CSP and no X-Frame-Options | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| X-Content-Type-Options: nosniff is not set | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| No Referrer-Policy header | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| No Permissions-Policy header | config-infra | High | 0.5 | 0.2, 0.3 | 40, 60 % |
| Response reveals server or framework version | mechanical | High | 0.5 | 0.2, 0.3 | 50, 70 % |


| Total | Unassisted (weeks) | With Bob (weeks) | Saving |
|---|---|---|---|
| Known-confidence items | 223 | 159.2, 174.1 | 22, 29 % |
| Low-confidence items, unpiloted (range) | 3.5 | 2.1, 3.4 | 3, 40 % |

Work Bob cannot affect: 3 weeks. Biggest Bob levers: BUN-CSS-PAYLOAD-1, SCAN-REACT-DEP, SEC-HDR-1. No Bob benefit: DEP-AN-172, DEP-AN-173.

Pilot recommended before committing to a figure for: PERF-STATIC-IMG-SIZE-1, LH-R01-001, LH-R03-003, LH-R03-004, UX-DOM-1.

Review capacity not supplied; calendar time is not estimated. Ask in the interview.


### Staffing model

| Role | FTE | Primary responsibility |
|---|---|---|
| Front-end developer |  |  |


Calendar estimates are omitted because PR review capacity was not provided. Phase 1 is 1 sprint of parallelisable S/M items. Phase 2 is 1–2 sprints. Phase 3 is ongoing maintenance.

### Expected outcomes

| Metric | Current state | Target |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |


### Key risk if deferred

If security headers are not added before this template is used as a base for a deployed product, the inheriting project will launch with known OWASP A05 gaps. The code quality hygiene gap means regressions can reach main silently. Neither risk is blocking for a demo/reference repo, but both are blocking before recommending this as a production-ready template.

---

## 6. Governance and success criteria

Track progress against measurable, automated gates rather than a one-time audit:

- Security headers passing a standard header scan before recommending as production template.
- Canary probes green in CI (ESLint and Stylelint proved effective) before claiming level 3 hygiene.
- Coverage thresholds set and enforced before declaring test safety net adequate.

- Re-run the review each quarter. The score and finding keys are compared with the previous run automatically.
