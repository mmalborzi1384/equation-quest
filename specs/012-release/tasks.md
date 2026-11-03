# Tasks — Quality and GitHub Pages release

All tasks are **Planned**, not started. Execute only after owner go-ahead.

1. [ ] Review feature spec with owner decisions and analyze neighboring module contracts.
2. [ ] Define CI checks and Pages deployment contract (Node/npm pin, artifact path, hash routes, asset base and rollback).
3. [ ] Configure test/build scripts and GitHub Actions; verify real deployed routes/assets when deployment is explicitly approved.
4. [ ] Add automated checks: CI run, deployed route/asset checks, responsive/a11y/reduced-motion and anti-slop gates.
5. [ ] Manually exercise keyboard, touch/mobile, RTL/LTR, reduced motion and error states; record observations.
6. [ ] Run anti-slop Delivery Gate; fix failures and document evidence.
7. [ ] Converge: update `docs/DEVELOPMENT_STATUS.md`, `PROJECT_MEMORY.md`, dependency/decision logs and extracted graph after code changes.

## Phase-specific small tasks (Planned; only execute when authorized)
- [ ] Add pre-release curriculum review gate and fraction coverage matrix alongside CI/Pages tests; do not claim teacher review or deployment before recorded evidence.
- [ ] Record independent tests and anti-slop gate evidence before feature completion.
