# Performance plan (targets to measure, not achieved)

Lazy-load routes and heavy scenes; static sprite/DOM fallback for no WebGL. Cap pixel ratio by preset; performance ≈1, balanced ≤1.5, high ≤2; detect device conservatively and offer manual override. Prefer baked lighting and a limited number of dynamic shadows; instance repeated geometry; pause/offscreen R3F work when appropriate. Profile mobile before selecting budget. Author GLB locally, run gltf-transform inspection/meshopt/draco optimization where assets exist; no GLBs or Blender install yet. Self-host assets/fonts; verify Vite base path. E2E mobile viewport, screen reader/keyboard and reduced-motion smoke are release gates. Do not claim FPS/load time without measurements.

## Phase 5 measured configuration (not FPS claims)

The lazy R3F scene uses `Canvas` with DPR caps low 1, balanced 1.5, high 2; shadows only on high, less decorative geometry and no antialias on low. Browser test with device scale factor 2 verified low canvas DPR <=1.05. Offscreen and paused mode switch R3F to demand frameloop; OS/user reduced-motion uses immediate camera follow. Vite build warned of a 925 kB minified / 245 kB gzip lazy scene chunk; it is not loaded by Home/lessons/no-WebGL, but its size requires future profiling. **No actual FPS, memory or low-end hardware measurements were made.**

## Future Phase 9 optimization additions (D28; planned, not measured)

Budget an authentic game-scene background by measured image bytes, viewport-specific crops, responsive delivery and lazy/eager priority appropriate to its placement. Test compositing/paint impact of liquid-glass buttons over the image at mobile widths, reduced motion and low/no-WebGL; keep a cheap solid control fallback for unsupported or slow environments. Use the vendored anti-slop skills throughout profiling and design refinement, then record the Delivery Gate and actual performance numbers. `reactdrops.dev` is a possible design reference only; compare bundle/accessibility/license before adopting any code. No new image, visual effect, library or measurement has been made in this planning update.

## Future Phase 9 scroll-motion budget (D29; planned)

Measure the combined paint/CPU cost of scroll-entry panels, paced Persian text reveals, game-derived background and liquid-glass controls on mobile. Prefer one-time viewport triggers and compositor-friendly transforms/opacity, with no layout-shifting per-character writes; do not multiply scroll listeners across routes. Full semantic text and focus targets must remain available when motion is reduced, JavaScript/observer support fails, or the user scrolls quickly. No timings/FPS for this future effect have been measured.

## Phase 9 measured local sample (D32)

The game-canvas screenshot is encoded as 32,900-byte desktop and 17,570-byte mobile WebP. `npm run check:phase9` enforces 45/25 kB image and 260,000-byte gzip lazy scene budgets; scene remains 242,737 gzip bytes, with a Vite large-chunk warning. Mobile <=600px and reduced-motion use non-blurred solid action surfaces. A 390px headless Chromium ×4 CPU-throttled Home scroll (135 rAF intervals) measured 16.6ms median, 18.4ms p95 and 36.9ms max; not real-device FPS or a before/after improvement claim. Full details and caveats: [report](PHASE_09_COMPLETION_REPORT.md).

## D33 scroll stability correction

Desktop/global button `backdrop-filter` and container translation were removed after user-observed scroll jumps; the visual glass edge remains a cheap inset shadow. Carousel card blur was also removed; only its decorative lens can blur on desktop, not mobile/reduced motion. Browser regression asserts button document coordinates remain within 1px while scrolling. One local throttled post-fix sample (390px, 4× CPU, 135 frames) measured 16.6ms median, 20.2ms p95, 43.8ms max; not an FPS guarantee or direct statistical improvement over the earlier single sample. See [readiness report](PHASE_09_POLISH_AND_RELEASE_READINESS.md).
