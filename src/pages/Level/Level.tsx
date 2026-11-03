import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { ResetAction } from '../../components/ui/ResetAction';
import { levels } from '../../data/levels';
import { topicPath } from '../../data/topics';
import { isUnlocked } from '../../features/level-manager/workshop';
import { stageFor, stageOrder } from '../../features/level-manager/stages';
import { useLevelProgress } from '../../store/useLevelProgress';
import NotFound from '../NotFound';
import { StageRunner } from './StageRunner';
import styles from './Level.module.css';

export default function Level() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = levels.find((entry) => entry.id === levelId);
  const completedIds = useLevelProgress((s) => s.record.rewards.completedIds);
  if (!level) return <NotFound detail="چنین مرحله‌ای در نقشهٔ هشت‌مرحله‌ای وجود ندارد." />;
  const unlocked = isUnlocked(level.id, stageOrder, new Set(completedIds));
  const stage = stageFor(level.id)!;
  const previous = stageOrder[stageOrder.indexOf(level.id) - 1];
  return (
    <>
      <PageIntro
        eyebrow={`${level.island} / مرحلهٔ ${level.id}`}
        title={level.title}
        description={`هدف این مرحله: ${level.focus}. ${unlocked ? 'سازوکار منطقه را بشناس، مسئله‌ها را حل کن و هر جواب را در معادلهٔ اصلی بررسی کن.' : 'برای ورود، مرحلهٔ پیشین را با بررسی جواب در معادلهٔ اصلی تمام کن.'}`}
      >
        <Link to={topicPath(level.topic)}>دیدن موضوع مرتبط</Link>
        <Link to="/world">بازگشت به نقشه</Link>
      </PageIntro>
      <div className={styles.reset}>
        <ResetAction
          label="ریست پیشرفت مرحله‌ها"
          scope="تکمیل و پاداش مرحله‌ها پاک می‌شود و به نقشه بازمی‌گردی؛ آزمایش‌ها و تنظیمات می‌مانند."
          onConfirm={() => {
            useLevelProgress.getState().reset();
            navigate('/world');
          }}
        />
      </div>
      {unlocked ? (
        <StageRunner key={stage.id} stage={stage} />
      ) : (
        <section className={styles.locked} aria-label="مرحلهٔ قفل‌شده">
          <h2>این دروازه هنوز باز نشده است.</h2>
          <p>
            برای باز کردن مرحلهٔ {level.id}، نخست همهٔ مسئله‌های مرحلهٔ {previous} را حل و جواب‌ها
            را در معادلهٔ اصلی بررسی کن.
          </p>
          <Link to={`/game/level/${previous}`}>رفتن به مرحلهٔ {previous} ←</Link>
        </section>
      )}
      <nav className={styles.next} aria-label="مسیر هشت‌مرحله‌ای">
        <span>مسیر هشت‌مرحله‌ای / وضعیت ذخیره‌شده</span>
        <div>
          {levels.map((entry) => {
            const open = isUnlocked(entry.id, stageOrder, new Set(completedIds));
            return open ? (
              <Link
                key={entry.id}
                to={`/game/level/${entry.id}`}
                aria-current={entry.id === level.id ? 'page' : undefined}
                aria-label={`مرحلهٔ ${entry.id} ${completedIds.includes(entry.id) ? 'کامل‌شده' : 'باز'}`}
              >
                {entry.id}
              </Link>
            ) : (
              <span
                key={entry.id}
                className={styles.blocked}
                aria-label={`مرحلهٔ ${entry.id} قفل‌شده`}
              >
                {entry.id}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
