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

| D11 | Generic phase instructions vs permission to begin | `PHASE_EXECUTION_PROTOCOL.md` governs every phase, but authorizes none. Three mandatory outputs: runnable code, current docs, real test report; stop after each phase. | Owner says only “phase 1” done; repo evidence lacks app code/tests. Mark discrepancy, do not silently call phase fully verified or start Phase 02. |

## Owner decisions requested
1. Confirm teaching/curriculum reference and whether a teacher can review Persian content.
2. Confirm art-production approach: procedural low-poly first or owner-supplied GLB assets; verify licenses/ownership.
3. Confirm Pages deployment timing and whether repository Pages Actions settings can be enabled when approved.
4. Approve starting foundation phase and proposed CSS Modules/token choice; no implementation until explicit approval.
