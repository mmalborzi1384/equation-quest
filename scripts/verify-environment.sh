#!/usr/bin/env bash
# Run after setup in every sandbox. --full requires an implemented app + build/test scripts.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
export PATH="$HOME/.local/bin:$PATH"
full=false
if [[ "${1:-}" == '--full' && "$#" -eq 1 ]]; then
  full=true
elif [[ "$#" -ne 0 ]]; then
  echo 'Usage: bash scripts/verify-environment.sh [--full]' >&2
  exit 2
fi
fail() { echo "FAIL: $*" >&2; exit 1; }
check_version() {
  local name="$1" expected="$2" actual="$3"
  [[ "$actual" == "$expected" ]] || fail "$name: expected $expected, got $actual"
  printf 'PASS: %s %s\n' "$name" "$actual"
}
check_version 'Node.js' "v$(cat .nvmrc)" "$(node --version 2>/dev/null || echo missing)"
check_version 'npm' "$(node -p 'require("./package.json").packageManager.split("@")[1]')" "$(npm --version 2>/dev/null || echo missing)"
python3 -c 'import sys; sys.exit(sys.version_info < (3, 11))' || fail 'Python 3.11+ required'
printf 'PASS: %s\n' "$(python3 --version)"
command -v git >/dev/null || fail 'git missing'
printf 'PASS: %s\n' "$(git --version)"
[[ "$(git rev-parse --show-toplevel 2>/dev/null)" == "$ROOT" ]] || fail 'not in expected repository checkout'
origin="$(git remote get-url origin 2>/dev/null || true)"
[[ "$origin" == *'github.com/mmalborzi1384/equation-quest.git' || "$origin" == *'github.com/mmalborzi1384/equation-quest' || "$origin" == *'github.com:mmalborzi1384/equation-quest.git' ]] || fail 'unexpected origin repository (URL withheld)'
branch="$(git branch --show-current)"
if [[ "${CI:-}" != 'true' ]]; then
  [[ -n "$branch" && "$branch" != 'main' ]] || fail 'sandbox must be on an assigned working branch, not main/detached'
fi
if [[ -n "${EXPECTED_BRANCH:-}" && "$branch" != "$EXPECTED_BRANCH" ]]; then fail "expected branch $EXPECTED_BRANCH, got $branch"; fi
printf 'PASS: repository checkout / branch %s\n' "${branch:-detached (CI)}"
[[ -f .npmrc && -f .editorconfig && -f .prettierrc.json && -f eslint.config.mjs ]] || fail 'canonical environment/quality config missing'
grep -qx 'engine-strict=true' .npmrc && grep -qx 'save-exact=true' .npmrc || fail '.npmrc drifted from canonical engine/precision settings'
bash -n scripts/setup.sh scripts/verify-environment.sh || fail 'setup/verify shell syntax invalid'
[[ "$(npm config get registry)" == 'https://registry.npmjs.org/' ]] || fail 'npm registry is not canonical'
[[ "$(npm config get engine-strict)" == 'true' ]] || fail 'npm engine-strict is disabled'
[[ "$(npm config get save-exact)" == 'true' ]] || fail 'npm save-exact is disabled'
echo 'PASS: canonical config, npm registry and shell script syntax'
[[ "$(uv --version 2>/dev/null)" == 'uv 0.13.7 '* ]] || fail 'uv 0.13.7 missing or different'
echo 'PASS: uv 0.13.7'
# Allow architecture/OS differences, but never version differences.
[[ "$(specify version 2>/dev/null)" == *'1.2.6'* ]] || fail 'Specify CLI 1.2.6 missing or different'
echo 'PASS: Specify CLI 1.2.6'
[[ "$(graphify --version 2>/dev/null)" == 'graphify 0.9.101' ]] || fail 'Graphify CLI 0.9.101 missing or different'
echo 'PASS: Graphify CLI 0.9.101'
[[ -f .specify/integration.json && -f .agents/skills/antislop/SKILL.md ]] || fail 'committed workflow/skills missing'
node <<'JS' || fail 'package manifest, lockfile or installed direct dependencies inconsistent'
const fs = require('node:fs');
const manifest = require('./package.json');
const lock = require('./package-lock.json');
const wanted = {...manifest.dependencies, ...manifest.devDependencies};
if (manifest.packageManager !== 'npm@10.9.8' || manifest.engines.node !== '22.22.3' || manifest.engines.npm !== '10.9.8') throw Error('runtime contract mismatch');
if (lock.lockfileVersion !== 3) throw Error('unsupported lockfile');
const locked = {...lock.packages[''].dependencies, ...lock.packages[''].devDependencies};
for (const [name, version] of Object.entries(wanted)) {
  if (version !== locked[name]) throw Error(`${name}: manifest ${version} != root lock ${locked[name]}`);
  const installed = JSON.parse(fs.readFileSync(`node_modules/${name}/package.json`, 'utf8')).version;
  const resolved = lock.packages[`node_modules/${name}`]?.version;
  if (version !== installed || version !== resolved) throw Error(`${name}: required ${version}, installed ${installed}, locked ${resolved}`);
}
console.log(`PASS: ${Object.keys(wanted).length} direct dependencies match exact manifest, lockfile and installation`);
JS
npm ls --depth=0 >/dev/null || fail 'npm dependency tree invalid'
echo 'PASS: npm dependency tree (npm ls --depth=0)'
npm run lint >/dev/null || fail 'ESLint config/lint failed'
echo 'PASS: npm run lint'
npm run format:check >/dev/null || fail 'Prettier config/format check failed'
echo 'PASS: npm run format:check'

if [[ ! -f index.html || ! -d src ]]; then
  if $full; then fail 'app source/index.html absent; full verification unavailable before app implementation'; fi
  echo 'SKIP: dev server, typecheck, tests, build: no app source/index.html yet (preparation phase)'
else
  for task in typecheck test:run build; do
    node -e "process.exit(Object.hasOwn(require('./package.json').scripts, '$task') ? 0 : 1)" || fail "missing npm script $task"
    npm run "$task" || fail "npm run $task failed"
  done
  echo 'PASS: typecheck, tests and build; dev preview requires separate live-server check'
fi
printf 'PASS: environment verification finished (%s)\n' "$($full && echo full || echo preparation)"
