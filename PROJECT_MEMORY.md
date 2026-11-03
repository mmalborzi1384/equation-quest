# Equation Quest — project memory index

**Status (2026-11-03): preparation only; awaiting owner approval for implementation.** Original repository contained only MIT LICENSE at `c0af5a3`. Working branch `arena/5b2fda5d-equation-quest`; no running application yet.

## Goal and constraints
Grade 7 Persian (RTL) single-player 3D isometric puzzle adventure teaching first-degree equations through balance, unknowns, inverse operations and verification. Desktop + mobile; static GitHub Pages; no account/backend. Eight levels, four islands; all controls real. Latest explicit user decisions override this index.

## Architecture (proposed, not implemented)
Vite + React 19 + strict TypeScript; React Router `HashRouter`, base `/equation-quest/`; page-level lazy chunks; React Three Fiber isolated scenes; pure equation/puzzle domain modules; Zustand persist with schema migration; CSS Modules/tokens; KaTeX LTR islands. See [Architecture](docs/ARCHITECTURE.md), [Routes](docs/ROUTES.md), [Dependency map](docs/DEPENDENCY_MAP.md) and [Graphify bootstrap](docs/GRAPHIFY_BOOTSTRAP.md).

## Routes
`/`, `/learning`, `/learning/balance`, `/learning/unknown`, `/learning/inverse-operations`, `/world`, `/game`, `/game/level/:levelId` (01–08), `/progress`. All have shared navigation/home/back. See [Routes](docs/ROUTES.md) and [Wireframes](docs/WIREFRAMES.md).

## Feature state
Preparation/documentation: in progress. Foundation, landing, lessons, world, 3D game, math engine, levels, progress, QA/deployment: **planned, not implemented**. See [Development status](docs/DEVELOPMENT_STATUS.md) and [specs](specs/).

## Approved vs provisional
Confirmed by owner: project brief's stack, pages, educational and static delivery constraints. Provisional engineering proposals: runtime package versions, schema shape, level mechanics, visuals, performance budgets and lesson assessment details. Open choices in [Decisions](docs/DECISIONS.md) and [Preparation report](docs/PREPARATION_REPORT.md).

## Tool reality
Spec Kit 1.2.6 CLI scaffold installed with `none` integration; Graphify 0.9.101 CLI installed locally, no Arena MCP connector; anti-slop six skills vendored but no Arena auto-hook; Expo carousel inspected as reference, not installed. Python tools in `~/.local/bin` may need reinstall across sandboxes. JS dependencies locked but no app scaffold. See [Dependencies](docs/DEPENDENCIES.md).

## Documentation
[PRD](docs/PRD.md) · [Game design](docs/GAME_DESIGN.md) · [Design](docs/DESIGN.md) · [Architecture](docs/ARCHITECTURE.md) · [Routes](docs/ROUTES.md) · [Educational content](docs/EDUCATIONAL_CONTENT.md) · [Math engine](docs/MATHEMATICAL_ENGINE.md) · [Dependencies](docs/DEPENDENCIES.md) · [Performance](docs/PERFORMANCE.md) · [Deployment](docs/DEPLOYMENT.md) · [Testing](docs/TESTING.md) · [Decisions](docs/DECISIONS.md) · [Status](docs/DEVELOPMENT_STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Spec Kit constitution](.specify/memory/constitution.md).

## Next step
Owner reviews preparation report/questions. Only after approval start 001-foundation using feature spec and test gate. Never mark app features completed based on documents or installed packages.
