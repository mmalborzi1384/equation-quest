> Historical pre-acceptance review: the owner subsequently accepted Phase 1 and authorized Phase 2 on 2026-11-03 (D17). Statements below about pending approval describe the earlier review point, not current status.

# Phase 1 — owner decision brief (2026-11-03)

**Status: A1–A5 approved as a Phase 1 planning baseline on 2026-11-03; A2 approved with stronger mandatory fractional scope. This historical decision brief remains for alternatives/consequences; binding choices are in `docs/DECISIONS.md` D12–D16. Formal Phase 1 completion acceptance is still pending.** This preserves the original questions, alternatives and consequences; the binding owner choices are now D12–D16. A1–A5 have been answered by the owner; A6 publication permission remains deferred. Approving these specifications is **not** authorization to start Phase 2.

## Decisions that required owner approval — now approved as planning choices

### A1. Eight learning topics: what counts as independent instruction?
- **Exact question:** Must the eight overview topics each have their own deep-linkable lesson route/component, or may several be separate interactive modules within the three explicitly named lesson pages (`/learning/balance`, `/learning/unknown`, `/learning/inverse-operations`)?
- **Why:** The master specification says each topic needs an independent entry button and each independent section a route/component/logic; the earlier `docs/WIREFRAMES.md` sent some topics to anchors inside three lessons (now corrected). A decorative anchor would not satisfy the requirement.
- **Recommend:** Give all eight topics distinct deep-linkable routes/modules, retaining the three mandatory paths and adding five topic paths. Define exercise and back/related navigation per topic. This preserves the multi-page requirement; exact path names can be finalized before router implementation.
- **Alternative:** Retain three lesson routes with eight distinct, directly addressable submodules (`?topic=`) and independent exercises. Less routing/code, but weaker interpretation of “independent Route.”
- **Consequences:** Recommended choice adds five routes and topic-specific tests/copy; educationally it prevents equation parts/verification from being reduced to introductory text. Alternative is lighter but risks failing acceptance and hiding topics behind shared pages.

### A2. Grade-7 numeric progression and content review — approved with mandatory fraction expansion
- **Exact question:** Shall v1 begin with small integer examples and progress to signed coefficients and exact rational answers as skills advance; and is an external teacher review required before *Phase 1 sign-off* or before *public release*?
- **Why:** The brief requires `ax+b=c` for `a≠0`, inverse operations, correctness and grade-7 alignment. `docs/MATHEMATICAL_ENGINE.md` leaves rational-vs-floating comparison unresolved; no curriculum source or qualified reviewer is named.
- **Recommend:** Specify integer-first authored lessons, then signed coefficients and **required** rational coefficients/constants and exact rational solutions through an independent fraction lesson, repeatable exercises and stages 06–08; represent/check exact rational values when necessary (not a guessed float threshold). Use the user-provided grade-7 scope as Phase 1 baseline, and require pedagogical/Persian copy review before publication, without falsely claiming a teacher has approved it today.
- **Alternatives:** (i) all-integer v1 (simpler but may omit valid `ax+b=c` examples); (ii) unrestricted fractions from the start (broader but higher cognitive load); (iii) teacher sign-off required before Phase 1 (higher assurance but blocks sign-off until reviewer available).
- **Consequences:** Defines generator and grading tests, hint examples and pacing; external review timing affects schedule, not mathematical correctness. No unsupported curriculum certification will be claimed.

### A3. Asset-production responsibility and visual fidelity
- **Exact question:** May the initial stylized 3D world and lessons use procedural Three.js geometry, with optimized GLB/GLTF assets added when available, or will the owner provide licensed 3D models before implementation?
- **Why:** The game must genuinely be 3D, while Blender is unavailable in this sandbox and no licensed asset source is committed. GLB optimization in the spec cannot be claimed before assets exist.
- **Recommend:** Build real interactive procedural stylized 3D geometry first; include a typed loader/optimization path for future locally licensed GLBs. The final art direction and mobile performance gates still apply; this does **not** remove the 3D game or asset-optimization requirement where GLBs are used.
- **Alternative:** Owner supplies licensed GLBs/art direction before scene development; may improve bespoke art but delays development and raises provenance/versioning tasks.
- **Consequences:** Affects scope, asset license evidence, visual polish and performance testing. “Procedural Three geometry” is not the same as the PRD's excluded “procedural GLB asset pipeline.”

### A4. Spec bundle and Constitution ratification
- **Exact question:** After reviewing this brief and the remaining follow-ups in `docs/PHASE_01_SPEC_REVIEW.md`, do you approve the Phase 1 PRD, Constitution, architecture, educational/game/design direction, route strategy and 12 feature specifications **as planning baselines**, subject to implementing the chosen A1–A3 and A5 resolutions before marking Phase 1 complete?
- **Why:** At the time of this brief, the Constitution was marked `Ratified: pending owner approval` and specs were drafts; the owner has since approved the planning baseline (D15), but not final phase completion. A prior PR merge or “phase 1 done” statement did not resolve the specific options above.
- **Recommend:** Approve the baseline with explicit A1–A3 and A5 choices, then update the affected specs/checklist/ratification and run validation before marking Phase 1 completed. Approval of plans is not a claim that features are implemented.
- **Alternative:** Request targeted revisions first (please identify documents/topics). Consequence: Phase 1 remains in progress until resubmitted.

### A5. Math-engine dependency before interactive lessons
- **Exact question:** May the minimal pure equation-operation/checking core be implemented when interactive lessons begin in Phase 04, with the wider puzzle/level/reward systems still built in Phase 06, rather than deferring all math code until Phase 06?
- **Why:** Current roadmap schedules lessons before the engine they depend on. Duplicate grading logic inside React would contradict the approved pure-engine boundary.
- **Recommend:** Specify pure equation interfaces now; implement only the lesson-needed core in the explicitly authorized learning phase, then expand/integrate it in Phase 06. This is a sequencing clarification, not permission to start either phase now.
- **Alternative:** Defer the interactive lessons until after Phase 06 (slower educational delivery), or use temporary UI math (faster initial screens but violates separation/testability and creates rework — not recommended).
- **Consequences:** Recommended option changes the placement of a small implementation task, not the required feature set; requires future phase task plans to reflect the dependency.

### A6. Publication timing (approval needed later, not to finish Phase 1)
- **Exact question:** When should repository Pages Actions/settings be enabled and the site published?
- **Recommend:** Define the deployment *strategy* now (`HashRouter`, Vite base `/equation-quest/`, GitHub Actions) and defer **actual publication permission** to Phase 10. The owner explicitly controls deployment timing.
- **Alternative:** Enable Pages early for incremental previews after a runnable build exists; useful for testing but exposes incomplete product and needs Pages permission. Neither choice starts deployment now.

## Safe resolutions already supported by the master specification (no new owner approval required)

| ID | Question | Safe reading / impact |
|---|---|---|
| S1 | CSS Modules or Tailwind? | CSS Modules + tokens, explicitly allowed; isolate page styles. Not a new architecture direction (D06). |
| S2 | HashRouter or server rewrites? | HashRouter + Vite `/equation-quest/`, explicitly requested for Pages (D01). Do not configure Pages yet. |
| S3 | Spec Kit/Graphify integrations? | Keep local CLI/shared workflow; do not invent Arena integrations (D02–D03). |
| S4 | Anti-slop and Expo reference? | Keep vendored manual gate; adapt behavior to React Web, no RN/Expo dependency (D04–D05). |
| S5 | Persisted progress and tooling? | Static LocalStorage/Zustand with versioned schema, no backend; pinned runtime/deps already documented (D07–D08, D10). |
| S6 | Phase output interpretation? | Phase 1 is a spec/design phase: validated docs, checklist and owner approval; no application code or app-build test required. Implementation phases require runnable app increment (D11, protocol updated). |

## Technical follow-up that must be tracked before Phase 2 planning
The roadmap puts interactive lessons in Phase 04 but the pure equation engine in Phase 06. A lesson must not reimplement math logic in UI. Resolve **A5** before changing the future phase task plans. No engine code is being written here.

## Binding post-approval clarification
The owner approved A1/A3/A4/A5 and A2 with stronger scope: fractional equations with rational coefficients and exact rational answers are mandatory v1 material, with an independent lesson/examples/exercises, step explanations and feedback, plus increasingly difficult game content beyond a token final question. Full curriculum and Persian-copy review is mandatory **before public release**. Binding record: D12–D16 in `docs/DECISIONS.md`. A4 is approval of the planning baseline, **not** separate final Phase 1 completion acceptance.
