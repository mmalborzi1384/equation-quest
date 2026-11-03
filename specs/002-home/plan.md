# Plan — Home narrative and glass carousel

**Draft, not executed.** GSAP/ScrollTrigger only for scroll narration; web DOM/CSS/SVG glass lens with pointer/keyboard, snap/focus and fallback.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: desktop/mobile carousel links, focus controls, reduced motion, no-WebGL reading path. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Learning carousel must link to real routed lessons including the independent fraction lesson; preview copy explains the staged integer → signed → fractional journey without promising shipped exercises before implementation.

Phase 2 implements only the Home page structure and usable web carousel navigation (buttons, keyboard/touch, destination links and reduced motion). Phase 3 will own full narrative GSAP/ScrollTrigger transitions and richer visuals; do not report them as complete here.

## Authorized Phase 3 execution plan
- Keep the existing section/story structure and links from Phase 2. Strengthen the chapter progression and balance/island illustration without claiming the preview is a playable 3D world.
- Use GSAP ScrollTrigger solely for restrained, non-blocking chapter reveals and decorative parallax; respect OS/user reduced-motion, dynamically clean up triggers on route change, and never require JS animation to expose reading content.
- Refine the carousel web lens (DOM/CSS/SVG), focus/snap/pointer and keyboard behavior with a no-backdrop-filter fallback. Keep lesson destinations navigable but honest previews until Phase 04.
- Test routes, interactions, reduced motion, no-WebGL dependency, desktop/mobile and build; record measured/observed evidence, risks and stop after Phase 3.
