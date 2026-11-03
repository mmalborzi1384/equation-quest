# Verification strategy

Preparation checks actually executed: Python/Node/npm/git/GitHub CLI versions, Spec Kit scaffold/status, Graphify CLI help, npm dependency/CLI sanity, npm audit. No app code exists: no unit/E2E/browser tests claimed.

Future checks: Vitest tests for exact rational normalization/arithmetic, rational coefficients and fractional answers, both-sided step validity, seeded generation, fraction-specific feedback and persistence migration; RTL component tests for shared nav, lesson affordances, wrong/correct feedback and pause; Playwright Chromium desktop/mobile to exercise every route, buttons, keyboard/touch, progression and refresh; reduced-motion and no-WebGL/error checks; `tsc --noEmit`, ESLint, Prettier, `vite build`, Pages deep-link/asset inspection. Record results in status and per-feature checklist, not generic "tested" labels. Anti-slop gate before shipping each feature. Vulnerabilities currently open; see DEPENDENCIES.

Before public release, require a documented grade-7 curriculum check of every Persian teaching text, example, exercise and mathematical term. Fraction lesson and stages 06–08 require separate checks for rational coefficient, exact answer, misconception hints and original-equation substitution. No such pedagogic review or application test has yet occurred.
