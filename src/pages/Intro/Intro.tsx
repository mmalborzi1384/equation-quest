import { Link } from 'react-router-dom';
import desktopScene from '../../assets/game-scene-desktop.webp';
import mobileScene from '../../assets/game-scene-mobile.webp';
import { IntroCarousel } from './IntroCarousel';
import styles from './Intro.module.css';
import { useIntroMotion } from './useIntroMotion';

export default function Intro() {
  const root = useIntroMotion();
  return (
    <div ref={root} className={styles.page}>
      <section className={styles.hero} aria-labelledby="intro-hero-title">
        <div className={styles.scene} aria-hidden="true">
          <picture>
            <source media="(max-width: 800px)" srcSet={mobileScene} type="image/webp" />
            <img
              src={desktopScene}
              alt=""
              width="929"
              height="634"
              decoding="async"
              data-intro-scene
            />
          </picture>
        </div>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow} data-intro-line>
            آشنایی با ماجراجویی معادله‌ها / راهنمای شروع
          </span>
          <h1 id="intro-hero-title" data-intro-line>
            هر معادله،
            <br />
            <em>یک راهِ تازه.</em>
          </h1>
          <p data-intro-line>
            اینجا جواب را حدس نمی‌زنی. با دیدن تعادل، انتخاب عمل درست و بررسیِ جواب در معادلهٔ اصلی،
            راه‌حل را خودت می‌سازی.
          </p>
          <div className={styles.actions}>
            <Link className={styles.mainAction} to="/learning">
              شروع یادگیری <span aria-hidden="true">←</span>
            </Link>
            <Link className={styles.backAction} to="/">
              بازگشت به صفحهٔ اصلی
            </Link>
          </div>
        </div>
        <div className={styles.heroAside} aria-hidden="true" data-intro-line>
          <span>01 — 08</span>
          <span>
            از برابری
            <br />
            تا بررسیِ جواب
          </span>
        </div>
      </section>

      <section className={styles.premise} aria-labelledby="intro-premise-title" data-story>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>این سفر چطور کار می‌کند؟</span>
          <h2 id="intro-premise-title">از یک پرسش ساده شروع کن.</h2>
        </div>
        <div className={styles.premiseContent}>
          <p>
            اول می‌بینی چرا دو طرف یک معادله برابرند. بعد مجهول را می‌شناسی، با عمل وارون گره را باز
            می‌کنی و در پایان جواب را به جای اولش برمی‌گردانی تا مطمئن شوی درست است.
          </p>
          <div
            className={styles.equation}
            dir="ltr"
            aria-label="دو ایکس به‌علاوهٔ چهار برابر دوازده؛ ایکس برابر چهار است"
          >
            <span>2x + 4 = 12</span>
            <span aria-hidden="true">↓</span>
            <strong>x = 4</strong>
          </div>
        </div>
      </section>

      <section className={styles.stations} aria-labelledby="intro-stations-title" data-story>
        <div className={styles.stationsIntro}>
          <span className={styles.eyebrow}>چهار ایستگاه / یک مسیر یادگیری</span>
          <h2 id="intro-stations-title">مسیر را ورق بزن.</h2>
          <p>
            هر کارت، یک قدم واقعی از آموزش را نشان می‌دهد. ایستگاهی را باز کن و مستقیم به همان درس
            برو.
          </p>
        </div>
        <IntroCarousel />
      </section>

      <section className={styles.closing} aria-labelledby="intro-closing-title" data-story>
        <div>
          <span className={styles.eyebrow}>آمادهٔ شروعی؟</span>
          <h2 id="intro-closing-title">جوابِ درست، یک دلیل هم دارد.</h2>
          <p>
            درس‌ها و هشت مرحلهٔ بازی، از عددهای ساده تا کسرهای دقیق پیش می‌روند. پیشرفت فقط در
            مرورگر همین دستگاه ذخیره می‌شود.
          </p>
        </div>
        <div className={styles.closingActions}>
          <Link to="/world">دیدن دنیای بازی ←</Link>
          <Link to="/">رفتن به صفحهٔ اصلی</Link>
        </div>
      </section>
    </div>
  );
}
