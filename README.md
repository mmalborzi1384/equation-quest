# ماجراجویی معادله‌ها

یک وب‌سایت فارسی و راست‌به‌چپ برای آشنایی با معادله‌های خطی پایهٔ هفتم: درس‌های تعاملی، تمرین کسرهای دقیق، هشت مرحلهٔ قابل‌بازی در چهار منطقه، کارگاه کاوش سه‌بعدی و ذخیرهٔ پیشرفت در همین مرورگر. برای استفاده حساب کاربری یا سرور لازم نیست.

## دیدن سایت

- [نسخهٔ منتشرشده در GitHub Pages](https://mmalborzi1384.github.io/equation-quest/)
- [صفحهٔ معرفی](https://mmalborzi1384.github.io/equation-quest/#/intro) — پس از ادغام این تغییر و انتشار موفق در Pages در دسترس است. از صفحهٔ اصلی با «آشنایی با ماجراجویی» به آن بروید؛ در خود صفحه، «بازگشت به صفحهٔ اصلی» راه برگشت است.
- مسیر یادگیری: `#/learning` · جهان بازی: `#/world` · کاوش و آزمایش: `#/game` · پیشرفت: `#/progress`

سایت از `HashRouter` استفاده می‌کند؛ پیوندهای `#/...` با تازه‌سازی صفحه در GitHub Pages نیز کار می‌کنند. اگر محتوای سایت بلافاصله پس از انتشار جدید دیده نشد، چند دقیقه صبر کنید و صفحه را دوباره بارگذاری کنید. وضعیت استقرار را در GitHub Actions بررسی کنید؛ صرفاً سبز بودن مرحلهٔ build به معنی موفقیت آزمون سایت زنده نیست.

## اجرا در رایانهٔ خودتان

پیش‌نیازها: **Node.js 22.22.3** و **npm 10.9.8** مطابق `.nvmrc` و `package.json`.

```bash
npm ci
npm run dev
```

آدرس پیش‌نمایش معمولاً `http://localhost:5173/equation-quest/` است. برای نسخهٔ تولیدی:

```bash
npm run build
npm run preview
```

آزمون‌ها و بررسی‌ها:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:run
npm run check:phase9
npm run test:e2e
npm run test:release
```

آزمون‌های مرورگر به Chromium نصب‌شده برای Playwright نیاز دارند (`npx playwright install --with-deps chromium`). در محیط‌های محدود، `EQ_CHROMIUM_PATH` مسیر باینری و `EQ_CHROMIUM_ARGS` فلگ‌های اضافی (جداشده با کاما) را مشخص می‌کنند و `EQ_WEBGL=1` فلگ‌های SwiftShader را می‌افزاید. `test:release` در حالت عادی پیش‌نمایش تولیدی را موقتاً راه می‌اندازد و خاموش می‌کند؛ برای آزمون سایت منتشرشده `RELEASE_URL=https://mmalborzi1384.github.io/equation-quest/ npm run test:release` را اجرا کنید. دستورهای پیش‌نیاز و بازسازی محیط در [راهنمای محیط](docs/ENVIRONMENT_SETUP.md) آمده است.

## ساختار

- `src/app/` مسیرها و مرز خطا؛ `src/pages/` صفحه‌های مستقل و صفحهٔ معرفی (`Intro`)
- `src/features/equation-engine/` محاسبات کسری دقیق و منطق معادله، جدا از React
- `src/three/` صحنهٔ کاوش؛ `src/store/` پیشرفت محلی نسخه‌دار و تنظیم حرکت کمتر
- `src/components/` ناوبری و اجزای مشترک؛ `tests/e2e/` آزمون‌های مسیرهای مرورگر
- `.github/workflows/pages.yml` بررسی PR، انتشار `dist/` از شاخهٔ اصلی و آزمون زندهٔ Pages

صفحهٔ معرفی از الگوی **کارت مرکزی، انتخاب کارت‌های کناری، ورق‌زدن، باز/بسته کردن جزئیات و کنترل صفحه‌کلید** در [expo-glass-carousel](https://github.com/rit3zh/expo-glass-carousel) الهام گرفته است. آن پروژه برای Expo/React Native با Skia و Reanimated است؛ اینجا رفتار با React DOM و CSS بازآفرینی شده و هیچ کد یا وابستگی React Native/Skia به بستهٔ وب افزوده نشده است. تصویر صحنه از محیط واقعی همین بازی گرفته شده است. متن کارت‌ها در DOM می‌ماند؛ جلوه‌ها با تنظیم «حرکت کمتر» یا ترجیح سیستم غیرفعال می‌شوند.

## مستندات طراحی و حرکت

- [`docs/MOTION.md`](docs/MOTION.md) — قرارداد حرکت، توکنها، جدول هدف M-01…M-10 و فهرست «هرگز متحرک نکن»
- [`docs/FINAL_VERIFICATION_2026-11-04.md`](docs/FINAL_VERIFICATION_2026-11-04.md) و [`docs/verification/`](docs/verification/) — گزارش راستی‌آزمایی نهایی و تصاویر موبایل/دسکتاپ (۱۰۰/۱۰۰ تست واحد، ۴۰/۴۰ تست E2E سبز روی CI (محلی: ۳۵ سبز + ۵ skip صریح WebGL)، ۳۲ ترکیب بصری بدون نقص)
- [`docs/GAME_DESIGN_READ.md`](docs/GAME_DESIGN_READ.md) — طراحیخوانی LM-GM/SDT/ZPD هشت مرحله؛ سندی تحلیلی، بدون تغییر محتوای درسی
- [`docs/DESIGN_REVIEW_2026-11-03.md`](docs/DESIGN_REVIEW_2026-11-03.md) و [`design-proposal.html`](design-proposal.html) — بازبینی و بورد پیشنهادی (نسخهٔ منتشرشده روی سایت: [`/equation-quest/design-proposal.html`](public/design-proposal.html)، لینکشده از فوتر)
- [`docs/DESIGN_RESEARCH_2026-11-03.md`](docs/DESIGN_RESEARCH_2026-11-03.md) — پژوهش مهارتها، CSS بومی و کتابخانهها
- [`.agents/skills/VENDORED.md`](.agents/skills/VENDORED.md) — منابع، commitها و مجوز مهارتهای vendored شده

حرکت سایت عمدتاً CSS بومی است (`animation-timeline`, `@starting-style`, View Transitions)؛ GSAP فقط در چانک lazy صفحهٔ `#/intro` و `@formkit/auto-animate` فقط در دفتر گامهای مسیرهای lazy درس/مرحله/کارگاه بهکار رفتهاند.

## وضعیت و مشارکت

پروژه **باز** است: باگ‌ها و قابلیت‌های جدید از مسیر issue و pull request قابل پیگیری‌اند. آزمون‌های خودکار به‌معنی تأیید کامل روی همهٔ دستگاه‌ها نیستند. بازبینی مستقل محتوای درسی/فارسی [#11](https://github.com/mmalborzi1384/equation-quest/issues/11) و بررسی وابستگی‌ها و دسترس‌پذیری دستگاه‌های دیگر [#12](https://github.com/mmalborzi1384/equation-quest/issues/12) هنوز بازند. اطلاعات پیشرفت فقط در مرورگر همان دستگاه نگهداری می‌شود و با پاک‌کردن داده‌های آن از دست می‌رود. توضیح معماری، آزمون‌ها و انتشار در پوشهٔ [`docs/`](docs/) ثبت شده است.

مجوز پروژه: [MIT](LICENSE).
