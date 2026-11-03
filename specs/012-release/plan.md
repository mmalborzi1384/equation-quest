# Plan — Phase 10 repeatable release (D34, 2026-11-03)

Owner explicitly authorized Phase 10 and public-release preparation, accepting that external grade-7/Persian curriculum review is still unperformed and must remain a documented risk. The project stays open for subsequent bug-fix/feature PRs; no archive, tag-based freeze or permanent closure.

1. Keep the existing React/Vite/HashRouter app and `/equation-quest/` asset base; do not introduce a backend or new runtime dependency.
2. On each pull request and main push, run pinned Node/npm `npm ci`, lint, formatting, typecheck, 90 unit tests, payload budgets, production build and all browser journeys. Build once, smoke-test the production preview at 320/1280px and verify asset loads/hash reload/reduced-motion/persistent settings. PR checks must never deploy.
3. On main only, after successful tests, upload `dist` as an Actions Pages artifact and deploy via OIDC with concurrency serialization; after deployment, run the same smoke checks against the public URL with propagation retries. No custom secret. Keep failed live checks visible.
4. Document first-time GitHub Pages Actions-source setup and rollback/redeploy procedure, residual advisories and educational/device review gaps. Preserve normal main/PR workflow for future fixes and enhancements.
5. Verify locally, push branch, inspect actual CI. Do not claim a live deployment without observed public checks. Never merge without separate explicit merge approval.

Dependency direction: only workflow configuration and isolated release smoke test; no production app import of test code. Scope check: existing lessons/exact-rational levels and save/delete behavior remain intact. Anti-slop gate applies to existing UI, not a new visual redesign.
