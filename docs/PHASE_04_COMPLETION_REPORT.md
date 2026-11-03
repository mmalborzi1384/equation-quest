# Phase 04 completion report — interactive learning and minimum exact-rational checker

**Date:** 2026-11-03 · **Branch:** `arena/431b70f0-equation-quest` · **Decision:** owner explicitly accepted original Phase 3 and authorized Phase 4 (D20). Phase 5, merge and deployment are **not** authorized.

## Increment

- `/learning` now links to **eight independent core lessons plus a ninth independent fraction lesson** on the existing deep-linkable hash routes. Each has its own authored objective, explanation, misconception, worked KaTeX LTR steps, concept choice with corrective feedback and repeatable guided equation exercise. Start with equal integers, then signed coefficients, then exact fractions.
- DOM balance manipulative distinguishes one-sided/two-sided changes; parts diagram identifies coefficient/unknown/constant; equal-part half/quarter bars bridge visual shares to exact symbolic fractions. Inline numeric/algebra tokens are direction-isolated in Persian RTL prose. Buttons, semantic form, status messages, keyboard navigation, reduced-motion CSS and no-WebGL operation remain available. No game/3D/rewards/persistence were introduced.
- `src/features/equation-engine/{rational,equation,generate}.ts` provides **pure** normalized BigInt rationals, validated Persian/Arabic/ASCII integer/fraction parsing, exact arithmetic and serialization, nonzero coefficient/divisor guards, small deterministic practice families, both-sided step checking, exact answer grading (equivalent fractions accepted; decimal input rejected with a specific prompt) and original-equation substitution. It imports no React/Three. Feedback distinguishes unilateral action, wrong inverse, division by zero, zero denominator, malformed/rounded input and wrong answer. The independent fraction route cycles five authored questions and bounded seeded variants.

**Paths:** `src/data/lessons.ts`, `src/features/equation-engine/`, `src/pages/Lessons/{TopicRoute,Practice,BidiText}*`, `src/pages/Learning/Learning.tsx`, `src/types/react-katex.d.ts`, `src/test/app.test.tsx`, `src/pages/Lessons/TopicRoute.test.tsx`, `tests/e2e/lessons.spec.ts`; specs 003/009/013, status/memory/decision/math/educational/architecture docs and Graphify output updated. Existing World/Game/Level/Progress routes continue as honest previews.

## Verification — actual results

| Command / evidence | Result |
|---|---|
| `bash scripts/setup.sh` (fresh sandbox; interrupted foreground, observed background completion in `/tmp/eq4-setup.log`) | **PASS**; installed locked dependencies, 31 baseline Vitest tests and production build before implementation. |
| `EXPECTED_BRANCH=arena/431b70f0-equation-quest bash scripts/verify-environment.sh --full` | **PASS**: pinned Node/npm/tools and 28 direct dependencies, ESLint, Prettier, TypeScript, **54/54 Vitest tests**, production Vite build. |
| `LD_LIBRARY_PATH=/tmp/eq4-chromium-libs/lib EQ_CHROMIUM_PATH=/tmp/eq4-chromium-bin npm run test:e2e` | **9/9 PASS** headless Chromium 153: 5 existing Home regressions; nine independent lesson routes; 320px fraction guided flow with wrong-step feedback, exact Persian fraction entry, original substitution, repeat; keyboard focus/Enter and RTL/LTR; 36 route/viewport combinations at 320/390/768/1280px without horizontal overflow; reduced motion and no-WebGL paths. An initial LTR test selector pointed to the wrapper rather than the ancestor with `dir=ltr`; corrected and reran green. |
| `npm run dev -- --host 0.0.0.0` and HTTP GET `/equation-quest/` with forwarded Host | **PASS**: live 0.0.0.0:5173 preview and HTTP 200. 390px and 1280px fraction screenshots inspected for reading hierarchy, equal-part model and flow; screenshots are temporary, not shipped. |
| `graphify extract . --code-only`, `graphify cluster-only . --no-label --no-viz`, `graphify update .` | **PASS**: extracted code graph (1113 nodes, 1433 edges, 137 communities after final code extract). |
| `npm audit --json` | **16 findings remain**: 2 low, 14 moderate; command exits nonzero. No new dependencies added; treat as existing security backlog, not a passing gate. |

Headless browser used a **temporary npm-registry package** `@sparticuz/chromium@153.0.0` and its bundled NSS libraries expanded under `/tmp`, not installed to the project or included in the patch. Browser CLI `--list` alone was not treated as execution. No public site deployed. No actual phone hardware, full assistive-technology/screen-reader audit, other browsers or external Grade 7 curriculum/Persian-language specialist review was performed. The last review is **required before public release**. Generated fraction pool is bounded/repeatable, not a complete adaptive difficulty or game level system. Generalized feedback taxonomy and reward/progression integration are deferred to later authorized phases.

## Manual design / anti-slop gate

**PASS (scoped)**: illustration/colour serve equality and fraction meaning rather than decoration; answer-only guessing does not complete a guided exercise; feedback names the mathematical reason; controls have real actions and mobile-sized targets. Focus/keyboard and responsive checks passed in Chromium. A full contrast/hardware screen-reader audit remains open and is not claimed. No asset generator or borrowed visuals were used.

## Stop / owner decision

Phase 4 is implemented and locally tested. Review the branch/PR and the outstanding curriculum/security/accessibility gates. **Do not merge, deploy or start Phase 5** without separate explicit owner permission.
