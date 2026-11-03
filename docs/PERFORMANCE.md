# Performance plan (targets to measure, not achieved)

Lazy-load routes and heavy scenes; static sprite/DOM fallback for no WebGL. Cap pixel ratio by preset; performance ≈1, balanced ≤1.5, high ≤2; detect device conservatively and offer manual override. Prefer baked lighting and a limited number of dynamic shadows; instance repeated geometry; pause/offscreen R3F work when appropriate. Profile mobile before selecting budget. Author GLB locally, run gltf-transform inspection/meshopt/draco optimization where assets exist; no GLBs or Blender install yet. Self-host assets/fonts; verify Vite base path. E2E mobile viewport, screen reader/keyboard and reduced-motion smoke are release gates. Do not claim FPS/load time without measurements.

## Phase 5 measured configuration (not FPS claims)

The lazy R3F scene uses `Canvas` with DPR caps low 1, balanced 1.5, high 2; shadows only on high, less decorative geometry and no antialias on low. Browser test with device scale factor 2 verified low canvas DPR <=1.05. Offscreen and paused mode switch R3F to demand frameloop; OS/user reduced-motion uses immediate camera follow. Vite build warned of a 925 kB minified / 245 kB gzip lazy scene chunk; it is not loaded by Home/lessons/no-WebGL, but its size requires future profiling. **No actual FPS, memory or low-end hardware measurements were made.**
