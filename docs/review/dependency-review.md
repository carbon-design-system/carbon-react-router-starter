<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Dependency review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 35 / 100 (Weak, confidence Medium), provisional
**Trend:** first run

Score 35 / 100 (Weak, confidence Medium, provisional). 181 findings: 2 High, 69 Medium, 107 Low, 3 Info. Trend: first run.

## Biggest point-losers

| Check | Severity | Instances | Points lost | Effort |
|---|---|---|---|---|
| DEP-03: handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) | High | 2 | 16 | S |
| DEP-03: @double-great/stylelint-a11y: high advisory (dev-only), via stylelint | Medium | 41 | 10 | S |
| DEP-13: ansi-styles is installed in 4 major versions (3, 4, 5, 6) | Medium | 24 | 10 | M |
| DEP-19: 27 package(s) have patch or minor updates pending | Medium | 1 | 4 | S |
| SEC-06: No Content-Security-Policy header | Medium | 1 | 4 | M |


## Findings

| Id | Severity | Finding | Location | Evidence | Standard | Effort | Work type | Fix |
|---|---|---|---|---|---|---|---|---|
| DEP-AN-22 | High | handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) | handlebars | npm audit: handlebars critical (3.0.0 - 4.7.9) Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937); https://github.com/advisories/GHSA-xw65-4hp5-5hc7 (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-38 | High | shell-quote: critical advisory (dev-only), shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token | shell-quote | npm audit: shell-quote critical (1.8.4 - 1.10.0) shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token; https://github.com/advisories/GHSA-pqg4-j6r4-53mv (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-1 | Medium | @double-great/stylelint-a11y: high advisory (dev-only), via stylelint | @double-great/stylelint-a11y | npm audit: @double-great/stylelint-a11y high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-2 | Medium | @lhci/utils: high advisory (dev-only), via js-yaml, lighthouse | @lhci/utils | npm audit: @lhci/utils high (>=0.3.6) via js-yaml, lighthouse (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-3 | Medium | @puppeteer/browsers: high advisory (dev-only), via extract-zip, proxy-agent | @puppeteer/browsers | npm audit: @puppeteer/browsers high (*) via extract-zip, proxy-agent (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-4 | Medium | @semantic-release/changelog: high advisory (dev-only), via semantic-release | @semantic-release/changelog | npm audit: @semantic-release/changelog high (>=6.0.0) via semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-5 | Medium | @semantic-release/commit-analyzer: high advisory (dev-only), via micromatch, semantic-release | @semantic-release/commit-analyzer | npm audit: @semantic-release/commit-analyzer high (>=7.0.0-beta.1) via micromatch, semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-6 | Medium | @semantic-release/git: high advisory (dev-only), via micromatch, semantic-release | @semantic-release/git | npm audit: @semantic-release/git high (*) via micromatch, semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-7 | Medium | @semantic-release/github: high advisory (dev-only), via semantic-release | @semantic-release/github | npm audit: @semantic-release/github high (5.3.0-beta.1 - 5.3.0-beta.8 \|\| 5.4.0-beta.1 \|\| 5.5.0-beta.1 \|\| >=5.6.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-8 | Medium | @semantic-release/npm: high advisory (dev-only), via semantic-release | @semantic-release/npm | npm audit: @semantic-release/npm high (>=6.0.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-9 | Medium | @semantic-release/release-notes-generator: high advisory (dev-only), via semantic-release | @semantic-release/release-notes-generator | npm audit: @semantic-release/release-notes-generator high (>=10.0.0-beta.1) via semantic-release (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-10 | Medium | @unlighthouse/cli: high advisory (dev-only), via @lhci/utils, @unlighthouse/core, @unlighthouse/server | @unlighthouse/cli | npm audit: @unlighthouse/cli high (0.3.8 - 0.3.15 \|\| >=0.4.3) via @lhci/utils, @unlighthouse/core, @unlighthouse/server (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-11 | Medium | @unlighthouse/core: high advisory (dev-only), via @puppeteer/browsers, lighthouse, puppeteer-cluster | @unlighthouse/core | npm audit: @unlighthouse/core high (0.8.7 - 0.19.1) via @puppeteer/browsers, lighthouse, puppeteer-cluster (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-12 | Medium | @unlighthouse/server: high advisory (dev-only), via @unlighthouse/core, listhen | @unlighthouse/server | npm audit: @unlighthouse/server high (0.3.8 - 0.3.15 \|\| >=0.4.3) via @unlighthouse/core, listhen (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-14 | Medium | basic-ftp: high advisory (dev-only), basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory-listing parser (RE_LINE backtracking) | basic-ftp | npm audit: basic-ftp high (<=6.2.0) basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory-listing parser (RE_LINE backtracking); https://github.com/advisories/GHSA-c475-qrg2-pj4r (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-15 | Medium | brace-expansion: high advisory (dev-only), brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service; brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion | brace-expansion | npm audit: brace-expansion high (4.0.0 - 5.0.11) brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service; brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion; https://github.com/advisories/GHSA-q2hr-2g5m-vwhr (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-16 | Medium | braces: high advisory (dev-only), braces vulnerable to stack-exhaustion denial of service through deeply nested patterns | braces | npm audit: braces high (*) braces vulnerable to stack-exhaustion denial of service through deeply nested patterns; https://github.com/advisories/GHSA-vfj7-8cjw-p6xm (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-18 | Medium | extract-zip: high advisory (dev-only), extract-zip unvalidated symlink path traversal; extract-zip allows arbitrary file writes through symlink archive entries | extract-zip | npm audit: extract-zip high (*) extract-zip unvalidated symlink path traversal; extract-zip allows arbitrary file writes through symlink archive entries; https://github.com/advisories/GHSA-jmr9-qjv8-65gv (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-19 | Medium | fast-glob: high advisory (dev-only), via micromatch | fast-glob | npm audit: fast-glob high (*) via micromatch (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-20 | Medium | get-uri: high advisory (dev-only), via basic-ftp | get-uri | npm audit: get-uri high (>=5.0.0) via basic-ftp (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-21 | Medium | globby: high advisory (dev-only), via fast-glob, micromatch | globby | npm audit: globby high (>=8.0.0) via fast-glob, micromatch (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-23 | Medium | http-cache-semantics: high advisory (dev-only), http-cache-semantics max-stale handling can disclose cross-user cached responses | http-cache-semantics | npm audit: http-cache-semantics high (<=4.2.0) http-cache-semantics max-stale handling can disclose cross-user cached responses; https://github.com/advisories/GHSA-ch52-4w7c-c8xp (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-26 | Medium | launch-editor: high advisory (dev-only), launch-editor: escapeCmdArgs() omits % escaping on Windows; launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors | launch-editor | npm audit: launch-editor high (<=2.14.1) launch-editor: escapeCmdArgs() omits % escaping on Windows; launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors; https://github.com/advisories/GHSA-698v-4r3x-3vcv (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-27 | Medium | lighthouse: high advisory (dev-only), via puppeteer-core, puppeteer-core | lighthouse | npm audit: lighthouse high (10.1.1-dev.20230414 - 10.1.1-dev.20230503 \|\| >=10.2.0-dev.20230504) via puppeteer-core, puppeteer-core (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-28 | Medium | listhen: high advisory (dev-only), via node-forge | listhen | npm audit: listhen high (>=0.3.0) via node-forge (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-29 | Medium | micromatch: high advisory (dev-only), via braces | micromatch | npm audit: micromatch high (>=0.2.0) via braces (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-30 | Medium | node-forge: high advisory (dev-only), node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements | node-forge | npm audit: node-forge high (*) node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements; https://github.com/advisories/GHSA-86w9-cpqp-85rv (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-31 | Medium | pac-proxy-agent: high advisory (dev-only), via get-uri | pac-proxy-agent | npm audit: pac-proxy-agent high (>=6.0.0) via get-uri (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-33 | Medium | proxy-agent: high advisory (dev-only), via pac-proxy-agent | proxy-agent | npm audit: proxy-agent high (>=6.0.0) via pac-proxy-agent (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-34 | Medium | puppeteer: high advisory (dev-only), via @puppeteer/browsers, puppeteer-core | puppeteer | npm audit: puppeteer high (>=20.4.0) via @puppeteer/browsers, puppeteer-core (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-35 | Medium | puppeteer-cluster: high advisory (dev-only), via puppeteer | puppeteer-cluster | npm audit: puppeteer-cluster high (>=0.24.0) via puppeteer (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-36 | Medium | puppeteer-core: high advisory (dev-only), via @puppeteer/browsers, @puppeteer/browsers | puppeteer-core | npm audit: puppeteer-core high (>=19.8.4) via @puppeteer/browsers, @puppeteer/browsers (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-37 | Medium | semantic-release: high advisory (dev-only), via @semantic-release/commit-analyzer, @semantic-release/github, @semantic-release/npm | semantic-release | npm audit: semantic-release high (>=16.0.0-beta.1) via @semantic-release/commit-analyzer, @semantic-release/github, @semantic-release/npm (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade @semantic-release/changelog to 5.0.1 (breaking); run the tests. |
| DEP-AN-40 | Medium | stylelint: high advisory (dev-only), via fast-glob, globby, micromatch | stylelint | npm audit: stylelint high (>=7.7.1) via fast-glob, globby, micromatch (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-41 | Medium | stylelint-config-recommended: high advisory (dev-only), via stylelint | stylelint-config-recommended | npm audit: stylelint-config-recommended high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-42 | Medium | stylelint-config-recommended-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended, stylelint-scss | stylelint-config-recommended-scss | npm audit: stylelint-config-recommended-scss high (*) via stylelint, stylelint-config-recommended, stylelint-scss (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-43 | Medium | stylelint-config-standard: high advisory (dev-only), via stylelint, stylelint-config-recommended | stylelint-config-standard | npm audit: stylelint-config-standard high (>=16.0.0) via stylelint, stylelint-config-recommended (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-44 | Medium | stylelint-config-standard-scss: high advisory (dev-only), via stylelint, stylelint-config-recommended-scss, stylelint-config-standard | stylelint-config-standard-scss | npm audit: stylelint-config-standard-scss high (*) via stylelint, stylelint-config-recommended-scss, stylelint-config-standard (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-45 | Medium | stylelint-plugin-carbon-tokens: high advisory (dev-only), via stylelint | stylelint-plugin-carbon-tokens | npm audit: stylelint-plugin-carbon-tokens high (>=3.0.0-rc.0) via stylelint (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade stylelint-plugin-carbon-tokens to 2.8.0 (breaking); run the tests. |
| DEP-AN-46 | Medium | stylelint-scss: high advisory (dev-only), via stylelint | stylelint-scss | npm audit: stylelint-scss high (>=2.0.0) via stylelint (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-47 | Medium | stylelint-use-logical: high advisory (dev-only), via stylelint | stylelint-use-logical | npm audit: stylelint-use-logical high (*) via stylelint (Measured) | A06:2021, CWE-1395 | S | dependency-minor | No fix is published; override, replace the package, or record an accepted risk with an expiry. |
| DEP-AN-48 | Medium | undici: high advisory (dev-only), undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression; undici vulnerable to downstream response splitting via retry interceptor | undici | npm audit: undici high (<=6.28.0) undici vulnerable to Denial of Service via unhandled error in WebSocket permessage-deflate decompression; undici vulnerable to downstream response splitting via retry interceptor; https://github.com/advisories/GHSA-3wwx-pv8p-q78v (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-49 | Medium | unlighthouse: high advisory (dev-only), via @unlighthouse/cli, @unlighthouse/core | unlighthouse | npm audit: unlighthouse high (0.3.13 - 0.3.15 \|\| 0.4.3 - 0.19.1) via @unlighthouse/cli, @unlighthouse/core (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-53 | Medium | 27 package(s) have patch or minor updates pending | package.json | npm outdated: current differs from latest within the same major (Measured) |  | S | dependency-minor | Batch the updates (Renovate group) and run the tests. |
| DEP-AN-54 | Medium | ansi-styles is installed in 4 major versions (3, 4, 5, 6) | ansi-styles | lockfile: ansi-styles majors 3, 4, 5, 6, 9 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-55 | Medium | chalk is installed in 4 major versions (2, 4, 5, 6) | chalk | lockfile: chalk majors 2, 4, 5, 6, 6 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-56 | Medium | get-stream is installed in 4 major versions (5, 6, 8, 9) | get-stream | lockfile: get-stream majors 5, 6, 8, 9, 7 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-57 | Medium | lru-cache is installed in 4 major versions (5, 7, 10, 11) | lru-cache | lockfile: lru-cache majors 5, 7, 10, 11, 11 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-58 | Medium | react-is is installed in 4 major versions (16, 17, 18, 19) | react-is | lockfile: react-is majors 16, 17, 18, 19, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-59 | Medium | supports-color is installed in 4 major versions (5, 7, 8, 10) | supports-color | lockfile: supports-color majors 5, 7, 8, 10, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-60 | Medium | type-fest is installed in 4 major versions (1, 2, 4, 5) | type-fest | lockfile: type-fest majors 1, 2, 4, 5, 7 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-61 | Medium | cliui is installed in 3 major versions (7, 8, 9) | cliui | lockfile: cliui majors 7, 8, 9, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-62 | Medium | dot-prop is installed in 3 major versions (5, 9, 10) | dot-prop | lockfile: dot-prop majors 5, 9, 10, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-63 | Medium | emoji-regex is installed in 3 major versions (8, 9, 10) | emoji-regex | lockfile: emoji-regex majors 8, 9, 10, 9 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-64 | Medium | escape-string-regexp is installed in 3 major versions (1, 4, 5) | escape-string-regexp | lockfile: escape-string-regexp majors 1, 4, 5, 6 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-65 | Medium | execa is installed in 3 major versions (8, 9, 10) | execa | lockfile: execa majors 8, 9, 10, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-66 | Medium | has-flag is installed in 3 major versions (3, 4, 5) | has-flag | lockfile: has-flag majors 3, 4, 5, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-67 | Medium | marked is installed in 3 major versions (15, 17, 18) | marked | lockfile: marked majors 15, 17, 18, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-68 | Medium | p-limit is installed in 3 major versions (1, 3, 6) | p-limit | lockfile: p-limit majors 1, 3, 6, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-69 | Medium | parse-json is installed in 3 major versions (4, 5, 8) | parse-json | lockfile: parse-json majors 4, 5, 8, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-70 | Medium | parse5 is installed in 3 major versions (5, 6, 8) | parse5 | lockfile: parse5 majors 5, 6, 8, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-71 | Medium | semver is installed in 3 major versions (5, 6, 7) | semver | lockfile: semver majors 5, 6, 7, 8 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-72 | Medium | string-width is installed in 3 major versions (4, 7, 8) | string-width | lockfile: string-width majors 4, 7, 8, 9 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-73 | Medium | undici is installed in 3 major versions (6, 7, 8) | undici | lockfile: undici majors 6, 7, 8, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-74 | Medium | which is installed in 3 major versions (1, 2, 6) | which | lockfile: which majors 1, 2, 6, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-75 | Medium | yallist is installed in 3 major versions (3, 4, 5) | yallist | lockfile: yallist majors 3, 4, 5, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-76 | Medium | yargs is installed in 3 major versions (16, 17, 18) | yargs | lockfile: yargs majors 16, 17, 18, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-77 | Medium | yargs-parser is installed in 3 major versions (20, 21, 22) | yargs-parser | lockfile: yargs-parser majors 20, 21, 22, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-13 | Low | argparse: moderate advisory (dev-only), via sprintf-js | argparse | npm audit: argparse moderate (1.0.0 - 1.0.10) via sprintf-js (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-24 | Low | ip-address: moderate advisory (dev-only), ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, allowing SSRF and trust-boundary bypass to on-link hosts; ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, allowing SSRF and trust-boundary bypass | ip-address | npm audit: ip-address moderate (<=10.7.0) ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, allowing SSRF and trust-boundary bypass to on-link hosts; ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, allowing SSRF and trust-boundary bypass; https://github.com/advisories/GHSA-rpw4-54j3-4h4q (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-25 | Low | js-yaml: moderate advisory (dev-only), via argparse | js-yaml | npm audit: js-yaml moderate (3.2.7 - 3.15.2) via argparse (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-32 | Low | postcss-selector-parser: moderate advisory (dev-only), PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion | postcss-selector-parser | npm audit: postcss-selector-parser moderate (<7.1.6) PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion; https://github.com/advisories/GHSA-rj75-hqrm-r3gf (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |
| DEP-AN-39 | Low | sprintf-js: moderate advisory (dev-only), sprintf-js vulnerable to denial of service through unbounded precision specifiers | sprintf-js | npm audit: sprintf-js moderate (*) sprintf-js vulnerable to denial of service through unbounded precision specifiers; https://github.com/advisories/GHSA-hp3w-g68c-fv3c (Measured) | A06:2021, CWE-1395 | S | dependency-major | Upgrade unlighthouse to 0.4.2 (breaking); run the tests. |
| DEP-AN-50 | Low | @eslint/js 9.39.5 is 1 major version(s) behind 10.0.1 (no documented migration), dev-only | @eslint/js | npm outdated: @eslint/js current 9.39.5, latest 10.0.1 (Measured) |  | M | dependency-major | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-51 | Low | eslint 9.39.5 is 1 major version(s) behind 10.13.0 (no documented migration), dev-only | eslint | npm outdated: eslint current 9.39.5, latest 10.13.0 (Measured) |  | M | dependency-major | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-52 | Low | msw 2.15.0 is 1 major version(s) behind 3.0.3 (no documented migration), dev-only | msw | npm outdated: msw current 2.15.0, latest 3.0.3 (Measured) |  | M | dependency-major | Read the changelog for each major, upgrade behind a baseline test net, and verify behaviour by hand. |
| DEP-AN-78 | Low | @babel/runtime is installed in 2 major versions (7, 8) | @babel/runtime | lockfile: @babel/runtime majors 7, 8, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-79 | Low | @octokit/openapi-types is installed in 2 major versions (27, 28) | @octokit/openapi-types | lockfile: @octokit/openapi-types majors 27, 28, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-80 | Low | @octokit/types is installed in 2 major versions (16, 17) | @octokit/types | lockfile: @octokit/types majors 16, 17, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-81 | Low | @puppeteer/browsers is installed in 2 major versions (2, 3) | @puppeteer/browsers | lockfile: @puppeteer/browsers majors 2, 3, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-82 | Low | @sentry/core is installed in 2 major versions (7, 10) | @sentry/core | lockfile: @sentry/core majors 7, 10, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-83 | Low | @sentry/node is installed in 2 major versions (7, 10) | @sentry/node | lockfile: @sentry/node majors 7, 10, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-84 | Low | @sindresorhus/is is installed in 2 major versions (4, 5) | @sindresorhus/is | lockfile: @sindresorhus/is majors 4, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-85 | Low | @vueuse/core is installed in 2 major versions (10, 14) | @vueuse/core | lockfile: @vueuse/core majors 10, 14, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-86 | Low | @vueuse/metadata is installed in 2 major versions (10, 14) | @vueuse/metadata | lockfile: @vueuse/metadata majors 10, 14, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-87 | Low | @vueuse/shared is installed in 2 major versions (10, 14) | @vueuse/shared | lockfile: @vueuse/shared majors 10, 14, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-88 | Low | agent-base is installed in 2 major versions (7, 9) | agent-base | lockfile: agent-base majors 7, 9, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-89 | Low | ajv is installed in 2 major versions (6, 8) | ajv | lockfile: ajv majors 6, 8, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-90 | Low | ansi-regex is installed in 2 major versions (5, 6) | ansi-regex | lockfile: ansi-regex majors 5, 6, 9 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-91 | Low | argparse is installed in 2 major versions (1, 2) | argparse | lockfile: argparse majors 1, 2, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-92 | Low | balanced-match is installed in 2 major versions (1, 4) | balanced-match | lockfile: balanced-match majors 1, 4, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-93 | Low | brace-expansion is installed in 2 major versions (1, 5) | brace-expansion | lockfile: brace-expansion majors 1, 5, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-94 | Low | chromium-bidi is installed in 2 major versions (14, 17) | chromium-bidi | lockfile: chromium-bidi majors 14, 17, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-95 | Low | color-convert is installed in 2 major versions (1, 2) | color-convert | lockfile: color-convert majors 1, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-96 | Low | configstore is installed in 2 major versions (5, 7) | configstore | lockfile: configstore majors 5, 7, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-97 | Low | content-type is installed in 2 major versions (1, 2) | content-type | lockfile: content-type majors 1, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-98 | Low | cookie is installed in 2 major versions (0, 2) | cookie | lockfile: cookie majors 0, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-99 | Low | cookie-es is installed in 2 major versions (1, 3) | cookie-es | lockfile: cookie-es majors 1, 3, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-100 | Low | crypto-random-string is installed in 2 major versions (2, 4) | crypto-random-string | lockfile: crypto-random-string majors 2, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-101 | Low | debug is installed in 2 major versions (2, 4) | debug | lockfile: debug majors 2, 4, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-102 | Low | entities is installed in 2 major versions (7, 8) | entities | lockfile: entities majors 7, 8, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-103 | Low | env-paths is installed in 2 major versions (2, 4) | env-paths | lockfile: env-paths majors 2, 4, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-104 | Low | eslint-visitor-keys is installed in 2 major versions (3, 4) | eslint-visitor-keys | lockfile: eslint-visitor-keys majors 3, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-105 | Low | estree-walker is installed in 2 major versions (2, 3) | estree-walker | lockfile: estree-walker majors 2, 3, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-106 | Low | figures is installed in 2 major versions (2, 6) | figures | lockfile: figures majors 2, 6, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-107 | Low | file-entry-cache is installed in 2 major versions (8, 11) | file-entry-cache | lockfile: file-entry-cache majors 8, 11, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-108 | Low | find-up is installed in 2 major versions (2, 5) | find-up | lockfile: find-up majors 2, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-109 | Low | flat-cache is installed in 2 major versions (4, 6) | flat-cache | lockfile: flat-cache majors 4, 6, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-110 | Low | glob-parent is installed in 2 major versions (5, 6) | glob-parent | lockfile: glob-parent majors 5, 6, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-111 | Low | globals is installed in 2 major versions (14, 17) | globals | lockfile: globals majors 14, 17, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-112 | Low | hookified is installed in 2 major versions (1, 2) | hookified | lockfile: hookified majors 1, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-113 | Low | hosted-git-info is installed in 2 major versions (7, 9) | hosted-git-info | lockfile: hosted-git-info majors 7, 9, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-114 | Low | http-proxy-agent is installed in 2 major versions (7, 9) | http-proxy-agent | lockfile: http-proxy-agent majors 7, 9, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-115 | Low | https-proxy-agent is installed in 2 major versions (7, 9) | https-proxy-agent | lockfile: https-proxy-agent majors 7, 9, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-116 | Low | human-signals is installed in 2 major versions (5, 8) | human-signals | lockfile: human-signals majors 5, 8, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-117 | Low | ignore is installed in 2 major versions (5, 7) | ignore | lockfile: ignore majors 5, 7, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-118 | Low | import-fresh is installed in 2 major versions (3, 4) | import-fresh | lockfile: import-fresh majors 3, 4, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-119 | Low | indent-string is installed in 2 major versions (4, 5) | indent-string | lockfile: indent-string majors 4, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-120 | Low | ini is installed in 2 major versions (1, 6) | ini | lockfile: ini majors 1, 6, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-121 | Low | is-stream is installed in 2 major versions (3, 4) | is-stream | lockfile: is-stream majors 3, 4, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-122 | Low | isarray is installed in 2 major versions (1, 2) | isarray | lockfile: isarray majors 1, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-123 | Low | isexe is installed in 2 major versions (2, 4) | isexe | lockfile: isexe majors 2, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-124 | Low | js-tokens is installed in 2 major versions (4, 10) | js-tokens | lockfile: js-tokens majors 4, 10, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-125 | Low | js-yaml is installed in 2 major versions (3, 4) | js-yaml | lockfile: js-yaml majors 3, 4, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-126 | Low | json-parse-even-better-errors is installed in 2 major versions (2, 5) | json-parse-even-better-errors | lockfile: json-parse-even-better-errors majors 2, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-127 | Low | json-schema-traverse is installed in 2 major versions (0, 1) | json-schema-traverse | lockfile: json-schema-traverse majors 0, 1, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-128 | Low | keyv is installed in 2 major versions (4, 5) | keyv | lockfile: keyv majors 4, 5, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-129 | Low | lighthouse is installed in 2 major versions (12, 13) | lighthouse | lockfile: lighthouse majors 12, 13, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-130 | Low | locate-path is installed in 2 major versions (2, 6) | locate-path | lockfile: locate-path majors 2, 6, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-131 | Low | magic-string is installed in 2 major versions (0, 1) | magic-string | lockfile: magic-string majors 0, 1, 7 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-132 | Low | meow is installed in 2 major versions (13, 14) | meow | lockfile: meow majors 13, 14, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-133 | Low | mimic-response is installed in 2 major versions (3, 4) | mimic-response | lockfile: mimic-response majors 3, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-134 | Low | minimatch is installed in 2 major versions (3, 10) | minimatch | lockfile: minimatch majors 3, 10, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-135 | Low | minipass is installed in 2 major versions (3, 7) | minipass | lockfile: minipass majors 3, 7, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-136 | Low | negotiator is installed in 2 major versions (0, 1) | negotiator | lockfile: negotiator majors 0, 1, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-137 | Low | normalize-package-data is installed in 2 major versions (6, 8) | normalize-package-data | lockfile: normalize-package-data majors 6, 8, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-138 | Low | normalize-url is installed in 2 major versions (8, 9) | normalize-url | lockfile: normalize-url majors 8, 9, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-139 | Low | npm-run-path is installed in 2 major versions (5, 6) | npm-run-path | lockfile: npm-run-path majors 5, 6, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-140 | Low | p-locate is installed in 2 major versions (2, 5) | p-locate | lockfile: p-locate majors 2, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-141 | Low | path-exists is installed in 2 major versions (3, 4) | path-exists | lockfile: path-exists majors 3, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-142 | Low | path-key is installed in 2 major versions (3, 4) | path-key | lockfile: path-key majors 3, 4, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-143 | Low | picomatch is installed in 2 major versions (2, 4) | picomatch | lockfile: picomatch majors 2, 4, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-144 | Low | pkg-types is installed in 2 major versions (1, 2) | pkg-types | lockfile: pkg-types majors 1, 2, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-145 | Low | puppeteer-core is installed in 2 major versions (24, 25) | puppeteer-core | lockfile: puppeteer-core majors 24, 25, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-146 | Low | read-package-up is installed in 2 major versions (11, 12) | read-package-up | lockfile: read-package-up majors 11, 12, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-147 | Low | read-pkg is installed in 2 major versions (9, 10) | read-pkg | lockfile: read-pkg majors 9, 10, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-148 | Low | resolve-from is installed in 2 major versions (4, 5) | resolve-from | lockfile: resolve-from majors 4, 5, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-149 | Low | signal-exit is installed in 2 major versions (3, 4) | signal-exit | lockfile: signal-exit majors 3, 4, 9 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-150 | Low | socks-proxy-agent is installed in 2 major versions (8, 10) | socks-proxy-agent | lockfile: socks-proxy-agent majors 8, 10, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-151 | Low | spdx-expression-parse is installed in 2 major versions (3, 4) | spdx-expression-parse | lockfile: spdx-expression-parse majors 3, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-152 | Low | strip-ansi is installed in 2 major versions (6, 7) | strip-ansi | lockfile: strip-ansi majors 6, 7, 8 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-153 | Low | strip-final-newline is installed in 2 major versions (3, 4) | strip-final-newline | lockfile: strip-final-newline majors 3, 4, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-154 | Low | strip-json-comments is installed in 2 major versions (2, 3) | strip-json-comments | lockfile: strip-json-comments majors 2, 3, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-155 | Low | supports-hyperlinks is installed in 2 major versions (3, 4) | supports-hyperlinks | lockfile: supports-hyperlinks majors 3, 4, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-156 | Low | tldts-core is installed in 2 major versions (6, 7) | tldts-core | lockfile: tldts-core majors 6, 7, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-157 | Low | tldts-icann is installed in 2 major versions (6, 7) | tldts-icann | lockfile: tldts-icann majors 6, 7, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-158 | Low | tr46 is installed in 2 major versions (0, 7) | tr46 | lockfile: tr46 majors 0, 7, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-159 | Low | unctx is installed in 2 major versions (2, 3) | unctx | lockfile: unctx majors 2, 3, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-160 | Low | unique-string is installed in 2 major versions (2, 3) | unique-string | lockfile: unique-string majors 2, 3, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-161 | Low | unplugin is installed in 2 major versions (2, 3) | unplugin | lockfile: unplugin majors 2, 3, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-162 | Low | webidl-conversions is installed in 2 major versions (3, 8) | webidl-conversions | lockfile: webidl-conversions majors 3, 8, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-163 | Low | whatwg-url is installed in 2 major versions (5, 17) | whatwg-url | lockfile: whatwg-url majors 5, 17, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-164 | Low | wrap-ansi is installed in 2 major versions (7, 9) | wrap-ansi | lockfile: wrap-ansi majors 7, 9, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-165 | Low | write-file-atomic is installed in 2 major versions (3, 7) | write-file-atomic | lockfile: write-file-atomic majors 3, 7, 3 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-166 | Low | ws is installed in 2 major versions (7, 8) | ws | lockfile: ws majors 7, 8, 5 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-167 | Low | xdg-basedir is installed in 2 major versions (4, 5) | xdg-basedir | lockfile: xdg-basedir majors 4, 5, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-168 | Low | yocto-queue is installed in 2 major versions (0, 1) | yocto-queue | lockfile: yocto-queue majors 0, 1, 2 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-169 | Low | zod is installed in 2 major versions (3, 4) | zod | lockfile: zod majors 3, 4, 4 copies (Measured) |  | M | dependency-major | Align on one major; use overrides only as a stop-gap. |
| DEP-AN-170 | Low | @ibm/plex is declared but not imported (heuristic, verify before removing) | @ibm/plex | import scan of 69 file(s): no import of @ibm/plex (Measured) |  | S | dependency-minor | Remove the package. |
| DEP-AN-171 | Low | react-is is declared but not imported (heuristic, verify before removing) | react-is | import scan of 69 file(s): no import of react-is (Measured) |  | S | dependency-minor | Remove the package. |
| DEP-AN-172 | Low | @cspell/dict-de-de is licensed LGPL-3.0 (copyleft) | @cspell/dict-de-de | license data: @cspell/dict-de-de LGPL-3.0 (Measured) |  | M | human-org | Ask legal to confirm, or replace the package. |
| DEP-AN-173 | Low | node-forge is licensed (BSD-3-Clause OR GPL-2.0) (dual (check the permissive option)) | node-forge | license data: node-forge (BSD-3-Clause OR GPL-2.0) (Measured) |  | M | human-org | Ask legal to confirm, or replace the package. |
| DEP-AN-17 | Info | esbuild: low advisory (dev-only), esbuild allows arbitrary file read when running the development server on Windows | esbuild | npm audit: esbuild low (0.27.3 - 0.28.0) esbuild allows arbitrary file read when running the development server on Windows; https://github.com/advisories/GHSA-g7r4-m6w7-qqqr (Measured) | A06:2021, CWE-1395 | S | dependency-minor | Run npm audit fix or update to the patched version; run the tests. |


## Upgrade sizing

This table feeds the effort estimate. Every upgrade finding is placed in one of two work types:

- **dependency-minor**: a patch or minor update, or a major update with a documented migration or codemod inside its reach, or removing an unused package.
- **dependency-major**: a major update with no documented migration, or with behavioural changes that must be verified by hand.

Migration data is a curated list, as of **2026-10-19**. A package that is not on it counts as undocumented.


| Work type | Items | Majors behind | Migration documented: yes | Migration documented: no |
|---|---|---|---|---|
| dependency-minor | 22 | 0 | 22 | 0 |
| dependency-major | 32 | 3 | 29 | 3 |


- Total sized items: 54 (41 % in the higher-saving dependency-minor group)
- Total majors behind: 3
- Outdated packages with a migration documented / not documented: 0 / 3
- Patch or minor updates pending: 27
- Deprecated packages: 0
- Unused direct dependencies: 2

### Majors behind, by package


| Package | Current | Latest | Majors behind | Work type | Migration documented | Codemod |
|---|---|---|---|---|---|---|
| @eslint/js | 9.39.5 | 10.0.1 | 1 | dependency-major | n | n |
| eslint | 9.39.5 | 10.13.0 | 1 | dependency-major | n | n |
| msw | 2.15.0 | 3.0.3 | 1 | dependency-major | n | n |




## Vulnerability advisories


49 package(s) in the audit: 2 critical, 41 high, 5 moderate, 1 low. 49 reach only development tooling and are scored one level lower.


## Carbon v10 and v11 split

This split is owned by the security dimension. Other reviews refer to it by finding id.


| Measure | Value |
|---|---|
| Files importing a v10 package | 0 |
| v10 icon deep-path imports (files) | 0 (0) |
| .bx-- selectors (files) | 0 (0) |
| .cds-- selectors | 0 |
| v10 SCSS imports | 0 |
| Deprecated size prop values | 0 |
| v10 share of Carbon signals | 0% |



## Accepted risks


No accepted risks are recorded.


## Method

Evidence for this dimension came from 5 step(s): secrets (/Users/leechase/Source/bob/skills/review-security-deps/scripts/secrets-scan.js, ok, 0.1 s); docker (/Users/leechase/Source/bob/skills/review-security-deps/scripts/docker-scan.js, ok, 0.1 s); carbon-split (/Users/leechase/Source/bob/skills/review-security-deps/scripts/carbon-version-split.js, ok, 0.1 s); deps (/Users/leechase/Source/bob/skills/review-security-deps/scripts/deps-analyze.js, ok, 0.1 s); headers (/Users/leechase/Source/bob/skills/review-security-deps/scripts/headers-check.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not assessed


| Check | Evidence needed |
|---|---|
| SEC-04 | The page URL (pass --page-url or use --url) |



## How to raise this score


To reach 51:

1. handlebars: critical advisory (dev-only), Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Templates; Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CVE-2026-33937) (+16 points, effort S)


