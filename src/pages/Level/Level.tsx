import { Link, useParams } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { levels } from '../../data/levels';
import { topicPath } from '../../data/topics';
import NotFound from '../NotFound';
import styles from './Level.module.css';

export default function Level() {
  const { levelId } = useParams();
  const level = levels.find((entry) => entry.id === levelId);
  if (!level) return <NotFound detail="چنین مرحله‌ای در نقشهٔ هشت‌مرحله‌ای وجود ندارد." />;
  return (
    <>
      <PageIntro
        eyebrow={`${level.island} / مرحلهٔ ${level.id}`}
        title={level.title}
        description={`موضوع این مرحله: ${level.focus}. محیط سه‌بعدی و حل معما هنوز ساخته نشده‌اند؛ این صفحه معرفی مسیر آیندهٔ بازی است.`}
      >
        <Link to={topicPath(level.topic)}>دیدن موضوع مرتبط</Link>
        <Link to="/world">بازگشت به نقشه</Link>
      </PageIntro>
      <div className={styles.next}>
        <span>مسیر هشت‌مرحله‌ای</span>
        <div>
          {levels.map((entry) => (
            <Link
              key={entry.id}
              to={`/game/level/${entry.id}`}
              aria-current={entry.id === level.id ? 'page' : undefined}
            >
              {entry.id}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
