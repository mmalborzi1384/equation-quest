#!/usr/bin/env bash
# Canonical, repeatable setup. Never changes the git branch or the committed lockfile.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
if ! command -v git >/dev/null 2>&1 || [[ "$(git rev-parse --show-toplevel 2>/dev/null)" != "$ROOT" ]]; then
  echo 'This is not the Equation Quest Git checkout; refusing setup.' >&2
  exit 1
fi
branch="$(git branch --show-current)"
if [[ "${CI:-}" != 'true' && ( -z "$branch" || "$branch" == 'main' ) ]]; then
  echo 'Select your assigned PR branch; refusing setup on main or detached HEAD.' >&2
  exit 1
fi
if [[ -n "${EXPECTED_BRANCH:-}" && "$branch" != "$EXPECTED_BRANCH" ]]; then
  echo "Expected $EXPECTED_BRANCH; found $branch. Refusing setup." >&2
  exit 1
fi

required_node="$(cat .nvmrc)"
required_npm="$(node -p 'require("./package.json").packageManager.split("@")[1]' 2>/dev/null || true)"
if ! command -v node >/dev/null 2>&1 || [[ "$(node --version)" != "v$required_node" ]]; then
  echo "Node.js $required_node required; found $(node --version 2>/dev/null || echo missing). Install/select it before setup. See docs/ENVIRONMENT_SETUP.md." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1 || [[ "$(npm --version)" != "$required_npm" ]]; then
  echo "npm $required_npm required; found $(npm --version 2>/dev/null || echo missing). See docs/ENVIRONMENT_SETUP.md." >&2
  exit 1
fi
if ! command -v python3 >/dev/null 2>&1 || ! python3 -c 'import sys; sys.exit(sys.version_info < (3, 11))'; then
  echo 'Python 3.11+ is required for the Spec Kit / Graphify tools.' >&2
  exit 1
fi
if ! command -v git >/dev/null 2>&1; then
  echo 'git is required.' >&2
  exit 1
fi
if [[ ! -f package-lock.json ]]; then
  echo 'Missing committed package-lock.json; refusing non-reproducible npm install.' >&2
  exit 1
fi

# Tool executables live outside the repository. Reinstall if this sandbox is fresh.
export PATH="$HOME/.local/bin:$PATH"
if ! command -v uv >/dev/null 2>&1; then
  echo 'Installing uv 0.13.7 to user space...'
  if ! python3 -m pip install --user 'uv==0.13.7'; then
    # Debian PEP 668 may reject even --user; do not change system packages.
    python3 -m pip install --user --break-system-packages 'uv==0.13.7'
  fi
fi
if [[ "$(uv --version)" != 'uv 0.13.7 '* ]]; then
  echo "Expected uv 0.13.7, found $(uv --version); do not silently change an existing tool." >&2
  exit 1
fi
if ! command -v specify >/dev/null 2>&1; then
  uv tool install 'specify-cli==1.2.6'
fi
if ! command -v graphify >/dev/null 2>&1; then
  uv tool install 'graphifyy==0.9.101'
fi
# Verification checks their versions. No force-upgrade or destructive cleanup.
echo 'Installing locked npm dependencies with npm ci...'
npm ci
bash scripts/verify-environment.sh
