# Equation Quest — project memory index

**Status (2026-11-03): Phase 1 accepted, Phase 2 PR #2 merged (`8e4ec20`); original-roadmap Phase 3 Home narrative/carousel authorized, implemented and awaiting owner acceptance.** Phase 1 is specification/design and does not require a running app. Prior preparation merged via PR #1 into `main` (`2410239`). Working branch: `arena/aefc616b-equation-quest`; Phase 2 shell preserved, Phase 3 Home enhancement verified locally.

## Permanent execution protocol
Read [PHASE_EXECUTION_PROTOCOL.md](PHASE_EXECUTION_PROTOCOL.md) **before every phase**. Wait for explicit phase authorization. Outputs are phase-specific: Phase 1 requires validated specifications, updated docs and a validation/approval report; implementation phases require executable app code and test evidence. Protocol maintenance in this turn is not a product phase.

## Goal and constraints
Grade 7 Persian (RTL) single-player 3D isometric puzzle adventure teaching first-degree equations through balance, unknowns, signed coefficients, inverse operations, **required exact fractional equations/answers**, and verification. Independent fraction lesson/practice plus staged levels 06–08 are mandatory; grade-7 curriculum/Persian copy review is required before public release. Desktop + mobile; static GitHub Pages; no account/backend. Eight levels, four islands; all controls real. Latest explicit user decisions override this index.

## Architecture (Phase 2 shell implemented; domain features planned)
Vite + React 19 + strict TypeScript; React Router `HashRouter`, base `/equation-quest/`; page-level lazy chunks; React Three Fiber isolated scenes; pure equation/puzzle domain modules; Zustand persist with schema migration; CSS Modules/tokens; KaTeX LTR islands. See [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), [Dependency map](docs/DEPENDENCY_MAP.md) and [Graphify bootstrap](docs/GRAPHIFY_BOOTSTRAP.md).

## Routes
`/`, `/learning`, eight independent core concept lesson routes (`equation`, `balance`, `both-sides`, `unknown`, `parts`, `inverse-operations`, `solve`, `verify`), independent `/learning/fractions`, `/world`, `/game`, `/game/level/:levelId` (01–08), `/progress`. All have shared navigation/home/back. See [Routes](docs/ROUTES.md) and [Wireframes](docs/WIREFRAMES.md).

## Feature state
Phase 2 website foundation and routed previews exist; Phase 3 Home chapter motion and web glass carousel now exist. Interactive lessons, math engine, playable world/game/eight levels, real progression, QA and deployment remain **planned, not implemented**. See [Development status](docs/DEVELOPMENT_STATUS.md) and [specs](specs/).

## Phase 1 accepted; Phase 2 scope
[Decision brief](docs/PHASE_01_DECISION_REPORT.md) · [13-spec review (12 original + fractions)](docs/PHASE_01_SPEC_REVIEW.md) · [acceptance checklist](docs/PHASE_01_ACCEPTANCE_CHECKLIST.md) · [draft completion report](docs/PHASE_01_COMPLETION_REPORT.md). A1–A5 approved as planning decisions in D12–D16: eight core routes plus fraction route, exact rational scope with progressive teaching, procedural genuine 3D first, planning baseline approved, and pure math core before lesson grading. Owner separately approved Phase 1 and Phase 2; Phase 2 was merged via PR #2. The owner then explicitly restored the original Phase 3 Home narrative/carousel scope (D19). A6 publication timing remains deferred.

## Approved vs provisional
Confirmed by owner: project brief's stack, pages, educational and static delivery constraints. Approved planning decisions D12–D16: separate lessons (including fractions), integer → signed → exact fraction sequence, 3D asset approach, Phase 1 baseline and early pure math dependency. Provisional future implementation details: persistence schema, measured performance and exact asset selection. Binding planning choices and deferred publication permission are in [Decisions](docs/DECISIONS.md); the earlier [Preparation report](docs/PREPARATION_REPORT.md) is historical.

## Tool reality
Spec Kit 1.2.6 CLI scaffold installed with `none` integration; Graphify 0.9.101 CLI installed locally, no Arena MCP connector; anti-slop six skills vendored but no Arena auto-hook; Expo carousel inspected as reference, not installed. Python tools in `~/.local/bin` may need reinstall across sandboxes; `bash scripts/setup.sh` provisions missing tools and runs `npm ci`. Canonical Node 22.22.3/npm 10.9.8 are checked, not silently installed. JS dependencies locked; Vite app scaffold present. See [Environment setup](docs/ENVIRONMENT_SETUP.md), [Workflow](docs/DEVELOPMENT_WORKFLOW.md), [Dependencies](docs/DEPENDENCIES.md).

## Documentation
[PRD](docs/PRD.md) · [Game design](docs/GAME_DESIGN.md) · [Design](docs/DESIGN.md) · [Architecture](docs/ARCHITECTURE.md) · [Routes](docs/ROUTES.md) · [Educational content](docs/EDUCATIONAL_CONTENT.md) · [Math engine](docs/MATHEMATICAL_ENGINE.md) · [Dependencies](docs/DEPENDENCIES.md) · [Performance](docs/PERFORMANCE.md) · [Deployment](docs/DEPLOYMENT.md) · [Testing](docs/TESTING.md) · [Decisions](docs/DECISIONS.md) · [Status](docs/DEVELOPMENT_STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Spec Kit constitution](.specify/memory/constitution.md) · [Environment setup](docs/ENVIRONMENT_SETUP.md) · [Development workflow](docs/DEVELOPMENT_WORKFLOW.md) · [Phase execution protocol](PHASE_EXECUTION_PROTOCOL.md).

## Next step
Present the implemented and verified original-scope Phase 3 Home/report for owner acceptance. Stop and await explicit Phase 4 authorization. Never mark app features completed based on documents or installed packages.

## Phase 2 handoff
Implementation and 28/28 tests passed in `b8544be`; Persian evidence/limits in [Phase 2 completion report](docs/PHASE_02_COMPLETION_REPORT.md). [PR #2](https://github.com/mmalborzi1384/equation-quest/pull/2) was explicitly merged to `main` at `8e4ec20`. No browser visual/E2E or public deployment verified; 16 npm audit findings remain. Stop until owner approval.

## Phase 3 handoff
The withdrawn interim educational-module work was reverted uncommitted. Original Phase 3 Home adds scoped GSAP ScrollTrigger narrative motion, responsive balance/island illustration and SVG-filtered web lens with pointer/keyboard/focus/fallback. 31 Vitest and 5 real headless-Chromium Playwright tests passed; `bash scripts/verify-environment.sh --full` passed. Details/limits: [Phase 3 completion report](docs/PHASE_03_COMPLETION_REPORT.md). Do not start Phase 4.

Phase 3 implementation commit `c3bd06b` is pushed; [PR #3](https://github.com/mmalborzi1384/equation-quest/pull/3) is open for review and **not merged**. The current branch is `arena/aefc616b-equation-quest`; await owner sign-off.
