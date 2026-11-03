import { useRef, useState, type PointerEvent, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './IntroCarousel.module.css';

type Stop = {
  number: string;
  place: string;
  title: string;
  summary: string;
  detail: string;
  route: string;
  action: string;
  symbol: string;
};

const stops: Stop[] = [
  {
    number: '۰۱',
    place: 'جزیرهٔ تعادل',
    title: 'اول، برابری را ببین',
    summary: 'هر تغییری که در یک سو انجام می‌دهی، سوی دیگر را هم درگیر می‌کند.',
    detail: 'با ترازو و تمرین‌های دوطرفه یاد می‌گیری چرا یک گام، معادله را برابر نگه می‌دارد.',
    route: '/learning/balance',
    action: 'تمرین برابری',
    symbol: '=',
  },
  {
    number: '۰۲',
    place: 'جنگل مجهول',
    title: 'بعد، مجهول را بشناس',
    summary: 'به‌جای حدس زدن عدد، جای x را در جملهٔ معادله پیدا کن.',
    detail: 'معنای متغیر، ضریب و مقدار ثابت را در مثال‌های کوچک و قابل‌بررسی جدا می‌کنی.',
    route: '/learning/unknown',
    action: 'شناخت مجهول',
    symbol: 'x',
  },
  {
    number: '۰۳',
    place: 'غار وارون',
    title: 'گره را از هر دو سو باز کن',
    summary: 'جمع و تفریق یا ضرب و تقسیم را با عمل وارون دنبال کن.',
    detail: 'در هر گام همان عمل را روی دو سوی برابری اجرا می‌کنی؛ بدون میان‌بُرِ جواب‌گویی.',
    route: '/learning/inverse-operations',
    action: 'آزمودن عمل وارون',
    symbol: '↔',
  },
  {
    number: '۰۴',
    place: 'قلعهٔ معادله',
    title: 'جواب را دقیق بررسی کن',
    summary: 'از عددهای علامت‌دار به کسرها برس و جواب را در معادلهٔ اصلی بگذار.',
    detail: 'تمرین کسری از سهم‌های برابر شروع می‌شود و با جواب دقیق و جای‌گذاری پایان می‌گیرد.',
    route: '/learning/fractions',
    action: 'دیدن درس کسرها',
    symbol: '½',
  },
];

export function IntroCarousel() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const start = useRef<number | null>(null);
  const swiped = useRef(false);
  const detailButton = useRef<HTMLButtonElement>(null);

  const select = (step: number) => {
    setExpanded(false);
    setIndex((current) => (current + step + stops.length) % stops.length);
  };
  const choose = (i: number, focusCard = false) => {
    setExpanded(false);
    setIndex(i);
    if (focusCard) window.setTimeout(() => detailButton.current?.focus(), 0);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current !== null && Math.abs(event.clientX - start.current) > 45) {
      swiped.current = true;
      window.setTimeout(() => (swiped.current = false), 0);
      // RTL: a leftward swipe advances to the card appearing on the left.
      select(event.clientX < start.current ? 1 : -1);
    }
    start.current = null;
  };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!swiped.current) return;
    event.preventDefault();
    event.stopPropagation();
    swiped.current = false;
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="گردونه"
      aria-label="چهار ایستگاه یادگیری"
    >
      <div className={styles.toolbar}>
        <p aria-live="polite">
          {stops[index].place}{' '}
          <span dir="ltr">
            {index + 1} / {stops.length}
          </span>
        </p>
        <div className={styles.arrows}>
          <button type="button" onClick={() => select(-1)} aria-label="ایستگاه قبلی">
            →
          </button>
          <button type="button" onClick={() => select(1)} aria-label="ایستگاه بعدی">
            ←
          </button>
        </div>
      </div>
      <div
        className={styles.stage}
        onPointerDown={(event) => {
          start.current = event.clientX;
          swiped.current = false;
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null;
        }}
        onClickCapture={onClickCapture}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            select(1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            select(-1);
          }
          if (event.key === 'Escape' && expanded) {
            setExpanded(false);
            detailButton.current?.focus();
          }
        }}
        tabIndex={0}
        aria-label="برای جابه‌جایی از کلیدهای جهت‌نما استفاده کنید"
      >
        {stops.map((stop, i) => {
          const offset = (i - index + stops.length) % stops.length;
          const position =
            offset === 0
              ? 'current'
              : offset === 1
                ? 'next'
                : offset === stops.length - 1
                  ? 'previous'
                  : 'hidden';
          const current = position === 'current';
          return (
            <article
              key={stop.place}
              className={`${styles.card} ${styles[position]} ${current && expanded ? styles.expanded : ''}`}
              aria-hidden={position === 'hidden'}
              aria-label={`${stop.place}: ${stop.title}`}
            >
              <div className={styles.lens} aria-hidden="true">
                <span>{stop.symbol}</span>
              </div>
              <div className={styles.cardTop}>
                <span>
                  {stop.number} / {stop.place}
                </span>
                <span className={styles.mark} aria-hidden="true">
                  E Q
                </span>
              </div>
              <div className={styles.cardCopy}>
                <h3>{stop.title}</h3>
                <p>{stop.summary}</p>
                {current ? (
                  <div className={styles.cardActions}>
                    <button
                      ref={detailButton}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`intro-detail-${i}`}
                      onClick={() => setExpanded((value) => !value)}
                    >
                      {expanded ? 'بستن جزئیات' : 'بیشتر بدان'}
                    </button>
                    <Link to={stop.route}>
                      {stop.action} <span aria-hidden="true">←</span>
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.sideSelect}
                    onClick={() => choose(i, true)}
                    disabled={position === 'hidden'}
                    tabIndex={position === 'hidden' ? -1 : 0}
                    aria-label={`نمایش ${stop.place}`}
                  >
                    نمایش این ایستگاه
                  </button>
                )}
                {current && (
                  <p id={`intro-detail-${i}`} className={styles.detail} hidden={!expanded}>
                    {stop.detail}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.dots} aria-label="انتخاب ایستگاه">
        {stops.map((stop, i) => (
          <button
            key={stop.place}
            type="button"
            onClick={() => choose(i)}
            aria-label={`ایستگاه ${stop.place}`}
            aria-current={index === i ? 'true' : undefined}
          />
        ))}
      </div>
      <p className={styles.hint}>با لمس و کشیدن کارت‌ها، دکمه‌ها یا کلیدهای جهت‌نما حرکت کن.</p>
    </div>
  );
}
