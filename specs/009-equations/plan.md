# Plan — Equation and puzzle engine

**Draft, not executed.** Typed domain modules no React/Three imports; seeded generator and testable checking API.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: unit edge cases/negative coefficients, both-side transformations and feedback taxonomy. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Pure engine must support exact signed rational a,b,c in `ax+b=c` with `a≠0`, exact fractional solutions, both-side rational operations, substitution, seeded generation and denominator/reciprocal feedback without floating-point tolerance.

## Phase 4 minimal core (explicit authorization)
Implement normalized signed BigInt rational operations and safe Persian/ASCII fraction parsing, exact `ax+b=c` solve/verify and same-operation-on-both-sides checking for guided lessons. Deterministic small-range practice generation is permitted where useful; puzzle progression, rewards and game scene contracts remain for Phase 6+. Keep math functions pure and test independently of React.

## Phase 6 authorized plan (D24–D25)
1. Extend the Phase 4 exact-rational core via a pure puzzle reducer: ordered constant/coefficient actions, exact answer, original substitution verification and mistake-specific feedback/hints, with no answer-only bypass.
2. Add pure ordered challenge-manager gates and an idempotent progress reducer; no localStorage save or eight-level objectives in this phase.
3. Integrate an accessible three-challenge mechanics workshop into `/game`, sharing integer → signed → fractional progression with the existing engine, while leaving `/game/level/:id` informational.
4. Test correct/error/hint/retry/replay/duplicate-award behavior, mobile and desktop keyboard/touch/no-WebGL paths, lint/format/typecheck/build, graph and report. Never start Phase 7 authored levels or Phase 8 persistence.
