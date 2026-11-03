import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { topicById, topicPath, type TopicId } from '../../data/topics';
import styles from './TopicRoute.module.css';

export default function TopicRoute({ id }: { id: TopicId }) {
  const topic = topicById[id];
  return (
    <>
      <PageIntro eyebrow={topic.eyebrow} title={topic.title} description={topic.summary}>
        <Link to="/learning">همهٔ موضوع‌ها</Link>
        {topic.next && <Link to={topicPath(topic.next)}>موضوع بعدی</Link>}
      </PageIntro>
      <section className={styles.body} aria-label={`نمای موضوع ${topic.title}`}>
        <div className={styles.formula}>
          <span>نمونه‌ای از این مسیر</span>
          <strong className="math">{topic.example}</strong>
        </div>
        <div className={styles.notice}>
          <span className={styles.label}>وضعیت این موضوع</span>
          <h2>مسیر مشخص است؛ تمرین هنوز آماده نیست.</h2>
          <p>
            این صفحه برای رفت‌وآمد میان موضوع‌ها ساخته شده است. آموزش تعاملی، بازخورد ریاضی و
            تمرین‌های مستقل در فاز آموزشی پیاده‌سازی می‌شوند؛ این نمونه سؤالِ قابل‌حل نیست.
          </p>
          <div>
            <Link to="/learning">بازگشت به مسیر یادگیری ←</Link>
            {id === 'fractions' ? (
              <Link to="/learning/inverse-operations">پیش‌نیاز: عملیات معکوس ←</Link>
            ) : (
              <Link to="/world">آشنایی با دنیای بازی ←</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
