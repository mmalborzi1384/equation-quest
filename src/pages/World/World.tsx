import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { islands } from '../../data/levels';
import styles from './World.module.css';

export default function World() {
  return (
    <>
      <PageIntro
        eyebrow="نقشهٔ سرزمین / ۴ منطقه"
        title="چهار راه برای بازگرداندن تعادل"
        description="هر جزیره یک مفهوم را دنبال می‌کند. داستان و هدف مرحله‌ها را در نقشه ببین. کارگاه کاوش سه‌بعدی اکنون برای حرکت و بررسی نشان‌ها آماده است؛ سه آزمایش معادله با امتیاز موقت در همان کارگاه آماده‌اند؛ هشت مرحلهٔ اصلی، دروازه‌ها و ذخیرهٔ پیشرفت هنوز ساخته نشده‌اند."
      >
        <Link to="/learning">آماده‌سازی با آموزش</Link>
        <Link to="/game">ورود به کارگاه سه‌بعدی</Link>
      </PageIntro>
      <section className={styles.map} aria-label="مناطق سرزمین جبر">
        {islands.map((island, i) => (
          <article key={island.name} className={`${styles.island} ${styles[island.tone]}`}>
            <span className={styles.index}>
              منطقهٔ ۰{i + 1} <span className="math">/ {island.label}</span>
            </span>
            <div className={styles.landmark} aria-hidden="true">
              <i />
            </div>
            <h2>{island.name}</h2>
            <p>{island.detail}</p>
            <Link to={`/game/level/${island.level}`}>آشنایی با مرحلهٔ {island.level} ←</Link>
          </article>
        ))}
      </section>
    </>
  );
}
