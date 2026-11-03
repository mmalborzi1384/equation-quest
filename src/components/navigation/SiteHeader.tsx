import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './SiteHeader.module.css';

const links = [
  { to: '/', label: 'خانه', end: true },
  { to: '/learning', label: 'مسیر یادگیری' },
  { to: '/world', label: 'دنیای بازی' },
  { to: '/progress', label: 'پیشرفت من' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => setOpen(false), [location.pathname]);
  function goBack() {
    const index = window.history.state?.idx;
    if (typeof index === 'number' && index > 0) navigate(-1);
    else navigate('/');
  }
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" aria-label="اکویشن کوئست، خانه">
          <span className={styles.mark} aria-hidden="true">
            <span />
          </span>
          <span>
            اکویشن <strong>کوئست</strong>
            <small>راز سرزمین مجهول‌ها</small>
          </span>
        </Link>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={open ? 'بستن فهرست' : 'باز کردن فهرست'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span> فهرست
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
          <span>اکویشن کوئست</span>
        </div>
      )}
    </header>
  );
}
