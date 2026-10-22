<!--
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 -->

# Testing Review — carbon-react-starter

**Date:** 2026-10-22 · **Commit:** e54f800 · **Rubric:** v1.0.0
**Score:** 80 / 100 (Good, confidence High)
**Trend:** first run
**Safety-net:** low (deciding check: TEST-RUNNER)

Score 80 / 100 (Good, confidence High). No findings. Trend: first run.

## Biggest point-losers

| Check | Severity | Points lost | Effort | Fix |
|---|---|---|---|---|
| TEST-RUNNER: Unit/component test suite runs and passes; framework matches React version | High | 10 | M | Configure a test runner; run in CI. |
| TEST-COVERAGE-THRESH: Coverage thresholds set above zero and enforced | High | 10 | M | Configure coverageThreshold in jest.config.js with non-zero values. |


## Findings

| Id | Severity | Finding | Evidence | Effort | Fix |
|---|---|---|---|---|---|


## Hygiene practices

| Practice | Level | Severity | Points lost | Note |
|---|---|---|---|---|
| Unit/component test suite runs and passes; framework matches React version | 0 | High | 10 | Configure a test runner; run in CI. |
| Coverage thresholds set above zero and enforced | 0 | High | 10 | Configure coverageThreshold in jest.config.js with non-zero values. |


## Safety-net position

**Level:** low
**Deciding check:** TEST-RUNNER
**Reason:** Tests not confirmed to run clean or coverage absent

This value is passed to `estimate.js --safety-net low --reason "TEST-RUNNER: Tests not confirmed to run clean or coverage absent"`.
It narrows the Bob-saving range for `dependency-minor`, `dependency-major` and `component-refactor`
work types in the effort estimate.

## Method

Evidence for this dimension came from 1 step(s): tooling (/Users/leechase/Source/bob/skills/review-code-quality/scripts/tooling-discovery.js, ok, 0.0 s).

Tools and versions: node v24.20.0

## Not assessed


Nothing was skipped.


## How to raise this score


To reach 90:

1. Unit/component test suite runs and passes; framework matches React version (+10 points, effort M)


