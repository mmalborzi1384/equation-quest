import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import styles from './Progress.module.css';

export default function Progress() {
  return (
    <>
      <PageIntro
        eyebrow="دفتر مسیر / پیشرفت من"
        title="ردّ قدم‌های تو اینجا خواهد بود"
        description="پیشرفت واقعی پس از ساخته‌شدن مرحله‌های بازی و سامانهٔ ذخیره‌سازی محلی نمایش داده می‌شود. اکنون هیچ امتیاز، کریستال یا دستاورد ساختگی نشان نمی‌دهیم."
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
          وقتی مراحل قابل بازی شوند، XP، کریستال‌ها، دستاوردها و آخرین مرحله در همین صفحه ثبت و قابل
          بازیابی خواهند بود.
        </p>
        <Link to="/learning">فعلاً از مسیر یادگیری شروع کن ←</Link>
      </section>
    </>
  );
}
