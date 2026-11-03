import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import styles from './Game.module.css';

export default function Game() {
  return (
    <>
      <PageIntro
        eyebrow="اکویشن کوئست / بازی"
        title="ماجراجویی در دست ساخت است"
        description="اینجا در نسخهٔ کامل، با حرکت در جهان ایزومتریک و حل معادله‌ها راه‌ها را باز خواهی کرد. در فاز ساختار سایت، فقط مسیرها و موضوع مرحله‌ها قابل مشاهده‌اند؛ هنوز کنترل بازیکن یا معما فعال نیست."
      >
        <Link to="/world">شناختن جزیره‌ها</Link>
        <Link to="/learning">شروع از آموزش</Link>
      </PageIntro>
      <section className={styles.panel}>
        <h2>قرار است چطور بازی کنیم؟</h2>
        <div>
          <p>
            <strong>کاوش</strong>
            <br />
            دیدن اشیا و پیدا کردن پرسش هر منطقه.
          </p>
          <p>
            <strong>فهمیدن</strong>
            <br />
            انتخاب عمل یکسان برای هر دو سوی معادله.
          </p>
          <p>
            <strong>بررسی</strong>
            <br />
            جای‌گذاری جواب و باز کردن مسیر بعد.
          </p>
        </div>
        <p className={styles.status}>
          کنترل صفحه‌کلید و جوی‌استیک لمسی در فاز محیط سه‌بعدی افزوده می‌شوند.
        </p>
      </section>
    </>
  );
}
