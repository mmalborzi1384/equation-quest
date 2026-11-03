# Plan — Home narrative and glass carousel

**Draft, not executed.** GSAP/ScrollTrigger only for scroll narration; web DOM/CSS/SVG glass lens with pointer/keyboard, snap/focus and fallback.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: desktop/mobile carousel links, focus controls, reduced motion, no-WebGL reading path. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Learning carousel must link to real routed lessons including the independent fraction lesson; preview copy explains the staged integer → signed → fractional journey without promising shipped exercises before implementation.

Phase 2 implements only the Home page structure and usable web carousel navigation (buttons, keyboard/touch, destination links and reduced motion). Phase 3 will own full narrative GSAP/ScrollTrigger transitions and richer visuals; do not report them as complete here.
