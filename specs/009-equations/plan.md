# Plan — Equation and puzzle engine

**Draft, not executed.** Typed domain modules no React/Three imports; seeded generator and testable checking API.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: unit edge cases/negative coefficients, both-side transformations and feedback taxonomy. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Pure engine must support exact signed rational a,b,c in `ax+b=c` with `a≠0`, exact fractional solutions, both-side rational operations, substitution, seeded generation and denominator/reciprocal feedback without floating-point tolerance.
