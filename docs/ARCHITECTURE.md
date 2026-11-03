# Architecture proposal (not yet implemented)

## Boundaries
`src/app/` router/providers/error boundary; `src/pages/{Home,Learning,BalanceLesson,UnknownLesson,InverseOperations,World,Game,Level,Progress}/` route composition; `src/components/` navigation/layout/carousel/controls; `src/features/equation-engine/` pure typed values/steps/evaluation/feedback; `puzzle-engine/` puzzle contracts; `level-manager/` level definitions/unlock rules; `progression/` save schema and reward idempotence; `player/` input intent; `game-engine/` simulation/interaction; `src/three/` scenes/camera/materials/interaction adapters; `src/store/` Zustand persist adapter; `src/data/` authored Persian content/levels; `src/styles/` tokens/CSS modules; `src/hooks/`, `src/utils/`, `src/types/`. No module may import a route into a domain feature.

## Dependency direction
Pages → components + features; Game/Level → game-engine + level-manager + 3D adapters; puzzle-engine → equation-engine; progression → level-manager IDs; store → progression schema; three scene → game-engine contracts (never equation React UI); equation-engine imports neither React nor Three. Shared inputs are typed data, not ad-hoc global event listeners. See `DEPENDENCY_MAP.md`.

## Routing and builds
`HashRouter` inside Vite app; Vite `base: '/equation-quest/'` for GitHub Pages; React Router paths omit repo prefix (URL `https://.../equation-quest/#/learning`). Route-level `React.lazy` + suspense/error fallback; unknown paths and invalid level IDs show a useful not-found path. Navigation uses `Link`/`useNavigate`; back uses history when valid and home fallback. Asset URLs via imports or `import.meta.env.BASE_URL`, never root hardcoded.

## Gameplay ownership
Data definitions (8 authored levels, pedagogic prompts, target equation, region, reward) feed level manager. Game engine owns movement, interaction radius and pause; fixed-follow orthographic/isometric camera adapter; puzzle engine gates progression and invokes pure math checking. UI exposes next step, hints and status. Keyboard WASD/arrows, E, Escape; virtual joystick/touch interaction/pause on mobile. Both controllers emit the same movement/interaction intents.

## Persistence
Zustand `persist` with explicit version/migration and storage key, allowlisted fields (`completedLevelIds`, `earnedRewardIds`, XP/crystals, best attempts, last level, settings); derive unlocks/achievements instead of trusting UI state. Idempotent completion prevents duplicate rewards; validate/migrate corrupted data, fallback to fresh state, no PII. Local-only/device-specific; communicate lost-browser-data risk.

## Deployment and quality
Static Vite `dist` uploaded by GitHub Actions after npm ci, typecheck, lint, unit/integration/E2E smoke and build. Browser E2E in CI needs explicit browser install. Assets local/self-hosted where licensing permits. No build/runtime config or CI has been implemented at preparation stage.
