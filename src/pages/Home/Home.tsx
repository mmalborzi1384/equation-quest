import desktopScene from '../../assets/game-scene-desktop.webp';
import mobileScene from '../../assets/game-scene-mobile.webp';
import { Link } from 'react-router-dom';
import { GlassCarousel } from '../../components/carousel/GlassCarousel';
import { islands } from '../../data/levels';
import styles from './Home.module.css';
import { useHomeMotion } from './hooks/useHomeMotion';

export default function Home() {
  const root = useHomeMotion();
  return (
    <div ref={root} className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title" data-hero>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>یک ماجراجویی برای فهمیدن، نه حدس زدن</span>
          <h1 id="hero-title">
            راز <em>سرزمین</em>
            <br />
            مجهول‌ها
          </h1>
          <p>
            در سرزمینی که توازن از دست رفته، هر برابری یک پل است. برای بازگرداندن مسیرها، باید بفهمی
            چرا دو سوی معادله با هم برابرند.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primary} to="/learning">
              آغاز مسیر یادگیری <span aria-hidden="true">←</span>
            </Link>
            <Link className={styles.secondary} to="/world">
              دیدن نقشهٔ جهان
            </Link>
          </div>
          <div className={styles.heroNote}>
            <span>پایهٔ هفتم</span>
            <span>بدون نیاز به حساب کاربری</span>
            <span>نقشهٔ آموزش مرحله‌به‌مرحله</span>
          </div>
        </div>
        <div
          className={styles.heroScene}
          data-scene
          role="img"
          aria-label="تصویر واقعیِ صحنهٔ چهار جزیره از بازی ماجراجویی معادله‌ها"
        >
          <picture>
            <source media="(max-width: 900px)" srcSet={mobileScene} type="image/webp" />
            <img
              src={desktopScene}
              width="929"
              height="634"
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <span className={styles.sceneLabel}>
            سرزمین جبر
            <br />
            <small>نقشهٔ سفر</small>
          </span>
        </div>
        <span className={styles.heroIndex}>E Q / ۰۱</span>
      </section>

      <section className={styles.manifest} data-narrative aria-labelledby="intro-title">
        <div>
          <span className={styles.sectionLabel}>01 / دربارهٔ سفر</span>
          <h2 data-reveal id="intro-title">
            معادله یک راز نیست؛
            <br />
            یک <em>تعادل</em> است.
          </h2>
        </div>
        <div>
          <p>
            وقتی از یک طرف چیزی کم می‌کنی، طرف دیگر هم باید همان تغییر را تجربه کند. در تمرین تعادل،
            با دیدن و آزمودن می‌فهمی هر گام چرا درست است.
          </p>
          <Link to="/learning/balance">آشنایی با برابری ←</Link>
        </div>
      </section>

      <section className={styles.goals} data-narrative aria-labelledby="goals-title">
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>02 / هدف‌های یادگیری</span>
          <h2 data-reveal id="goals-title">
            از تساوی تا جواب دقیق
          </h2>
        </div>
        <div className={styles.goalRows}>
          <div>
            <b>الف</b>
            <h3>برابری را ببین</h3>
            <p>بفهم چرا انجام عمل یکسان روی دو سوی معادله، تعادل را حفظ می‌کند.</p>
          </div>
          <div>
            <b>ب</b>
            <h3>مجهول را پیدا کن</h3>
            <p>به‌جای حدس‌زدن x، از نشانه‌ها، ضریب‌ها و عمل‌های وارون کمک بگیر.</p>
          </div>
          <div>
            <b>پ</b>
            <h3>جوابت را بررسی کن</h3>
            <p>از عددهای صحیح و علامت‌دار تا کسرهای دقیق، پاسخ را در معادلهٔ اصلی بیازما.</p>
          </div>
        </div>
      </section>

      <section className={styles.journey} data-narrative aria-labelledby="journey-title">
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>03 / مسیر یادگیری</span>
          <h2 data-reveal id="journey-title">
            چهار ایستگاه؛ یک داستان
          </h2>
          <p>مسیر پیشنهادی از برابری شروع می‌شود و به حل و بررسی معادله می‌رسد.</p>
        </div>
        <div className={styles.journeyList}>
          {islands.map((island, i) => (
            <Link to="/world" key={island.name}>
              <span className="math">0{i + 1}</span>
              <div>
                <strong>{island.name}</strong>
                <small>{island.detail}</small>
              </div>
              <span aria-hidden="true">←</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.worldPreview} data-narrative aria-labelledby="world-title">
        <span className={styles.sectionLabel}>04 / نگاهی به جهان</span>
        <h2 data-reveal id="world-title">
          پل‌ها منتظر یک دلیل‌اند.
        </h2>
        <p>
          از جزیرهٔ تعادل تا قلعهٔ معادله، هر منطقه پرسشی تازه دارد. در نقشه می‌توانی منطقه‌ها را
          ببینی و با حل مرحله‌ها پل‌ها را باز کنی.
        </p>
        <Link to="/world">دیدن چهار منطقه ←</Link>
      </section>

      <section className={styles.interactive} data-narrative aria-labelledby="interactive-title">
        <div>
          <span className={styles.sectionLabel}>05 / شیوهٔ یاد گرفتن</span>
          <h2 data-reveal id="interactive-title">
            جواب تنها کافی نیست.
          </h2>
        </div>
        <p>
          ترازو و دروازه‌های معادله به گام‌های تو واکنش نشان می‌دهند. هر جواب را در معادلهٔ اصلی
          بررسی کن؛ اگر اشتباه کردی، با راهنمای مرحله دوباره تلاش کن.
        </p>
      </section>

      <section className={styles.how} data-narrative aria-labelledby="how-title">
        <span className={styles.sectionLabel}>06 / راهنمای سفر</span>
        <h2 data-reveal id="how-title">
          چطور پیش برویم؟
        </h2>
        <div>
          <p>
            <strong>۱.</strong> از مسیر یادگیری، مفهوم را با مثال بشناس.
          </p>
          <p>
            <strong>۲.</strong> در نقشه، منطقه و هدف هر مرحله را ببین.
          </p>
          <p>
            <strong>۳.</strong> با حل گام‌به‌گام مسیرها را باز کن.
          </p>
        </div>
        <Link to="/learning">دیدن مسیر یادگیری ←</Link>
      </section>

      <section className={styles.modules} data-narrative aria-labelledby="modules-title">
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>07 / راه‌های ورود</span>
          <h2 data-reveal id="modules-title">
            یک موضوع را انتخاب کن
          </h2>
          <p>
            کارت‌ها را با دکمه‌ها، کلیدهای جهت‌نما یا لمس جابه‌جا کن. هر کارت به صفحهٔ موضوع خودش
            می‌رود.
          </p>
        </div>
        <GlassCarousel />
      </section>

      <section className={styles.end} data-narrative aria-labelledby="end-title">
        <span className={styles.sectionLabel}>08 / ادامهٔ مسیر</span>
        <h2 data-reveal id="end-title">
          برابری از همین‌جا آغاز می‌شود.
        </h2>
        <p>
          برای شروع، یکی از موضوع‌های آموزشی را انتخاب کن؛ برای آشنایی با سرزمین، سراغ نقشه برو.
        </p>
        <div>
          <Link to="/learning">رفتن به مسیر یادگیری</Link>
          <Link to="/world">باز کردن نقشهٔ جهان</Link>
        </div>
      </section>
    </div>
  );
}
