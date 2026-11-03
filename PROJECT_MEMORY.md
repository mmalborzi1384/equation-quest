# Equation Quest — project memory index

**Status (2026-11-03): Phases 1–4 accepted and merged; Phase 4 PR #4 merged at `ea1c52c`. Phase 5 R3F exploration workshop, desktop/mobile controls and fallback implemented on `arena/bdc71c3b-equation-quest`, awaiting owner review.** Phase 6+ gameplay/rewards and deployment not authorized.

## Permanent execution protocol
Read [PHASE_EXECUTION_PROTOCOL.md](PHASE_EXECUTION_PROTOCOL.md) **before every phase**. Wait for explicit phase authorization. Outputs are phase-specific: Phase 1 requires validated specifications, updated docs and a validation/approval report; implementation phases require executable app code and test evidence. Protocol maintenance in this turn is not a product phase.

## Goal and constraints
Grade 7 Persian (RTL) single-player 3D isometric puzzle adventure teaching first-degree equations through balance, unknowns, signed coefficients, inverse operations, **required exact fractional equations/answers**, and verification. Independent fraction lesson/practice plus staged levels 06–08 are mandatory; grade-7 curriculum/Persian copy review is required before public release. Desktop + mobile; static GitHub Pages; no account/backend. Eight levels, four islands; all controls real. Latest explicit user decisions override this index.

## Architecture (Phase 5 exploratory 3D increment implemented; puzzle/progression domains planned)
Vite + React 19 + strict TypeScript; React Router `HashRouter`, base `/equation-quest/`; page-level lazy chunks; React Three Fiber isolated scenes; pure equation/puzzle domain modules; Zustand persist with schema migration; CSS Modules/tokens; KaTeX LTR islands. See [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), [Dependency map](docs/DEPENDENCY_MAP.md) and [Graphify bootstrap](docs/GRAPHIFY_BOOTSTRAP.md).

## Routes
`/`, `/learning`, eight independent core concept lesson routes (`equation`, `balance`, `both-sides`, `unknown`, `parts`, `inverse-operations`, `solve`, `verify`), independent `/learning/fractions`, `/world`, `/game`, `/game/level/:levelId` (01–08), `/progress`. All have shared navigation/home/back. See [Routes](docs/ROUTES.md) and [Wireframes](docs/WIREFRAMES.md).

## Feature state
Phase 2 website shell and Phase 3 Home are merged. Phase 4 implements nine independent interactive lessons and pure exact rational solving/step checking. Phase 5 adds a real procedural R3F exploration scene with four inspectable landmarks, desktop/touch input, low-quality mode and text fallback. Playable equation puzzles/eight stages, real progression, later QA and deployment remain **planned, not implemented**. See [Development status](docs/DEVELOPMENT_STATUS.md) and [specs](specs/).

## Phase 1 accepted; Phase 2 scope
[Decision brief](docs/PHASE_01_DECISION_REPORT.md) · [13-spec review (12 original + fractions)](docs/PHASE_01_SPEC_REVIEW.md) · [acceptance checklist](docs/PHASE_01_ACCEPTANCE_CHECKLIST.md) · [draft completion report](docs/PHASE_01_COMPLETION_REPORT.md). A1–A5 approved as planning decisions in D12–D16: eight core routes plus fraction route, exact rational scope with progressive teaching, procedural genuine 3D first, planning baseline approved, and pure math core before lesson grading. Owner separately approved Phase 1 and Phase 2; Phase 2 was merged via PR #2. The owner then explicitly restored the original Phase 3 Home narrative/carousel scope (D19). A6 publication timing remains deferred.

## Approved vs provisional
Confirmed by owner: project brief's stack, pages, educational and static delivery constraints. Approved planning decisions D12–D16: separate lessons (including fractions), integer → signed → exact fraction sequence, 3D asset approach, Phase 1 baseline and early pure math dependency. Provisional future implementation details: persistence schema, measured performance and exact asset selection. Binding planning choices and deferred publication permission are in [Decisions](docs/DECISIONS.md); the earlier [Preparation report](docs/PREPARATION_REPORT.md) is historical.

## Tool reality
Spec Kit 1.2.6 CLI scaffold installed with `none` integration; Graphify 0.9.101 CLI installed locally, no Arena MCP connector; anti-slop six skills vendored but no Arena auto-hook; Expo carousel inspected as reference, not installed. Python tools in `~/.local/bin` may need reinstall across sandboxes; `bash scripts/setup.sh` provisions missing tools and runs `npm ci`. Canonical Node 22.22.3/npm 10.9.8 are checked, not silently installed. JS dependencies locked; Vite app scaffold present. See [Environment setup](docs/ENVIRONMENT_SETUP.md), [Workflow](docs/DEVELOPMENT_WORKFLOW.md), [Dependencies](docs/DEPENDENCIES.md).

## Documentation
[PRD](docs/PRD.md) · [Game design](docs/GAME_DESIGN.md) · [Design](docs/DESIGN.md) · [Architecture](docs/ARCHITECTURE.md) · [Routes](docs/ROUTES.md) · [Educational content](docs/EDUCATIONAL_CONTENT.md) · [Math engine](docs/MATHEMATICAL_ENGINE.md) · [Dependencies](docs/DEPENDENCIES.md) · [Performance](docs/PERFORMANCE.md) · [Deployment](docs/DEPLOYMENT.md) · [Testing](docs/TESTING.md) · [Decisions](docs/DECISIONS.md) · [Status](docs/DEVELOPMENT_STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Spec Kit constitution](.specify/memory/constitution.md) · [Environment setup](docs/ENVIRONMENT_SETUP.md) · [Development workflow](docs/DEVELOPMENT_WORKFLOW.md) · [Phase execution protocol](PHASE_EXECUTION_PROTOCOL.md).

## Next step
Present Phase 5 implementation and verification report for owner review. Stop and await explicit Phase 6 authorization; no merge/deployment without approval. Never mark untested browser behavior as verified.

## Phase 2 handoff
Implementation and 28/28 tests passed in `b8544be`; Persian evidence/limits in [Phase 2 completion report](docs/PHASE_02_COMPLETION_REPORT.md). [PR #2](https://github.com/mmalborzi1384/equation-quest/pull/2) was explicitly merged to `main` at `8e4ec20`. No browser visual/E2E or public deployment verified; 16 npm audit findings remain. Stop until owner approval.

## Phase 3 handoff
The withdrawn interim Phase 3 educational-module work was reverted uncommitted. Original Phase 3 Home adds scoped GSAP ScrollTrigger narrative motion, responsive balance/island illustration and SVG-filtered web lens with pointer/keyboard/focus/fallback. 31 Vitest and 5 real headless-Chromium Playwright tests passed; `bash scripts/verify-environment.sh --full` passed. Details/limits: [Phase 3 completion report](docs/PHASE_03_COMPLETION_REPORT.md). Phase 4 subsequently authorized by owner (D20).

Phase 3 implementation commit `c3bd06b` is pushed; [PR #3](https://github.com/mmalborzi1384/equation-quest/pull/3) was explicitly merged into `main` at `804b02a`; the owner accepted Phase 3 and separately authorized Phase 4. Current branch: `arena/431b70f0-equation-quest`.

## Phase 4 handoff (2026-11-03)
Nine authored lessons and repeatable guided fraction practice, exact rational normalization/step checking/substitution, KaTeX LTR islands and DOM models on existing routes. 54 Vitest, 9 headless Chromium E2E tests and local production build passed; see [Phase 4 completion report](docs/PHASE_04_COMPLETION_REPORT.md) for commands, browser limitations and audit. Hardware/mobile screen-reader, other-browser and independent curriculum-specialist review remain open. Phase 5 subsequently authorized by owner (D22).

Phase 4 implementation commit `497953d` pushed; [PR #4](https://github.com/mmalborzi1384/equation-quest/pull/4) was explicitly merged at `ea1c52c`. The owner emphasized coequal mobile/desktop support and separately authorized Phase 5.

## Phase 5 handoff (2026-11-03)
`/game` now hosts a real procedural isometric R3F exploration workshop, pure bounded movement and proximity, four inspectable landmarks, orthographic follow camera, keyboard and held-touch direction controls, E/Escape/tap, quality presets and text fallback on absent/lost WebGL. `/world` keeps stage previews honest and links to workshop. All 61 Vitest and 15 headless Chromium E2E tests passed; WebGL/mobile 320/390/768/1280px and no-WebGL were exercised, details in [Phase 5 report](docs/PHASE_05_COMPLETION_REPORT.md). No puzzle/reward/level completion, persisted progress, independent curriculum review, hardware screen reader or deployment is claimed. Phase 6 needs separate authorization.
