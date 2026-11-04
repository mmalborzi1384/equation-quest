# Introduction page and web glass-carousel adaptation — D35

> **سند تاریخی (۱۲ آبان ۱۴۰۵).** ارقام و توضیحات این گزارش مربوط به همان اجراست. وضعیت جاری کد، تست‌ها و شواهد بصری در [`FINAL_VERIFICATION_2026-11-04.md`](FINAL_VERIFICATION_2026-11-04.md) و [`MOTION.md`](MOTION.md) است.

**2026-11-03, branch `arena/5b9ca4d8-equation-quest`.** Owner requested another introduction site view, bidirectional navigation with the current Home, an Expo glass-carousel reference and a README. Implementation is a separate lazy `#/intro` route in the existing app (not a second deployment or React Native bundle). This report describes branch verification, not a live Pages release.

## Decisions and implementation

- Studied [`rit3zh/expo-glass-carousel`](https://github.com/rit3zh/expo-glass-carousel), its README and license. It is an MIT-licensed Expo/React Native demo using Skia snapshots/shaders, Reanimated and gesture handlers; those runtime components are not browser dependencies. Built original React DOM/CSS interaction from its conceptual center-card/side-card/snap/focus/accessibility behavior rather than copying its code or assets. No package/lockfile change.
- Added `src/pages/Intro/{Intro.tsx,Intro.module.css,IntroCarousel.tsx,IntroCarousel.module.css}` and a lazy route in `src/app/App.tsx`. Home's hero, the shared header and the Intro page link between the views. Carousel buttons, side-card selection, pointer swipe, directional keys, Escape, focus details and direct lesson links work on semantic text. The image is the existing optimized WebP captured from this game's actual scene, not an unrelated demo image.
- Restrained decorative lens only on carousel cards; all reading text has opaque backing, and button-like controls retain 9px corners, visible focus and 44px touch targets. No scroll-linked blur or section translation. OS/user reduced motion and unsupported WebGL do not block the content.
- `README.md` documents the actual app, commands, route structure, inspiration/compatibility, status and future issue/PR process. `scripts/smoke-release.mjs` includes the Intro route and waits for a built Vite entrypoint and its JavaScript asset instead of treating an uncompiled legacy Pages index as ready; it asserts the Intro heading so a stale deployed bundle/404 cannot pass.

## Evidence and limits

- `bash scripts/setup.sh`: PASS pinned environment and clean `npm ci` (Node 22.22.3/npm 10.9.8). Initial `verify-environment.sh --full` without setup reported missing uv 0.13.7; after setup the full verification passed.
- `EXPECTED_BRANCH=arena/5b9ca4d8-equation-quest bash scripts/verify-environment.sh --full`: **91 Vitest PASS**, lint, format, typecheck, build PASS. `npm run check:phase9` PASS (WebP 32,900/17,570 bytes; lazy scene 242,736 gzip bytes under 260,000 budget). Lazy Intro JS chunk about 10.13 kB uncompressed / 3.58 kB gzip.
- `LD_LIBRARY_PATH=/tmp/eq-intro-browser/al2023/lib:/tmp EQ_CHROMIUM_PATH=/tmp/chromium EQ_WEBGL=1 npm run test:e2e`: **40/40 Chromium PASS** (38 existing + 2 new); Intro tests cover round-trip links, details/Escape/keyboard and responsive 320/390/768/1280 viewport/reload/reduced motion. Temporary Chromium and SwiftShader are outside Git.
- `LD_LIBRARY_PATH=/tmp/eq-intro-browser/al2023/lib:/tmp EQ_CHROMIUM_PATH=/tmp/chromium npm run test:release`: local production preview PASS, including Intro, asset requests, reload, mobile menu and saved setting. Screenshots inspected at 390px and 1280px; no horizontal overflow, stage or CTA clipping observed. Temporary screenshots deleted.
- Temporary `axe-core@4.10.3` WCAG 2/2.1 A/AA scan at 320/1280px: initial desktop side-card contrast failed because opacity dimmed text; removing side-card opacity and darkening the section eyebrow produced **0 automated violations** on rerun. This is not a screen-reader certification. Graphify extract/cluster/update: 1340 nodes, 2183 edges, 145 communities. No external screen-reader, physical phone, alternate browser or independent grade-7 curriculum audit. Site is not claimed to be publicly updated until a separately approved merge and successful main live-smoke.

## Anti-slop Delivery Gate (scoped)

- **R-03/R-10/R-11/R-25/R-39 PASS:** tested 320–1280 widths, 9px actionable controls and solid readable text, only a small decorative lens, responsive images from the product, focus and motion bypass. No blanket backdrop filter, pasted RN shader or extra dependency.
- **R-16/R-23/R-24/R-36 PASS:** all cards lead to actual lessons, no fabricated results/endorsements, factual progress-device copy and authentic game art.
- **C-2/C-4/R-35 PASS within local scope:** UI click/keyboard/swipe, reduced-motion, routes and production preview tested. Public-host gate PENDING until merge/deployment; future issues remain open, not a zero-bug guarantee.
