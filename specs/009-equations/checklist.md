# Checklist — Equation and puzzle engine

- [x] Scope specified in `spec.md`.
- [x] Planning assumptions and test gate recorded.
- [x] Analyze feature against constitution and adjacent specs immediately before coding.
- [x] Implement functional controls and navigation.
- [x] Verify Phase 4 minimal engine edge cases/negative rational coefficients, both-sided transformations, invalid inputs and original substitution. The Phase 6 puzzle taxonomy now composes that core; authored stages remain Phase 7.
- [x] Check RTL/LTR, keyboard/touch, reduced motion, errors/empty states as applicable.
- [x] Run relevant anti-slop skill Delivery Gate (PASS/FAIL + evidence), record actual result here.
- [x] Converge: update status, decisions, memory; mark completed only after tests.

- [x] Phase 1 planning scope cross-checked against A1–A5 and the signed/exact-fraction requirements (documentation review, not feature testing).
- [x] Verify scope-specific tasks with actual evidence only after this feature is authorized and implemented.

Phase 6 evidence: `docs/PHASE_06_COMPLETION_REPORT.md`; 71 unit/DOM and 16 headless Chromium E2E (including WebGL, no-WebGL, 390px workshop and 320px fallback), full environment verification and production build. Manual anti-slop gate PASS for scoped controls, truthful copy, semantic RTL/LTR and no-overflow; hardware/screen-reader audit not claimed.
