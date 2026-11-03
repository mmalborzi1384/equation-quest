# Equation Quest — project memory index

**Status (2026-11-03): Phase 1 planning package reviewed, awaiting explicit decisions A1–A5 and formal owner approval; Phase 2 NOT authorized.** Phase 1 is specification/design and does not require a running app. Prior preparation merged via PR #1 into `main` (`2410239`). Working branch: `arena/daf2c49b-equation-quest`; no application source exists yet.

## Permanent execution protocol
Read [PHASE_EXECUTION_PROTOCOL.md](PHASE_EXECUTION_PROTOCOL.md) **before every phase**. Wait for explicit phase authorization. Outputs are phase-specific: Phase 1 requires validated specifications, updated docs and a validation/approval report; implementation phases require executable app code and test evidence. Protocol maintenance in this turn is not a product phase.

## Goal and constraints
Grade 7 Persian (RTL) single-player 3D isometric puzzle adventure teaching first-degree equations through balance, unknowns, inverse operations and verification. Desktop + mobile; static GitHub Pages; no account/backend. Eight levels, four islands; all controls real. Latest explicit user decisions override this index.

## Architecture (proposed, not implemented)
Vite + React 19 + strict TypeScript; React Router `HashRouter`, base `/equation-quest/`; page-level lazy chunks; React Three Fiber isolated scenes; pure equation/puzzle domain modules; Zustand persist with schema migration; CSS Modules/tokens; KaTeX LTR islands. See [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), [Dependency map](docs/DEPENDENCY_MAP.md) and [Graphify bootstrap](docs/GRAPHIFY_BOOTSTRAP.md).

## Routes
`/`, `/learning`, `/learning/balance`, `/learning/unknown`, `/learning/inverse-operations`, `/world`, `/game`, `/game/level/:levelId` (01–08), `/progress`. All have shared navigation/home/back. See [Routes](docs/ROUTES.md) and [Wireframes](docs/WIREFRAMES.md).

## Feature state
Preparation/documentation: completed as drafts; reproducible environment configuration verified locally. Foundation, landing, lessons, world, 3D game, math engine, levels, progress, QA/deployment: **planned, not implemented**. See [Development status](docs/DEVELOPMENT_STATUS.md) and [specs](specs/).

## Phase 1 owner review (not yet approved)
[Decision brief](docs/PHASE_01_DECISION_REPORT.md) · [12-spec review](docs/PHASE_01_SPEC_REVIEW.md) · [acceptance checklist](docs/PHASE_01_ACCEPTANCE_CHECKLIST.md) · [draft completion report](docs/PHASE_01_COMPLETION_REPORT.md). Approval questions: A1 eight-topic route granularity; A2 curriculum/numeric scope and reviewer timing; A3 3D asset sourcing; A4 ratify planning bundle/Constitution; A5 sequence the minimal math core before interactive lessons. A6 Pages publication permission is deferred. Do not mark Phase 1 completed until choices are recorded and docs reconciled.

## Approved vs provisional
Confirmed by owner: project brief's stack, pages, educational and static delivery constraints. Provisional engineering proposals: runtime package versions, schema shape, level mechanics, visuals, performance budgets and lesson assessment details. Open choices in [Decisions](docs/DECISIONS.md) and [Preparation report](docs/PREPARATION_REPORT.md).

## Tool reality
Spec Kit 1.2.6 CLI scaffold installed with `none` integration; Graphify 0.9.101 CLI installed locally, no Arena MCP connector; anti-slop six skills vendored but no Arena auto-hook; Expo carousel inspected as reference, not installed. Python tools in `~/.local/bin` may need reinstall across sandboxes; `bash scripts/setup.sh` provisions missing tools and runs `npm ci`. Canonical Node 22.22.3/npm 10.9.8 are checked, not silently installed. JS dependencies locked but no app scaffold. See [Environment setup](docs/ENVIRONMENT_SETUP.md), [Workflow](docs/DEVELOPMENT_WORKFLOW.md), [Dependencies](docs/DEPENDENCIES.md).

## Documentation
[PRD](docs/PRD.md) · [Game design](docs/GAME_DESIGN.md) · [Design](docs/DESIGN.md) · [Architecture](docs/ARCHITECTURE.md) · [Routes](docs/ROUTES.md) · [Educational content](docs/EDUCATIONAL_CONTENT.md) · [Math engine](docs/MATHEMATICAL_ENGINE.md) · [Dependencies](docs/DEPENDENCIES.md) · [Performance](docs/PERFORMANCE.md) · [Deployment](docs/DEPLOYMENT.md) · [Testing](docs/TESTING.md) · [Decisions](docs/DECISIONS.md) · [Status](docs/DEVELOPMENT_STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Spec Kit constitution](.specify/memory/constitution.md) · [Environment setup](docs/ENVIRONMENT_SETUP.md) · [Development workflow](docs/DEVELOPMENT_WORKFLOW.md) · [Phase execution protocol](PHASE_EXECUTION_PROTOCOL.md).

## Next step
Wait for the owner's Phase 1 decisions A1–A5 and final spec acceptance; then reconcile docs/checklist and record completion. Separately wait for explicit Phase 2 authorization. Do **not** start 001-foundation merely because preparation was merged. Never mark app features completed based on documents or installed packages.
