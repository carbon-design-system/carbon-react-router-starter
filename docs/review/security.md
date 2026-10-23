<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Security review

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
| SEC-HDR-1 | Medium | No Content-Security-Policy header | content-security-policy | headers.txt: content-security-policy absent; dashboard-desktop-run1.json: audits.csp-xss — No CSP found in enforcement mode (Measured) | A05:2021, CWE-693 | M | config-infra | Add an enforcing CSP; roll out as report-only first. |
| SEC-HDR-2 | Medium | No frame control: no frame-ancestors in an enforcing CSP and no X-Frame-Options | frame-control | headers.txt: x-frame-options absent; no enforcing frame-ancestors; dashboard-desktop-run1.json: audits.clickjacking-mitigation — No frame control policy found (Measured) | A05:2021, CWE-1021 | S | config-infra | Add frame-ancestors to the CSP, or X-Frame-Options. |
| SEC-HDR-3 | Medium | X-Content-Type-Options: nosniff is not set | x-content-type-options | headers.txt: x-content-type-options absent (Measured) | A05:2021, CWE-693 | S | config-infra | Send X-Content-Type-Options: nosniff. |
| SEC-HDR-4 | Low | No Referrer-Policy header | referrer-policy | headers.txt: referrer-policy absent (Measured) | A05:2021 | S | config-infra | Send Referrer-Policy: strict-origin-when-cross-origin or stricter. |
| SEC-HDR-5 | Low | No Permissions-Policy header | permissions-policy | headers.txt: permissions-policy absent (Measured) | A05:2021 | S | config-infra | Send a Permissions-Policy that disables unused browser features. |
| SEC-HDR-7 | Low | Response reveals server or framework version | version-banner | headers.txt: x-powered-by: Express (Measured) | A05:2021, CWE-200 | S | mechanical | Strip build meta tags and version banners from production output. |
| SEC-HDR-6 | Info | Optional isolation headers not set: COOP, COEP | cross-origin-isolation | headers.txt: COOP, COEP absent; dashboard-desktop-run1.json: audits.origin-isolation — No COOP header found (Measured) | A05:2021 | S | config-infra | Consider COOP and Trusted Types once the CSP is enforcing. |
| SEC-HDR-9 | Info | Lighthouse: No HSTS header found (not applicable until the site uses HTTPS) | localhost | dashboard-desktop-run1.json: audits.has-hsts.details item "No HSTS header found" (score 1 not used) (Measured) | A02:2021, CWE-319 | S | config-infra | Send Strict-Transport-Security with max-age of at least 15552000 on HTTPS responses. |


## Runtime and base image support

Support dates come from `scripts/eol-table.json`, as of **2026-10-19**. Dates older than six months must be refreshed before they are quoted.



| Where | Image | Product | End of life | Status | Stage |
|---|---|---|---|---|---|



## Live checks


Target: http://localhost:5173/dashboard. Source: lh-file.

| Item | Value |
|---|---|
| Scheme | unknown |
| HTTP version | 1.1 |
| Content-Security-Policy | absent |
| Strict-Transport-Security | absent |
| Cookies seen | 0 |


Lighthouse informational audits are judged by their details, never by their score: an audit such as `has-hsts` scores 1 even when it reports that no header was found.


## Secrets scan


66 file(s) scanned, 0 hit(s). Values are never printed; each finding gives the file, the line and the first four characters masked.


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


