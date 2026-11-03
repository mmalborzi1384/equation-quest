# Tasks — 3D exploration and controls

The Phase 5 **exploration subset** below is implemented under D22. The full gameplay/puzzle panel and level-manager tasks above remain planned for Phase 6–8; do not claim them done.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define typed contract and data/content for this feature: R3F scene, orthographic follow camera, game-engine input state, HUD and mobile controls.
3. [ ] Implement isolated component/domain logic with working navigation and meaningful fallback.
4. [ ] Add automated checks: keyboard arrows/WASD E Esc, mobile joystick/tap/pause, fallback and presets.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Specify KaTeX/DOM fraction panel independent of 3D controls; test mobile, keyboard and fallback interaction on a fractional stage.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.

## Phase 5 scoped work (owner authorized; Phase 6+ still planned)
- [x] Pure movement/proximity tests and shared keyboard/touch intent mapping (4 unit tests, browser keyboard/CDP touch).
- [x] Real procedural 3D scene, orthographic following camera, four inspectable landmarks; stage links remain labelled previews.
- [x] DOM/no-WebGL and context-loss fallback, labelled actions, pause/resume, keyboard/mobile controls and quality presets.
- [x] Browser desktop/mobile/low-quality/no-WebGL/reduced-motion checks; full lint/typecheck/61 tests/build, 15 Chromium browser tests, scoped anti-slop gate, graph and report.
