# Educational content plan — grade seven (Phase 1 planning baseline)

## Scope and progression
The student must reason about equality rather than guess `x`. The path starts with small integers, introduces signed coefficients and constants gradually, then teaches inverse operations and simplification before exact fractional equations. **Fractional equations are required v1 content**, not an optional future extension or a handful of final questions. Grade-7 terminology, examples, exercises and Persian text require real curriculum review **before public release**; no teacher/specialist approval is claimed now.

| Stage | Concept and learner action | Where taught/practiced |
|---|---|---|
| 1 | Equality/equation: read `=` as equivalence; keep two sides balanced using small integer weights | `/learning/equation`, `/learning/balance`, `/learning/both-sides`; levels 01–02 |
| 2 | Unknown and parts: box as `x`, coefficient vs constant; simple positive integers | `/learning/unknown`, `/learning/parts`; level 03 |
| 3 | Signed values: positive and negative coefficients/constants, distinguish sign from operation | `/learning/parts`, `/learning/solve`; levels 04–05 and practice |
| 4 | Inverses/simplification: add↔subtract, multiply↔divide to both sides, reduce equivalent expressions | `/learning/inverse-operations`, `/learning/solve`; levels 05–06 |
| 5 | Fractions: equal parts, denominator meaning, rational coefficient/constant, reciprocal as inverse; exact fractional answers | **Independent** `/learning/fractions` lesson with its own worked examples and repeatable exercises; level 06 introduces simple fractions; level 07 develops two-step fractional equations; level 08 integrates and verifies; supplemental practice is available from `/learning` |
| 6 | Solve and verify: show each equivalent step, substitute into the original equation, explain both sides | `/learning/solve`, `/learning/verify`; levels 07–08, including fractional problems |

The eight core topics in the original learning overview each receive a distinct deep-linkable lesson: equation, unknown, equality/balance, parts, same operation on both sides, inverse operations, solve, verify. **Fractions form a ninth, additional deep-linkable topic** rather than replacing one of those eight. Every entry has a teaching explanation, interactive exercise and usable related/back navigation; see `docs/ROUTES.md` and `specs/013-fractions/`.

## Guided worked examples (LTR maths within Persian RTL UI)

1. Integer: `2x + 4 = 12` → subtract 4 **from both sides**: `2x+4-4=12-4` → `2x=8` → divide both sides by 2: `x=4` → verify `2(4)+4=12`.
2. Signed coefficient: `-2x + 3 = 9` → subtract 3 from both sides: `-2x=6` → divide both sides by `-2`: `x=-3` → check `-2(-3)+3=9`.
3. Fractional coefficient and fractional answer: `\frac{2}{3}x + \frac{1}{2} = \frac{5}{6}` → subtract `1/2` on both sides: `(2/3)x=1/3` → divide both sides by `2/3` (multiply by `3/2`): `x=1/2` → check `(2/3)(1/2)+1/2=1/3+1/2=5/6`. Also teach `x/2+1/4=3/4` to connect halves/quarters to equality. Do not jump from integer equations directly to multi-step fraction arithmetic; use equal-parts visual and simpler fraction operations first.

Each example must present operation selection, both-sided transformation, equivalent expressions, solution and original-equation substitution visually and in words. Fraction exercise set includes (a) rational coefficient with integer solution, (b) integer coefficient with rational solution, (c) rational coefficient and rational solution, with positive/negative variants introduced progressively. No rule may accept an answer-only guess in guided puzzles.

## Feedback ladder
First error: point to the invariant or the equal-parts model without revealing the answer. Next: highlight the term/denominator and ask for the inverse. Further help: offer a **step choice** (subtract `b`, divide by nonzero `a`, etc.), not the final value. Mistakes distinguished: one-sided change, sign inversion, treating denominator as numerator, adding/subtracting unequal fractions as if denominators match, dividing by zero, using a rounded decimal when an exact fraction is requested, skipping verification. Correct action explains why the equality remains true, animates the environmental mechanism, and awards once; no timer or punitive XP loss.

## Review and assessment gate
Author each lesson/level with objective, misconception examples, scaffold steps, precise answer form and verification expression. Test positive/negative coefficients, zero constants, rational coefficients/solutions and exact equivalent fractions. Before public release, compare all grade-7 scope, examples, exercises, mathematical terminology and Persian copy with the selected curriculum and obtain documented content review. Until that happens, label them **planned/not externally validated**.
