# Tasks — fractional lesson (Phase 4 implementation authorized; external review pending)

1. [x] Review approved `docs/EDUCATIONAL_CONTENT.md`, `docs/MATHEMATICAL_ENGINE.md`, route contract and accessibility requirements.
2. [x] Author equal-parts introduction and three distinct example families (fractional coefficient/integer answer, integer coefficient/fraction answer, both fractional), including a signed example.
3. [x] Build independent route/component and accessible fraction controls using the pure exact-rational engine; add steps, verification, progressive hints, retry and repeated practice.
4. [x] Test arithmetic and feedback for reciprocal, denominator, sign, one-sided change, zero denominator/divisor and rounded vs exact answer.
5. [x] Test keyboard/touch, RTL prose/LTR KaTeX, mobile/reduced-motion and non-WebGL alternative; record outcomes.
6. [x] Run Anti-slop gate, update graph/memory/status and only then mark this feature completed.

Phase 4 evidence: `src/data/lessons.ts`, `src/pages/Lessons/Practice.tsx`, `src/features/equation-engine/`; 54 Vitest + 9 Chromium Playwright tests. No external grade-7 curriculum or hardware screen-reader audit yet.
