# Graph Report - equation-quest  (2026-11-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1032 nodes · 1178 edges · 135 communities (77 shown, 58 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17667039`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- common.sh
- steps
- contrast-check.py
- contrast-mcp.py
- Accessibility Code Patterns
- Tone & Voice
- verify-environment.sh
- scripts
- .prettierrc.json
- engines
- setup.sh
- antislop-layoutmobile
- PROJECT_MEMORY.md
- Tasks: [FEATURE NAME]
- TopicRoute
- levels.ts
- Group 1: Hard Gate (absolute, no exceptions)
- compilerOptions
- Comments That Add Nothing
- Core Web Vitals (LCP, INP, CLS)
- PHASE_01_ACCEPTANCE_CHECKLIST.md
- App.tsx
- Route wireframes & design specifications (planning only)
- Group 2: Purpose-Gate (technique allowed, purpose required)
- package.json
- Feature Specification: [FEATURE NAME]
- AppLayout.tsx
- Decorative Elements
- Layout & Components
- Visual & Color
- Decisions that required owner approval — now approved as planning choices
- Equation Quest — project memory index
- Core Principles
- Group 3: Quality Locks (consistency)
- vitest
- Architecture proposal (not yet implemented)
- Product requirements — Equation Quest
- Implementation Plan: [FEATURE]
- antislop
- Part 1: AI Slop Patterns (Warning Signs)
- antislop-ui
- App & Dashboard
- Pure equation engine specification — required rational scope (not implemented)
- Preparation report — 2026-11-03
- Tooling and dependency register (2026-11-03)
- Development workflow and sandbox handoff
- Canonical development environment — Equation Quest
- گزارش نهایی برای بررسی فاز ۱ — هنوز تأیید نهایی نشده
- Equation Quest — Controlled Phase Execution Protocol
- App foundation and shared navigation
- Home narrative and glass carousel
- Learning overview
- Balance lesson
- Unknown lesson
- Inverse operations lesson
- World map and four islands
- 3D exploration and controls
- Equation and puzzle engine
- Eight authored levels and unlocks
- Persistent progress dashboard
- Quality and GitHub Pages release
- The Craftsmanship Standard
- Visual and interaction direction
- Educational content plan — grade seven (Phase 1 planning baseline)
- Delivery Gate (Mandatory)
- Phase 1 — specification cross-review and findings
- Equation Quest Constitution
- [CHECKLIST TYPE] Checklist: [FEATURE NAME]
- Independent fractional equation lesson and practice
- Equation Quest — permanent agent instructions
- Part 3: Liveliness Toolkit
- Structural & Flow
- Performance
- PageIntro
- Plan — App foundation and shared navigation
- Tasks — App foundation and shared navigation
- Tasks — Home narrative and glass carousel
- Tasks — Learning overview
- Tasks — Balance lesson
- Tasks — Unknown lesson
- Tasks — Inverse operations lesson
- Tasks — World map and four islands
- Tasks — 3D exploration and controls
- Tasks — Equation and puzzle engine
- Tasks — Eight authored levels and unlocks
- Tasks — Persistent progress dashboard
- Tasks — Quality and GitHub Pages release
- WORKFLOW_ARENA.md
- 001-foundation/checklist.md
- 001-foundation/clarifications.md
- 002-home/checklist.md
- 002-home/clarifications.md
- 002-home/plan.md
- 003-learning/checklist.md
- 003-learning/clarifications.md
- 003-learning/plan.md
- 004-balance/checklist.md
- 004-balance/clarifications.md
- 004-balance/plan.md
- 005-unknown/checklist.md
- 005-unknown/clarifications.md
- 005-unknown/plan.md
- 006-inverse/checklist.md
- 006-inverse/clarifications.md
- 006-inverse/plan.md
- 007-world/checklist.md
- 007-world/clarifications.md
- 007-world/plan.md
- 008-game/checklist.md
- 008-game/clarifications.md
- 008-game/plan.md
- 009-equations/checklist.md
- 009-equations/clarifications.md
- 009-equations/plan.md
- 010-levels/checklist.md
- 010-levels/clarifications.md
- 010-levels/plan.md
- 011-progress/checklist.md
- 011-progress/clarifications.md
- 011-progress/plan.md
- 012-release/checklist.md
- 012-release/clarifications.md
- 012-release/plan.md
- 013-fractions/checklist.md
- 013-fractions/clarifications.md
- 013-fractions/plan.md
- 013-fractions/tasks.md
- react-router-dom
- گزارش تکمیل پیاده‌سازی فاز ۲: ساختار اصلی وب‌سایت
- DEVELOPMENT_STATUS.md
- typescript-eslint
- ROUTES.md
- TESTING.md

## God Nodes (most connected - your core abstractions)
1. `TopicRoute()` - 21 edges
2. `Group 1: Hard Gate (absolute, no exceptions)` - 20 edges
3. `compilerOptions` - 18 edges
4. `PageIntro()` - 15 edges
5. `react-router-dom` - 15 edges
6. `Tasks: [FEATURE NAME]` - 13 edges
7. `Route wireframes & design specifications (planning only)` - 13 edges
8. `Group 2: Purpose-Gate (technique allowed, purpose required)` - 13 edges
9. `App()` - 12 edges
10. `Decorative Elements` - 12 edges

## Surprising Connections (you probably didn't know these)
- `World()` --calls--> `PageIntro()`  [EXTRACTED]
  src/pages/World/World.tsx → src/components/ui/PageIntro.tsx
- `BalanceLesson()` --calls--> `TopicRoute()`  [EXTRACTED]
  src/pages/Lessons/BalanceLesson.tsx → src/pages/Lessons/TopicRoute.tsx
- `BothSidesLesson()` --calls--> `TopicRoute()`  [EXTRACTED]
  src/pages/Lessons/BothSidesLesson.tsx → src/pages/Lessons/TopicRoute.tsx
- `EquationLesson()` --calls--> `TopicRoute()`  [EXTRACTED]
  src/pages/Lessons/EquationLesson.tsx → src/pages/Lessons/TopicRoute.tsx
- `FractionsLesson()` --calls--> `TopicRoute()`  [EXTRACTED]
  src/pages/Lessons/FractionsLesson.tsx → src/pages/Lessons/TopicRoute.tsx

## Import Cycles
- None detected.

## Communities (135 total, 58 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, eslint@9.39.2, @gltf-transform/cli@4.5.1, jsdom@30.1.3, @playwright/test@1.64.1, prettier@3.9.10, @types/react@19.3.0, @types/three@0.187.0 (+11 more)

### Community 1 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, @fontsource/vazirmatn@5.3.0, gsap@3.15.0, katex@0.19.1, lucide-react@1.67.0, prop-types@15.8.1, react@19.3.1, react-dom@19.3.1 (+13 more)

### Community 2 - "common.sh"
Cohesion: 0.11
Nodes (30): check-prerequisites.sh script, check_dir(), check_file(), find_specify_root(), format_speckit_command(), get_current_branch(), get_feature_paths(), get_invoke_separator() (+22 more)

### Community 3 - "steps"
Cohesion: 0.06
Nodes (30): args, inputs, integration, spec, default, prompt, type, any (+22 more)

### Community 4 - "contrast-check.py"
Cohesion: 0.25
Nodes (9): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+1 more)

### Community 5 - "contrast-mcp.py"
Cohesion: 0.25
Nodes (9): _channel(), check_contrast(), contrast_ratio(), _error(), main(), relative_luminance(), _reply(), _send() (+1 more)

### Community 6 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 7 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 8 - "verify-environment.sh"
Cohesion: 0.70
Nodes (4): check_version(), fail(), PATH, verify-environment.sh script

### Community 9 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, check:deps, dev, format:check, lint, preview, test:run (+1 more)

### Community 10 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 11 - "engines"
Cohesion: 0.67
Nodes (3): engines, node, npm

### Community 13 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 14 - "PROJECT_MEMORY.md"
Cohesion: 0.11
Nodes (10): Decision log (2026-11-03), Owner-approved Phase 1 planning decisions — 2026-11-03 (not final Phase 1 acceptance), Phase 1 decisions awaiting owner (not yet resolved), Phase transition — owner authorization, 2026-11-03, Dependency map and proposed knowledge graph, GitHub Pages deployment proposal — not configured, Game design — Algebra Kingdom (Phase 1 planning baseline), Graphify local graph — preparation extraction (+2 more)

### Community 15 - "Tasks: [FEATURE NAME]"
Cohesion: 0.07
Nodes (26): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery, MVP First (User Story 1 Only) (+18 more)

### Community 16 - "TopicRoute"
Cohesion: 0.15
Nodes (13): Topic, topicById, TopicId, BalanceLesson(), BothSidesLesson(), EquationLesson(), FractionsLesson(), InverseOperationsLesson() (+5 more)

### Community 17 - "levels.ts"
Cohesion: 0.28
Nodes (5): islands, LevelInfo, levels, topics, World()

### Community 18 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, esModuleInterop, isolatedModules, jsx, lib, module, moduleResolution (+11 more)

### Community 20 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 21 - "Core Web Vitals (LCP, INP, CLS)"
Cohesion: 0.11
Nodes (15): CLS: Cumulative Layout Shift, Common LCP issues, Core Web Vitals (LCP, INP, CLS), INP: Interaction to Next Paint, LCP element identification, LCP: Largest Contentful Paint, LCP optimization checklist, Measure before optimizing (+7 more)

### Community 23 - "App.tsx"
Cohesion: 0.18
Nodes (12): react, App(), Game, Home, Learning, lessonPages, Level, NotFound (+4 more)

### Community 24 - "Route wireframes & design specifications (planning only)"
Cohesion: 0.14
Nodes (13): Additional core topic lessons (`/learning/equation`, `/learning/parts`, `/learning/both-sides`, `/learning/solve`, `/learning/verify`), `/game`, `/game/level/01` … `/08`, `/` Home, `/learning/balance`, `/learning/fractions` — independent fraction lesson and practice, `/learning/inverse-operations`, `/learning` Overview (+5 more)

### Community 25 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 26 - "package.json"
Cohesion: 0.15
Nodes (12): react-katex@3.1.0, @react-three/drei@10.7.9, description, @types/react-dom@19.3.0, name, packageManager, private, type (+4 more)

### Community 27 - "Feature Specification: [FEATURE NAME]"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 28 - "AppLayout.tsx"
Cohesion: 0.28
Nodes (6): AppLayout(), SiteFooter(), links, SiteHeader(), Preferences, usePreferences

### Community 29 - "Decorative Elements"
Cohesion: 0.17
Nodes (12): AI Capsule Badges, Colored Left Stripe, Decorative Elements, Decorative Status Dot, Emoji as Decoration, Eyebrow Badge Above the Headline, Fake Terminal Window, Generic AI Icons (+4 more)

### Community 30 - "Layout & Components"
Cohesion: 0.18
Nodes (11): 4-Column Template Footer, Bento Grid, Copy-Paste Feature Cards, Demo Without a Product, "How It Works" Always 3 Steps, Layout & Components, Monotonous Template Layout, "Most Popular" Pricing Card (+3 more)

### Community 31 - "Visual & Color"
Cohesion: 0.18
Nodes (11): Background Grid, Dark Mode Default for No Reason, Excessive Accent Color, Excessive Border Radius, Excessive Glassmorphism, Generic Blue-Purple Gradient, Glow Everywhere, Overly Soft Shadows (+3 more)

### Community 32 - "Decisions that required owner approval — now approved as planning choices"
Cohesion: 0.18
Nodes (11): A1. Eight learning topics: what counts as independent instruction?, A2. Grade-7 numeric progression and content review — approved with mandatory fraction expansion, A3. Asset-production responsibility and visual fidelity, A4. Spec bundle and Constitution ratification, A5. Math-engine dependency before interactive lessons, A6. Publication timing (approval needed later, not to finish Phase 1), Binding post-approval clarification, Decisions that required owner approval — now approved as planning choices (+3 more)

### Community 33 - "Equation Quest — project memory index"
Cohesion: 0.18
Nodes (11): Approved vs provisional, Architecture (Phase 2 shell implemented; domain features planned), Documentation, Equation Quest — project memory index, Feature state, Goal and constraints, Next step, Permanent execution protocol (+3 more)

### Community 34 - "Core Principles"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 35 - "Group 3: Quality Locks (consistency)"
Cohesion: 0.20
Nodes (10): Group 3: Quality Locks (consistency), R-05 — Layout & Page Structure, R-11 — Border Radius, R-15 — CTA (Call to Action), R-16 — Copywriting & Buzzwords, R-20 — Visual Identity, R-21 — Dark Mode, R-29 — Color Palette (+2 more)

### Community 36 - "vitest"
Cohesion: 0.20
Nodes (8): @testing-library/jest-dom@7.0.1, @testing-library/react@16.3.3, @vitejs/plugin-react@6.2.1, vitest@5.1.0, @testing-library/jest-dom, @testing-library/react, @vitejs/plugin-react, vitest

### Community 37 - "Architecture proposal (not yet implemented)"
Cohesion: 0.20
Nodes (9): Architecture proposal (not yet implemented), Boundaries, Dependency direction, Deployment and quality, Educational dependency schedule, Gameplay ownership, Persistence, Phase 2 implemented subset (2026-11-03) (+1 more)

### Community 38 - "Product requirements — Equation Quest"
Cohesion: 0.22
Nodes (8): Functional scope, Journey, Measures (to instrument locally, not claim yet), Non-goals for v1, Outcome, Problem / audience, Product acceptance gate, Product requirements — Equation Quest

### Community 39 - "Implementation Plan: [FEATURE]"
Cohesion: 0.22
Nodes (8): Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root), Summary, Technical Context

### Community 40 - "antislop"
Cohesion: 0.25
Nodes (7): Already installed, and the user asks how to update, antislop, Core Principle, Functional Patterns, Part 2: Mandatory Rules (R-01 to R-40, grouped), Two Usage Modes, What This Is (and What It Isn't)

### Community 41 - "Part 1: AI Slop Patterns (Warning Signs)"
Cohesion: 0.25
Nodes (8): Accessibility, Copywriting & Content, Decorative Elements, Functionality & Content, Identity & Originality, Layout & Components, Part 1: AI Slop Patterns (Warning Signs), Visual & Color

### Community 42 - "antislop-ui"
Cohesion: 0.25
Nodes (8): antislop-ui, Endless Pulses and Loops, How to use this skill, Motion, Page Basics, Template Animations Stacked, UI Skill Checklist, Web Baseline Checklist

### Community 43 - "App & Dashboard"
Cohesion: 0.25
Nodes (8): App & Dashboard, Charts Without a Question, Default Dashboard Shell, Filler Activity Feed, Filler Data in Fields and Columns, Generic Table Columns, Placeholder Empty and Loading States, Stat Cards With Invented Numbers

### Community 44 - "Pure equation engine specification — required rational scope (not implemented)"
Cohesion: 0.25
Nodes (7): Domain boundary and representation, Feedback and hints, Generator and difficulty policy, Pure equation engine specification — required rational scope (not implemented), Step model and mathematical semantics, Test contract and extension, Timing

### Community 45 - "Preparation report — 2026-11-03"
Cohesion: 0.25
Nodes (7): 1. Repository, 2. Tool and skill compatibility, 3. Architecture, page map and memory, 4. Dependency status and knowledge graph, 5. Risks / decisions required, 6. Proposed order, Preparation report — 2026-11-03

### Community 46 - "Tooling and dependency register (2026-11-03)"
Cohesion: 0.29
Nodes (6): Anti-slop and reference, Canonical cross-sandbox contract, Direct npm dependencies (installed, exact lockfile), Security and compatibility risk, Tooling and dependency register (2026-11-03), Verified environment

### Community 47 - "Development workflow and sandbox handoff"
Cohesion: 0.29
Nodes (6): Change protocol, Commands (currently implemented), Development workflow and sandbox handoff, End-of-task handoff, Entry gate — every session and PR sandbox, Git/CI policy

### Community 48 - "Canonical development environment — Equation Quest"
Cohesion: 0.29
Nodes (6): Canonical development environment — Equation Quest, Configuration inventory, From a fresh PR sandbox (checklist), Important boundaries, Troubleshooting differences, What was actually available in this sandbox

### Community 49 - "گزارش نهایی برای بررسی فاز ۱ — هنوز تأیید نهایی نشده"
Cohesion: 0.29
Nodes (6): آزمون و محدودیت‌ها, بازمانده‌ها و ریسک‌ها, بررسی معیارهای پذیرش, تاریخچه و توقف, خروجی‌های مستند, گزارش نهایی برای بررسی فاز ۱ — هنوز تأیید نهایی نشده

### Community 50 - "Equation Quest — Controlled Phase Execution Protocol"
Cohesion: 0.29
Nodes (6): Before starting an authorized phase, Current boundary, Equation Quest — Controlled Phase Execution Protocol, Execute only the authorized phase, Phase completion report and stop condition, Three phase-appropriate outputs for **each** phase

### Community 51 - "App foundation and shared navigation"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, App foundation and shared navigation, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 52 - "Home narrative and glass carousel"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Home narrative and glass carousel, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 53 - "Learning overview"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Learning overview, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 54 - "Balance lesson"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Balance lesson, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 55 - "Unknown lesson"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, Unknown lesson, User story

### Community 56 - "Inverse operations lesson"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Inverse operations lesson, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 57 - "World map and four islands"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story, World map and four islands

### Community 58 - "3D exploration and controls"
Cohesion: 0.29
Nodes (6): 3D exploration and controls, Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 59 - "Equation and puzzle engine"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Equation and puzzle engine, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 60 - "Eight authored levels and unlocks"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Eight authored levels and unlocks, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 61 - "Persistent progress dashboard"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Persistent progress dashboard, Phase 1 approved scope (A1–A5, including strengthened A2), Requirements, Scope and constraints, User story

### Community 62 - "Quality and GitHub Pages release"
Cohesion: 0.29
Nodes (6): Acceptance evidence required, Phase 1 approved scope (A1–A5, including strengthened A2), Quality and GitHub Pages release, Requirements, Scope and constraints, User story

### Community 63 - "The Craftsmanship Standard"
Cohesion: 0.33
Nodes (6): C-1 — Intentionality, C-2 — Functional Completeness, C-3 — Content-Driven Composition, C-4 — Resilience, C-5 — Evidence Over Claims, The Craftsmanship Standard

### Community 64 - "Visual and interaction direction"
Cohesion: 0.33
Nodes (5): Anti-slop gate, Page composition, Tokens, Visual and interaction direction, Web glass adaptation

### Community 65 - "Educational content plan — grade seven (Phase 1 planning baseline)"
Cohesion: 0.33
Nodes (5): Educational content plan — grade seven (Phase 1 planning baseline), Feedback ladder, Guided worked examples (LTR maths within Persian RTL UI), Review and assessment gate, Scope and progression

### Community 66 - "Delivery Gate (Mandatory)"
Cohesion: 0.40
Nodes (5): Block 1: Hard Gate (absolute), Block 2: Purpose-Gate (technique allowed, reason required), Block 3: Liveliness (required to be alive, not just clean), Block 4: Craftsmanship & Quality Locks, Delivery Gate (Mandatory)

### Community 67 - "Phase 1 — specification cross-review and findings"
Cohesion: 0.40
Nodes (4): Cross-cutting inconsistencies / missing decisions, Phase 1 — specification cross-review and findings, Post-approval reconciliation (2026-11-03), Validation boundary

### Community 68 - "Equation Quest Constitution"
Cohesion: 0.40
Nodes (4): Constraints, Core principles, Equation Quest Constitution, Governance

### Community 69 - "[CHECKLIST TYPE] Checklist: [FEATURE NAME]"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 70 - "Independent fractional equation lesson and practice"
Cohesion: 0.40
Nodes (4): Acceptance evidence (future implementation), Independent fractional equation lesson and practice, Required interaction, Story and objective

### Community 71 - "Equation Quest — permanent agent instructions"
Cohesion: 0.50
Nodes (3): Equation Quest — permanent agent instructions, Phase authorization and deliverables (permanent), Rules

### Community 72 - "Part 3: Liveliness Toolkit"
Cohesion: 0.50
Nodes (4): Design Read (how the dials are set), Levers (how the dials become visual decisions), Part 3: Liveliness Toolkit, Three Dials (required)

### Community 73 - "Structural & Flow"
Cohesion: 0.50
Nodes (4): Dead Navigation, Non-Functional Controls, Sections That Fill a Template, Structural & Flow

### Community 74 - "Performance"
Cohesion: 0.50
Nodes (4): Hero Image Loaded Like Any Other Image, Performance, Render-Blocking Third-Party Script, Unsized Media That Shifts the Layout

### Community 75 - "PageIntro"
Cohesion: 0.20
Nodes (8): PageIntro(), Props, topicPath(), Game(), Learning(), Level(), NotFound(), Progress()

### Community 78 - "Tasks — Home narrative and glass carousel"
Cohesion: 0.50
Nodes (3): Phase 2 structure subset (owner authorized), Phase-specific small tasks (Planned; only execute when authorized), Tasks — Home narrative and glass carousel

### Community 129 - "react-router-dom"
Cohesion: 0.31
Nodes (5): react-router-dom, Card, cards, GlassCarousel(), Home()

### Community 130 - "گزارش تکمیل پیاده‌سازی فاز ۲: ساختار اصلی وب‌سایت"
Cohesion: 0.33
Nodes (5): بازبینی anti-slop و دسترسی‌پذیری, بدهی و توقف, شواهد اجرایی و آزمون, مجوز، دامنه و تحویل, گزارش تکمیل پیاده‌سازی فاز ۲: ساختار اصلی وب‌سایت

## Knowledge Gaps
- **2 isolated node(s):** `PATH`, `PATH`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 683 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-router-dom` connect `react-router-dom` to `dependencies`, `PageIntro`, `TopicRoute`, `levels.ts`, `App.tsx`, `package.json`, `AppLayout.tsx`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `PATH`, `PATH` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `Part 2: Mandatory Rules (R-01 to R-40, grouped)` connect `antislop` to `Group 2: Purpose-Gate (technique allowed, purpose required)`, `Group 1: Hard Gate (absolute, no exceptions)`, `Group 3: Quality Locks (consistency)`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `antislop` connect `antislop` to `Part 3: Liveliness Toolkit`, `Part 1: AI Slop Patterns (Warning Signs)`, `Delivery Gate (Mandatory)`, `The Craftsmanship Standard`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Should `common.sh` be split into smaller, more focused modules?**
  _Cohesion score 0.11470985155195682 - nodes in this community are weakly interconnected._