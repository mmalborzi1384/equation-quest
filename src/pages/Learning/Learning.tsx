import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { topics, topicPath } from '../../data/topics';
import styles from './Learning.module.css';

export default function Learning() {
  return (
    <>
      <PageIntro
        eyebrow="نقشهٔ یادگیری / ۹ موضوع"
        title="از برابری تا جواب دقیق"
        description="از مفهوم تساوی با عددهای کوچک شروع می‌کنیم؛ بعد نوبت مجهول، عددهای علامت‌دار و کسرهای دقیق است. هر موضوع یک درس مستقل با نمونهٔ گام‌به‌گام، مدل دیداری و تمرین تعاملی دارد؛ کسرها را هم جداگانه و به‌دفعات تمرین کن."
      >
        <Link to="/learning/equation">نخستین موضوع</Link>
        <Link to="/world">نقشهٔ سرزمین</Link>
      </PageIntro>
      <section className={styles.list} aria-label="موضوع‌های یادگیری">
        {topics.map((topic, i) => (
          <Link
            data-story
            key={topic.id}
            to={topicPath(topic.id)}
            className={`${styles.item} ${topic.id === 'fractions' ? styles.fraction : ''}`}
          >
            <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <small>{topic.eyebrow}</small>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
            </div>
            <span className={styles.arrow} aria-hidden="true">
              ←
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
