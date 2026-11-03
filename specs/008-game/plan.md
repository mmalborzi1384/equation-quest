# Plan — 3D exploration and controls

**Draft, not executed.** R3F scene, orthographic follow camera, game-engine input state, HUD and mobile controls.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: keyboard arrows/WASD E Esc, mobile joystick/tap/pause, fallback and presets. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: HUD/puzzle panel must display signed and fractional expressions legibly in isolated LTR maths, while keyboard/touch controllers and non-WebGL alternative keep all required puzzles reachable.
