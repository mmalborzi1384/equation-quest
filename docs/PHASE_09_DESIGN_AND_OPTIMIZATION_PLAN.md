# Phase 9 visual and optimization acceptance plan (D28)

**Status: proposed scope only.** Phase 8 must not start under the current owner instruction; this document does not authorize Phase 9 or implementation. Phase 9 remains the roadmap's integration, accessibility, mobile, quality and performance phase. Phase 10 alone owns CI/public deployment after its separate gates.

## Direction specified by the owner

1. **Use anti-slop skills in optimization, not just at handoff.** Read the vendored core and relevant UI/mobile/code/copy skills during planning, asset selection, profiling and refinements. Record the purpose of each visual/performance choice and a final PASS/FAIL Delivery Gate with observable evidence; do not call an unrun audit complete.
2. **Authentic game-environment image as background.** Source/capture the hero or relevant page background from the actual four-island game scene, rather than unrelated stock art or a fabricated screenshot. Crop art-directed desktop/mobile variants and optimize the resulting local asset (formats, dimensions, responsive `srcset`/loading as appropriate); preserve foreground math legibility using measured contrast/overlay, focus visibility, reduced-motion and an attractive static fallback for no-WebGL/slow devices. Do not promise a specific FPS, image or license until measured/reviewed.
3. **Modern, restrained liquid-glass on button-like controls.** Apply a coherent liquid-glass appearance to on-screen actionable buttons/boxed CTAs, keeping the owner's gently rounded 9px corners and 44px targets. Treat the effect as a functional affordance with real hover/pressed/focus/disabled states, legible Persian text, visible keyboard focus, contrast measured over the actual image, and a solid-color fallback when blur/refraction is unsupported or expensive. Avoid decorative glass on every card/text surface; check low-end/mobile paint cost and reduced-motion. `http://reactdrops.dev` is a suggested reference, not an approved dependency: evaluate its license, bundle weight and accessibility before any import; an equivalent lightweight local implementation is allowed.

## Exit evidence required (future phase, not yet run)

- Screenshots/inspection of 320/390/768/1280px and low/no-WebGL across pages with the chosen game image; no crop that obscures gameplay instructions or focus.
- Automated and manual button/CTA state checks (keyboard, touch, contrast over light/dark background, fallback without `backdrop-filter`, reduced motion); existing rounded-corner browser gate remains green.
- Measured image payload, WebGL/scene chunk, interaction smoothness and mobile rendering/paint cost against a documented budget; regressions fixed, not hidden by disabling the effect only in tests.
- Anti-slop skills explicitly applied during the work, with rule-linked findings, purposeful fixes and a recorded Delivery Gate; CI and public release remain Phase 10.
