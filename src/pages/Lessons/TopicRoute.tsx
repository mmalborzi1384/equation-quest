import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import { PageIntro } from '../../components/ui/PageIntro';
import { lessons } from '../../data/lessons';
import { topicById, topicPath, type TopicId } from '../../data/topics';
import { equals, rational } from '../../features/equation-engine/rational';
import { Practice } from './Practice';
import { BidiText } from './BidiText';
import styles from './TopicRoute.module.css';

function BalanceLab() {
  const [left, setLeft] = useState(5);
  const [right, setRight] = useState(5);
  const balanced = equals(rational(BigInt(left)), rational(BigInt(right)));
  return (
    <div className={styles.modelBody}>
      <p>مدل تعادل را امتحان کن: چه اتفاقی می‌افتد اگر فقط یک طرف را عوض کنی؟</p>
      <div
        className={styles.pans}
        aria-label={`کفهٔ چپ ${left}، کفهٔ راست ${right}؛ ${balanced ? 'برابر' : 'نابرابر'}`}
      >
        <div>
          <span>کفهٔ چپ</span>
          <strong>{left}</strong>
          <span className={styles.weight} aria-hidden="true">
            {'● '.repeat(left)}
          </span>
        </div>
        <span className={styles.equal} aria-hidden="true">
          {balanced ? '=' : '≠'}
        </span>
        <div>
          <span>کفهٔ راست</span>
          <strong>{right}</strong>
          <span className={styles.weight} aria-hidden="true">
            {'● '.repeat(right)}
          </span>
        </div>
      </div>
      <p role="status">
        {balanced
          ? 'دو کفه هم‌ارزش‌اند.'
          : 'دو کفه برابر نیستند؛ برای بازگشت به تعادل، تفاوت را جبران کن.'}
      </p>
      <div className={styles.controls}>
        <button type="button" onClick={() => setLeft((n) => n + 1)}>
          ۱ به چپ
        </button>
        <button type="button" onClick={() => setRight((n) => n + 1)}>
          ۱ به راست
        </button>
        <button
          type="button"
          onClick={() => {
            setLeft((n) => n + 1);
            setRight((n) => n + 1);
          }}
        >
          ۱ به هر دو طرف
        </button>
        <button
          type="button"
          onClick={() => {
            setLeft(5);
            setRight(5);
          }}
        >
          از نو: ۵ = ۵
        </button>
      </div>
    </div>
  );
}
function PartModel() {
  return (
    <div className={styles.modelBody}>
      <p>به هر قطعه نگاه کن؛ علامت منفی هم بخشی از ضریب است.</p>
      <div className={styles.parts} dir="ltr">
        <div>
          <b>−2</b>
          <span>ضریب</span>
        </div>
        <div>
          <b>x</b>
          <span>مجهول</span>
        </div>
        <div>
          <b>+3</b>
          <span>ثابت</span>
        </div>
        <div>
          <b>= 9</b>
          <span>سمت راست</span>
        </div>
      </div>
      <p>
        ضریب در x ضرب می‌شود؛ ثابت بدون x است. در تمرین، اول ثابت و سپس ضریب را با عمل وارون حذف کن.
      </p>
    </div>
  );
}
function FractionModel() {
  return (
    <div className={styles.modelBody}>
      <p>هر نوار یک کل یکسان است. بخش‌های پررنگ را با هم مقایسه کن.</p>
      <div className={styles.fractionRows}>
        <div>
          <span>یک دوم</span>
          <div className={styles.bar} dir="ltr">
            <i className={styles.filled} />
            <i />
          </div>
          <b className="math">1/2</b>
        </div>
        <div>
          <span>دو چهارم</span>
          <div className={styles.bar} dir="ltr">
            <i className={styles.filled} />
            <i className={styles.filled} />
            <i />
            <i />
          </div>
          <b className="math">2/4</b>
        </div>
        <div>
          <span>سه چهارم</span>
          <div className={styles.bar} dir="ltr">
            <i className={styles.filled} />
            <i className={styles.filled} />
            <i className={styles.filled} />
            <i />
          </div>
          <b className="math">3/4</b>
        </div>
      </div>
      <p>
        نیم + یک چهارم = دو چهارم + یک چهارم = سه چهارم. این برابریِ دقیق است، نه گردکردن اعشاری.
      </p>
    </div>
  );
}
function ConceptCheck({ id }: { id: TopicId }) {
  const lesson = lessons[id];
  const [selected, setSelected] = useState<string | null>(null);
  const [hint, setHint] = useState(0);
  return (
    <section data-story className={styles.concept} aria-labelledby="concept-title">
      <div className={styles.sectionHeading}>
        <span>۰۲ / فکر کن</span>
        <h2 id="concept-title">یک تصمیم با دلیل</h2>
      </div>
      <fieldset>
        <legend>
          <BidiText>{lesson.question}</BidiText>
        </legend>
        <div className={styles.choices}>
          {lesson.options.map((option) => (
            <button
              type="button"
              key={option.id}
              aria-pressed={selected === option.id}
              onClick={() => {
                setSelected(option.id);
                if (option.id !== lesson.correct) setHint((n) => Math.min(n + 1, 3));
              }}
            >
              <BidiText>{option.label}</BidiText>
            </button>
          ))}
        </div>
      </fieldset>
      <p role="status" aria-live="polite" className={styles.feedback}>
        {selected
          ? lesson.options.find((o) => o.id === selected)?.feedback
          : 'یکی از گزینه‌ها را انتخاب کن؛ اشتباه کردن هم بخشی از یادگیری است.'}
      </p>
      {selected !== lesson.correct && hint > 1 && (
        <p className={styles.hint}>
          راهنما: {hint === 2 ? lesson.objective : lesson.misconception}
        </p>
      )}
    </section>
  );
}
export default function TopicRoute({ id }: { id: TopicId }) {
  const topic = topicById[id];
  const lesson = lessons[id];
  return (
    <>
      <PageIntro eyebrow={topic.eyebrow} title={topic.title} description={topic.summary}>
        <Link to="/learning">همهٔ موضوع‌ها</Link>
        {topic.next && <Link to={topicPath(topic.next)}>موضوع بعدی</Link>}
      </PageIntro>
      <div className={styles.lesson}>
        <div className={styles.introLine}>
          <span>هدف این درس</span>
          <p>
            <BidiText>{lesson.objective}</BidiText>
          </p>
        </div>
        <section data-story className={styles.teaching} aria-labelledby="teaching-title">
          <div className={styles.sectionHeading}>
            <span>۰۱ / کشف کن</span>
            <h2 id="teaching-title">از تصویر تا نماد</h2>
          </div>
          <p>
            <BidiText>{lesson.explanation}</BidiText>
          </p>
          <div className={styles.model}>
            {lesson.model === 'balance' ? (
              <BalanceLab />
            ) : lesson.model === 'parts' ? (
              <PartModel />
            ) : (
              <FractionModel />
            )}
          </div>
          <h3>یک مسیر حل، گام به گام</h3>
          <ol className={styles.worked}>
            {lesson.worked.map((work, i) => (
              <li key={i}>
                <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                <div dir="ltr" className={styles.workedMath}>
                  <BlockMath math={work.math} />
                </div>
                <p>
                  <BidiText>{work.why}</BidiText>
                </p>
              </li>
            ))}
          </ol>
          <div className={styles.misconception}>
            <strong>اینجا مکث کن</strong>
            <p>
              <BidiText>{lesson.misconception}</BidiText>
            </p>
          </div>
        </section>
        <ConceptCheck key={id + '-concept'} id={id} />
        <Practice key={id + '-practice'} lesson={lesson} fractions={id === 'fractions'} />
        <nav className={styles.bottomNav} aria-label="پیمایش درس">
          <Link to="/learning">← بازگشت به فهرست درس‌ها</Link>
          {topic.next && <Link to={topicPath(topic.next)}>درس بعدی ←</Link>}
          {id !== 'fractions' && <Link to="/learning/fractions">تمرین مستقل کسرها ←</Link>}
        </nav>
        <p className={styles.reviewNote}>
          این محتوا هنوز بازبینی مستقل متخصص برنامهٔ درسی پایهٔ هفتم را نگرفته است.
        </p>
      </div>
    </>
  );
}
