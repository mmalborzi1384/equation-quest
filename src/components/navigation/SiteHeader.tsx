import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMotionAllowed } from '../../features/motion/useMotionAllowed';
import {
  handleRouteTransition,
  supportsViewTransitions,
} from '../../features/motion/viewTransition';
import styles from './SiteHeader.module.css';

const links = [
  { to: '/', label: 'خانه', end: true },
  { to: '/intro', label: 'معرفی' },
  { to: '/learning', label: 'مسیر یادگیری' },
  { to: '/world', label: 'دنیای بازی' },
  { to: '/progress', label: 'پیشرفت من' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const motionAllowed = useMotionAllowed();
  const viewTransitions = motionAllowed && supportsViewTransitions();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);
  function goBack() {
    const index = window.history.state?.idx;
    if (typeof index === 'number' && index > 0) navigate(-1);
    else navigate('/');
  }
  return (
    <header
      ref={header}
      className={styles.header}
      onClickCapture={(event: MouseEvent<HTMLElement>) =>
        handleRouteTransition(event, navigate, viewTransitions, () => setOpen(false))
      }
    >
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" aria-label="ماجراجویی معادله‌ها، خانه">
          <svg
            className={styles.brandMark}
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18 H42" />
              <path d="M24 18 V34 M14 38 H34" />
              <path d="M24 18 V12" />
              <path d="M6 18 V24 M42 18 V24" />
              <path d="M2 24 H10 M38 24 H46" />
              <path d="M2 24 Q6 30 10 24" />
              <path d="M38 24 Q42 30 46 24" />
              <path d="M21 10 H27 M21 13 H27" strokeWidth="1.6" />
            </g>
          </svg>
          <span>
            ماجراجویی <strong>معادله‌ها</strong>
            <small>راز سرزمین مجهول‌ها</small>
          </span>
        </Link>
        <button
          ref={menuButton}
          className={styles.menuButton}
          type="button"
          aria-label={open ? 'بستن فهرست' : 'باز کردن فهرست'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>{' '}
          فهرست
        </button>
        <nav
          id="site-navigation"
          className={`${styles.navigation} ${open ? styles.open : ''}`}
          aria-label="ناوبری اصلی"
        >
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/game"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `${styles.gameLink} ${isActive ? styles.active : ''}`}
          >
            کارگاه معادله <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>
      </div>
      {location.pathname !== '/' && (
        <div className={styles.backRow}>
          <button type="button" onClick={goBack}>
            → بازگشت
          </button>
          <span aria-hidden="true">/</span>
          <span>ماجراجویی معادله‌ها</span>
        </div>
      )}
    </header>
  );
}
