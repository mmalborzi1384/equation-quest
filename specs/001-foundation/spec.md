# App foundation and shared navigation

**Status:** Draft / awaiting owner approval. **Branch:** arena/5b2fda5d-equation-quest.

## User story
As a seventh-grade learner, I can use this feature to understand and practice equations without creating an account.

## Requirements
All route families render independently through HashRouter with RTL shell, valid back/home/continue and 404 handling.

## Scope and constraints
Vite React TypeScript strict, CSS Modules tokens, Vazirmatn; route-level lazy loading; responsive shared navigation. Persian RTL, mathematical LTR, desktop/mobile, accessible and usable without backend. Shared navigation and no dead controls. Refer to PRD, ROUTES, EDUCATIONAL_CONTENT and constitution for cross-cutting requirements.

## Acceptance evidence required
route smoke for / and all required paths; keyboard and mobile menu; hash refresh. Do not mark completed without implementation, tests and anti-slop delivery gate.
