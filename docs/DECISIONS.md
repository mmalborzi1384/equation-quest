# Decision log (2026-11-03)

| ID | Problem / options | Decision and rationale | Impact / approval |
|---|---|---|---|
| D01 | Pages route refresh: BrowserRouter rewrites vs HashRouter | **HashRouter**; static hosting without rewrite handles deep links. | Proposed engineering choice within explicit brief; URLs contain `#`. |
| D02 | Spec Kit: pretend Copilot integration vs shared infrastructure | CLI `none` integration; Arena is not listed in `specify check`. Use real templates/workflow manually, no false plugin claim. | CLI scripts/templates installed; later sessions read docs. |
| D03 | Graphify: Arena MCP vs local CLI | Arena connector reports unsupported; install official-linked `graphifyy` local CLI. | Extracted graph cannot show future code yet; proposed graph separate. |
| D04 | Anti-slop: interactive installer vs manual skill snapshot | Non-TTY installer cannot run; copy six official `SKILL.md` folders into `.agents/skills`; reference from AGENTS.md. | No verified automatic Arena skill injection; gate is manual/documented. |
| D05 | Expo carousel: direct RN dependency vs web adaptation | Reference behavior only; no Expo/RN/Skia. CSS/SVG/DOM with keyboard/touch and fallback. | Shader parity not promised; must test readability and performance. |
| D06 | Style architecture: Tailwind vs CSS Modules | Proposed CSS Modules + tokens for isolated scene/lesson styles. | Owner may prefer Tailwind; no CSS implemented. |
| D07 | Runtime data: server vs browser local | Zustand persist with versioning and idempotent rewards; no backend. | Device-specific and browser-clearing loses save; disclose in UI. |
| D08 | Package versions: latest vs ecosystem compatibility | Pin exact compatible React 19/Vite 8/TS 5.9 versions (TS 7 outside typescript-eslint peer range). | Audit findings unresolved; assess security before release. |
| D10 | Sandbox consistency: shared machine vs repo contract | Pin Node 22.22.3/npm 10.9.8 and exact dependencies in `.nvmrc`, `package.json`, lockfile; bootstrap via user-space pinned uv/Spec Kit/Graphify and `npm ci`; verify, never silently upgrade. No Docker (absent/unverified). | New sandbox requires correct runtime and network; no claim of identical physical image or installed browsers. |
| D09 | Asset pipeline: install Blender here vs external production | Blender absent; do not silently replace 3D with mockup. Plan procedural Three first, GLB pipeline when assets available. | Asset style/artist and licensing need owner decision. |
| D11 | Generic phase outputs vs phase-specific objectives | Owner clarified: Phase 1 is specification/design; no executable app required. Interpret three outputs relative to phase: reviewed/validated spec package, current docs, validation/approval report for Phase 1; runnable app increments in implementation phases. Protocol authorizes none. | A1–A5 planning choices subsequently approved in D12–D16; historical state at D11; D17 records the subsequent Phase 1 acceptance and Phase 2 authorization. |

## Phase 1 decisions awaiting owner (not yet resolved)
See [concise options, recommendations and consequences](PHASE_01_DECISION_REPORT.md): A1 eight topic routes vs directly addressable modules; A2 numeric/curriculum progression and teacher review timing; A3 procedural 3D vs supplied licensed assets; A4 approval of the Phase 1 planning bundle/Constitution after chosen revisions; A5 math-engine timing before interactive lessons. A6 actual Pages publication timing may be deferred to Phase 10; defining HashRouter/base strategy needs no further permission. No Phase 2 authorization has been given.

Safe readings of existing requirements: D01–D05, D07–D08 and D10 stand; D06 CSS Modules is an option expressly allowed in the brief, not a forced owner decision. Engine-before-interactive-lessons dependency is flagged in the review; do not shift phase scope without approval.

## Owner-approved Phase 1 planning decisions — 2026-11-03 (not final Phase 1 acceptance)

| ID | Question / options | Approved planning decision | Consequence / remaining gate |
|---|---|---|---|
| D12 (A1) | Eight core learning topics on unique routes vs anchors in three lesson pages | Preserve the three mandatory lesson paths; add five independently deep-linkable core lessons and a **ninth additional** `/learning/fractions` lesson/practice route for A2. | Nine real topic lesson destinations; no anchor-only fake lessons. New route is needed because fractions cannot displace one of the eight original topics. Future route/code tests required. |
| D13 (A2) | Integer-only v1 vs staged signed/exact fractions; curriculum review now vs before release | Start with small integers; introduce signed coefficients/constants progressively, then inverses/simplification, then **required rational coefficients/constants and exact fractional solutions**. Fractions need independent teaching, worked examples, repeated exercises, step-by-step hints and feedback; stages 06–08 reinforce them. All educational/Persian content must be checked against target grade-7 curriculum **before public release**. | Exact-rational `ax+b=c`, `a≠0` engine scope is required, not an optional later feature; no float tolerance as grading basis. No teacher endorsement claimed yet. |
| D14 (A3) | Procedural genuine 3D vs wait for supplied licensed GLB | Procedural stylized Three.js geometry first; add licensed optimized GLB/GLTF when available. | Preserve real 3D gameplay, performance and licensing gates; no Blender/GLB success claimed in Phase 1. |
| D15 (A4) | Approve or revise Phase 1 documents | Owner approves PRD, Constitution, game/education/design/architecture and feature specs as a **planning baseline**, with A1–A3/A5 and stronger A2 wording incorporated. | Separate owner sign-off on final Phase 1 completion report is still required; this approval does not authorize Phase 2. |
| D16 (A5) | Math core before lessons vs delayed engine or duplicated UI math | Minimal pure exact-rational operation/checking core is scheduled in the **explicitly authorized interactive learning phase** (Phase 04); Phase 06 expands puzzle/level/progression integration. | Adjust future phase task plans; no engine/app code written in Phase 1. |

**A6:** The Pages strategy remains approved as a plan; actual public deployment/permissions await later explicit authorization (Phase 10). **Scope note:** rational coefficients/constants with constant nonzero denominators are included. General rational-function equations with `x` in a denominator are outside the v1 `ax+b=c` mathematical form; expanding equation classes would need a separate specification/owner decision. This does not limit required equations such as `x/2+1/4=3/4` or `(2/3)x+1/2=5/6`.

## Phase transition — owner authorization, 2026-11-03

| ID | Problem / options | Decision | Consequence |
|---|---|---|---|
| D17 | Phase 1 final sign-off vs pending report | Owner explicitly confirmed Phase 1 complete and separately authorized **Phase 2: Core Website Structure**. | Mark Phase 1 completed as a specification phase (no app code required); implement only Phase 2. Landing structure/carousel and route shells may be built, but not the Phase 3 cinematic storytelling or future lesson/game mechanics. |
| D18 | Routes for future content during Phase 2 vs pretending lessons/game work | Implement navigable, honest route previews with meaningful links/related content and clear unavailability notices; reserve separate page modules for each planned route. | Navigation can be tested now without mislabeling lesson/game functionality complete; content remains owned by its later authorized phase. |

## D19 — Restore the original Phase 3 scope (owner clarification, 2026-11-03)

The owner explicitly withdrew the interim request to redefine Phase 3 as educational modules and directed us to follow the **previous approved structure**. Phase 3 is the existing roadmap's **Home narrative / web glass carousel** only (`specs/002-home/`); the earlier educational-module attempt was uncommitted and reverted in full. Interactive lessons, the math engine, 3D gameplay and later phases remain unauthorized. PR #2 was merged to `main` at `8e4ec20` before this phase; no new interpretation of a merge as permission to start later phases.

## D20 — Phase 3 acceptance and explicit Phase 4 authorization (2026-11-03)

The owner explicitly accepted Phase 3 after PR #3 merged into `main` at `804b02a`, then confirmed **Phase 4 (original roadmap): interactive learning and the minimum pure exact-rational math core needed for grading**. Phase 5+ (3D/gameplay) remains unauthorized. Phase 4 covers the eight core concept routes plus the independent fraction route; content review by a real Grade 7 curriculum specialist remains a separate pre-release gate, not a claim of this phase.

## D21 — Domain/UI division for Phase 4

Pure `src/features/equation-engine/` owns normalized BigInt rationals, `ax+b=c` solving/step operations, exact substitution/checking and deterministic exercise generation without React/Three imports. Lesson data authors explanations, worked steps, examples, misconception-specific hints and representational choices. UI delegates all free-form numeric answer checks and step algebra to the engine, never float comparisons; authored concept identification choices are checked by stable IDs only. No puzzle/level-manager/reward/persistence integration (Phase 6+).

## D22 — Phase 4 acceptance and Phase 5 authorization (2026-11-03)

The owner explicitly approved Phase 4 and instructed merging PR #4; it was merged into `main` at `ea1c52c`. The owner emphasized verifying **mobile and desktop together**. The owner then explicitly authorized **Phase 5**, defined by `docs/ROADMAP.md` as the R3F world scene, orthographic camera, controls and scene interaction with desktop/mobile/low-quality input smoke. This does **not** authorize Phase 6 math puzzle/level/progression integration, Phase 7 playable stages, or deployment. A navigable 3D exploration workshop on the `/game` route may inspect four landmarks and lead to lessons/stage previews; it must not pretend those stages are playable.

## D23 — Phase 5 fallback and render boundary

The existing lazy `/game` route will load the R3F scene only when WebGL is supported and the user elects the 3D view. A fully functional DOM map/landmark list and identical controls/inspection are available without WebGL or on context loss. Movement and proximity are pure functions; React input adapters emit the same intent for keyboard/touch; Three is a disposable view and never owns progress or learning correctness. Quality presets cap DPR/shadows, pause/offscreen suspends animation, reduced motion disables camera easing. No new binary art assets or dependencies are needed.

## D24 — Phase 5 acceptance and Phase 6 authorization (2026-11-03)

The owner explicitly accepted Phase 5 and requested merging PR #5; it merged into `main` at `4b3a7d1`. The owner separately authorized **Phase 6** by name. Per `docs/ROADMAP.md`, this phase extends the pure exact-rational checker with a puzzle state machine, a reusable ordered challenge/level-manager contract and **idempotent one-time reward** integration. It must test integer, signed and fractional paths and mistake-specific progressive hints. Eight authored playable stages/island unlocks remain Phase 7; a persisted progress dashboard and migrations remain Phase 8; deployment remains Phase 10. The existing `/game/level/:id` routes remain honest previews. The executable Phase 6 bridge is an explicitly labelled three-question **mechanics workshop** on `/game`, not a claim that the eight-level game is complete.

## D25 — Ephemeral workshop rewards, not a save system

Reward eligibility is emitted only after exact answer and explicit original-equation verification; a pure progress reducer grants once per challenge ID and unlocks the next workshop challenge. Zustand holds this workshop progress **in memory only** (including between route navigations in the same loaded tab); no storage keys, XP dashboard, global level save, or achievements are created before Phase 8. Reload resets workshop state; copy must say so. React/R3F do not own algebra or reward logic. Error/hint codes are deterministic in the pure puzzle module and do not reveal a final answer before the learner completes both-sided actions.

## D26 — Persian graphical name and gently rounded controls (owner direction)

The owner requested that all graphical product-name instances use the Persian equivalent instead of the transliteration «اکویشن کوئست», and that buttons consistently have mildly rounded corners for a modern, minimal feel. UI name: «ماجراجویی معادله‌ها». Use shared `--control-radius: 9px` for interactive buttons and button-like calls to action; deliberately circular markers remain circular. Technical repository/URL/package slugs are not UI copy. This rule applies to subsequent work as well as the current Phase 6 interface; it does not authorize Phase 7, merging or deployment.

**D26 implementation correction:** the initial 9px token covered native `<button>` controls but missed several links styled as buttons. Rounded corners now also apply to boxed Home, carousel, game pause, level navigator, page-intro and header actions, plus clickable learning/journey rows and the skip action. Plain inline text links remain text links. A browser audit checks computed radii across seven routes at 320px and 1280px.
