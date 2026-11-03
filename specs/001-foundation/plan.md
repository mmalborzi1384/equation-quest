# Plan — App foundation and shared navigation

**Draft, not executed.** Vite React TypeScript strict, CSS Modules tokens, Vazirmatn; route-level lazy loading; responsive shared navigation.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: route smoke for / and all required paths; keyboard and mobile menu; hash refresh. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Router must reserve eight core deep-linkable lesson paths plus `/learning/fractions` with RTL shell, working back/related navigation and route-level lazy loading. Route presence is not a claim that lesson content is implemented in Phase 02.

## Phase 2 execution boundary (authorized 2026-11-03)
Implement Vite strict TypeScript app, HashRouter with `/equation-quest/` Vite base, independently addressable route modules, shared RTL shell/nav/back/404, responsive tokens/Vazirmatn. Route shells for future lessons/game must explicitly say mechanics are not ready and provide useful navigation. Build a functional Home structure and web glass-inspired carousel navigation only; full Phase 3 scroll/cinematic content remains out of scope. Test route switching, carousel controls, mobile menu, not-found, deep hash route and production build.
