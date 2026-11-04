import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../navigation/SiteHeader';
import { SiteFooter } from './SiteFooter';
import { usePreferences } from '../../store/usePreferences';
import styles from './Layout.module.css';
import { useStoryReveal } from '../../features/story/useStoryReveal';

export function AppLayout() {
  const location = useLocation();
  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const firstRender = useRef(true);
  useStoryReveal(location.pathname, reduceMotion);
  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: 'instant' });
    if (firstRender.current) firstRender.current = false;
    else document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [location.pathname]);
  return (
    <div className={styles.shell} dir="rtl" data-motion={reduceMotion ? 'reduce' : 'system'}>
      <div className="route-progress" data-scroll-motion aria-hidden="true" />
      <a
        className={styles.skip}
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        رفتن به محتوای اصلی
      </a>
      <SiteHeader />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
