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
| D11 | Generic phase outputs vs phase-specific objectives | Owner clarified: Phase 1 is specification/design; no executable app required. Interpret three outputs relative to phase: reviewed/validated spec package, current docs, validation/approval report for Phase 1; runnable app increments in implementation phases. Protocol authorizes none. | Phase 1 remains pending A1–A4 owner approvals; no app tests claimed or Phase 2 started. |

## Phase 1 decisions awaiting owner (not yet resolved)
See [concise options, recommendations and consequences](PHASE_01_DECISION_REPORT.md): A1 eight topic routes vs directly addressable modules; A2 numeric/curriculum progression and teacher review timing; A3 procedural 3D vs supplied licensed assets; A4 approval of the Phase 1 planning bundle/Constitution after chosen revisions. A5 actual Pages publication timing may be deferred to Phase 10; defining HashRouter/base strategy needs no further permission. No Phase 2 authorization has been given.

Safe readings of existing requirements: D01–D05, D07–D08 and D10 stand; D06 CSS Modules is an option expressly allowed in the brief, not a forced owner decision. Engine-before-interactive-lessons dependency is flagged in the review; do not shift phase scope without approval.
