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
