# Visual and interaction direction

**Design read (anti-slop):** an enchanted instrument for reasoning, not a generic edtech dashboard. Motif: the balance beam and two-pan symmetry; repeated in dividers, progression paths and puzzle feedback, never as random decoration. ENERGY 2/3, RHYTHM 3/3 (vary scale and density by pedagogic moment), MOTION 2/3 (purposeful, interruptible). Focal point: one question/action per viewport.

## Tokens
Navy `#172A46` for grounding, cream `#F0E9D8`/ivory `#F7F5F0` for reading surfaces; ocean `#426D83` for navigation/world depth; mint `#65B89B` for verified equality; gold `#E9B968` for reward/focus accent; coral `#DB806E` for gentle correction; violet `#927DBB` reserved for unknown-region identity. Contrast must be measured, not assumed. Vazirmatn (self-hosted font package) for Persian; maths KaTeX in isolated `dir=ltr`. CSS Modules + shared tokens; responsive fluid type, 44px touch targets, keyboard focus indicator.

## Page composition
Home cinematic narrative with controlled GSAP/ScrollTrigger reveals and 3D world glimpse; distinct chapter rhythm, one selective glass module for learning cards. Learning overview resembles an annotated expedition chart; lessons foreground a large interactive manipulative and a short verbal rule; World is a navigable island map/list; Game/Level use unobstructed scene plus docked HUD; Progress a ledger based on actual data, honest zero state. See `WIREFRAMES.md`.

## Web glass adaptation
Reference: `rit3zh/expo-glass-carousel` README (React Native: Skia snapshot + shader, Gesture Handler, Reanimated). Recreate **behavior**, not import code: semantic DOM cards with pointer drag/touch and keyboard prev/next, focus/open/close, snap transitions, link to route; limited CSS backdrop-filter blur/refraction-inspired SVG displacement with fallback on unsupported browsers, 2D transforms/Gsap if justified. Respect `prefers-reduced-motion`, preserve readable text and test low-end performance. Do not install Expo, Skia or RN libraries.

## Anti-slop gate
During each feature read `.agents/skills/antislop/SKILL.md` plus relevant UI/copy/human/mobile/code rules. Check layout is recognizably algebra/balance-specific, copy explains real actions, no fake stats/testimonials or dead controls, no gratuitous glass/glow/icons. Record PASS/FAIL and evidence in feature checklist. Skill folder is vendored; Arena does not auto-run it.
