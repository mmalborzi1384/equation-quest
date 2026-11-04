# Canonical development environment — Equation Quest

**Contract (2026-11-03):** this repository, not an Arena machine image, is the source of truth. Node **22.22.3** (`.nvmrc`), npm **10.9.8** (`packageManager` + `engines`), npm lockfile v3, exact direct versions in `package.json`; Python **3.11+** for uv **0.13.7**, Spec Kit **1.2.6**, Graphify **0.9.101**. The host may vary; a different Node/npm/tool version is a **failure to report**, not permission to change the lockfile. `.npmrc` enforces engine compatibility and exact future saves. No Docker/devcontainer: Docker was absent in this sandbox and no Arena support was established.

## What was actually available in this sandbox
Debian GNU/Linux 12 x86_64; bash; Node 22.22.3, npm/npx 10.9.8, corepack present, Yarn present but **not used**, Git 2.39.5, Python 3.11.2, gh 2.23.0 authenticated. `~/.local/bin` contains uv/Spec Kit/Graphify installed in a previous session's home directory; their existence is **not** guaranteed in another sandbox. No nvm, pnpm, Docker, Blender or globally installed Playwright command detected. `@playwright/test` is locked locally; browser binaries were not installed. Only environment-variable **names** were inspected: GH_TOKEN/GITHUB_TOKEN were Arena-provided; no values were read or stored. `node_modules/` existed as ignored local state from the previous session.

The checkout came from Arena on `arena/5b2fda5d-equation-quest` at commit `185e34c`, with `origin` pointing at `mmalborzi1384/equation-quest`; prior preparation committed package manifest/lockfile, Spec Kit scaffold, six anti-slop skills and docs. Arena supplied branch, repository checkout, network policy, GitHub auth and sandbox preview plumbing. The repo supplies all versions, scripts, docs and configuration listed below. No evidence of a user-configurable Arena sandbox image, bootstrap hook, shared disk, or supported Docker integration; no such behavior is assumed.

## From a fresh PR sandbox (checklist)
- [ ] Confirm the repository and branch from Arena: `pwd; git status -sb; git remote -v; git log -1 --oneline`. Do **not** run setup on a stale branch or replace user files. Arena assigns branch names; do not hardcode this session's branch for future PRs.
- [ ] Read `AGENTS.md`, `PROJECT_MEMORY.md`, `docs/DEVELOPMENT_STATUS.md`, `docs/DECISIONS.md`, this file and `docs/DEVELOPMENT_WORKFLOW.md`. Read the relevant feature spec.
- [ ] Confirm `node --version` is `v22.22.3` and `npm --version` is `10.9.8`, plus Python 3.11+ and Git. If not, select/provision the canonical versions **outside** the repo. `.nvmrc` can be used with nvm *if nvm is present*, but it is not assumed. Do not run `npm install` to work around a mismatch.
- [ ] Run `bash scripts/setup.sh` from any directory (script changes to repo root); it installs missing user-space uv/Spec Kit/Graphify at pinned versions, runs `npm ci` and invokes verification. Missing tools are installed; differently-versioned tools **fail** verification instead of being silently replaced.
- [ ] Run `bash scripts/verify-environment.sh` again after tool or dependency changes and compare actual PASS/SKIP/FAIL. On an implemented app, run `bash scripts/verify-environment.sh --full` (requires `index.html`, `src/`, `typecheck`, `test:run`, `build` scripts).
- [ ] When the app exists, start `npm run dev -- --host 0.0.0.0` using Arena's background-process preview tool, open real routes, verify Pages base/hash assets, and stop the server. Until then, startup/build/test are honestly **SKIP**. Record commands and discrepancies in `docs/DEVELOPMENT_STATUS.md`.
- [ ] Before code changes inspect current Git changes and relevant specs; after task commit reusable changes on the assigned branch and update memory/decisions. Never push to `main`.

## Restricted sandboxes / browser binaries (2026-11-04)

`npm run test:e2e` normally uses the official Playwright Chromium installed by `npx playwright install --with-deps chromium`. Where the CDN is unreachable, `playwright.config.ts` accepts two optional environment variables **without changing the default configuration**: `EQ_CHROMIUM_PATH` (absolute path to a Chrome/Chromium binary) and `EQ_CHROMIUM_ARGS` (comma-separated extra launch flags). `EQ_WEBGL=1` adds the SwiftShader flags when a working software GL stack exists. `scripts/smoke-release.mjs` accepts the same `EQ_CHROMIUM_PATH`/`EQ_CHROMIUM_ARGS` plus an optional `EQ_RELEASE_PORT` (default 4173) for local port conflicts. The owning process may also need `LD_LIBRARY_PATH`, `FONTCONFIG_FILE` and a local font directory when using a self-contained Chromium bundle. These are **environment-only** knobs: no binary, library or font is committed to this repository, and no product code depends on them. The exact command and the WebGL limitation of the verification run are in [`FINAL_VERIFICATION_2026-11-04.md`](FINAL_VERIFICATION_2026-11-04.md).

## Configuration inventory
| Repository file | Role |
|---|---|
| `.nvmrc`, `package.json` `engines`/`packageManager`, `.npmrc` | exact Node/npm contract, npm registry/engine enforcement, exact dependency saves |
| `package-lock.json` | committed, integrity-checked npm dependency graph; install via `npm ci`, never regenerate casually |
| `.editorconfig`, `.prettierrc.json`, `eslint.config.mjs` | baseline LF/UTF-8/2 spaces, Prettier and ESLint TS rules; extend scoped checks as app source appears |
| `.gitignore` | excludes node_modules, build/test outputs, secrets, transient Graphify caches; retains graph JSON/report |
| `scripts/setup.sh`, `scripts/verify-environment.sh` | idempotent bootstrap and comparison against manifest/lock/installed tools |
| `.specify/`, `.agents/skills/` | committed Spec Kit workflow scaffold and manual Anti-slop skills |

## Important boundaries
`npm ci` may require network access to npm registry; uv/pip bootstrap needs PyPI; Git operations use Arena's GitHub connection. No secrets are required by the app; never commit `.env`, tokens, npmrc auth settings or credential dumps. GitHub Actions will need its own Node 22.22.3/npm 10.9.8 pin and `npm ci` once CI is implemented, not an assumption that a runner matches. Asset binaries, Playwright browsers and Blender are not included in npm's direct app installation; install browser binaries only when E2E is implemented and supported. `npm audit` currently reports 16 findings (2 low, 14 moderate); setup succeeding is **not** security clearance.

## Troubleshooting differences
1. Wrong Node/npm: stop; report versions and provision canonical runtime. `nvm install && nvm use` only if nvm exists and runtime can be downloaded; otherwise ask for a supported runtime image. Do not edit `.nvmrc` opportunistically.
2. Wrong installed uv/Spec Kit/Graphify: stop; document version/location; seek approval for intentional replacement or align tools to pinned versions. User-level installs may not persist across sandboxes.
3. `npm ci` fails: report the **original** error, check Node/npm, registry access and lockfile; do not switch to `npm install` or wipe tracked config.
4. Dependency mismatch or lint/format failure: compare manifest/lock, preserve working tree; fix through reviewed repository changes, then update docs and rerun setup.
5. No `src/`/`index.html`: verification deliberately skips app checks; this repository is still in preparation, pending owner approval. Never call it a successful build/test/start.
