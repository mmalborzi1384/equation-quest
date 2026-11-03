# Graph Report - equation-quest  (2026-11-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1276 nodes · 2103 edges · 147 communities (82 shown, 65 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13886907`
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
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 131
- Community 132
- Community 133
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139

## God Nodes (most connected - your core abstractions)
1. `TopicRoute()` - 29 edges
2. `solution()` - 27 edges
3. `MechanicsLab()` - 23 edges
4. `Practice()` - 22 edges
5. `Game()` - 21 edges
6. `Group 1: Hard Gate (absolute, no exceptions)` - 20 edges
7. `react` - 20 edges
8. `equals()` - 18 edges
9. `StageRunner()` - 18 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `problem()` --calls--> `fromStrings()`  [EXTRACTED]
  src/features/level-manager/stages.ts → src/features/equation-engine/equation.ts
- `grade()` --calls--> `parseRational()`  [EXTRACTED]
  src/features/equation-engine/equation.ts → src/features/equation-engine/rational.ts
- `tryAnswer()` --calls--> `grade()`  [EXTRACTED]
  src/pages/Lessons/Practice.tsx → src/features/equation-engine/equation.ts
- `solution()` --calls--> `divide()`  [EXTRACTED]
  src/features/equation-engine/equation.ts → src/features/equation-engine/rational.ts
- `practiceAnswer()` --calls--> `solution()`  [EXTRACTED]
  src/features/progression/saved.ts → src/features/equation-engine/equation.ts

## Import Cycles
- None detected.

## Communities (147 total, 65 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (58): react-katex, Action, apply(), equationTex(), FeedbackCode, grade(), initial(), Linear (+50 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (54): vitest, zustand, Equation, equation(), fromStrings(), Band, generate(), pools (+46 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (32): coordinates, Landmark, landmarks, lessons, advance(), BOUND, Direction, directions (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (30): check-prerequisites.sh script, check_dir(), check_file(), find_specify_root(), format_speckit_command(), get_current_branch(), get_feature_paths(), get_invoke_separator() (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (30): args, inputs, integration, spec, default, prompt, type, any (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (13): gsap@3.15.0, gsap, react, AppLayout(), SiteFooter(), links, SiteHeader(), ResetAction() (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (18): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+10 more)

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (14): Dependency map and proposed knowledge graph, GitHub Pages deployment proposal — not configured, Development status — 2026-11-03, Phase 2 verification, Game design — Algebra Kingdom (Phase 1 planning baseline), Graphify local graph — preparation extraction, Performance plan (targets to measure, not achieved), Phase 1 — specification acceptance checklist (review copy) (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (26): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery, MVP First (User Story 1 Only) (+18 more)

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (15): BalanceLesson(), BothSidesLesson(), EquationLesson(), FractionsLesson(), InverseOperationsLesson(), PartsLesson(), SolveLesson(), BalanceLab() (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, esModuleInterop, isolatedModules, jsx, lib, module, moduleResolution (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (19): dependencies, @fontsource/vazirmatn@5.3.0, katex@0.19.1, lucide-react@1.67.0, react@19.3.1, react-dom@19.3.1, react-katex@3.1.0, react-router-dom@7.18.5 (+11 more)

### Community 16 - "Community 16"
Cohesion: 0.25
Nodes (13): islands, LevelInfo, levels, StageSession, problem(), stageFor(), stageOrder, StageProblem (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (18): devDependencies, eslint@9.39.2, @gltf-transform/cli@4.5.1, jsdom@30.1.3, prettier@3.9.10, @types/react@19.3.0, @types/react-dom@19.3.0, typescript@5.9.3 (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (11): App(), Game, Home, Learning, lessonPages, Level, NotFound, Progress (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (13): Additional core topic lessons (`/learning/equation`, `/learning/parts`, `/learning/both-sides`, `/learning/solve`, `/learning/verify`), `/game`, `/game/level/01` … `/08`, `/` Home, `/learning/balance`, `/learning/fractions` — independent fraction lesson and practice, `/learning/inverse-operations`, `/learning` Overview (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.30
Nodes (7): react-router-dom, PageIntro(), Props, topicPath(), Learning(), Level(), NotFound()

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (5): @playwright/test@1.64.1, @playwright/test, buttonLikeLinks, routes, routes

### Community 24 - "Community 24"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (12): AI Capsule Badges, Colored Left Stripe, Decorative Elements, Decorative Status Dot, Emoji as Decoration, Eyebrow Badge Above the Headline, Fake Terminal Window, Generic AI Icons (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.17
Nodes (12): antislop-ui, Endless Pulses and Loops, Hero Image Loaded Like Any Other Image, How to use this skill, Motion, Page Basics, Performance, Render-Blocking Third-Party Script (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.17
Nodes (12): Approved vs provisional, Architecture (Phase 2 shell implemented; domain features planned), Documentation, Equation Quest — project memory index, Feature state, Goal and constraints, Next step, Permanent execution protocol (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (11): CLS: Cumulative Layout Shift, Common LCP issues, Core Web Vitals (LCP, INP, CLS), INP: Interaction to Next Paint, LCP element identification, LCP: Largest Contentful Paint, LCP optimization checklist, Measure before optimizing (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.18
Nodes (11): 4-Column Template Footer, Bento Grid, Copy-Paste Feature Cards, Demo Without a Product, "How It Works" Always 3 Steps, Layout & Components, Monotonous Template Layout, "Most Popular" Pricing Card (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (11): Background Grid, Dark Mode Default for No Reason, Excessive Accent Color, Excessive Border Radius, Excessive Glassmorphism, Generic Blue-Purple Gradient, Glow Everywhere, Overly Soft Shadows (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (11): A1. Eight learning topics: what counts as independent instruction?, A2. Grade-7 numeric progression and content review — approved with mandatory fraction expansion, A3. Asset-production responsibility and visual fidelity, A4. Spec bundle and Constitution ratification, A5. Math-engine dependency before interactive lessons, A6. Publication timing (approval needed later, not to finish Phase 1), Binding post-approval clarification, Decisions that required owner approval — now approved as planning choices (+3 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (10): prop-types@15.8.1, description, @types/three@0.187.0, name, packageManager, private, type, version (+2 more)

### Community 33 - "Community 33"
Cohesion: 0.18
Nodes (11): scripts, build, check:deps, check:phase9, dev, format:check, lint, preview (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.20
Nodes (10): Group 3: Quality Locks (consistency), R-05 — Layout & Page Structure, R-11 — Border Radius, R-15 — CTA (Call to Action), R-16 — Copywriting & Buzzwords, R-20 — Visual Identity, R-21 — Dark Mode, R-29 — Color Palette (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.20
Nodes (9): Architecture proposal (not yet implemented), Boundaries, Dependency direction, Deployment and quality, Educational dependency schedule, Gameplay ownership, Persistence, Phase 2 implemented subset (2026-11-03) (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.24
Nodes (4): Card, cards, GlassCarousel(), Home()

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (8): Functional scope, Journey, Measures (to instrument locally, not claim yet), Non-goals for v1, Outcome, Problem / audience, Product acceptance gate, Product requirements — Equation Quest

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (8): Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root), Summary, Technical Context

### Community 40 - "Community 40"
Cohesion: 0.28
Nodes (6): Lesson, lessons, Topic, topicById, TopicId, topics

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): Already installed, and the user asks how to update, antislop, Core Principle, Functional Patterns, Part 2: Mandatory Rules (R-01 to R-40, grouped), Two Usage Modes, What This Is (and What It Isn't)

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (8): Accessibility, Copywriting & Content, Decorative Elements, Functionality & Content, Identity & Originality, Layout & Components, Part 1: AI Slop Patterns (Warning Signs), Visual & Color

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (8): App & Dashboard, Charts Without a Question, Default Dashboard Shell, Filler Activity Feed, Filler Data in Fields and Columns, Generic Table Columns, Placeholder Empty and Loading States, Stat Cards With Invented Numbers

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (7): Domain boundary and representation, Feedback and hints, Generator and difficulty policy, Pure equation engine specification — required rational scope (not implemented), Step model and mathematical semantics, Test contract and extension, Timing

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (7): 1. Repository, 2. Tool and skill compatibility, 3. Architecture, page map and memory, 4. Dependency status and knowledge graph, 5. Risks / decisions required, 6. Proposed order, Preparation report — 2026-11-03

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (4): Document basics, Runtime, Security defaults, Web Baseline

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (6): Anti-slop and reference, Canonical cross-sandbox contract, Direct npm dependencies (installed, exact lockfile), Security and compatibility risk, Tooling and dependency register (2026-11-03), Verified environment

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): Change protocol, Commands (currently implemented), Development workflow and sandbox handoff, End-of-task handoff, Entry gate — every session and PR sandbox, Git/CI policy

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (6): Canonical development environment — Equation Quest, Configuration inventory, From a fresh PR sandbox (checklist), Important boundaries, Troubleshooting differences, What was actually available in this sandbox

### Community 50 - "Community 50"
Cohesion: 0.29
Nodes (6): آزمون و محدودیت‌ها, بازمانده‌ها و ریسک‌ها, بررسی معیارهای پذیرش, تاریخچه و توقف, خروجی‌های مستند, گزارش نهایی برای بررسی فاز ۱ — هنوز تأیید نهایی نشده

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (6): بازبینی anti-slop و دسترسی‌پذیری, بدهی و توقف, شواهد اجرایی و آزمون, مجوز، دامنه و تحویل, مرجع بازبینی, گزارش تکمیل پیاده‌سازی فاز ۲: ساختار اصلی وب‌سایت

### Community 52 - "Community 52"
Cohesion: 0.29
Nodes (6): Before starting an authorized phase, Current boundary, Equation Quest — Controlled Phase Execution Protocol, Execute only the authorized phase, Phase completion report and stop condition, Three phase-appropriate outputs for **each** phase

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, App foundation and shared navigation, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Home narrative and glass carousel, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 55 - "Community 55"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Learning overview, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Balance lesson, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, Unknown lesson, User story

### Community 58 - "Community 58"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Inverse operations lesson, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 59 - "Community 59"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story, World map and four islands

### Community 60 - "Community 60"
Cohesion: 0.29
Nodes (6): 3D exploration and controls, Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 61 - "Community 61"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Equation and puzzle engine, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 62 - "Community 62"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Eight authored levels and unlocks, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Persistent progress dashboard, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Quality and GitHub Pages release, Requirements, Scope and constraints, User story

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (6): C-1 — Intentionality, C-2 — Functional Completeness, C-3 — Content-Driven Composition, C-4 — Resilience, C-5 — Evidence Over Claims, The Craftsmanship Standard

### Community 66 - "Community 66"
Cohesion: 0.33
Nodes (5): Anti-slop gate, Page composition, Tokens, Visual and interaction direction, Web glass adaptation

### Community 67 - "Community 67"
Cohesion: 0.33
Nodes (5): Educational content plan — grade seven (Phase 1 planning baseline), Feedback ladder, Guided worked examples (LTR maths within Persian RTL UI), Review and assessment gate, Scope and progression

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (5): Block 1: Hard Gate (absolute), Block 2: Purpose-Gate (technique allowed, reason required), Block 3: Liveliness (required to be alive, not just clean), Block 4: Craftsmanship & Quality Locks, Delivery Gate (Mandatory)

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (5): D19 — Restore the original Phase 3 scope (owner clarification, 2026-11-03), Decision log (2026-11-03), Owner-approved Phase 1 planning decisions — 2026-11-03 (not final Phase 1 acceptance), Phase 1 decisions awaiting owner (not yet resolved), Phase transition — owner authorization, 2026-11-03

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (4): Cross-cutting inconsistencies / missing decisions, Phase 1 — specification cross-review and findings, Post-approval reconciliation (2026-11-03), Validation boundary

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (4): @testing-library/jest-dom@7.0.1, @testing-library/react@16.3.3, @testing-library/jest-dom, @testing-library/react

### Community 73 - "Community 73"
Cohesion: 0.70
Nodes (4): check_version(), fail(), PATH, verify-environment.sh script

### Community 74 - "Community 74"
Cohesion: 0.40
Nodes (4): Constraints, Core principles, Equation Quest Constitution, Governance

### Community 75 - "Community 75"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (4): Phase 2 structure subset (owner authorized), Phase 3 execution (owner authorized; original roadmap), Phase-specific small tasks (Planned; only execute when authorized), Tasks — Home narrative and glass carousel

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (4): Acceptance evidence (future implementation), Independent fractional equation lesson and practice, Required interaction, Story and objective

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (3): Equation Quest — permanent agent instructions, Phase authorization and deliverables (permanent), Rules

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (4): Design Read (how the dials are set), Levers (how the dials become visual decisions), Part 3: Liveliness Toolkit, Three Dials (required)

### Community 80 - "Community 80"
Cohesion: 0.50
Nodes (4): Dead Navigation, Non-Functional Controls, Sections That Fill a Template, Structural & Flow

### Community 81 - "Community 81"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (3): engines, node, npm

## Knowledge Gaps
- **4 isolated node(s):** `BlockMath`, `InlineMath`, `PATH`, `PATH`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 742 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 8` to `Community 32`, `Community 0`, `Community 3`, `Community 37`, `Community 12`, `Community 15`, `Community 19`, `Community 21`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Game()` (e.g. with `down()` and `reset()`) actually correct?**
  _`Game()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `BlockMath`, `InlineMath`, `PATH` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10559006211180125 - nodes in this community are weakly interconnected._
- **Why does `react-router-dom` connect `Community 21` to `Community 32`, `Community 0`, `Community 3`, `Community 37`, `Community 8`, `Community 12`, `Community 15`, `Community 16`, `Community 19`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09233954451345756 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Community 1` to `Community 32`, `Community 0`, `Community 3`, `Community 71`, `Community 8`, `Community 12`, `Community 16`, `Community 18`, `Community 83`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._