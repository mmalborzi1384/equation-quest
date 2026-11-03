# Preparation report — 2026-11-03

## 1. Repository
`mmalborzi1384/equation-quest` public, default branch `main`, initial commit `c0af5a3` with only MIT LICENSE. Working branch `arena/5b2fda5d-equation-quest`; initially clean, no app, source tree, CI or Pages site. All preparation files were created on the Arena working branch; commit/push state must be checked with Git at session end. Specification lives in user's message; its requirements have been transferred into repo docs and specs, not copied verbatim.

## 2. Tool and skill compatibility
Python 3.11.2, Node 22.22.3, npm 10.9.8, Git 2.39.5, `gh` authenticated. `uv` 0.13.7 installed; `specify-cli` 1.2.6 CLI status OK, project scaffolded with `--integration none` because `specify check` exposes no Arena integration. Spec Kit workflow kept in `.specify/WORKFLOW_ARENA.md`. `graphifyy` 0.9.101 official-linked PyPI local CLI works; Graphify connector reported unsupported, no remote MCP access. Anti-slop `npx antislop-ai --help` needs interactive terminal; six official skills copied manually into `.agents/skills`, but Arena skill auto-activation unverified; AGENTS.md instructs manual application and delivery gate. Expo Glass Carousel inspected at GitHub: RN/Expo/Skia; web-only behavior adaptation proposed, no RN packages installed. Blender unavailable. See `docs/DEPENDENCIES.md`.

## 3. Architecture, page map and memory
Proposed React 19 + TypeScript strict + Vite 8; `HashRouter`, base `/equation-quest/`; independent routes/pages (Home, Learning, 3 lessons, World, Game, 8 level IDs, Progress), domain-first equation/puzzle/level/progression engines, R3F world/scene adapters and Zustand persist. See `ARCHITECTURE.md`, `ROUTES.md`, `MATHEMATICAL_ENGINE.md`, `EDUCATIONAL_CONTENT.md`, `GAME_DESIGN.md`. Wireframes and interaction contracts for every page in `WIREFRAMES.md`; design direction in `DESIGN.md`.

Memory: `AGENTS.md` and `PROJECT_MEMORY.md` are re-entry points; `.specify/memory/constitution.md` + 12 independent feature specification/plan/clarification/checklist/task sets in `specs/`; required `docs/` records, including `DECISIONS.md` and `DEVELOPMENT_STATUS.md`, are present. Task sequencing in `ROADMAP.md`.

## 4. Dependency status and knowledge graph
Exact npm dependencies installed into lockfile and `node_modules`; `npm ls --depth=0`, Vite, Vitest, gltf-transform CLI versions succeeded. No project tests or production build exist yet. Graphify extraction/clustering succeeded: 166 nodes, 259 edges, 8 communities, covering setup tooling/manifests ONLY. Tracked machine-readable `graphify-out/graph.json` + report; future code graph blocked by no source modules. Planned edges are explicitly separate in `DEPENDENCY_MAP.md`.

## 5. Risks / decisions required
- `npm audit` found 16 vulnerabilities (2 low, 14 moderate), largely dev-tool chains plus KaTeX. Do not run breaking `--force` fixes blindly; review patched versions/overrides or alternate packages before release.
- No Arena-native Spec Kit integration or Graphify MCP connector; local CLI/manual workflows are honest fallbacks. Local Python tool installs may be ephemeral in future sandboxes.
- WebGL/mobile GPU performance, accessibility of 3D lesson fallback and shader-style glass effect require measured testing. No GLB/Blender available; choose art plan and licenses.
- Curriculum language/math examples need educational review; fractions/negative values and hint taxonomy need final data constraints. LocalStorage is device-local and can be wiped.
- Pages settings/Actions permissions and deployed path cannot be tested before approval. Playwright browser binaries not installed.
- Approval requested: (1) start Phase 02 after document review, (2) CSS Modules + design tokens, (3) art assets/procedural-first plan, (4) curriculum reviewer/reference, (5) eventual Pages publish timing.

## 6. Proposed order
Close owner clarifications → foundation/shared routing → home/carousel → learning overview and three lessons (with math core foundation early) → 3D controls/world → puzzle, levels and reward engine → eight authored stages → persistence/dashboard → integration QA/performance/anti-slop gates → CI/Pages build, deploy and real-host smoke. Execute one feature checklist at a time; no implementation until explicit owner go-ahead.

**Honesty gate:** No functioning app, navigable page, 3D scene, solved puzzle, saved progress, browser test, build, or Pages deployment was produced in this preparation phase.
