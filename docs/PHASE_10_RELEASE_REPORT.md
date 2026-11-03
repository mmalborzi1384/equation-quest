# Phase 10 — CI/Pages release and future maintenance

**2026-11-03, D34.** Owner authorized Phase 10, then clarified to finish publication while documenting unreviewed risks and preserving the ability to fix bugs/add features later. Phase 9 PR #9 was merged as `900d2ec`. This report distinguishes local verification, PR CI and actual public Pages behavior; do not fill in a result until observed.

## Scope delivered

- `.github/workflows/pages.yml`: PR validation (no deploy), main-branch build/artifact Pages deployment via OIDC, and post-deploy public smoke. Exact Node/npm pin and lockfile; no app secrets. Serialized workflows do not freeze or archive the repo.
- `scripts/smoke-release.mjs`, `npm run test:release`: shared local production-preview / public-release tests for seven real hash routes, 320/1280 widths, reload, HTTP/JS errors, responsive overflow, mobile Escape menu and persistent display preference. Browser state is isolated; no real visitor records touched. Scripts intentionally do not pretend that a local preview is a live deployment.
- `playwright.config.ts`: software-WebGL launch flags now work with both Playwright-installed Chromium in CI and an externally provided sandbox executable; no new production dependency.
- `docs/DEPLOYMENT.md`: first-time Pages Actions source, operational recovery, repeatable future fixes/features and explicit review/security gaps.

## Evidence log

| Gate | Observed result |
|---|---|
| Fresh sandbox setup `bash scripts/setup.sh` | PASS; pinned Node 22.22.3/npm 10.9.8, clean `npm ci`, toolchain and preparation verification. |
| `EXPECTED_BRANCH=arena/758a3991-equation-quest bash scripts/verify-environment.sh --full`, `npm run check:phase9` | PASS; 90 unit tests, lint, format, typecheck, production build and 32,900/17,570-byte images plus 242,738-byte gzip lazy scene within budgets. |
| `EQ_CHROMIUM_PATH=/tmp/chromium LD_LIBRARY_PATH=/tmp/eq10-browser/al2023/lib:/tmp EQ_WEBGL=1 npm run test:e2e` | **PASS 38/38** on final full rerun. Initial 33/38: five WebGL cases could not render a canvas because the sandbox browser's SwiftShader libraries had not been unpacked. After restoring the external temporary SwiftShader libraries, targeted exploration passed 6/6 and the full suite passed 38/38. This was an environment setup issue; no app change. |
| Same external Chromium, `npm run test:release` | PASS local production preview: seven hash routes, 320/1280px, assets, refresh, browser errors, mobile menu and saved setting. First attempt failed because no browser binary was installed; next attempt found a smoke-script bug treating same-document hash navigation's null Playwright response as failure. Fixed and reran successfully. |
| Actual GitHub Actions PR validation | **PASS** on PR #10, Actions run `41638949454`: pinned install, static checks, all browser journeys and production smoke; deploy/live-smoke correctly SKIPPED on pull request. Hosted runner emitted non-fatal Node 20 action-runtime deprecation and Ubuntu-label migration notices. |
| GitHub Pages artifact deployment and public smoke | **PENDING** until workflow is merged to main and actual Actions jobs succeed. A prior Pages API reported `legacy` main/root, which does not verify a deployed `dist/` artifact. |

## Curriculum and security exception (no fabricated endorsement)

Existing authored data/tests cover all nine lesson routes, the exact-rational engine and levels 06–08 with fraction objectives, but **no independent grade-7 curriculum/Persian-language review** has been obtained. An internal route/content matrix or automated math checks must not be called an external endorsement. The owner explicitly accepted publishing with this gap documented; tracked as [issue #11](https://github.com/mmalborzi1384/equation-quest/issues/11); correct confirmed mistakes in future PRs. Last npm audit: 16 advisories total (2 low runtime KaTeX/react-katex; 14 moderate development); no unreviewed forced upgrade. Browser/assistive-tech/device coverage remains Chromium automation only; dependency and cross-device work is tracked as [issue #12](https://github.com/mmalborzi1384/equation-quest/issues/12).

## Anti-slop Delivery Gate (release changes)

No new UI decoration, invented education claims or dependency was introduced. R-16/R-35/R-36: explicit truthful distinctions between local, CI and public checks; tested native navigation/persistence in production preview. R-03/R-32/R-39: browser matrix covers narrow/desktop, focus/Escape and reduced motion; full existing Phase 9 UI gate continues to apply. PASS for local scope only; public release remains PENDING until live checks succeed. Maintenance stays OPEN for later fixes/features, not a quality guarantee that all bugs are gone.
