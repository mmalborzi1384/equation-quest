# پژوهش اینترنتی: اسکیلها، انیمیشنها، ترنزیشنها و طراحی پایهٔ بازی

> **یادداشت ۱۴ آبان ۱۴۰۵:** همهٔ پنج مورد بستهٔ پیشنهادی این پژوهش در شاخهٔ جاری اجرا شده‌اند (مهارت‌های vendored، `MOTION.md`، مهاجرت به CSS بومی، `@formkit/auto-animate@0.10.0` و طراحی‌خوانی LM-GM). جدول‌ها و مقایسه‌های زیر **پژوهش تاریخی**اند؛ وضعیت جاری و شواهد اجرا در [`MOTION.md`](MOTION.md) و [`FINAL_VERIFICATION_2026-11-04.md`](FINAL_VERIFICATION_2026-11-04.md) است.

**تاریخ:** ۱۲ آبان ۱۴۰۵ (2026-11-03)
**درخواست:** پیدا کردن «چند اسکیل خفن و جذاب» برای بازطراحی گرافیکی و پایهای بازی، بهویژه انیمیشنها و ترنزیشنها در کل سایت.
**ماهیت:** پژوهش و فهرست گزینششده. **هیچ بستهای نصب یا vendored نشد، هیچ وابستگی، کد، تنظیم یا تستی تغییر نکرد.** مستندات وضعیت/تصمیمات/حافظه هم دستنخوردهاند.

### تفسیر «اسکیل»
کلمه در این ریپو دو معنی دارد و من هر دو را پوشش دادم:
1. **بستههای `SKILL.md` (Agent Skills)** که مثل شش مهارت vendored فعلی در `.agents/skills/antislop*` قابل کپی شدناند. فرمت استانداردشان را Anthropic معرفی کرده و اکنون Claude Code، Codex، Cursor، Gemini CLI و Copilot پشتیبانی میکنند؛ بارگذاری تدریجی دارند (حدود ۱۰۰ توکن متادیتا در شروع، متن کامل هنگام نیاز) [4](https://ruoqijin.com/blog/frontend-design-skills-ai-agents).
2. **مهارت/ابزار/چارچوب عملی**: APIهای بومی CSS، کتابخونههای حرکت، سیستم توکنهای Motion، و مدلهای طراحی بازی آموزشی.

### صداقت منبع
اولویت با منابع رسمی (GreenSock، Anthropic، Material 3، Motion، مقالات دانشگاهی) بوده؛ فهرستها و مقایسههای جامعهساخته صرفاً برای کشف گزینهها استفاده شدهاند و ستاره/عدد نصبشان را بهعنوان اثبات کیفیت نقل نکردهام. نسخههای بستهها را مستقیماً از `registry.npmjs.org` در همین محیط پرسیدم: `gsap 3.15.0` (همین نسخه در `package.json` است)، `motion 14.9.0`، `lenis 1.3.27`، `@react-spring/web 10.1.2`، `@formkit/auto-animate 0.10.0`، `@gsap/react 2.1.2`، `three 0.187.0`، `@react-three/fiber 9.8.2`. پرسش `motion-one` نسخهای برنگرداند؛ مطابق مقایسهها، Motion One اکنون بخشی از بستهٔ Motion است، نه یک وابستگی جدا [4](https://annnimate.com/compare/react-animation-libraries).

---

## ۱. خلاصه: پنج انتخاب برتر برای همین پروژه

| # | انتخاب | چرا برای «ماجراجویی معادلهها» | هزینه/ریسک |
|---|---|---|---|
| ۱ | **CSS بومی**: `animation-timeline: view()/scroll()`, View Transitions, `@starting-style`, `linear()` | جایگزین مستقیم `useHomeMotion` (GSAP فقط برای ۷٪ پارالاکس) و `useStoryReveal` میشود، صفر کیلوبایت JS، روی compositor اجرا میشود | پشتیبانی ۲۰۲۶ بالاست؛ باید `@supports` و سقوط ایستا نگه داشته شود |
| ۲ | **`greensock/gsap-skills`** (رسمی، ۸ مهارت) | GSAP از قبل نصب است؛ مهارت رسمی جلوی کدنویسیاشتباه `useGSAP`/پاکسازی/پرفورمنس را میگیرد | صفر وابستگی تازه؛ فقط فایل متن اضافه میشود |
| ۳ | **Material 3 Motion Tokens + «فهرست هرگز متحرک نکن»** | دقیقاً همان `MOTION.md`ای است که در M-09 پیشنهاد دادم؛ مقیاس مدت و easings نامدار میدهد | سندی کوتاه، بدون کد |
| ۴ | **`mblode/agent-skills → ui-animation`** | قانون «فقط transform/opacity، ۲۰۰ تا ۳۰۰ms، CSS-first، prefers-reduced-motion»، همسو با خط قرمزهای D33 | سبک، ولی جامعهساخته؛ پیش از vendored کردن خوانده شود |
| ۵ | **LM-GM + SDT/ZPD/Flow** بهعنوان «طراحیخوانی بازی» | پشتوانهٔ علمی همان نقد D-02/D-03: یادگیری باید از خود مکانیک بیاید، نه از متن کنار فرم | فقط یک صفحه سند؛ محتوای ریاضی را عوض نمیکند |

---

## ۲. دستهٔ A: بستههای `SKILL.md` ارزش بررسی

### A-1. رسمی و کمخطر

| بسته | مهارتها | ارتباط با این ریپو | نصب (در صورت مجوز مالک) |
|---|---|---|---|
| **[greensock/gsap-skills](https://github.com/greensock/gsap-skills)** | هشت مهارت: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins` (Flip/Draggable/SplitText/ScrollSmoother), `gsap-utils`, `gsap-react` (useGSAP، scope، cleanup، SSR), `gsap-performance`, `gsap-frameworks` | دقیقاً همان کتابخانهای که `Home` و `Game` دارند. README رسمی تأکید میکند GSAP پس از خرید توسط Webflow **۱۰۰٪ رایگان** است، شامل همهٔ پلاگینها، و الگوی `useGSAP` + `gsap.context()` را برای پاکسازی React تجویز میکند. مهارت `gsap-performance` مستقیماً به M-04 (هزینهٔ چانک Home) و M-07 مربوط است | `npx skills add https://github.com/greensock/gsap-skills` یا کپی پوشهٔ `skills/` به `.agents/skills/` [1](https://heyclau.de/entry/skills/gsap-skills) |
| **[anthropics/skills](https://github.com/anthropics/skills)** → `frontend-design` | مبنای «UI متمایز بهجای خروجی جنریک» | نزدیکترین خویشاوند `.agents/skills/antislop` فعلی؛ بهعنوان baseline پیشنهاد میشود [4](https://ruoqijin.com/blog/frontend-design-skills-ai-agents). همان مخزن `theme-factory`, `canvas-design`, `webapp-testing` هم دارد [2](https://github.com/ScalingOnline/claude-skills) | `npx skills add anthropics/skills --skill frontend-design` |
| **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md)** → `web-design-guidelines` | بازبینی UI بر اساس چکلیست رابط/دسترسپذیری/UX؛ هنگام اجرا تازهترین رهنمودها را وامیگیرد، نه نسخهٔ قفلشده | مکمل خوبی برای دروازهٔ ضداسلوپ فعلی، چون خروجیاش یافتههای `file:line` میدهد [3](https://skillselion.com/guides/web-design-guidelines-skill-claude-code) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |

### A-2. انیمیشنمحور (همان چیزی که خواستی)

| بسته | مهارت | نکتهٔ کلیدی | منبع |
|---|---|---|---|
| [mblode/agent-skills](https://github.com/mblode/agent-skills) | `ui-animation` | فقط `transform`/`opacity`، ۲۰۰ تا ۳۰۰ms، `prefers-reduced-motion`، اصل «CSS اول» | [4](https://github.com/finfin/awesome-frontend-skills) |
| [patricio0312rev/skills](https://github.com/patricio0312rev/skills) | `framer-motion-animator` | variants، stagger، page transitions، scroll، gestures، a11y | [4](https://github.com/finfin/awesome-frontend-skills) |
| [cloudai-x/threejs-skills](https://github.com/cloudai-x/threejs-skills) | `threejs-animation` | `AnimationClip`, `AnimationMixer`, morph target، blending. **برای این ریپو محدود است**: صحنهٔ ما مشهای رویههای ساده است، نه اسکلت/رایگ | [4](https://github.com/finfin/awesome-frontend-skills) |
| [wilwaldon/Claude-Code-Frontend-Design-Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit) | فهرستی از ۲۳ مهارت انیمیشن (GSAP، Framer، React Spring، Lottie، anime.js، Locomotive، Barba) و `Bencium UX Designer` با `MOTION-SPEC.md` | بیشتر یک **کاتالوگ کشف گزینه** است تا یک بستهٔ واحد؛ برای پیدا کردن نام ابزارها عالی است | [1](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit) |
| [Sagargupta16/awesome-skills](https://github.com/Sagargupta16/awesome-skills) | فهرست CI-checked شامل «GSAP Skills», «Three.js Skills», «taste-skill», «Impeccable», «svg-forge» | `svg-forge` برای ساخت نشان ترازوی پیشنهادی G-05 جالب است | [5](https://github.com/Sagargupta16/awesome-skills) |

### A-3. طراحی و سلیقه (با احتیاط)

- **[pbakaus/impeccable](https://github.com/pbakaus/impeccable)**: جذابترین بستهٔ این فهرست. ۲۴ فرمان دارد: `animate` (افزودن ترنزیشن و بازخورد تعامل)، `typeset`، `layout`، `distill`، `bolder/quieter`، `critique`، `audit` (یافتههای P0 تا P3)، `polish`، `adapt`، `optimize`، `onboard`، و `live` که روی سرور درحال اجرا، یک عنصر را انتخاب و واریانتهای زنده را جایگزین میکند. همچنین ۶۲ قانون قطعی ضداسلوپ را با `npx impeccable detect src/` بدون نیاز به عامل اجرا میکند. این دقیقاً همان کاری است که `docs/DESIGN_REVIEW_2026-11-03.md` دستی انجام داد. **اما دو هشدار امنیتی مهم**: جامعهساخته است و باید `SKILL.md`اش پیش از نصب خوانده شود [4](https://ruoqijin.com/blog/frontend-design-skills-ai-agents)، و حالت `live` طبق READMEاش ممکن است عامل را با `--dangerously-bypass-approvals-and-sandbox` اجرا کند؛ با پروتکل فازمحور این ریپو سازگار نیست. پیشنهاد من: فقط CLIاش بهعنوان ابزار بازبینی، آن هم خارج از اپ و با مجوز صریح.
- **[bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)**: ۶۷ جفت `SKILL.md` + `DESIGN.md` با سبکهای ازپیشساخته (گلسمورفیسم، بروتالیسم، کِلِیمورفیسم، ریسو...). **برای دیدن خوب است، برای پذیرفتن نه**: `docs/DESIGN.md` این پروژه صریحاً از «شیشه و درخشش بیهدف» پرهیز میکند و D33 بلور سراسری را حذف کرده است.
- **[nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** (۵۰+ سبک، ۱۶۱ ترکیب رنگ، ۵۷ جفت قلم، ۹۹ اصل UX) و [taste-skill](https://agentskillshub.top/best/ai-design/): پایگاه دادهٔ سبک عمومیاند؛ خطرشان این است که جهت خاص «ترازو/دو کفه» را به یک پالت جنریک تبدیل کنند [3](https://agentskillshub.top/best/ai-design/)، [4](https://github.com/finfin/awesome-frontend-skills).

### A-4. طراحی پایهٔ بازی (برای بخش D گزارش قبل)

| بسته | مهارتها | چرا |
|---|---|---|
| **[fcsouza/agent-skills](https://github.com/fcsouza/agent-skills)** | `game-design-fundamentals` (حلقههای اصلی، MDA، منحنی پیشرفت)، `level-design`، `quest-mission-design`، `ui-ux-game`، `skill-progression-trees`، `game-economy-design` | تمیزترین بسته برای تبدیل «هشت فرم یکسان» به هشت مکانیک متمایز (D-04) و طراحی هاب غیرخطی (I-07) [3](https://github.com/fcsouza/agent-skills) |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/main/.claude/skills/design-review/SKILL.md) | ۴۹ عامل و ۷۲ مهارت شبیه ساختار استودیو؛ `design-review` سند GDD را از نظر «Player Fantasy»، قواعد، حالتهای مرزی و وابستگیها اعتبارسنجی میکند | ایدهٔ «Player Fantasy» برای D-01 عالی است، ولی ۴۹ عامل برای پروژهای با موتور خالص و بدون بکاند زیادهای است [1](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/main/.claude/skills/design-system/SKILL.md)، [2](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/main/.claude/skills/design-review/SKILL.md) |
| [davila7/claude-code-templates → game-design](https://eliteai.tools/agent-skills/game-design) (MIT) | اصول GDD، بالانس، روانشناسی بازیکن، پیشرفت، برگرفته از «۱۰۰ اصل طراحی بازی» | سبک، تکمهارته، مجوز شفاف [4](https://eliteai.tools/agent-skills/game-design) |

> نکتهٔ بومی: `.agents/skills/antislop-human/LICENSE-web-quality-skills` نشان میدهد مهارتهای فعلی ریپو خودشان از خانوادهٔ [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) آمدهاند (Core Web Vitals، WCAG 2.2، ۱۵۰+ قانون) [4](https://github.com/finfin/awesome-frontend-skills). یعنی زیرساخت ممیزی از قبل هست؛ **مسئله کمبود مهارت نیست، کمبود «مهارت حرکت معنادار» و «طراحیخوانی بازی» است**. شش مهارت دیگر اضافه نکنیم، دو مهارت هدفمند اضافه کنیم.

---

## ۳. دستهٔ B: انیمیشن و ترنزیشن، از صفر کیلوبایت تا کتابخانه

### B-1. لایهٔ بومی CSS (پیشنهاد اول من)

چند قابلیت که تا همین چند سال پیش نیازمند JS بودند، در ۲۰۲۶ بالغ شدهاند:

| قابلیت | جایگزین چه چیزی در این ریپو میشود | وضعیت پشتیبانی |
|---|---|---|
| `animation-timeline: view()` + `animation-range` | `useStoryReveal` و افشای ۵۷۰msـی فعلی، با اتصال مستقیم به اسکرول و صفر JS | Chrome ۱۱۵، Firefox ۱۳۳، Safari ۱۸.۲؛ تا ۲۰۲۶ پوشش سه موتور اصلی بالای ۹۵٪ [1](https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026)، [5](https://modern-css.com/whats-new-in-css-2026/) |
| `animation-timeline: scroll(root)` | پارالاکس ۷٪ تصویر قهرمان؛ همان کاری که GSAP امروز میکند | همان بالا؛ Safari در ترکیبهای پیچیدهٔ `animation-range` لغزشهای جزئی دارد، پس تست شود [1](https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026) |
| `@view-transition { navigation: auto }` و `document.startViewTransition()` | گذار بین مسیرهای HashRouter و اسکلت «در حال آمادهسازی مسیر…» (M-10) | same-document از Chrome ۱۱۱ / Firefox ۱۳۰ / Safari ۱۸، cross-document بعد از آن؛ ۲۰۲۶ هرسه موتور [1](https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026)، [2](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/) |
| `@starting-style` + `transition-behavior: allow-discrete` | باز/بسته شدن جزئیات کاروسل، منوی موبایل، پنل توقف، بدون `setTimeout`/دو `rAF` | `@starting-style` و `allow-discrete` در ۲۰۲۶ قابل اتکا؛ `interpolate-size`, `calc-size()`, `::details-content` تازهتر و کروممحوراند [1](https://dev.to/raxxostudios/5-css-animations-that-needed-javascript-until-2026-2p4j)، [3](https://devtoolbox.dedyn.io/blog/css-starting-style-guide) |
| `interpolate-size: allow-keywords` | باز شدن «جزئیات» کارت، آکاردئون راهنماها، پنل تأیید، بدون `max-height` تقلبی | کرومپیشرو؛ حتماً سقوط ایستا داشته باشد [5](https://danholloran.me/posts/animate-to-height-auto-with-interpolate-size-and-calc-size) |
| `linear()` easing + [spring-easing](https://github.com/okikio/spring-easing) | فنر واقعی «ترازو برمیگردد به تعادل» (M-02) بدون کتابخانهٔ فیزیک | `CSSSpringEasing` رشتهٔ `linear(...)` و مدت بهینه تولید میکند؛ پشتیبانی `linear()` در Safari ناقص گزارش شده، پس فنر CSS ساده هم کنارش بماند [2](https://github.com/okikio/spring-easing) |

الگوی درست، «پیشرفت تدریجی» است: محتوا پیشفرض کامل و ایستا باشد، افکت فقط داخل `@supports (animation-timeline: view())` اضافه شود، و `@media (prefers-reduced-motion: reduce)` آن را خاموش کند [4](https://spell.sh/blog/css-animation-on-scroll)، [3](https://www.css-animation.com/modern-view-transitions-scroll-apis/). این دقیقاً همان قراردادی است که `useStoryReveal` فعلی با «متن کامل قبل از observer» رعایت میکند؛ یعنی مهاجرت، قواعد دسترسپذیری را نمیشکند.

**یک تمایز مهم برای ترنزیشن مسیرها:** Motion لایوت انیمیشن را با transform روی عناصر واقعی انجام میدهد، قابل قطع شدن است، پوینتر را بلاک نمیکند و چند انیمیشن همزمان را handle میکند؛ View Transitions اسکرینشات حالت قدیم/جدید را کراسفید میکند، قابل قطع نیست و حین گذار تعامل را مسدود میکند [1](https://motion.dev/docs/react-layout-animations). برای `StageRunner` که وسط حل معادله نباید قفل شود، Motion/FLIP مناسبتر است؛ برای رفتن از Home به World، View Transitions کافی و ارزان است.

### B-2. کتابخانهها (وقتی CSS کافی نبود)

| ابزار | نسخهٔ امروز | اندازهٔ تقریبی gzip | برندهٔ کدام کار | نظر من برای این ریپو |
|---|---|---|---|---|
| **GSAP + ScrollTrigger** | ۳٫۱۵٫۰ (نصبشده) | هسته حدود ۲۳kB، بستهٔ کامل در بنچمارکها ۷۸kB [4](https://annnimate.com/compare/react-animation-libraries)، [3](https://blog.logrocket.com/best-react-animation-libraries/) | تایم لاینهای پیچیده، scroll-linked، pinned، SVG، همان کد در چند فریمورک | نگه دار، ولی **از Home خارج کن** (M-04). همهٔ پلاگینها از ۲۰۲۵ رایگاناند [5](https://www.shaheermalik.com/compare/gsap-vs-framer-motion) |
| **Motion** (سابقاً Framer Motion) | ۱۴٫۹٫۰ | حدود ۳۰ تا ۳۲kB [4](https://annnimate.com/compare/react-animation-libraries)، [1](https://snigdhachandrapaik.vercel.app/blogs/animated-website-libraries-nextjs-react) | `AnimatePresence`, `layout`, `layoutId` (مورف کارت به پنل)، `useReducedMotion`, `useInView({once:true})`, `staggerChildren` | بهترین گزینه برای **لجر معادله** (M-01) و ادغام دو کاروسل (M-08)، ولی ۳۲kB در برابر بودجهٔ حساس Home؛ فقط بهصورت lazy در مسیرهای درسی/مرحله |
| **React Spring** | ۱۰٫۱٫۲ | حدود ۱۸kB [4](https://annnimate.com/compare/react-animation-libraries) | فیزیک فنر، drag، و هماهنگی خوب با react-three-fiber | کاندیدای «کج شدن ترازو» و نرم شدن `Walker` (M-02/M-07)؛ سبکتر از Motion |
| **@formkit/auto-animate** | ۰٫۱۰٫۰ | بسیار کوچک | درج/حذف خودکار آیتم لیستها | میانبری ارزان برای «خطوط گام معادله» اگر نخواهیم Motion بیاوریم |
| **Lenis** | ۱٫۳٫۲۷ | حدود ۳kB [1](https://snigdhachandrapaik.vercel.app/blogs/animated-website-libraries-nextjs-react) | اسکرول اینرسی و همگامسازی با GSAP | **پیشنهاد نمیکنم**: D33 دقیقاً بهخاطر پرش اسکرول و بلور کنترلها اصلاح شد؛ hijack کردن اسکرول با آن تعارض دارد |
| **Motion One** | ادغامشده در Motion | حدود ۳kB [4](https://annnimate.com/compare/react-animation-libraries) | کنترل سبک WAAPI | نیازی نیست جدا اضافه شود |

قاعدهٔ تصمیمگیری مشترک همهٔ مقایسهها: «اول CSS بومی؛ اگر مؤلفهٔ React سوار/پیاده میشود Motion؛ اگر کرئوگرافی اسکرول/تایم لاین است GSAP؛ اگر حس فیزیکی است React Spring» [1](https://snigdhachandrapaik.vercel.app/blogs/animated-website-libraries-nextjs-react)، [2](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/)، [4](https://annnimate.com/compare/react-animation-libraries). هیچ سایت برندهای ۲۰۲۶ از یک کتابخانه برای همهچیز استفاده نمیکند [1](https://snigdhachandrapaik.vercel.app/blogs/animated-website-libraries-nextjs-react).

---

## ۴. دستهٔ C: اصول حرکت (آنچه واقعاً «خوشسلیقگی» میسازد)

**توکنهای Material 3** دقیقاً همان چیزیاند که در M-09 کم بود:

- easing استاندارد `cubic-bezier(0.2, 0, 0, 1)`، decelerate `cubic-bezier(0, 0, 0, 1)`، accelerate `cubic-bezier(0.3, 0, 1, 1)`، و expressive/emphasized `cubic-bezier(0.05, 0.7, 0.1, 1)` [1](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)، [3](https://lobehub.com/skills/shelbeely-shelbeely-agent-skills-material-design-3-motion).
- مدتها: short ۵۰/۱۰۰/۱۵۰/۲۰۰ms، medium ۲۵۰/۳۰۰/۳۵۰/۴۰۰ms، long ۴۵۰/۵۰۰/۵۵۰/۶۰۰ms، extra-long ۷۰۰ تا ۱۰۰۰ms. مدت متناسب با اندازهٔ عنصر و پیچیدگی، موبایل ۰٫۸ تا ۰٫۹ برابر سریعتر [1](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)، [3](https://lobehub.com/skills/shelbeely-shelbeely-agent-skills-material-design-3-motion).
- نسخهٔ پیشنهادی من برای ریپو: `--dur-1: 120ms` (hover/focus)، `--dur-2: 240ms` (باز/بسته)، `--dur-3: 480ms` (ورود فصل/ترازو)، و فقط `transform`/`opacity`، همانطور که مهارت `ui-animation` هم میگوید [4](https://github.com/finfin/awesome-frontend-skills).

**«حرکت بهعنوان دارایی برند، نه تزیین»**: یک سیستم حرکت چهار چیز دارد و هیچکدام انیمیشن نیست: مقیاس مدت، چند منحنی نامگذاریشده، **قاعدهٔ کرئوگرافی** (چه چیزی پیشرو است و چه چیزی دنبال)، و **فهرست آنچه هرگز متحرک نمیشود**. بدون مورد آخر، حرکت انباشته میشود و رابط همزمان در چند جهت میرود [2](https://onetouch.hn/news/motion-as-a-brand-asset-not-decoration). این همان `MOTION.md`ای است که پیشنهاد دادم، با یک ستون اضافه: «هدف آموزشی» و «معادل بیکنار».

**دسترسپذیری، ظریفتر از کلید قطع کنونی**: WCAG 2.2.2 (سطح A) برای هر حرکت خودکار بیش از ۵ ثانیه کنترل توقف/پنهانسازی میخواهد؛ 2.3.3 (سطح AAA) میگوید حرکت ناشی از تعامل باید قابل غیرفعالسازی باشد مگر اینکه essential باشد، و `prefers-reduced-motion` مسیر پیادهسازیش است [2](https://onetouch.hn/news/motion-as-a-brand-asset-not-decoration)، [4](https://educationalvoice.co.uk/accessibility-animation/). نکتهٔ مهم: راهنماییها میگویند «کم کن، حذف نکن» و هشدار میدهند که مدیاکوئری، محتوای حلقهای/خودکار را پوشش نمیدهد [5](https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/). ریپوی ما از این جهت **جلوتر** است، چون علاوه بر تنظیم سیستم، یک کلید ذخیرهشدهٔ «حرکت کمتر» در UI دارد؛ فقط باید تضمین شود که در حالت بیکنار، **تغییر وضعیت** (رنگ تأیید نعنایی، متن خطا) همچنان دیده شود.

---

## ۵. دستهٔ D: چارچوبهای طراحی پایهٔ بازی (پشتوانهٔ نقدهای D-01 تا D-07)

| چارچوب | اصل | نتیجه برای «ماجراجویی معادلهها» |
|---|---|---|
| **LM-GM** (Arnab, Lim et al.، ۲۰۱۵، British Journal of Educational Technology) | نقشهبرداری «مکانیکهای یادگیری ↔ مکانیکهای بازی»؛ هشدار صریح که دانش باید از **خود گیمپلی** بیاید نه از دفترچه/متن کنار آن، و هدفش پیدا کردن نقطهای است که آموزش و بازی در هم تنیده میشوند | تایید مستقیم D-02 و D-03: فرم «سه گزینه + ورودی + دکمهٔ بله برابرند» مکانیک یادگیری نیست، یک آزمون است. همچنین ایدهٔ «protégé effect» (یادگیری با توضیح دادن به دیگری) پشتوانهٔ D-09 «دلیل من» است [1](https://radar.gsa.ac.uk/3824/1/mapping-for-serious-games-analysis.pdf)، [4](https://www.semanticscholar.org/paper/Mapping-learning-and-game-mechanics-for-serious-Arnab-Lim/a44d4efd142deff118e4a2c00c6d47174cb6de41) |
| **MDA + Elemental Tetrad** و «قرار دادن خروجیهای یادگیری درون مکانیکها» | اگر پیامدهای یادگیری در مکانیکها تعبیه نشوند، رفتارهای ناخواسته ظهور میکنند و لذت بازی تضمینکنندهٔ اثربخشی آموزشی نیست | تایید D-01: ترمیم پل باید **نتیجهٔ محاسبهٔ برابری** باشد، نه انیمیشنی کنار آن [5](https://www.academia.edu/136870622/Using_Formal_Game_Design_Methods_to_Embed_Learning_Outcomes_into_Game_Mechanics_and_Avoid_Emergent_Behaviour) |
| **حلقهٔ چالش ← پاسخ ← بازخورد**، ZPD ویگوتسکی، Flow، SDT (خودمختاری/شایستگی/ارتباط) (Plass، CREATE Lab) | «نقطهٔ شیرین» جایی است که موفقیت ممکن است ولی با کمی تقلا؛ چالش، کنجکاوی و خیال ذاتاً انگیزهبخشاند، درحالیکه بجها ممکن است انگیزهٔ بیرونی بسازند و یادگیری را به حاشیه ببرند | تایید D-07 (حذف اقتصاد XP/کریستال)، I-07 (هاب غیرخطی با پرش تشخیصی) و D-08 (تراکم تطبیقی مسئلهها) [1](https://files.eric.ed.gov/fulltext/EJ1090277.pdf)، [2](https://www.ijfmr.com/papers/2025/6/59893.pdf) |
| **G.A.M.E. / Applied Game Design Model** | طراحی حامی خودمختاری: انتخابهای معنادار، ZPD، سبکهای مختلف بازی، و افزایش تدریجی دشواری (مثال پرش پرچم ماریو ۱-۱) | پشتوانهٔ «جعبهابزار عملها + undo» در D-03: به بازیکن اجازه بده راه خودش را بسازد و از خطای یکطرفه چیز یاد بگیرد [3](https://www.academia.edu/10178048/G_A_M_E_Games_Autonomy_Motivation_and_Education_How_autonomy_supportive_game_design_may_improve_motivation_to_learn)، [5](https://pure.tue.nl/ws/files/3895781/784813.pdf) |
| **Gameplay Loop Methodology** | حلقهٔ گیمپلی را با دانش موضوعی (didactics) ترکیب میکند تا هدف آموزشی، واسطگی و جذابیت همزمان سنجیده شوند | مناسب برای قالب «طراحیخوانی بازی» تکصفحهای پیش از هر تغییر در `stages.ts` [4](https://www.semanticscholar.org/paper/Mapping-learning-and-game-mechanics-for-serious-Arnab-Lim/a44d4efd142deff118e4a2c00c6d47174cb6de41) |

> توجه: اینها پژوهشاند، نه مجوز تغییر محتوای درسی. بازبینی مستقل برنامهٔ درسی پایهٔ هفتم (issue #11) همچنان باز است؛ هیچکدام از این چارچوبها معادلهای یا توالی `ax+b=c` را عوض نمیکنند.

---

## ۶. نگاشت به پیشنهادهای گزارش قبل

| یافتهٔ قبلی | ابزار/منبع پیشنهادی | نکتهٔ اجرایی |
|---|---|---|
| M-04 حذف GSAP از Home | `animation-timeline: scroll(root)` + `@supports` | صفر JS؛ چانک Home از ۴۹٫۶kB gzip پایینتر میآید [2](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/) |
| M-01 لجر معادله | Motion `AnimatePresence`/`layout` یا `@formkit/auto-animate` | View Transitions وسط حل معادله تعامل را بلاک میکند، پس FLIP/transform بهتر است [1](https://motion.dev/docs/react-layout-animations) |
| M-02 ترازوی زنده | React Spring یا `linear()` + `spring-easing` | فنر، نه `ease-in-out`؛ حالت بیکنار فقط رنگ و متن [2](https://github.com/okikio/spring-easing)، [3](https://lobehub.com/skills/shelbeely-shelbeely-agent-skills-material-design-3-motion) |
| M-05/M-06 کرئوگرافی ورود و فصل | CSS `view()` + Material 3 duration tokens + «قاعدهٔ پیشرو/دنبال» | فقط متن غیرتعاملی جابهجا شود تا اصلاح D33 حفظ بماند [2](https://onetouch.hn/news/motion-as-a-brand-asset-not-decoration) |
| M-08 ادغام کاروسلها | Motion `layoutId` یا CSS `@starting-style` | `layoutId` مورف کارت کناری به کارت مرکزی را تقریباً مجانی میدهد [2](https://dev.to/stacknotice/framer-motion-motion-react-animations-complete-guide-2026-3e7l) |
| M-09 توکنها و `MOTION.md` | Material 3 easing/duration + مهارت `ui-animation` | اضافهکردن «فهرست هرگز متحرک نکن» [1](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) |
| M-10 گذار مسیرها | `document.startViewTransition()` در لایهٔ Router | اسکلت فعلی «در حال آمادهسازی مسیر…» جایگزین شود [1](https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026) |
| G-05 نشان ترازو / G-04 توکنها | `svg-forge` یا `canvas-design` (فقط الهام) | نشان باید از موتیف دو کفه بیاید، نه از کتابخانهٔ سبک [5](https://github.com/Sagargupta16/awesome-skills) |
| D-02/D-03/D-04 طراحی پایه | LM-GM + MDA + SDT/ZPD + `fcsouza/agent-skills` | یک «طراحیخوانی بازی» بنویس، بعد سراغ `stages.ts` برو [1](https://radar.gsa.ac.uk/3824/1/mapping-for-serious-games-analysis.pdf)، [3](https://github.com/fcsouza/agent-skills) |
| دروازهٔ پذیرش | `web-design-guidelines` + `impeccable detect` (فقط CLI) | مکمل شش مهارت antislop فعلی؛ خروجی `file:line` بدهد [3](https://skillselion.com/guides/web-design-guidelines-skill-claude-code) |

---

## ۷. بستهٔ نهایی پیشنهادی من (بدون نصب، منتظر مجوز)

1. **دو مهارت vendored**: `greensock/gsap-skills` (فقط `gsap-core`, `gsap-react`, `gsap-performance`) و `mblode/ui-animation`. دلیل: یکی رسمی و همنام وابستگی نصبشده، دیگری دقیقاً قواعد خط قرمز D33 را کدگذاری میکند. شش مهارت دیگر اضافه نشود.
2. **یک سند `MOTION.md`**: مقیاس مدت Material 3، سه منحنی نامدار، قاعدهٔ کرئوگرافی، جدول «هدف آموزشی / محرک / یکباره / معادل بیکنار»، و فهرست «هرگز متحرک نکن» (کنترلها حین اسکرول، بلور سراسری، پالس دائمی، ترکینگ منفی فارسی،tعداد ساختگی).
3. **مهاجرت تدریجی به CSS بومی**: `useHomeMotion` → `animation-timeline`، `useStoryReveal` → `view()` با `@supports`، گذار مسیرها → View Transitions. GSAP فقط برای یک تایم لاین امضادار بماند، آن هم lazy.
4. **یک کتابخانهٔ کوچک و موضعی**: `@react-spring/web` (یا `@formkit/auto-animate`) فقط در مسیرهای درسی/مرحلهها برای ترازو و لجر؛ به Home اضافه نشود. Motion کامل (۳۲kB) را نگه داریم مگر اینکه `layoutId` واقعاً لازم شود.
5. **یک صفحه «طراحیخوانی بازی»** بر اساس LM-GM + SDT/ZPD، پیش از هر تغییر در `stages.ts`؛ خروجیش جدول «هدف یادگیری ← مکانیک قابل مشاهده ← بازخورد محیطی» برای هشت مرحله باشد.

**چیزهایی که عمداً رد کردم:** Lenis (تعارض با D33)، کتابخانهٔ سبکهای آمادهٔ ۶۷تایی (تعارض با `DESIGN.md`)، بستهٔ ۴۹ عامل استودیو بازی (بیش از اندازهٔ پروژه)، Lottie/Barba/Locomotive (وابستگی تازه بدون نیاز مشخص)، و حالت `live` ایمپکبل (دور زدن تأیید/سندباکس).

---

## ۸. خط قرمزها پیش از هر اقدام

- طبق `AGENTS.md` و `PHASE_EXECUTION_PROTOCOL.md`، نصب/ویرایش نیازمند اعلام صریح مالک است؛ من فقط جستوجو کردم.
- وابستگی تازهای اضافه نشد؛ `package.json` و `package-lock.json` دستنخوردهاند. نسخهها صرفاً از رجیستری خوانده شدند.
- مهارتهای شخص ثالث **کد غیرقابلاعتماد** محسوب میشوند و باید `SKILL.md`شان پیش از نصب خوانده شود [4](https://ruoqijin.com/blog/frontend-design-skills-ai-agents).
- هر افکت تازه باید از همان دروازهها رد شود: ۹px و ۴۴px، نبود `backdrop-filter` روی کنترلها، نبود جابهجایی کانتینر تعاملی، متن کامل فارسی قبل از افشا، grapheme/ZWNJ و KaTeX LTR دستنخورده، کاهشحرکت دوتایی، تصویر ≤ ۴۵/۲۵kB، چانک صحنه ≤ ۲۶۰kB gzip، و ۹۱ تست واحد / ۴۰ تست E2E / `check:phase9`.
- مقایسههای اندازه و پشتیبانی مرورگر از منابع ثانویه نقل شدهاند؛ پیش از ادعای رسمی باید در بیلد و مرورگرهای واقعی این ریپو اندازهگیری شوند (R-36).
