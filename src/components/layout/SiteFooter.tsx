import { Link } from 'react-router-dom';
import { usePreferences } from '../../store/usePreferences';
import styles from './Layout.module.css';

export function SiteFooter() {
  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const toggleMotion = usePreferences((state) => state.toggleMotion);
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.footerTitle}>اکویشن کوئست</span>
        <p>هر دو سوی ماجرا مهم‌اند.</p>
      </div>
      <div className={styles.footerLinks}>
        <Link to="/">خانه</Link>
        <Link to="/learning">آموزش</Link>
        <Link to="/world">جهان</Link>
        <Link to="/progress">پیشرفت</Link>
      </div>
      <button
        type="button"
        className={styles.motionButton}
        aria-pressed={reduceMotion}
        onClick={toggleMotion}
      >
        {reduceMotion ? 'حرکت کمتر: روشن' : 'حرکت کمتر: خاموش'}
      </button>
      <small>نسخهٔ ساختار اولیه؛ درس‌ها و بازی تعاملی در فازهای بعد ساخته می‌شوند.</small>
    </footer>
  );
}
