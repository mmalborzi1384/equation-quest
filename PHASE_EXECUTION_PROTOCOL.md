# Equation Quest — Controlled Phase Execution Protocol

**Permanent rule (2026-11-03).** This file governs every future phase. It is a workflow rule, **not authorization** to start any phase. The owner alone explicitly names and authorizes each phase. Finish and stop after that phase; never infer permission to start the next one from a merge, a completed report, or a generic roadmap.

## Before starting an authorized phase

1. Read `AGENTS.md`, `PROJECT_MEMORY.md` and `docs/DEVELOPMENT_STATUS.md`.
2. Read this protocol, the relevant `specs/<feature>/` artifacts and applicable architecture/design/education documents.
3. Inspect current branch, worktree, upstream and recent commits; protect existing work.
4. Initialize a fresh sandbox per `docs/ENVIRONMENT_SETUP.md` (`bash scripts/setup.sh`) and run `bash scripts/verify-environment.sh`; log discrepancies.
5. Verify previous phase deliverables, dependencies and unresolved risks. If phase identity, scope or an irreversible decision is ambiguous, ask the owner **before implementing**.

## Execute only the authorized phase

- Work from the approved architecture and design system; do not start later phases automatically or skip scope/acceptance criteria.
- Make small, modular changes and preserve existing functionality. Add dependencies only for a justified requirement, with compatibility and lockfile checks.
- Follow the Spec Kit sequence: constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge. Keep the feature tasks/checklist current.
- Test what actually exists. Run relevant automated tests, lint/typecheck/build, browser/mobile/keyboard checks when applicable, and the Anti-slop delivery gate. Fix problems introduced in the phase before declaring it complete.
- Do not claim an unimplemented screen, skipped test, unrun build or undeployed site is verified.

## Three phase-appropriate outputs for **each** phase

The owner clarified that deliverables are interpreted **against that phase's original objectives**. Do not force application code into a specification phase merely to satisfy a generic label.

1. **Executable/verifiable increment:** in implementation phases, running application behavior with its exact command and result. In Phase 0, runnable bootstrap/verification tooling; in Phase 1, a reviewable, internally checked specification package and validation checklist — **no application code is required**. Do not describe documentation as executable application code.
2. **Up-to-date documentation:** update `PROJECT_MEMORY.md`, `docs/DEVELOPMENT_STATUS.md`, relevant feature/technical docs and `docs/DECISIONS.md` for consequential decisions. Record completed and remaining tasks, limitations and risks.
3. **Test and verification report:** exact commands, actual PASS/FAIL/SKIP results and phase-relevant evidence. For Phase 1 this includes cross-document consistency/coverage checks and owner approval; build/start/deployment are N/A until implementation. Keep evidence in the repository and summarize it in the completion message.

A phase is not fully verified unless its **phase-specific** acceptance criteria and appropriate outputs are evidenced. Historical work is never retroactively called tested or runnable without evidence.

## Phase completion report and stop condition

Report: phase name/objective; completed tasks; exact created/modified paths; test results; build/deployment status; issues/blockers; deviations; memory/doc updates; commit references; recommendation for the next phase **without starting it**. Commit reusable changes to the Arena-assigned branch; never overwrite another branch, merge a PR without explicit approval, or push to `main`.

**STOP after the authorized phase.** Wait for explicit authorization naming the next phase. The owner's latest explicit decision takes precedence over older planning documents; record any inconsistency instead of silently changing scope.

## Current boundary

Phases 1–6 accepted; Phase 6 PR #6 merged into `main` at `d6109b8` by explicit owner direction. The owner separately authorized **Phase 7** eight playable authored stages with four island pairs (D27). Stop after Phase 7 review handoff: no Phase 8 persisted dashboard, PR merge or deployment without separate authorization.
