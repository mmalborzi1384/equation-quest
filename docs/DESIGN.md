# Visual and interaction direction

**Design read (anti-slop):** an enchanted instrument for reasoning, not a generic edtech dashboard. Motif: the balance beam and two-pan symmetry; repeated in dividers, progression paths and puzzle feedback, never as random decoration. ENERGY 2/3, RHYTHM 3/3 (vary scale and density by pedagogic moment), MOTION 2/3 (purposeful, interruptible). Focal point: one question/action per viewport.

## Tokens
Navy `#172A46` for grounding, cream `#F0E9D8`/ivory `#F7F5F0` for reading surfaces; ocean `#426D83` for navigation/world depth; mint `#65B89B` for verified equality; gold `#E9B968` for reward/focus accent; coral `#DB806E` for gentle correction; violet `#927DBB` reserved for unknown-region identity. Contrast must be measured, not assumed. Vazirmatn (self-hosted font package) for Persian; maths KaTeX in isolated `dir=ltr`. CSS Modules + shared tokens; responsive fluid type, 44px touch targets, keyboard focus indicator.

## Page composition
Home cinematic narrative with controlled GSAP/ScrollTrigger reveals and 3D world glimpse; distinct chapter rhythm, one selective glass module for learning cards. Learning overview resembles an annotated expedition chart with eight core routes plus an independent fraction practice route; lessons foreground a large interactive manipulative and a short verbal rule. Fraction visuals use equal-part models before abstract numerator/denominator transformations and KaTeX LTR expressions; World is a navigable island map/list; Game/Level use unobstructed scene plus docked HUD; Progress a ledger based on actual data, honest zero state. See `WIREFRAMES.md`.

## Web glass adaptation
Reference: `rit3zh/expo-glass-carousel` README (React Native: Skia snapshot + shader, Gesture Handler, Reanimated). Recreate **behavior**, not import code: semantic DOM cards with pointer drag/touch and keyboard prev/next, focus/open/close, snap transitions, link to route; limited CSS backdrop-filter blur/refraction-inspired SVG displacement with fallback on unsupported browsers, 2D transforms/Gsap if justified. Respect `prefers-reduced-motion`, preserve readable text and test low-end performance. Do not install Expo, Skia or RN libraries.

## Anti-slop gate
During each feature read `.agents/skills/antislop/SKILL.md` plus relevant UI/copy/human/mobile/code rules. Check layout is recognizably algebra/balance-specific, copy explains real actions, no fake stats/testimonials or dead controls, no gratuitous glass/glow/icons. Record PASS/FAIL and evidence in feature checklist. Skill folder is vendored; Arena does not auto-run it.

## Phase 3 applied design read
Energy 2, rhythm 3, motion 2: the existing editorial Home chapters keep alternating cream/navy surfaces and balance-line motif. The gold dashed bridge joins the illustrated islands (a conceptual 2.5D scene, not a gameplay screenshot). GSAP moves chapter headings only on scroll and decoratively offsets the hero; text is never hidden and OS/user reduced motion disables the effect. A **single** carousel gets the SVG-displaced circular glass lens; its readable card text remains on a dark solid/gradient surface. Pointer tilt is decorative, while navigation/focus and fallbacks are standard DOM. The approved Expo carousel remains a visual reference only.

## Persistent UI naming and control shape (owner direction)

The graphical product name is always the Persian «ماجراجویی معادله‌ها» (including header, footer, browser title and accessible name); repository/package identifiers may retain the technical English slug. Buttons and button-like calls to action use modest rounded corners rather than sharp rectangles: shared `--control-radius: 9px`. Preserve deliberately circular indicators/decorative geometry and visible keyboard focus; avoid excessive pill styling or reducing 44px touch targets. Apply this convention to future screens too.

## Future Phase 9 art direction (owner request D28; not implemented)

Use an image captured from the *actual* game world as an art-directed background; keep algebra text and controls readable with tested overlays and mobile crops, plus an optimized static/no-WebGL fallback. Button-like actions should have a coherent, restrained modern liquid-glass treatment rather than sharp rectangles; retain the shared 9px corner token, 44px targets, contrast and visible focus. This owner-specified control treatment extends the earlier selective-glass guidance **for controls only**; avoid turning all reading panels into translucent glass. `reactdrops.dev` is an optional reference, not an installed library. Apply the vendored anti-slop skills **during** Phase 9 optimization and record its final gate. Details and test criteria: [Phase 9 plan](PHASE_09_DESIGN_AND_OPTIMIZATION_PLAN.md). No Phase 9 work has begun.

## Future Phase 9 scroll narrative (D29; not implemented)

Below-the-fold sections/panels should reveal as they enter the viewport, with selected short Persian headings/lines given a clearly noticeable, tasteful typing-style appearance. Current Home only shifts chapter headings on scroll; it does not implement the requested full sequence. Preserve visible semantic text, RTL graphemes/ZWNJ, LTR maths, keyboard focus, reduced-motion/no-JS fallbacks and fast mobile scrolling. Use anti-slop skills to decide *where* the effect adds meaning rather than typing every paragraph. See [Phase 9 plan](PHASE_09_DESIGN_AND_OPTIMIZATION_PLAN.md).

## Phase 9 application (D32)

The previously planned authentic game-scene background and selective liquid-glass **actions**, plus lower-section/short RTL heading reveals, are now implemented. The WebGL canvas itself provided the optimized WebP image; the old symbolic CSS scene was removed from Home. See the [Phase 9 report](PHASE_09_COMPLETION_REPORT.md) for reasons, measured contrast, fallback and limits. Older "future" sections above record prior planning state, not the current implementation.

## D33 stable glass and menu

The optical action edge retains the 9px radius and original navy/gold legibility but no longer samples the backdrop while scrolling. Do not reintroduce blur across all controls or translate whole interactive sections; these caused visible scroll jumping. The mobile header now reveals the menu with a short opacity/translate gesture and fixed-size morphing icon, while reduced-motion users see an immediate state. See [polish report](PHASE_09_POLISH_AND_RELEASE_READINESS.md).
