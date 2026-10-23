<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
-->

# Core Web Vitals review

**Product:** carbon-react-starter · **Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 81 / 100 (Good, confidence Medium), provisional
**Trend:** first run

Score 81 / 100 (Good, confidence Medium, provisional). 2 findings: 2 Medium. Trend: first run.

## Core Web Vitals Key Metrics

| Metric | Target (Good) | Observed Value | Rating |
|---|---|---|---|
| Largest Contentful Paint (LCP) | ≤ 2.5 s | 0 ms | Good |
| Cumulative Layout Shift (CLS) | ≤ 0.10 | 0 | Good |
| Total Blocking Time (TBT) | ≤ 200 ms | 0 ms | Good |
| First Contentful Paint (FCP) | ≤ 1.8 s | 0 ms | Good |
| Speed Index | ≤ 3.4 s | 0 ms | Good |
| Time to First Byte (TTFB) | ≤ 800 ms | 0 ms | Good |

## Biggest Point-Losers

| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| BUN-02 | High | 10 | M | Purge duplicate design system stylesheets and remove unused global component CSS. |
| PERF-10 | Medium | 4 | S | Provide explicit width and height attributes or CSS aspect-ratio on all <img> elements. |
| PERF-15 | Medium | 4 | S | Inspect audit details and send Strict-Transport-Security header on HTTPS responses. |
| BUN-09 | Low | 1 | S | Configure devtool: "hidden-source-map" in production webpack builds. |


## Findings

| Id | Severity | Finding | Evidence | Standard | Effort | Fix |
|---|---|---|---|---|---|---|
| PERF-STATIC-IMG-SIZE-1 | Medium | 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) | static:src/components/commonHeader/CommonHeader.jsx:24 (Measured) |  | S | Provide explicit width and height attributes or CSS aspect-ratio on all <img> elements. |
| PERF-INFO-HSTS-1 | Medium | Informational audit 'has-hsts' has score 1 but reports: No HSTS header found | lighthouse:has-hsts:No HSTS header found (Measured) |  | S | Inspect audit details and send Strict-Transport-Security header on HTTPS responses. |


## Method & Environment

Evidence for this dimension came from 3 step(s): perf-static (/Users/leechase/Source/bob/skills/review-performance/scripts/perf-static-scan.js, ok, 0.1 s); bundle (/Users/leechase/Source/bob/skills/review-performance/scripts/bundle-analyze.js, ok, 0.1 s); lighthouse-perf (/Users/leechase/Source/bob/skills/review-performance/scripts/lighthouse-to-findings.js, ok, 0.1 s).

Tools and versions: node v24.20.0

## Not Assessed


| Check | Evidence needed |
|---|---|
| CWV-02 | Live user interaction trace (Chrome DevTools Performance panel trace or RUM telemetry) |
| CWV-08 | Chrome User Experience Report (CrUX) or Real User Monitoring (RUM) field data |



## How to Raise This Score


To reach 99:

1. 1 <img> element(s) lack explicit width and height attributes (triggers layout shifts) (+4 points, effort S)
1. Informational audit 'has-hsts' has score 1 but reports: No HSTS header found (+4 points, effort S)
1. Initial CSS payload is 2001 KiB (exceeds 750 KiB threshold) (+10 points, effort M)


