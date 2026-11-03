# Plan — Equation and puzzle engine

**Draft, not executed.** Typed domain modules no React/Three imports; seeded generator and testable checking API.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: unit edge cases/negative coefficients, both-side transformations and feedback taxonomy. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Pure engine must support exact signed rational a,b,c in `ax+b=c` with `a≠0`, exact fractional solutions, both-side rational operations, substitution, seeded generation and denominator/reciprocal feedback without floating-point tolerance.

## Phase 4 minimal core (explicit authorization)
Implement normalized signed BigInt rational operations and safe Persian/ASCII fraction parsing, exact `ax+b=c` solve/verify and same-operation-on-both-sides checking for guided lessons. Deterministic small-range practice generation is permitted where useful; puzzle progression, rewards and game scene contracts remain for Phase 6+. Keep math functions pure and test independently of React.
