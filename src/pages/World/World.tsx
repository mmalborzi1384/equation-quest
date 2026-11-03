import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { islands, levels } from '../../data/levels';
import { islandStatus } from '../../features/progression/levels';
import { isUnlocked } from '../../features/level-manager/workshop';
import { stageOrder } from '../../features/level-manager/stages';
import { useLevelProgress } from '../../store/useLevelProgress';
import styles from './World.module.css';
import { ResetAction } from '../../components/ui/ResetAction';

export default function World() {
  const completedIds = useLevelProgress((s) => s.record.rewards.completedIds);
  const points = useLevelProgress((s) => s.record.rewards.points);
  return (
    <>
      <PageIntro
        eyebrow="نقشهٔ سرزمین / ۴ منطقه"
        title="چهار راه برای بازگرداندن تعادل"
        description="در هر منطقه دو مرحلهٔ متفاوت بازی کن. مرحلهٔ بعد تنها پس از حل و بررسی مرحلهٔ پیشین باز می‌شود؛ مرحله‌های تأییدشده در مرورگر این دستگاه می‌مانند."
      >
        <Link to="/learning">آماده‌سازی با آموزش</Link>
        <Link to="/game">کاوش در جزیرهٔ سه‌بعدی</Link>
      </PageIntro>
      <p className={styles.ledger} role="status">
        {completedIds.length} مرحلهٔ بررسی‌شده از ۸ · {points} امتیاز مرحله‌های ذخیره‌شده
      </p>
      <div className={styles.reset}>
        <ResetAction
          label="ریست پیشرفت مرحله‌ها"
          scope="تکمیل مرحله‌ها، امتیازها و آخرین مرحله حذف می‌شود؛ تمرین‌ها، آزمایش‌ها و تنظیمات می‌مانند."
          onConfirm={useLevelProgress.getState().reset}
        />
      </div>
      <section className={styles.map} aria-label="مناطق سرزمین جبر">
        {islands.map((island, i) => {
          const status = islandStatus(island.level, completedIds);
          const pair = levels.slice(i * 2, i * 2 + 2);
          return (
            <article key={island.name} className={`${styles.island} ${styles[island.tone]}`}>
              <span className={styles.index}>
                منطقهٔ ۰{i + 1} <span className="math">/ {island.label}</span> ·{' '}
                {status === 'restored' ? 'بازسازی‌شده' : status === 'open' ? 'باز' : 'قفل‌شده'}
              </span>
              <div className={styles.landmark} aria-hidden="true">
                <i />
              </div>
              <h2>{island.name}</h2>
              <p>{island.detail}</p>
              <div className={styles.stageList}>
                {pair.map((level) =>
                  isUnlocked(level.id, stageOrder, new Set(completedIds)) ? (
                    <Link key={level.id} to={`/game/level/${level.id}`}>
                      مرحلهٔ {level.id}: {level.title} {completedIds.includes(level.id) ? '✓' : '←'}
                    </Link>
                  ) : (
                    <span key={level.id}>
                      مرحلهٔ {level.id}: {level.title} / قفل‌شده
                    </span>
                  ),
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
