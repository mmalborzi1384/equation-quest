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
