# GitHub Pages release and maintenance — Phase 10

Repository: `mmalborzi1384/equation-quest`. Public URL: `https://mmalborzi1384.github.io/equation-quest/`. Vite base is `/equation-quest/`; React Router uses hash links such as `/#/learning/fractions`, which survive refresh. The app needs JavaScript; no backend/account or secret is used. Local progress lives only in the visitor's browser and is not cleared by deploying a new bundle (unless a future schema migration changes it).

## Workflow contract

`.github/workflows/pages.yml` runs on pull requests and pushes to `main`, plus manual dispatch. `validate` pins Node 22.22.3/npm 10.9.8, installs from the locked `npm ci` graph, checks lint/format/TypeScript/90 unit tests/production build/image and lazy-scene budgets, installs Chromium, runs 38 browser journeys with software WebGL, then runs `npm run test:release` against an isolated production preview. `deploy` executes **only on main** after validation, uploads `dist/` as an Actions artifact, deploys using GitHub's Pages OIDC actions and serializes releases. `live-smoke` executes afterward against the public URL, checks hash routes/assets/reload, 320/1280px overflow, mobile menu and saved reduced-motion preference in an isolated browser. A failed live smoke leaves the deployment visible but the workflow red; it is not a rollback.

PRs run validation **without** publishing. Fixes/new features remain possible through ordinary PRs; this is not a final version lock, archive or shutdown. Preserve the checked base/route/storage contracts and rerun the workflow for each future change. No repository secret or personal token is needed by the app.

## Pages source and propagation

The owner changed Settings → Pages → Build and deployment → Source to **GitHub Actions**; the Pages API now reports `build_type: workflow`. An earlier REST attempt returned 403 because the integration did not have admin permission; issue #13 documented that manual setting. A previous main run (`41640153643`) passed the public smoke. After switching source, run `41642947134` passed build/deploy but immediate live smoke failed during propagation; later public fetches rendered Home/Progress/fraction routes. A successful deploy is not a browser check. Release smoke now waits for a compiled Vite asset entrypoint rather than accepting HTTP 200 from the uncompiled legacy `/src/main.tsx` index; confirm the *next* main live-smoke is green after an approved PR merge. On forks, update the fixed live URL in `pages.yml` to avoid testing this project's site.

Local reproduction: `npm ci && npm run build && npm run test:release` (first install Playwright Chromium with `npx playwright install --with-deps chromium`; on restricted sandboxes a temporary external browser may be supplied with `EQ_CHROMIUM_PATH`). To inspect a deployed site: `RELEASE_URL=https://mmalborzi1384.github.io/equation-quest/ npm run test:release`. The smoke test starts and stops its own local preview when `RELEASE_URL` is absent. Full app E2E: `EQ_WEBGL=1 npm run test:e2e`. Browser tests need actual Chromium/SwiftShader support; a build alone is not a pass.

## Recovery and updates

If validation fails, no new artifact is deployed. If deploy or live smoke fails, inspect its Actions logs and Pages settings, correct the source/config or submit a fix PR, then rerun the workflow; an earlier known-good main commit can be restored via a **revert PR**, validated and deployed again. Never overwrite main or erase app data as a rollback. A failed live smoke must not be reported as a successful release. Pages is a static site, not a server with a persistent process. Keep issue/bug triage and feature requests open; subsequent changes follow the same review and CI path.

## Visible residual risks

Independent grade-7 curriculum/Persian-content review ([issue #11](https://github.com/mmalborzi1384/equation-quest/issues/11)), physical-device/screen-reader/other-engine checks and a deliberate dependency upgrade decision ([issue #12](https://github.com/mmalborzi1384/equation-quest/issues/12)) are not complete. The owner explicitly requested to finish Phase 10/publication while keeping future fixes and features possible and accepted publication with these **documented** risks; neither automated tests nor internal content checks substitute for external review. `npm audit` at preflight reported 2 low runtime and 14 moderate development advisories, none high/critical; authored TeX limits but does not eliminate the KaTeX advisory. Do not silently force an incompatible major upgrade. See [Phase 10 report](PHASE_10_RELEASE_REPORT.md) for observed results and outstanding gates.

## Source-switch propagation note (D35)

After the owner selected GitHub Actions, the Pages API returned `build_type: workflow`. The next main run `41642947134` validated and deployed successfully but its immediate live smoke failed while the source change propagated. Subsequent public fetches rendered Home and lesson/progress routes. Do not interpret this as a fully green release: wait for the compiled `/equation-quest/assets/index-*.js` entry and its assets before running browser smoke; a legacy root index can return HTTP 200 while showing a blank page. Recheck Actions `live-smoke` after the next approved merge.
