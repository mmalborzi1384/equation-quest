# Development workflow and sandbox handoff

## Entry gate — every session and PR sandbox
Read `PHASE_EXECUTION_PROTOCOL.md` → `AGENTS.md` → `PROJECT_MEMORY.md` → `docs/ENVIRONMENT_SETUP.md` → `docs/DEVELOPMENT_STATUS.md` → `docs/DECISIONS.md` → relevant `specs/*`. Check `git status -sb`, current branch, origin, latest commit; check Node/npm/Python/Git; run `bash scripts/setup.sh`; inspect every PASS/SKIP/FAIL from verification. Never assume files, tools, browser binaries or home directory state survived a different sandbox. Do not overwrite unrelated changes. Report differences and block if the required runtime cannot be provisioned.

## Commands (currently implemented)
- Bootstrap: `bash scripts/setup.sh` (pins tools, `npm ci`, then verification).
- Quick repeatable check: `bash scripts/verify-environment.sh`.
- Dependency tree: `npm run check:deps`.
- Lint/format baseline: `npm run lint`, `npm run format:check`.
- Strong verification after app exists: `bash scripts/verify-environment.sh --full` runs `typecheck`, `test:run`, `build`, and fails if missing. These commands **do not exist yet**; no tests/build can be claimed at preparation stage. Add scripts and CI in approved implementation phase.
- Dev preview when implemented: `npm run dev -- --host 0.0.0.0` through Arena background-process tool; browser smoke separately. The verify script does not launch a persistent server or claim browser validation.

## Change protocol
Only the phase explicitly named by the owner may run. A phase must produce executable code, updated documentation and a report of real tests/verification; then stop pending authorization. See root `PHASE_EXECUTION_PROTOCOL.md`.

Use `.specify` constitution and feature spec → clarify → plan → checklist → tasks → analyze → implement → converge. Develop on the Arena-assigned branch (never rename or switch to main). If dependency changes are essential, review package compatibility/security, pin exact direct versions, update `package-lock.json` with canonical npm, run `npm ci` and verification, document reasons in `docs/DEPENDENCIES.md` and `docs/DECISIONS.md`. Never use `npm audit fix --force` without review. Apply anti-slop skills/gate during development. Extend lint/format checks to new source and TypeScript strict config when app foundation is approved.

## End-of-task handoff
Record actual tests and outcomes (including SKIP/FAIL), update `docs/DEVELOPMENT_STATUS.md` and `PROJECT_MEMORY.md`; log consequential choices in `docs/DECISIONS.md`. Commit reusable files and configuration on the assigned branch and push only that branch if instructed/appropriate. A new sandbox must reconstruct from Git + allowed registries, not from ignored `node_modules`, `~/.local/bin`, browser cache, Arena preview port, or an earlier PR's unmerged branch. If newer commits exist, review and incorporate via an approved flow; never overwrite work to match an old snapshot.

## Git/CI policy
Local repository origin, branch and working tree are inspected first. CI config is not yet present: proposed Actions on approval should use `actions/setup-node` with exact Node `22.22.3`, `npm ci`, lint/typecheck/tests/build and Pages artifact deployment. Never commit tokens. Browser binaries and system GLB tools require an explicit CI install step; no blanket claim they exist in every sandbox.
