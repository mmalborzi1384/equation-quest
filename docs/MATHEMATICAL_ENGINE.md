# Pure equation engine specification (proposed)

## Typed contract
`LinearEquation { a: number; b: number; c: number }` with finite safe values and `a !== 0`; `solution=(c-b)/a`. In UI, equation renders `ax+b=c`, handling sign/zero/one carefully. Generator takes seeded RNG + difficulty constraints, picks a target solution and derives `c=a*x+b` so it always has a known result. Domain contracts remain independent of React/Three.

## Step model
Operation `(kind: add|subtract|multiply|divide, operand, sides: both|left|right)` transforms a symbolic linear form `(leftA,leftB,rightA,rightB)` (or equivalent canonical representation). Compare equivalence by applying same legal operation to both sides; division by zero invalid. Display original and resulting equations, with rationale. For canonical `ax+b=c`, subtract `b` on both sides, then divide both by `a`, then substitute solution in original. General step checker should validate algebraic equivalence and pedagogical intent, not string equality; reject a lucky correct number with no shown reasoning in guided levels.

## Feedback taxonomy
`unilateral-change`, `wrong-inverse`, `sign-error`, `division-by-zero`, `answer-only`, `arithmetic-error`, `correct`; report actionable next hint with progressive level, without leaking solution prematurely. Numeric comparison: prefer integer/rational authored values; for generated fractional results define rational representation or documented tolerance before shipping. Preserve negative coefficients and zero constants in tests.

## Tests and extension
Unit tests: a=0/NaN/infinity rejected; generation deterministic and solvable; correct/incorrect operations; both-side preservation; negative/zero constants; answer substitution; duplicate/repeated action handling; different valid equation forms; hint escalation. Extend via equation/step interfaces rather than embedding parser in UI. No engine exists yet.
