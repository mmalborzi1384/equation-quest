# Quality and GitHub Pages release

**Status:** Draft / awaiting owner approval. Portable specification; implementation branch is assigned per Arena session.

## User story
As a seventh-grade learner, I can use this feature to understand and practice equations without creating an account.

## Requirements
CI checks and production build pass; site at repo Pages URL loads all assets/routes including refreshed hash links.

## Scope and constraints
Playwright/RTL/Vitest/ESLint/Prettier config, Actions artifact deploy and final gates. Persian RTL, mathematical LTR, desktop/mobile, accessible and usable without backend. Shared navigation and no dead controls. Refer to PRD, ROUTES, EDUCATIONAL_CONTENT and constitution for cross-cutting requirements.

## Acceptance evidence required
CI run, deployed route/asset checks, responsive/a11y/reduced-motion and anti-slop gates. Do not mark completed without implementation, tests and anti-slop delivery gate.

## Phase 1 approved scope (A1–A5, including strengthened A2)
Release requires tests for exact rational engine, fraction lesson and levels 06–08, plus documented review of grade-7 curriculum, examples, exercises, math terminology and Persian copy before public Pages publication. This is a planning contract, not implemented behavior.

## D34 authorization / ongoing maintenance

Owner authorized Phase 10 and clarified that release work should be finalized while the repository remains open for future bug fixes, updates and features. Publication proceeds with the absence of an independent educational/Persian review explicitly visible as a risk, not a fabricated endorsement. PRs validate but cannot deploy; green main commits deploy Pages artifacts and undergo live smoke. A Phase 10 PR still requires explicit merge approval. Earlier Draft status and planning-only gates above are historical; operational truth is in `docs/PHASE_10_RELEASE_REPORT.md`.
