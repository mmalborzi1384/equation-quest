# Tooling and dependency register (2026-11-03)

## Canonical cross-sandbox contract
Exact Node 22.22.3/npm 10.9.8 in `.nvmrc`, `package.json` engines/packageManager and `.npmrc` engine-strict/save-exact; existing exact package pins and lockfile. `scripts/setup.sh` installs missing Python CLI tools at pinned versions and `npm ci`; `scripts/verify-environment.sh` checks versions, direct package consistency, lint/format. See `docs/ENVIRONMENT_SETUP.md`. The app is implemented; canonical verification runs lint/format/typecheck/tests/build.

## Verified environment
Python 3.11.2, git 2.39.5, Node 22.22.3, npm 10.9.8, gh authenticated; no uv/Blender initially. Installed uv 0.13.7 via pip --user; `uv tool install specify-cli==1.2.6` and `graphifyy==0.9.101`. Use `~/.local/bin/specify` and `~/.local/bin/graphify` (PATH lacks ~/.local/bin). Tool installs in user home may not persist in future Arena checkout; reinstall commands above. CLI version/status/help verified. Graphify MCP connector reported unsupported, and outbound access restricted to GitHub/npm/PyPI, so remote API endpoint not tested; local CLI is available.

## Anti-slop and reference
Official repository six skills copied into `.agents/skills` from GitHub. `npx antislop-ai --help` returned `installer needs a terminal`; no Arena-native skill autoload is verified. AGENTS.md pointers enable manual reads. Expo Glass Carousel README inspected: Expo 58/RN 0.88/Skia/Reanimated; incompatible as direct web dependency; no Expo packages installed.

## Direct npm dependencies (installed, exact lockfile)
Runtime: React 19.3.1, React DOM 19.3.1, React Router DOM 7.18.5, Three 0.187.0, R3F 9.8.2, Drei 10.7.9, GSAP 3.15.0, Zustand 5.0.16, Lucide 1.67.0, KaTeX 0.19.1, react-katex 3.1.0, prop-types 15.8.1 (peer), Vazirmatn fontsource 5.3.0.
Dev: Vite 8.3.5, plugin-react 6.2.1, TypeScript 5.9.3, React types 19.3.0, React DOM types 19.3.0, Three types 0.187.0, Vitest 5.1.0, RTL 16.3.3, jest-dom 7.0.1, Playwright 1.64.1, jsdom 30.1.3, ESLint 9.39.2, typescript-eslint 8.72.1, Prettier 3.9.10, gltf-transform CLI 4.5.1. Zustand persist is built in (not separate package); ScrollTrigger comes with GSAP. CSS Modules require no additional package.

`npm run check:deps`, `npm ci --ignore-scripts`, `npm ls --depth=0`, `npx vite --version`, `npx vitest --version`, `npx gltf-transform --version` succeeded. `npm ls` reports three extraneous optional platform/transitive packages after clean install; audit before release. Playwright browser binaries NOT installed; Blender not installed. No assets yet, so GLB optimization untested. React Native peers on R3F are optional; Expo/RN were not installed.

Exact-rational BigInt math was implemented in Phase 4 without a new library. Phase 5 uses the existing locked Three/R3F/Drei packages, not a new application dependency. Browser E2E temporarily unpacked `@sparticuz/chromium@153.0.0` and bundled NSS/SwiftShader under `/tmp`; this is not installed or committed. Any new library must be separately justified/locked in its authorized phase.

## Security and compatibility risk
`npm audit`: 16 (2 low, 14 moderate), mainly ESLint/typescript-eslint/glob/caporal and KaTeX via react-katex. `npm audit fix --force` suggests incompatible major downgrades; do not blindly apply. Review advisories/upstream patches and plan alternatives/overrides before publication; version lock is not a security certification. ESLint 9 is marked deprecated by npm despite compatible TypeScript peer range; consider ESLint 10 after validating config. TS 7 current but typescript-eslint 8.72.1 requires `<6.1`, therefore TS 5.9 chosen. Application build/format/tests now exist; deployment CI is still pending.

## Phase 5 dependency note

Existing `three@0.187.0`, `@react-three/fiber@9.8.2` and `@react-three/drei@10.7.9` now power the lazy exploration scene. No GLB, Blender, additional runtime dependency or lockfile change. The lazy scene chunk is 925 kB minified (245 kB gzip), a performance review item. Chromium was an untracked temporary E2E tool only. Recheck security advisories before release.

## D33 pre-upload audit check (2026-11-03)

`npm audit --json` still reports **16 findings** (2 low, 14 moderate; none high/critical). `npm audit --omit=dev --json` reports **2 low runtime findings** via `react-katex`/KaTeX (prototype pollution trust restriction advisory). The app renders authored TeX rather than accepting arbitrary user TeX; that narrows exposure but does not fix the packages. Forced auto-fix proposes an unvalidated major react-katex version change; do not silently change pinned versions before assessing compatibility/security and rerunning the entire curriculum and UI test matrix. Temporary `axe-core@4.10.3` and Chromium 153 used for local scans are outside the repo and not dependencies. See [D33 readiness](PHASE_09_POLISH_AND_RELEASE_READINESS.md).

## D34 CI/Pages dependency boundary

No new npm runtime or development dependency. GitHub Actions uses checkout@v4, setup-node@v4, upload-artifact@v4, download-artifact@v4, configure-pages@v5, upload-pages-artifact@v3 and deploy-pages@v4 plus `npx playwright install --with-deps chromium` on hosted Ubuntu. Node 22.22.3/npm 10.9.8 and `npm ci` are pinned. Local npm audit repeated: 16 total (2 low, 14 moderate), production-only 2 low via KaTeX/react-katex; release choice documented in D34, no forced upgrade. Revisit these in future maintenance PRs.
