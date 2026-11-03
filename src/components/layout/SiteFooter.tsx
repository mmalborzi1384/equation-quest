import { Link } from 'react-router-dom';
import { usePreferences } from '../../store/usePreferences';
import styles from './Layout.module.css';
import { ResetAction } from '../ui/ResetAction';

export function SiteFooter() {
  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const toggleMotion = usePreferences((state) => state.toggleMotion);
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.footerTitle}>ماجراجویی معادله‌ها</span>
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
      <div className={styles.preferencesReset}>
        <ResetAction
          label="ریست تنظیم حرکت کمتر"
          scope="تنها تنظیم ذخیره‌شدهٔ حرکت کمتر به حالت خاموش بازمی‌گردد."
          onConfirm={usePreferences.getState().reset}
        />
      </div>
      <small>پیشرفت بازی در همین مرورگر ذخیره می‌شود و هر زمان از دفتر پیشرفت قابل حذف است.</small>
    </footer>
  );
}
