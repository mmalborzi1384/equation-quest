# Phase 1 — specification cross-review and findings

Reviewed 2026-11-03 against the master project brief, `.specify/memory/constitution.md`, PRD, architecture, routes, education, game, design, wireframes, math engine, deployment, roadmap and **all 12** feature `spec.md`/`plan.md`/`clarifications.md`/`tasks.md`/`checklist.md` files. **Reviewed is not approved or implemented.** Requirements are preserved; proposed resolutions remain pending where noted.

| Spec | Coverage | Finding / required follow-up |
|---|---|---|
| `001-foundation` | HashRouter, RTL, lazy loading, shared navigation, invalid routes | Route coverage should explicitly accommodate approved A1 topic routes; navigation shell must not falsely claim future lesson/game features work in Phase 2. |
| `002-home` | Ten sections, web-adapted glass carousel, reduced motion | Feature link destinations must resolve to real pages when shipped; explicit WebGL fallback retained. |
| `003-learning` | Eight topics, concept examples, action per topic | **Conflict:** only three lesson routes; wireframes suggest anchors while master asks independent route/component/logic. Resolve A1, then revise routing/spec. |
| `004-balance` | 3D scale, weights, keyboard fallback | Need mathematical invariant and accessible text counts even without WebGL; rely on shared pure rules, not visual-only physics. |
| `005-unknown` | 3D mystery boxes, numeric answer/hints | “Explanation/number” submission is not specified as graded/free text; define pedagogically observable operation before implementation. |
| `006-inverse` | Four inverse operations, both sides, invalid zero division | Needs shared operation checker before interactive release; dependency order currently inconsistent with roadmap. |
| `007-world` | Four islands, two levels, lock state | Level access/prerequisite text and empty save should be functional; no fake unlocks. |
| `008-game` | Isometric camera, desktop/mobile input, pause, quality | Player interaction and no-WebGL fallback must preserve puzzle access; performance targets are plans, not measured results. |
| `009-equations` | Pure `ax+b=c` engine, feedback, generation, unit tests | **Open:** representation/comparison of rational answers and educational pacing (A2); Phase 06 schedule is after lessons (follow-up above). |
| `010-levels` | Eight level objectives, gates, one-time rewards | Distinct objectives listed in `GAME_DESIGN.md`; feature spec/task list should reference data contract and teach/verify actions per level before implementation. |
| `011-progress` | Real persistence, migration, empty/corrupt state | Achievement definitions and best-performance meaning remain to be authored without fabricated values. |
| `012-release` | CI, Pages routes/assets and mobile/accessibility checks | Task 3 contains a copied “component/domain logic and navigation” instruction inappropriate to deployment; correct task plan before implementation. Browser binaries and Actions remain unconfigured. |

## Cross-cutting inconsistencies / missing decisions

1. **Phase gate:** former unconditional runnable-app wording contradicted a specification-only Phase 1. The owner clarified the phase-relative rule; `PHASE_EXECUTION_PROTOCOL.md` and `AGENTS.md` now distinguish specification validation from implementation tests. Do not infer that existing specifications are approved.
2. **Topic granularity:** eight entries in learning overview, three mandatory lesson URLs; documented anchors are not necessarily independent routes (A1).
3. **Teaching sequence:** `EDUCATIONAL_CONTENT.md` lists equation → unknown → equality while world order begins on Balance Island. Recommend equality/balance first in guided journey, then unknown, inverses, solution/verification; concept overview may explain equation before gameplay. Update lesson mapping after A1/A2 approval.
4. **Math dependency timing:** lessons planned for Phase 04 use operations, but shared math engine is scheduled for Phase 06. Do not put temporary grading logic inside React; agree on sequencing before Phase 04.
5. **Asset wording:** PRD excludes procedural *GLB pipeline*, not procedural 3D geometry; D09 is provisional and A3 requests source approval. No art or GLB optimization has occurred.
6. **Draft/stale metadata:** all 12 feature specs name a prior Arena branch and are marked draft; specs are portable and should not encode an obsolete branch as an implementation target. Task lists have generic steps; feature-specific acceptance/test lines exist but must be decomposed further before each implementation phase.
7. **Language/content proof:** most documentation is English planning text; user-facing Persian microcopy, teacher validation and non-integer learning progression are not yet accepted. Phase 1 need not pretend these were classroom-tested; A2 resolves review timing.
8. **Pages vs phase:** `DEPLOYMENT.md` defines base/hash strategy; Actions/Pages are correctly deferred, not a Phase 1 implementation failure. Publication permission is separate (A5).

## Validation boundary
A Phase 1 review can validate the existence and cross-document coherence of planning artifacts. It cannot validate 3D gameplay, browser navigation, math correctness, CI or live Pages. No user specification is weakened by calling these *future-phase* tests N/A. Checklist/results: `docs/PHASE_01_ACCEPTANCE_CHECKLIST.md`.
