# Architecture and implemented increments (gameplay/progression still planned)

> **Current-state note (2026-11-04):** the Home GSAP/ScrollTrigger hook described below was **removed** on this branch. Motion is now native CSS (`animation-timeline`, `@starting-style`, View Transitions, `linear()`), with GSAP confined to the lazy `#/intro` chunk and `@formkit/auto-animate` confined to `src/features/motion/useMotionList.ts`. `src/features/motion/` is a new layer (motion permission, list animation, route transition). See [`MOTION.md`](MOTION.md) and [`FINAL_VERIFICATION_2026-11-04.md`](FINAL_VERIFICATION_2026-11-04.md); the paragraph below is kept as historical implementation context.

## Boundaries
`src/app/` router/providers/error boundary; `src/pages/{Home,Learning,EquationLesson,BalanceLesson,BothSidesLesson,UnknownLesson,PartsLesson,InverseOperations,SolveLesson,VerifyLesson,FractionsLesson,World,Game,Level,Progress}/` route composition; `src/components/` navigation/layout/carousel/controls; `src/features/equation-engine/` pure exact-rational values/steps/evaluation/feedback (`ax+b=c`, rational `a,b,c`, `a≠0`); `puzzle-engine/` puzzle contracts; `level-manager/` level definitions/unlock rules; `progression/` save schema and reward idempotence; `player/` input intent; `game-engine/` simulation/interaction; `src/three/` scenes/camera/materials/interaction adapters; `src/store/` Zustand persist adapter; `src/data/` authored Persian content/levels; `src/styles/` tokens/CSS modules; `src/hooks/`, `src/utils/`, `src/types/`. No module may import a route into a domain feature. Eight core lesson routes plus a ninth fraction route preserve A1/A2 independence; fraction practice and levels call the same pure domain API.

## Dependency direction
Pages → components + features; Game/Level → game-engine + level-manager + 3D adapters; puzzle-engine → equation-engine; progression → level-manager IDs; store → progression schema; three scene → game-engine contracts (never equation React UI); equation-engine imports neither React nor Three. Shared inputs are typed data, not ad-hoc global event listeners. See `DEPENDENCY_MAP.md`.

## Routing and builds
`HashRouter` inside Vite app; Vite `base: '/equation-quest/'` for GitHub Pages; React Router paths omit repo prefix (URL `https://.../equation-quest/#/learning`). Route-level `React.lazy` + suspense/error fallback; unknown paths and invalid level IDs show a useful not-found path. Navigation uses `Link`/`useNavigate`; back uses history when valid and home fallback. Asset URLs via imports or `import.meta.env.BASE_URL`, never root hardcoded.

## Educational dependency schedule
A5 approved: Phase 1 specifies the pure math contract, Phase 04 implements the minimum exact-rational operation/checking core needed by interactive lessons, and Phase 06 expands puzzle/level/reward integration. Do not duplicate math rules inside React. Phase 4 implemented and accepted (D20); Phase 5 R3F exploration explicitly authorized (D22). Phase 6+ requires separate authorization.

## Gameplay ownership
Data definitions (8 authored levels, pedagogic prompts, target equation, region, reward) feed level manager. Game engine owns movement, interaction radius and pause; fixed-follow orthographic/isometric camera adapter; puzzle engine gates progression and invokes pure math checking. UI exposes next step, hints and status. Keyboard WASD/arrows, E, Escape; virtual joystick/touch interaction/pause on mobile. Both controllers emit the same movement/interaction intents.

## Persistence
Zustand `persist` with explicit version/migration and storage key, allowlisted fields (`completedLevelIds`, `earnedRewardIds`, XP/crystals, best attempts, last level, settings); derive unlocks/achievements instead of trusting UI state. Idempotent completion prevents duplicate rewards; validate/migrate corrupted data, fallback to fresh state, no PII. Local-only/device-specific; communicate lost-browser-data risk.

## Deployment and quality
Static Vite `dist` uploaded by GitHub Actions after npm ci, typecheck, lint, unit/integration/E2E smoke and build. Browser E2E in CI needs explicit browser install. Assets local/self-hosted where licensing permits. No build/runtime config or CI has been implemented at preparation stage.

## Phase 2 implemented subset (2026-11-03)
`src/app/App.tsx` owns HashRouter, explicit route table, `React.lazy` route modules and error/loading fallback. `src/components/layout/` owns RTL shared layout/footer and the skip link, `src/components/navigation/` owns desktop/mobile links and back fallback, and `src/components/carousel/` owns the web carousel (CSS lens, pointer/keyboard/button/dot controls). `src/pages/Lessons/` has nine separately lazy-loaded entry modules, with a shared informational preview component, not nine interactive lesson engines. `src/data/` contains route/topic/level preview metadata; `src/store/usePreferences.ts` persists only a reduced-motion preference. Game/math/3D/progression directories remain future architecture, not Phase 2 implementations.

## Phase 3 Home-only implementation (2026-11-03)
**Historical:** `src/pages/Home/hooks/useHomeMotion.ts` registered GSAP ScrollTrigger only while Home was mounted and motion was allowed; it scoped chapter heading reveals and illustrative hero parallax to the Home root, reverted context/listeners on navigation/preference changes and never gated content visibility. **On this branch that file is deleted**; `Home.module.css` implements the parallax with `animation-timeline: view()` and hero entrance with `@starting-style`, both behind `@supports` and explicitly neutralised under both reduced-motion paths. `src/features/motion/{useMotionAllowed,useMotionList,viewTransition}.ts` and `src/pages/Intro/useIntroMotion.ts` own the remaining JS motion. `src/components/carousel/GlassCarousel.tsx` owns its isolated pointer/keyboard/dot/side-card state, SVG-displaced decorative lens and focus transfer; CSS includes a solid fallback when backdrop-filter is unsupported. Neither component imports WebGL, math engine or gameplay. Routes outside Home remain Phase 2 previews. `tests/e2e/home.spec.ts` exercises the routed Home in a real browser without replacing later full QA.

## Phase 5 3D exploration subset (2026-11-03)

`src/features/exploration/movement.ts` owns pure bounded movement, keyboard direction mapping and nearby-target selection. `src/data/exploration.ts` places four informative landmarks sourced from island metadata. `src/pages/Game/` owns input, pause, DOM controls/map and quality preferences (in-memory only); `SceneBoundary` contains renderer errors. `src/three/ExplorationScene.tsx` renders procedural R3F meshes, orthographic following camera and quality-dependent DPR/shadows in a lazy chunk loaded only on supported WebGL. On absent/lost WebGL, same movement/inspection persists in DOM. No puzzle engine, level manager, game progress/reward state, or player save has been implemented.

## Implemented Phase 7 stage slice

`features/level-manager/stages.ts` authors eight typed stage concepts/problems by the existing `01`–`08` route IDs. `stage-session.ts` composes the pure Phase 6 puzzle transition and emits `completedNow` only after the last original-equation verification. `progression/levels.ts` gates the next stage and grants once; `useLevelProgress` is an **in-memory** adapter separate from the Phase 6 workshop. `/game/level/:id` owns the semantic DOM puzzle view, `/world` and `/game` consume stage completion and island status. The R3F marker lights respond to the two stage completions per region; the DOM fallback shows identical unlock/status information. Persistence and dashboard still belong to Phase 8.

## Phase 10 release boundary

The Vite base and HashRouter are unchanged. `.github/workflows/pages.yml` validates PRs without deployment; green main builds upload `dist/` via Pages artifact/OIDC, then an independent live smoke checks the public host. `scripts/smoke-release.mjs` is test-only code and is not bundled in the client. Future bug/feature PRs reuse these gates; no app server or release freeze.
