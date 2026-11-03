# Tasks — Equation and puzzle engine

Phase 4 **minimal lesson math core** and the authorized Phase 6 mechanics workshop are implemented. Eight authored levels and persisted progress remain future phases.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: Typed domain modules no React/Three imports; seeded generator and testable checking API.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: unit edge cases/negative coefficients, both-side transformations and feedback taxonomy.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [x] Define normalized BigInt rational representation and serialized form; unit-test zero denominator/coefficient, equivalent fractions, signed/rational coefficient/result and exact substitution (11 engine tests).
- [x] Record independent math tests and manual anti-slop PASS for Phase 4 math UI; full authored-level engine remained outside Phase 4.

## Phase 6 scoped tasks (owner authorized)
- [x] Pure puzzle transition, feedback taxonomy and progressive hints with integer/signed/fraction tests.
- [x] Pure challenge-order and one-time reward selectors/reducer, in-memory adapter; test duplicate completion/replay and reset.
- [x] Working DOM mechanics workshop on `/game` with algebra isolated from Three; keep all eight stage routes honest previews.
- [x] Browser/mobile/desktop/no-WebGL checks, full verification, anti-slop gate, graph and completion report.
