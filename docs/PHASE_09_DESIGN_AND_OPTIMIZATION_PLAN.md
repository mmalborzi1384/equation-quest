# Phase 9 visual and optimization acceptance plan (D28)

> **سند تاریخی (۱۲ آبان ۱۴۰۵).** ارقام و توضیحات این گزارش مربوط به همان اجراست. وضعیت جاری کد، تست‌ها و شواهد بصری در [`FINAL_VERIFICATION_2026-11-04.md`](FINAL_VERIFICATION_2026-11-04.md) و [`MOTION.md`](MOTION.md) است.

**Status: Phase 9 authorized (D32), implemented and locally tested; owner review pending.** Earlier D28/D29 wording below describes the planning boundary at that time. Phase 10 still owns CI/public deployment after separate gates. See [Phase 9 completion report](PHASE_09_COMPLETION_REPORT.md) for measured outcomes and limitations.

## Direction specified by the owner

1. **Use anti-slop skills in optimization, not just at handoff.** Read the vendored core and relevant UI/mobile/code/copy skills during planning, asset selection, profiling and refinements. Record the purpose of each visual/performance choice and a final PASS/FAIL Delivery Gate with observable evidence; do not call an unrun audit complete.
2. **Authentic game-environment image as background.** Source/capture the hero or relevant page background from the actual four-island game scene, rather than unrelated stock art or a fabricated screenshot. Crop art-directed desktop/mobile variants and optimize the resulting local asset (formats, dimensions, responsive `srcset`/loading as appropriate); preserve foreground math legibility using measured contrast/overlay, focus visibility, reduced-motion and an attractive static fallback for no-WebGL/slow devices. Do not promise a specific FPS, image or license until measured/reviewed.
3. **Modern, restrained liquid-glass on button-like controls.** Apply a coherent liquid-glass appearance to on-screen actionable buttons/boxed CTAs, keeping the owner's gently rounded 9px corners and 44px targets. Treat the effect as a functional affordance with real hover/pressed/focus/disabled states, legible Persian text, visible keyboard focus, contrast measured over the actual image, and a solid-color fallback when blur/refraction is unsupported or expensive. Avoid decorative glass on every card/text surface; check low-end/mobile paint cost and reduced-motion. `http://reactdrops.dev` is a suggested reference, not an approved dependency: evaluate its license, bundle weight and accessibility before any import; an equivalent lightweight local implementation is allowed.

## Exit evidence required (future phase, not yet run)

- Screenshots/inspection of 320/390/768/1280px and low/no-WebGL across pages with the chosen game image; no crop that obscures gameplay instructions or focus.
- Automated and manual button/CTA state checks (keyboard, touch, contrast over light/dark background, fallback without `backdrop-filter`, reduced motion); existing rounded-corner browser gate remains green.
- Measured image payload, WebGL/scene chunk, interaction smoothness and mobile rendering/paint cost against a documented budget; regressions fixed, not hidden by disabling the effect only in tests.
- Anti-slop skills explicitly applied during the work, with rule-linked findings, purposeful fixes and a recorded Delivery Gate; CI and public release remain Phase 10.

## Scroll-led storytelling and typed reveals (owner addition D29; pending)

- As a section/panel below the fold reaches the viewport, bring it into view with a clearly perceptible but short, purposeful reveal (for example opacity/translation/stagger). Headings and selected **short** narrative lines should appear with a paced typing-style transition, not an endless typewriter on long lesson explanations or exact math. Distinguish section entry from text reveal so the sequence reads clearly while scrolling; do not require a particular scroll velocity or turn scrolling into a game control.
- Existing Phase 3 Home `useHomeMotion` already registers GSAP ScrollTrigger and shifts some headings on entry, but currently has **no opacity/typing sequence and no site-wide lower-panel treatment**. Audit each route; extend this pattern where pedagogically useful rather than duplicating heavy listeners on every element.
- Keep the real Persian text in the DOM and accessible from the start; animate only visual presentation. For RTL/Persian type reveals, preserve grapheme clusters and zero-width non-joiners (ZWNJ), and do not break LTR KaTeX, accessible names, copy/selection, or screen-reader reading order. If JS/IntersectionObserver/animation support fails, the full text and sections remain visible. Honor both OS and stored reduced-motion preferences with immediate, non-animated content; avoid hiding focus targets or delaying navigation.
- Acceptance evidence in Phase 9: Playwright/browser scroll journeys on Home plus lower sections of Learning, World, Game and Progress at mobile/desktop widths; assert section entry and text reveal are visible and one-time, text is fully readable with reduced motion or unavailable animation, keyboard/focus and screen readers are not gated, no layout shift/overflow or mobile performance regression. Record a real anti-slop/motion-purpose and performance gate; do **not** claim these animations exist yet.

## D33 correction after implementation

A real scroll-jump complaint showed the originally applied global blur and 20px whole-section translation were too costly/unstable for interactive controls. The corrected implementation uses an optical edge without global blur and opacity-only entry; only the noninteractive desktop carousel lens may blur. The mobile menu now animates with reduced-motion/focus/keyboard support. See [polish/readiness report](PHASE_09_POLISH_AND_RELEASE_READINESS.md). Older "future" text above is historical acceptance planning, not a description of the current CSS.
