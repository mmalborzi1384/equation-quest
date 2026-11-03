# Equation Quest — permanent agent instructions

Before starting any task in a new sandbox, read the environment setup documentation, verify the canonical development environment, and initialize the sandbox using the repository's setup scripts. See `docs/ENVIRONMENT_SETUP.md` and `docs/DEVELOPMENT_WORKFLOW.md`; run `bash scripts/setup.sh` and inspect its verification report. Never assume tools or `node_modules` persisted.

At session start read `PHASE_EXECUTION_PROTOCOL.md` and `PROJECT_MEMORY.md`, `docs/DEVELOPMENT_STATUS.md`, `docs/DECISIONS.md`, relevant `specs/*` and `docs/ARCHITECTURE.md`. The user specification in the initial project brief is authoritative; record clarifications in the repo before changing course.

## Phase authorization and deliverables (permanent)
- Follow `PHASE_EXECUTION_PROTOCOL.md` for every phase. Execute only the phase explicitly named and authorized by the owner; never start the next phase automatically. The protocol itself does not authorize work.
- Apply the three-output rule **relative to each phase's objectives**: Phase 1 requires a validated specification package, up-to-date documentation and a specification validation/approval report, NOT application code. Implementation phases require executable application increments, updated docs and real test evidence. See the protocol; never label skipped app tests as passing.
- At phase end update memory/status/decisions, commit on the Arena-assigned branch, report results and STOP until the next explicit authorization. Never merge a PR without the owner's explicit approval.

## Rules
- Current authorization: Phase 1 accepted and Phase 2 Core Website Structure authorized; Phase 3+ requires separate approval. Do not represent plans, installed libraries, or wireframes as working features.
- Use Spec Kit's `.specify/` templates and `specs/` for constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge. No Arena integration was found; use shared scaffold and documents, not another agent's commands.
- Keep routes/pages independent, reusable components separate, game logic and equation logic independent of React, RTL Persian UI and isolated LTR equations. HashRouter and Vite base `/equation-quest/` for Pages. No backend/account. Required v1 math includes exact rational coefficients/constants/answers for `ax+b=c` (`a≠0`), an independent fraction lesson/practice route and fraction objectives in levels 06–08; begin with small integers and signed terms. Grade-7/Persian curriculum review before public release is mandatory and not yet done. No Expo/React Native code in web bundle.
- Antislop skills are vendored at `.agents/skills/antislop*/SKILL.md`. Read relevant skills during feature development; record a PASS/FAIL delivery gate per feature. These are documentation skills, not a verified automatic Arena hook.
- Graphify CLI is local only: after implementation run `graphify extract . --code-only`, `graphify cluster-only . --no-label`, `graphify update .` after refactoring; inspect outputs, do not mistake proposal graphs for extracted graphs.
- Before coding update feature spec/plan/tasks; before claiming completion run relevant unit/integration/E2E, accessibility, responsive and build checks. Log actual tests and failures. No decorative dead controls or fabricated achievements.
- Do not modify main or start deployment without owner approval. Session branch is fixed by Arena.

At session end update `docs/DEVELOPMENT_STATUS.md`, `docs/DECISIONS.md` if decisions changed, `docs/DEPENDENCIES.md` if packages changed, and this memory index. Distinguish planned, in-progress, implemented, tested, completed, blocked. Keep security findings and unresolved decisions visible.
