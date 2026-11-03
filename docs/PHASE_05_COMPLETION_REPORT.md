# Phase 05 completion report: 3D exploration, camera and controls

**Date:** 2026-11-03 · **Branch:** `arena/bdc71c3b-equation-quest` · **Authorization:** owner approved Phase 4, explicitly merged PR #4 at `ea1c52c`, reiterated desktop **and** mobile support, and separately authorized Phase 5 (D22). **Phase 6+, PR merge and deployment remain unauthorized.**

## Delivered executable increment

`/game` now has an actual procedural R3F island scene, four named landmarks, a walker and an orthographic fixed-angle following camera. Bridges and balance-shaped markers use the existing navy/gold/ocean/mint/violet design tokens and simple Three meshes; no stock asset, GLB or dependency was added. Keyboard WASD/arrows move with normalized diagonal speed and bounds; E inspects a nearby marker, Escape pauses/resumes. A mobile four-way held-touch direction pad, inspect button and DOM landmark list offer the same exploration without requiring a mouse or a functioning WebGL context. Marker taps and list/map buttons reveal context and link to **real lessons** and **informational** stage previews.

Quality selector sets low/balanced/high DPR caps (1/1.5/2), high-only shadows, low-mode simple geometry/antialias off. R3F animation switches to demand when paused/offscreen. OS/user reduced-motion settings make camera follow immediate. Missing WebGL, WebGL context loss or scene rendering error falls back to a semantic text map with movement, inspection and links; no blank scene. The `/world` map still lists four regions, now also linking to the workshop. Levels 01–08 and `/progress` remain honest previews/empty states: **no math puzzle, unlock, XP, reward, save or level completion** was created.

**Source:** `src/features/exploration/movement.ts`, `src/data/exploration.ts`, `src/three/ExplorationScene.tsx`, `src/pages/Game/{Game.tsx,Game.module.css,SceneBoundary.tsx}`, updated `src/pages/World/World.tsx`, Playwright WebGL args; unit and E2E tests below. Specs 007/008, D22–D23, architecture, route, performance, testing, dependency, memory/status and Graphify docs updated. Existing Home, nine lessons and math core preserved.

## Verification actually executed

| Command or inspection | Outcome |
|---|---|
| `bash scripts/setup.sh` in fresh assigned branch, then `EXPECTED_BRANCH=arena/bdc71c3b-equation-quest bash scripts/verify-environment.sh --full` | **PASS**: canonical Node/npm/uv/Spec Kit/Graphify, 28 locked direct dependencies, lint/Prettier/typecheck, **61/61 Vitest** and Vite production build. Four pure movement and three Game DOM tests added to 54 prior tests. |
| `EQ_WEBGL=1 LD_LIBRARY_PATH=/tmp/eq5-libs/lib:/tmp EQ_CHROMIUM_PATH=/tmp/eq5-chromium-bin npm run test:e2e` | **15/15 PASS**: six Phase 5 tests plus five Home and four lesson regressions. Genuine SwiftShader-backed WebGL on 320/390/768/1280px, desktop WASD/arrows/E/Escape/pause, mobile CDP **held touch**, inspection/lesson links, low DPR cap under deviceScaleFactor 2, reduced-motion mode, no-WebGL at 320px, context-loss fallback and no horizontal page overflow. Initial 320px WebGL grid overflow by 2px was fixed (minmax zero column); rerun passed. Initial high-DPR movement test timed out; capped simulation delta adjusted and rerun passed. |
| Live `npm run dev -- --host 0.0.0.0`; forwarded-host HTTP GET `/equation-quest/` | **PASS**, HTTP 200, live preview on port 5173. Headless screenshots at desktop 1280px and mobile 390px inspected; both render the actual 3D island and readable controls. |
| `graphify extract . --code-only`, `graphify cluster-only . --no-label --no-viz`, `graphify update .` | **PASS**: 1156 nodes, 1534 edges, 142 communities after new code. |
| `npm audit --json` | **16 existing findings:** 2 low, 14 moderate; exit code 1; not security clearance. |

**Browser setup:** the sandbox lacked a browser binary. `@sparticuz/chromium@153.0.0` was temporarily downloaded from the allowed npm registry and expanded with bundled NSS/SwiftShader into `/tmp`, with WebGL explicitly enabled through Playwright flags. This is **not** a project runtime package or committed artifact. Device emulation and CDP touch are not physical-device testing.

**Build/performance:** Vite warns the isolated lazy R3F scene is 925 kB minified / 245 kB gzip; Home, lessons and no-WebGL path do not load it. DPR cap verified at device scale 2; no real FPS, memory, battery or low-end hardware benchmark was performed. Further profiling and bundle reduction are required before release. No GitHub Pages deployment, hardware touch or full screen-reader/multi-browser audit was done. Independent Grade 7/Persian curriculum review remains required before public release.

## Manual design and anti-slop delivery gate (Phase 5 subset)

**PASS, with evidence and scope limits:**

- Hard gates R-02/R-03/R-17/R-18/R-23/R-24: no em dash in new UI copy, 320/390/768/1280px browser no-overflow checks, no fabricated statistics/testimonials/assets/links. Procedural balance/bridge/landmark geometry follows owner-approved A3 and existing design direction, not an invented photo or fake game achievement.
- R-25: calculated sampled new text/background contrast: navy on ivory 13.24:1, muted ink on sidebar 6.52:1, gold action text 7.97:1, light status on navy 10.01:1 and disabled text 5.03:1, exceeding 4.5:1 for normal text. **Full automated axe/screen-reader audit not claimed.**
- R-26/R-27/R-32/R-35/R-39: actual workshop and map buttons, keyboard/held touch/E/Escape/quality/links tested in Chromium; native labelled controls, focus outline from global styles, loading and no-WebGL/context-loss/error fallback; ran server and build. No claim that a stage can be solved yet.
- Purpose/liveliness/craft: balance beam/crossing walkways communicate four destinations and equality rather than generic glow/grids; retained energy 2, rhythm 3, motion 2 from `docs/DESIGN.md`, with one focused scene/DOM companion; low-quality and reduced-motion paths are functional. Scene screenshot reviewed at phone and desktop. Static assets/navigation structure unchanged.

## Stop / owner gate

Phase 5 exploration is locally implemented and verified. Recommend owner review and later explicit Phase 6 authorization for **puzzle/level-manager/reward integration**, but do not begin it, merge this PR, or deploy without permission. The full 008 Game feature and 007 World unlock/progress checklist remain open for later authorized phases.
