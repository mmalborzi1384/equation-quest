# Tasks — Quality and GitHub Pages release

All tasks are **Planned**, not started. Execute only after owner go-ahead.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define CI checks and Pages deployment contract (Node/npm pin, artifact path, hash routes, asset base and rollback).
3. [ ] Configure test/build scripts and GitHub Actions; verify real deployed routes/assets when deployment is explicitly approved.
4. [ ] Add automated checks: CI run, deployed route/asset checks, responsive/a11y/reduced-motion and anti-slop gates.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Add pre-release curriculum review gate and fraction coverage matrix alongside CI/Pages tests; do not claim teacher review or deployment before recorded evidence.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.

## Phase 9 pre-release visual/optimization tasks (D28; planning only, not authorized)
- [ ] Apply vendored anti-slop core and relevant UI/mobile/code/copy skills throughout optimization; document purposeful decisions, findings/fixes and PASS/FAIL Delivery Gate.
- [ ] Source/capture and optimize a compelling background from the actual game environment; verify mobile/desktop cropping, text contrast, reduced-motion, static/no-WebGL fallback and measured loading cost.
- [ ] Design/test restrained liquid-glass states for on-screen buttons and button-like CTAs with the owner's gently rounded corners; verify focus, touch, contrast and unsupported/slow-device fallback, plus measured paint/bundle cost.
- [ ] Evaluate `reactdrops.dev` (or a comparable approach) for license, accessibility and dependency size **before** any adoption; no package/library selection has been made.

## Phase 9 scroll-led reveal tasks (D29; pending, not authorized)
- [ ] Audit Home and lower sections of Learning, World, Game and Progress; design purposeful one-time viewport reveals and short Persian typing-style transitions, without animating entire lessons or KaTeX.
- [ ] Keep semantic text readable before animation and on reduced motion, disabled JS or unavailable observers; verify RTL graphemes/ZWNJ, keyboard/screen reader, fast scrolling and no content gated by motion.
- [ ] Test actual scroll journeys and text transitions on mobile/desktop alongside background/glass effects; measure paint/layout/performance and run the anti-slop Delivery Gate.

## D33 preflight (not a release authorization)

Local build, hash route/assets smoke, repeated browser and unit suites and automated accessibility scans are documented in `docs/PHASE_09_POLISH_AND_RELEASE_READINESS.md`; CI, public Pages, curriculum/security reviews and the release decision remain unchecked Phase 10 tasks. Do not deploy from this preparation.

## D34 authorized Phase 10 execution (2026-11-03)

- [x] Inspect constitution/architecture, merged Phase 9, Pages legacy-source state, bootstrap fresh sandbox and record D34 scope.
- [x] Pin CI Node/npm and `npm ci`, build/budget/lint/format/unit/browser gates on PRs without deployment.
- [x] Add main-only Pages artifact/OIDC deploy and separate post-deploy public smoke; document Actions-source setting/rollback.
- [x] Add shared preview/live route, asset, mobile and saved-setting smoke and locally run full verification.
- [x] Document explicit owner risk acceptance; no false independent curriculum review/security certification or site-live claim.
- [x] Observe real PR Actions validation: PR #10 run `41638949454` passed (build, Chromium and preview smoke); deploy/live-smoke skipped by design.
- [ ] After explicit PR merge approval, observe green main deploy and live smoke on the actual public URL; address first-time Pages Actions-source setting if required.
- [ ] Independent grade-7/Persian content review, physical device/screen-reader/other browser tests and dependency advisories remain follow-ups, not silently closed.
