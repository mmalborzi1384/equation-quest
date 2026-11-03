# Plan — Learning overview

**Draft, not executed.** Overview page data-driven concept map; shared lesson entry routes; no empty subsections.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: click each concept, check destination and example rendering in RTL/LTR. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Overview has eight core concept entries and a ninth, distinct fraction-learning entry. Each opens an independent lesson with a specific teaching action, not an anchor-only stub; show prerequisite progression from integer and signed operations to fractions.

## Phase 4 authorized execution (owner confirmation, 2026-11-03)
1. Implement minimum pure exact-rational core first, with normalization, parse/format, four operations, step legality, solving and original-equation substitution tests. Keep React/Three out of domain.
2. Author nine independent lesson records and reusable learning UI with KaTeX, RTL/LTR isolation, DOM balance and fraction visuals, step-by-step walkthroughs and guided concept/step/answer practice. Include integer, signed and fractional progression and repeatable fractions.
3. Test route navigation, choice/hint/error feedback, exact equivalent fractions and invalid input, keyboard/pointer, desktop/mobile/OS reduced-motion; full environment/build plus browser checks if available. No game 3D or progression work.
