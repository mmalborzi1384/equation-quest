# Plan — Quality and GitHub Pages release

**Draft, not executed.** Playwright/RTL/Vitest/ESLint/Prettier config, Actions artifact deploy and final gates.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: CI run, deployed route/asset checks, responsive/a11y/reduced-motion and anti-slop gates. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Release requires tests for exact rational engine, fraction lesson and levels 06–08, plus documented review of grade-7 curriculum, examples, exercises, math terminology and Persian copy before public Pages publication.

## Phase 9 pre-release quality boundary (D28; planning only)

Before Phase 10 CI/Pages work, Phase 9 should integrate and optimize existing gameplay/mobile/a11y and the owner's game-derived background + liquid-glass button treatment, guided by vendored anti-slop skills throughout. Use `docs/PHASE_09_DESIGN_AND_OPTIMIZATION_PLAN.md` for visual, fallback and measured performance gates. `reactdrops.dev` is a suggested reference, not a dependency decision. Phase 10 still separately requires documented curriculum/Persian-content review, green CI and approval before public deployment. No Phase 9 implementation authorized by this note.

## Phase 9 motion acceptance addition (D29; not authorized)

Add scroll-entering lower sections and clearly perceivable typing-style reveals for selected short Persian text to the future design/optimization checks; see `docs/PHASE_09_DESIGN_AND_OPTIMIZATION_PLAN.md`. Existing Home ScrollTrigger movement is only a starting point, not completion. Require semantic full text, RTL grapheme correctness, non-animated fallback, keyboard/screen-reader safety and measured mobile performance before marking the phase done.

## D33 preparation only (Phase 10 remains unexecuted)

A local production build/base-path route smoke, 38/38 Chromium tests, 90/90 Vitest and temporary axe-core scans have been recorded in `docs/PHASE_09_POLISH_AND_RELEASE_READINESS.md`. This does **not** satisfy CI or live Pages acceptance: independent grade-7/Persian curriculum review, dependency-advisory decision, hardware/assistive-technology and alternate-browser checks, owner deployment authorization, CI and real live-host checks remain pending. The client-rendered app requires JavaScript for full content; do not call observer fallback a no-JS rendered app.
