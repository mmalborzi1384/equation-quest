import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import styles from './Progress.module.css';

export default function Progress() {
  return (
    <>
      <PageIntro
        eyebrow="دفتر مسیر / پیشرفت من"
        title="ردّ قدم‌های تو اینجا خواهد بود"
        description="هشت مرحلهٔ بازی اکنون قابل حل‌اند، اما نتیجه و امتیاز مرحله‌ها و سه آزمایش فقط در همین نشست می‌مانند. این دفتر تا ساخت ذخیره‌سازی محلی در فاز بعد، سابقهٔ ماندگار نشان نمی‌دهد."
      >
        <Link to="/learning">دیدن آموزش‌ها</Link>
        <Link to="/world">دیدن نقشه</Link>
      </PageIntro>
      <section className={styles.empty} aria-label="وضعیت پیشرفت">
        <span className={styles.figure} aria-hidden="true">
          ؟
        </span>
        <h2>هنوز سابقه‌ای برای نمایش نداریم.</h2>
        <p>
          این صفحه هنوز نتیجهٔ بازی را ثبت نمی‌کند. برای دیدن وضعیت موقت همین نشست، به نقشهٔ چهار
          منطقه برو؛ با بارگذاری دوباره، وضعیت پاک می‌شود.
        </p>
        <Link to="/world">رفتن به مرحله‌های بازی ←</Link>
      </section>
    </>
  );
}
