# Graph Report - equation-quest  (2026-11-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 166 nodes · 259 edges · 8 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0af5a32`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7

## God Nodes (most connected - your core abstractions)
1. `create-new-feature.sh script` - 11 edges
2. `steps` - 9 edges
3. `get_feature_paths()` - 8 edges
4. `get_repo_root()` - 8 edges
5. `setup-tasks.sh script` - 8 edges
6. `check-prerequisites.sh script` - 7 edges
7. `resolve_template_content()` - 7 edges
8. `selftest()` - 6 edges
9. `main()` - 6 edges
10. `workflow` - 6 edges

## Surprising Connections (you probably didn't know these)
- `create-new-feature.sh script` --calls--> `get_repo_root()`  [EXTRACTED]
  .specify/scripts/bash/create-new-feature.sh → .specify/scripts/bash/common.sh
- `create-new-feature.sh script` --calls--> `_persist_feature_json()`  [EXTRACTED]
  .specify/scripts/bash/create-new-feature.sh → .specify/scripts/bash/common.sh
- `create-new-feature.sh script` --calls--> `resolve_template_content()`  [EXTRACTED]
  .specify/scripts/bash/create-new-feature.sh → .specify/scripts/bash/common.sh
- `check-prerequisites.sh script` --calls--> `check_dir()`  [EXTRACTED]
  .specify/scripts/bash/check-prerequisites.sh → .specify/scripts/bash/common.sh
- `check-prerequisites.sh script` --calls--> `check_file()`  [EXTRACTED]
  .specify/scripts/bash/check-prerequisites.sh → .specify/scripts/bash/common.sh

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (39): description, devDependencies, eslint@9.39.2, @gltf-transform/cli@4.5.1, jsdom@30.1.3, @playwright/test@1.64.1, prettier@3.9.10, @testing-library/jest-dom@7.0.1 (+31 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): dependencies, @fontsource/vazirmatn@5.3.0, gsap@3.15.0, katex@0.19.1, lucide-react@1.67.0, prop-types@15.8.1, react@19.3.1, react-dom@19.3.1 (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (21): check-prerequisites.sh script, check_dir(), check_file(), find_specify_root(), format_speckit_command(), get_current_branch(), get_feature_paths(), get_invoke_separator() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (20): inputs, integration, spec, default, prompt, type, any, requires (+12 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (9): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (9): _channel(), check_contrast(), contrast_ratio(), _error(), main(), relative_luminance(), _reply(), _send() (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.36
Nodes (9): clean_branch_name(), contains_non_ascii(), fit_branch_name(), generate_branch_name(), get_highest_from_specs(), is_feature_number_in_range(), create-new-feature.sh script, spec_prefix_exists() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (10): args, steps, command, id, input, integration, message, on_reject (+2 more)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._
- **Why does `steps` connect `Community 7` to `Community 3`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._