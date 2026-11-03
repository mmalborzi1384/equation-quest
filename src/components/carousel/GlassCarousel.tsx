import { useEffect, useRef, useState, type PointerEvent, type MouseEvent } from 'react';
import { usePreferences } from '../../store/usePreferences';
import { Link } from 'react-router-dom';
import styles from './GlassCarousel.module.css';

type Card = { title: string; label: string; description: string; to: string; number: string };
const cards: Card[] = [
  {
    number: '01',
    title: 'مفهوم برابری',
    label: 'جزیرهٔ تعادل',
    description: 'وقتی یک کفه تغییر می‌کند، دیگری چه می‌خواهد؟',
    to: '/learning/balance',
  },
  {
    number: '02',
    title: 'ردّ مجهول',
    label: 'جنگل مجهول',
    description: 'به‌جای حدس‌زدن، معنای x را پیدا کن.',
    to: '/learning/unknown',
  },
  {
    number: '03',
    title: 'عمل وارون',
    label: 'غار وارون',
    description: 'هر گره را با انجام کاری روی هر دو طرف باز کن.',
    to: '/learning/inverse-operations',
  },
  {
    number: '04',
    title: 'کسرهای دقیق',
    label: 'راه قلعه',
    description: 'سهم‌های برابر و جواب‌های دقیق کسری بخشی از مسیرند.',
    to: '/learning/fractions',
  },
];

export function GlassCarousel() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const swiped = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  const currentLink = useRef<HTMLAnchorElement>(null);
  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const select = (step: number) => setIndex((i) => (i + step + cards.length) % cards.length);
  useEffect(() => {
    if (reduceMotion) {
      stage.current?.style.removeProperty('--lens-x');
      stage.current?.style.removeProperty('--lens-y');
    }
  }, [reduceMotion]);
  const moveLens = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(
      -13,
      Math.min(13, ((event.clientX - bounds.left) / bounds.width - 0.5) * 26),
    );
    const y = Math.max(
      -13,
      Math.min(13, ((event.clientY - bounds.top) / bounds.height - 0.5) * 26),
    );
    event.currentTarget.style.setProperty('--lens-x', `${x}px`);
    event.currentTarget.style.setProperty('--lens-y', `${y}px`);
  };
  const focusCard = (i: number) => {
    setIndex(i);
    window.setTimeout(() => currentLink.current?.focus(), 0);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current !== null && Math.abs(event.clientX - start.current) > 45) {
      swiped.current = true;
      window.setTimeout(() => {
        swiped.current = false;
      }, 0);
      select(event.clientX < start.current ? 1 : -1);
    }
    start.current = null;
  };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (swiped.current) {
      event.preventDefault();
      event.stopPropagation();
      swiped.current = false;
    }
  };
  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="گردونه"
      aria-label="مسیرهای یادگیری"
    >
      <svg className={styles.filter} aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <filter id="equation-glass-lens">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="2"
              seed="5"
              result="texture"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="texture"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className={styles.top}>
        <p aria-live="polite" data-testid="carousel-status">
          {cards[index].label}{' '}
          <span className="math">
            {index + 1} / {cards.length}
          </span>
        </p>
        <div className={styles.controls}>
          <button type="button" aria-label="کارت قبلی" onClick={() => select(-1)}>
            →
          </button>
          <button type="button" aria-label="کارت بعدی" onClick={() => select(1)}>
            ←
          </button>
        </div>
      </div>
      <div
        ref={stage}
        className={styles.stage}
        onPointerMove={moveLens}
        onPointerLeave={(event) => {
          event.currentTarget.style.removeProperty('--lens-x');
          event.currentTarget.style.removeProperty('--lens-y');
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null;
          swiped.current = false;
        }}
        onClickCapture={onClickCapture}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            select(1);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            select(-1);
          }
        }}
        tabIndex={0}
        aria-label="برای جابه‌جایی میان کارت‌ها از کلیدهای جهت‌نما استفاده کنید"
      >
        {cards.map((card, i) => {
          const offset = (i - index + cards.length) % cards.length;
          const position =
            offset === 0
              ? 'current'
              : offset === 1
                ? 'next'
                : offset === cards.length - 1
                  ? 'previous'
                  : 'hidden';
          return (
            <article
              key={card.to}
              className={`${styles.card} ${styles[position]}`}
              aria-hidden={position === 'hidden'}
            >
              <div className={styles.glassEdge} aria-hidden="true" />
              <div className={styles.lens} aria-hidden="true">
                <svg viewBox="0 0 160 160">
                  <g filter="url(#equation-glass-lens)">
                    <circle
                      cx="80"
                      cy="80"
                      r="53"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M 26 80 H 134 M 80 24 V 136"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </g>
                </svg>
              </div>
              <div className={styles.cardTop}>
                <span className="math">{card.number}</span>
                <span>{card.label}</span>
              </div>
              <div className={styles.cardBottom}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {position === 'current' ? (
                  <Link ref={currentLink} to={card.to}>
                    دیدن مسیر <span aria-hidden="true">←</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => focusCard(i)}
                    tabIndex={position === 'hidden' ? -1 : 0}
                    disabled={position === 'hidden'}
                  >
                    نمایش این کارت
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.dots} aria-label="انتخاب کارت">
        {cards.map((card, i) => (
          <button
            type="button"
            key={card.to}
            aria-label={`نمایش کارت ${card.title}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
