# Plan — App foundation and shared navigation

**Draft, not executed.** Vite React TypeScript strict, CSS Modules tokens, Vazirmatn; route-level lazy loading; responsive shared navigation.

Dependency analysis: see `docs/DEPENDENCY_MAP.md` and roadmap; test gate: route smoke for / and all required paths; keyboard and mobile menu; hash refresh. Keep feature code isolated under its page/feature boundary and update docs after implementation.

Phase 1 alignment: Router must reserve eight core deep-linkable lesson paths plus `/learning/fractions` with RTL shell, working back/related navigation and route-level lazy loading. Route presence is not a claim that lesson content is implemented in Phase 02.
