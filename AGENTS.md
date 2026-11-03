# Equation Quest — permanent agent instructions

At session start read `PROJECT_MEMORY.md`, `docs/DEVELOPMENT_STATUS.md`, `docs/DECISIONS.md`, relevant `specs/*` and `docs/ARCHITECTURE.md`. The user specification in the initial project brief is authoritative; record clarifications in the repo before changing course.

## Rules
- Preparation phase only until the owner explicitly approves implementation. Do not represent plans, installed libraries, or wireframes as working features.
- Use Spec Kit's `.specify/` templates and `specs/` for constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge. No Arena integration was found; use shared scaffold and documents, not another agent's commands.
- Keep routes/pages independent, reusable components separate, game logic and equation logic independent of React, RTL Persian UI and isolated LTR equations. HashRouter and Vite base `/equation-quest/` for Pages. No backend/account. No Expo/React Native code in web bundle.
- Antislop skills are vendored at `.agents/skills/antislop*/SKILL.md`. Read relevant skills during feature development; record a PASS/FAIL delivery gate per feature. These are documentation skills, not a verified automatic Arena hook.
- Graphify CLI is local only: after implementation run `graphify extract . --code-only`, `graphify cluster-only . --no-label`, `graphify update .` after refactoring; inspect outputs, do not mistake proposal graphs for extracted graphs.
- Before coding update feature spec/plan/tasks; before claiming completion run relevant unit/integration/E2E, accessibility, responsive and build checks. Log actual tests and failures. No decorative dead controls or fabricated achievements.
- Do not modify main or start deployment without owner approval. Session branch is fixed by Arena.

At session end update `docs/DEVELOPMENT_STATUS.md`, `docs/DECISIONS.md` if decisions changed, `docs/DEPENDENCIES.md` if packages changed, and this memory index. Distinguish planned, in-progress, implemented, tested, completed, blocked. Keep security findings and unresolved decisions visible.
