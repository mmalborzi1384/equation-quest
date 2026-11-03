# Plan — 3D exploration and controls

**Draft, not executed.** R3F scene, orthographic follow camera, game-engine input state, HUD and mobile controls.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: keyboard arrows/WASD E Esc, mobile joystick/tap/pause, fallback and presets. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: HUD/puzzle panel must display signed and fractional expressions legibly in isolated LTR maths, while keyboard/touch controllers and non-WebGL alternative keep all required puzzles reachable.

## Phase 5 execution (authorized, 2026-11-03)
1. Implement bounded, deterministic movement and proximity in a pure exploration module; test diagonal normalization, bounds, pause and target range.
2. Build an R3F orthographic isometric scene with procedural low-poly balance/bridge/station geometry and a following camera; isolate behind the `/game` lazy page and a WebGL guard.
3. Wire keyboard arrows/WASD/E/Escape and mobile held directional pad/interact/pause to the same input state. Provide DOM station inspection, textual position/proximity and reachable lesson/stage-preview links, including when WebGL fails.
4. Add quality low/balanced/high (pixel ratio/shadows), reduced-motion and visibility handling; validate routes, no-WebGL, keyboard/pointer/mobile/desktop widths and build in Chromium when available. No Phase 6 puzzles/awards/unlocks.

## Phase 6 extension
Add a DOM exact-rational mechanics workshop next to the existing exploration scene. Inspecting a landmark may open a related challenge but the 3D scene never grades algebra. Preserve keyboard/touch movement, pause, quality presets and no-WebGL map; the workshop is operable without WebGL and does not mark a level complete.

## Phase 7 level entry
Four R3F island landmarks now provide links to the first authored level in each region and light up one marker gem per verified stage, plus a ring when both are complete. The DOM map and level route expose the same information without WebGL. Puzzle controls and correctness remain in semantic DOM/pure modules, not in Three. The Phase 6 workshop is independent; persistence/resume is Phase 8.
