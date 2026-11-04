# مهارتهای vendored شده در این ریپو

این پوشه **فقط سند/دانش** برای عاملهای کدنویسی است. هیچ فایل اینجا وارد باندل، `src/`، `package.json` یا اجرای خودکار نمیشود و هیچ هوک یا وابستگی تازهای نصب نکرده است. مهارتها هنگام کار طراحی/انیمیشن خوانده میشوند، نه هنگام اجرای سایت.

## ۱. مهارتهای ضداسلوپ (از قبل موجود)

`antislop/`, `antislop-ui/`, `antislop-human/`, `antislop-copywriting/`, `antislop-code/`, `antislop-layoutmobile/`. مسئولیت: فیلتر کردن خروجی جنریک، کنتراست، RTL/موبایل و لحن. مجوزهایشان در همان پوشهها (`LICENSE-web-quality-skills`) ثبت شده است.

## ۲. `gsap-*` (رسمی GreenSock) — اضافه شده ۱۲ آبان ۱۴۰۵

- **منبع:** `https://github.com/greensock/gsap-skills`
- **نسخهٔ گرفتهشده:** commit `aed9cfd3277740755f6bfc1155c7aa645403b760` (main، ۲۱ آوریل ۲۰۲۶)
- **مجوز:** MIT، متن کامل در `LICENSE-gsap-skills` (Copyright 2026 GreenSock)
- **فایلها:** هشت پوشهٔ `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks`، بهعلاوهٔ `gsap-skills-index.txt` (همان `skills/llms.txt` بالادست، تغییر نام داده شده تا با `llms.txt` ریشه اشتباه نشود).
- **چرا:** `gsap@3.15.0` از قبل وابستگی پروژه است. این مهارتها الگوی درست `useGSAP`، پاکسازی `gsap.context()`، پرفورمنس (transform بهجای layout) و پلاگین Flip (برای لجر معادله) را از منبع رسمی میدهند و جلوی کد GSAP حدسیشده را میگیرند.
- **محدودهٔ استفادهٔ محلی:** در این ریپو **CSS بومی اولویت دارد** (به `docs/MOTION.md` نگاه کنید). توصیهٔ درون این مهارتها مبنی بر «همیشه GSAP پیشنهاد بده» در اینجا **policy نیست**؛ GSAP فقط برای یک تایم لاین امضادار و بهصورت lazy در مسیر `#/intro` باقی مانده است.

## ۳. `ui-animation` (Matthew Blode) — اضافه شده ۱۲ آبان ۱۴۰۵

- **منبع:** `https://github.com/mblode/agent-skills` → `skills/ui-animation/`
- **نسخهٔ گرفتهشده:** commit `391508702523088f564fecfdd95ce76304efb117` (main)
- **مجوز:** MIT، متن کامل در `LICENSE-ui-animation` (Copyright 2026 Matthew Blode)
- **فایلها:** `SKILL.md` بههمراه `references/` (تصمیمگیری، فنرها، کرئوگرافی، اسکرول، پرفورمنس، `@starting-style`, فرمت بازبینی و غیره)، `scripts/` و `evals/` بالادست، بدون هیچ حذف یا ویرایشی.
- **وابستگیهای اختیاری:** اسکریپتهای پایتونِ `scripts/` فقط برای «بازمهندسی انیمیشن از فیلم» به `ffmpeg` و `opencv-python/numpy/scipy` نیاز دارند و **هرگز بهطور خودکار اجرا نمیشوند**. هیچ بستهٔ npm یا پایتونی به پروژه اضافه نکردهاند.
- **چرا:** قواعدش (فقط `transform`/`opacity`، ۲۰۰ تا ۳۰۰ms برای UI روتین، `prefers-reduced-motion`، پرهیز از `transition: all`، پرهیز از افشای اسکرول روی محتوای بالای صفحه، و «در حرکت کم، بازخورد رنگی/شفافیت را نگه دار») دقیقاً با اصلاح D33 و خط قرمزهای `tests/e2e/polish.spec.ts` همخوان است.
- **سازگاری محلی:** جهت حرکت در این ریپو **RTL** است؛ قاعدهٔ «جلو = چپ به راست» در مهارت، اینجا به «جلو = راست به چپ» ترجمه میشود. افشای تایپی فارسی همچنان `clip-path: inset(0 0 0 100%)` باقی میماند (گسترش از راست)، و grapheme/ZWNJ دستنخورده است.

## ۴. خطمشی محلی (بالاتر از هر مهارت بالادستی)

1. متن معنایی فارسی و ریاضی LTR **قبل از** هر افشا کامل و قابل فوکوس باشد؛ بدون JS، بدون `IntersectionObserver` و بدون پشتیبانی `animation-timeline` سایت کامل است.
2. کاهش حرکت دوتایی: هم `prefers-reduced-motion` سیستمعامل، هم تنظیم ذخیرهشدهٔ «حرکت کمتر» (`data-motion='reduce'`). در حالت بیکنار، **تغییر وضعیت** با رنگ و متن دیده شود.
3. روی کنترلها `backdrop-filter` ممنوع؛ کانتینر حاوی دکمه هنگام اسکرول جابهجا نمیشود؛ پالس/حلقهٔ دائمی ممنوع (D33 و `polish.spec.ts`).
4. گوشهٔ ۹px، هدف لمسی ۴۴px، فوکوس ۳px، بودجهٔ تصویر ۴۵/۲۵kB و چانک صحنه ۲۶۰kB gzip حفظ شوند.
5. فقط `transform` و `opacity` روی compositor؛ `will-change` دائمی، `transition: all` و بلور سنگین ممنوع.
6. مهارتهای شخص ثالث **کد غیرقابلاعتماد** محسوب میشوند: پیش از استفاده، `SKILL.md` خوانده شود. ابزارهایی که تأیید/سندباکس عامل را دور میزنند (مثل حالت `live` برخی بستهها) در این ریپو مجاز نیستند.

فهرست کامل منابع پژوهش، مقایسهٔ کتابخانهها و دلیل انتخابها: `docs/DESIGN_RESEARCH_2026-11-03.md`. قرارداد حرکت اجرایی: `docs/MOTION.md`.

## ۵. یادداشت سازگاری (۱۴ آبان ۱۴۰۵)

`gsap-plugins/SKILL.md` (محتوای شخص ثالث، دستنخورده) itself warns **"Avoid `text-wrap: balance`; it can interfere with splitting"**. This independently matches the crash isolated in this repo's Chromium 153 build on long RTL headings. All live CSS and `design-proposal.html` therefore use `text-wrap: pretty`, guarded by `src/test/motion-safety.test.ts`. That vendored tip is documentation only — it is not applied as code and no third-party file was edited.
