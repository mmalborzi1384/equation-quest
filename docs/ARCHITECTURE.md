# Architecture proposal (not yet implemented)

## Boundaries
`src/app/` router/providers/error boundary; `src/pages/{Home,Learning,EquationLesson,BalanceLesson,BothSidesLesson,UnknownLesson,PartsLesson,InverseOperations,SolveLesson,VerifyLesson,FractionsLesson,World,Game,Level,Progress}/` route composition; `src/components/` navigation/layout/carousel/controls; `src/features/equation-engine/` pure exact-rational values/steps/evaluation/feedback (`ax+b=c`, rational `a,b,c`, `a≠0`); `puzzle-engine/` puzzle contracts; `level-manager/` level definitions/unlock rules; `progression/` save schema and reward idempotence; `player/` input intent; `game-engine/` simulation/interaction; `src/three/` scenes/camera/materials/interaction adapters; `src/store/` Zustand persist adapter; `src/data/` authored Persian content/levels; `src/styles/` tokens/CSS modules; `src/hooks/`, `src/utils/`, `src/types/`. No module may import a route into a domain feature. Eight core lesson routes plus a ninth fraction route preserve A1/A2 independence; fraction practice and levels call the same pure domain API.

## Dependency direction
Pages → components + features; Game/Level → game-engine + level-manager + 3D adapters; puzzle-engine → equation-engine; progression → level-manager IDs; store → progression schema; three scene → game-engine contracts (never equation React UI); equation-engine imports neither React nor Three. Shared inputs are typed data, not ad-hoc global event listeners. See `DEPENDENCY_MAP.md`.

## Routing and builds
`HashRouter` inside Vite app; Vite `base: '/equation-quest/'` for GitHub Pages; React Router paths omit repo prefix (URL `https://.../equation-quest/#/learning`). Route-level `React.lazy` + suspense/error fallback; unknown paths and invalid level IDs show a useful not-found path. Navigation uses `Link`/`useNavigate`; back uses history when valid and home fallback. Asset URLs via imports or `import.meta.env.BASE_URL`, never root hardcoded.

## Educational dependency schedule
A5 approved: Phase 1 specifies the pure math contract, Phase 04 implements the minimum exact-rational operation/checking core needed by interactive lessons, and Phase 06 expands puzzle/level/reward integration. Do not duplicate math rules inside React. Phase 4 now authorized/implemented (D20); Phase 5+ still requires separate authorization.

## Gameplay ownership
Data definitions (8 authored levels, pedagogic prompts, target equation, region, reward) feed level manager. Game engine owns movement, interaction radius and pause; fixed-follow orthographic/isometric camera adapter; puzzle engine gates progression and invokes pure math checking. UI exposes next step, hints and status. Keyboard WASD/arrows, E, Escape; virtual joystick/touch interaction/pause on mobile. Both controllers emit the same movement/interaction intents.

## Persistence
Zustand `persist` with explicit version/migration and storage key, allowlisted fields (`completedLevelIds`, `earnedRewardIds`, XP/crystals, best attempts, last level, settings); derive unlocks/achievements instead of trusting UI state. Idempotent completion prevents duplicate rewards; validate/migrate corrupted data, fallback to fresh state, no PII. Local-only/device-specific; communicate lost-browser-data risk.

## Deployment and quality
Static Vite `dist` uploaded by GitHub Actions after npm ci, typecheck, lint, unit/integration/E2E smoke and build. Browser E2E in CI needs explicit browser install. Assets local/self-hosted where licensing permits. No build/runtime config or CI has been implemented at preparation stage.

## Phase 2 implemented subset (2026-11-03)
`src/app/App.tsx` owns HashRouter, explicit route table, `React.lazy` route modules and error/loading fallback. `src/components/layout/` owns RTL shared layout/footer and the skip link, `src/components/navigation/` owns desktop/mobile links and back fallback, and `src/components/carousel/` owns the web carousel (CSS lens, pointer/keyboard/button/dot controls). `src/pages/Lessons/` has nine separately lazy-loaded entry modules, with a shared informational preview component, not nine interactive lesson engines. `src/data/` contains route/topic/level preview metadata; `src/store/usePreferences.ts` persists only a reduced-motion preference. Game/math/3D/progression directories remain future architecture, not Phase 2 implementations.

## Phase 3 Home-only implementation (2026-11-03)
`src/pages/Home/hooks/useHomeMotion.ts` registers GSAP ScrollTrigger only while Home is mounted and motion is allowed; it scopes chapter heading reveals and illustrative hero parallax to the Home root, reverts context/listeners on navigation/preference changes and never gates content visibility. `src/components/carousel/GlassCarousel.tsx` owns its isolated pointer/keyboard/dot/side-card state, SVG-displaced decorative lens and focus transfer; CSS includes a solid fallback when backdrop-filter is unsupported. Neither component imports WebGL, math engine or gameplay. Routes outside Home remain Phase 2 previews. `tests/e2e/home.spec.ts` exercises the routed Home in a real browser without replacing later full QA.
