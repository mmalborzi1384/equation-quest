# Plan — Eight authored levels and unlocks

**Draft, not executed.** Authored typed data per level, level manager, puzzle goals and scene mechanisms per island.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: one E2E solve/verify per level; locked order and reward idempotence. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Eight stages retain independent objectives: small integers 01–03, signed terms 04–05, explicit fraction instruction 06, multiple guided rational two-step puzzles 07 and required fractional verification 08. Fraction mastery is not confined to a final bonus.

## Phase 6 boundary
Implement a pure ordered challenge/unlock contract with three **workshop** puzzles to validate progression/rewards. Do not populate eight authored stage mechanics or claim the existing eight informational level routes playable; full stage objectives and four-island unlock state remain Phase 7.

## Phase 7 authorized implementation (D27)

Author eight distinct concept gates and exact equation sequences keyed by existing IDs/islands. Compose the Phase 6 pure puzzle reducer into a pure stage session reducer: concept choice → each two-sided puzzle → exact answer → original substitution → stage completion. Levels 06 and 07 contain multiple required fractional tasks; 08 assesses a mixed signed/integer/fraction set. Use in-memory ordered one-time level rewards separate from workshop rewards; island map and game landmarks reflect the completed stages. `/progress` remains a truthful Phase 8 preview, not a persisted record. Test each of eight routed journeys, locked links, replay idempotence, mobile and no-WebGL. No new dependency or persistent storage.
