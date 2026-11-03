# Spec Kit workflow in Arena

Installed Specify CLI 1.2.6 shared scaffold (`--integration none`). `specify check` does not list Arena; do not invoke Copilot/Claude skills or imply Arena integration. Use `.specify/templates` and `.specify/workflows/speckit/workflow.yml` as reference and manually maintain each feature folder under `specs/`.

Sequence: constitution (project), specify (feature `spec.md`), clarify (`clarifications.md`), plan (`plan.md`), checklist (`checklist.md`), tasks (`tasks.md`), analyze (review conflicts/dependencies in checklist before code), implement (after approval), converge (actual test/design/quality evidence, memory update). Prepared artifacts are drafts; implementation/convergence pending. `specify` scripts may assume branch naming and should not create/switch branch because Arena branch is fixed. Save all reviewed outcomes in the repository.
