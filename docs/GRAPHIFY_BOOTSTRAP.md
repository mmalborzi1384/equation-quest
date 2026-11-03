# Graphify local graph — preparation extraction

On 2026-11-03 Graphify 0.9.101 completed `graphify extract . --code-only` (exit 0) then `graphify cluster-only . --no-label` (exit 0). Tracked outputs: `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`; cache and HTML are ignored. 166 nodes, 259 edges, 8 communities, 16 code files. **These nodes come from Spec Kit bash scripts, anti-slop helper Python, `package.json`/lock data — NOT application modules.** Future `src/` components/engine do not exist. Graphify's report `built_at_commit` reflects the initial checkout, not a verified implementation revision. For *planned* edges see `docs/DEPENDENCY_MAP.md`.

Environment-contract update (2026-11-03): `graphify update .` and `cluster-only . --no-label` now report 184 nodes / 277 edges / 13 communities, including bootstrap scripts and package metadata. Still no `src/` app graph.

Future workflow after actual code: `~/.local/bin/graphify update .`; if cache excludes new source, `~/.local/bin/graphify extract . --code-only` then `~/.local/bin/graphify cluster-only . --no-label`. Inspect `graphify explain`, `affected`, `path` against the real graph. Commit updated JSON/report with status date. No Graphify MCP integration was exposed in Arena; do not claim remote service is connected.
