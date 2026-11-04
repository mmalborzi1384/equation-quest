import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BlockMath } from 'react-katex';
import {
  type Action,
  equationTex,
  operationText,
  solution,
  stateTex,
  substitutionTex,
} from '../../features/equation-engine/equation';
import { negate, reciprocal, tex, zero } from '../../features/equation-engine/rational';
import {
  advanceStage,
  startStage,
  type StageEvent,
} from '../../features/level-manager/stage-session';
import { stageOrder, type Stage } from '../../features/level-manager/stages';
import { feedbackText, hintFor } from '../../features/puzzle-engine/puzzle';
import { useLevelProgress } from '../../store/useLevelProgress';
import { BidiText } from '../Lessons/BidiText';
import styles from './StageRunner.module.css';
import { useMotionList } from '../../features/motion/useMotionList';

export function StageRunner({ stage }: { stage: Stage }) {
  const ledgerRef = useMotionList<HTMLDivElement>();
  const [session, setSession] = useState(startStage);
  const [input, setInput] = useState('');
  const [notice, setNotice] = useState(
    'نخست سازوکار این منطقه را بررسی کن؛ پاسخ نهایی به‌تنهایی کافی نیست.',
  );
  const rewards = useLevelProgress((s) => s.record.rewards);
  const grantVerifiedStage = useLevelProgress((s) => s.grantVerifiedStage);
  const problem = stage.problems[session.problemIndex];
  const eq = problem.equation;
  const nextId = stageOrder[stageOrder.indexOf(stage.id) + 1];
  function act(event: StageEvent) {
    const result = advanceStage(stage, session, event);
    setSession(result.session);
    if (event.type === 'restart') {
      setInput('');
      setNotice('مرحله از ابتدا شروع شد؛ پاداشی که قبلاً گرفته‌ای دوباره داده نمی‌شود.');
      return;
    }
    if (event.type === 'concept') {
      setNotice(
        result.session.conceptPassed ? stage.concept.explanation : `هنوز نه. ${stage.concept.hint}`,
      );
      return;
    }
    if (event.type === 'next') {
      if (result.session !== session) {
        setInput('');
        setNotice('مسئلهٔ بعدی باز شد؛ جواب پیشین به‌جای این مسئله پذیرفته نیست.');
      }
      return;
    }
    if (event.event.type === 'restart') {
      setInput('');
      setNotice('همین مسئله را دوباره حل کن.');
      return;
    }
    if (event.event.type === 'hint') {
      setNotice(hintFor(eq, result.session.puzzle));
      return;
    }
    if (result.completedNow) {
      grantVerifiedStage(
        stage.id,
        result.session.attemptsTotal +
          result.session.puzzle.attempts +
          result.session.conceptAttempts,
        result.session.puzzle.answer!,
      );
      setNotice(
        rewards.earnedIds.includes(stage.id)
          ? 'بررسی درست بود؛ امتیاز این مرحله قبلاً داده شده است.'
          : 'همهٔ مسئله‌ها در معادلهٔ اصلی بررسی شدند؛ پاداش این مرحله فقط یک بار در این مرورگر ذخیره شد.',
      );
      return;
    }
    if (result.session.puzzle.feedback) {
      const code = result.session.puzzle.feedback;
      setNotice(
        `${feedbackText[code]} ${code === 'correct' ? '' : hintFor(eq, result.session.puzzle)}`,
      );
    }
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    act({ type: 'puzzle', event: { type: 'answer', input } });
  }
  const choices: Action[] =
    session.puzzle.phase === 'constant'
      ? [
          { operation: 'subtract', amount: eq.b, sides: 'left' },
          { operation: 'subtract', amount: negate(eq.b), sides: 'both' },
          { operation: 'subtract', amount: eq.b, sides: 'both' },
        ]
      : session.puzzle.phase === 'coefficient'
        ? [
            { operation: 'divide', amount: zero, sides: 'both' },
            { operation: 'multiply', amount: eq.a, sides: 'both' },
            { operation: 'divide', amount: eq.a, sides: 'both' },
            { operation: 'multiply', amount: reciprocal(eq.a), sides: 'both' },
          ]
        : [];
  return (
    <section className={styles.runner} aria-label={`بازی مرحلهٔ ${stage.id}`}>
      <div className={styles.topline}>
        <span>سازوکار منطقه / {stage.id}</span>
        <span>
          {session.done
            ? 'بازسازی‌شده'
            : `مسئلهٔ ${session.problemIndex + 1} از ${stage.problems.length}`}
        </span>
      </div>
      <div className={styles.mechanism}>
        <span aria-hidden="true">◇ ━ ◇</span>
        <p>{stage.scene}</p>
      </div>
      {!session.conceptPassed ? (
        <div className={styles.concept}>
          <h2>آزمون سازوکار</h2>
          {stage.id === '01' && (
            <div
              className={styles.balance}
              role="img"
              aria-label="دو کفهٔ ترازو، هر کفه سه مهره: ۳ برابر با ۳"
            >
              <span aria-hidden="true">● ● ●</span>
              <span aria-hidden="true">=</span>
              <span aria-hidden="true">● ● ●</span>
            </div>
          )}
          {stage.id === '03' && (
            <div
              className={styles.boxes}
              role="img"
              aria-label="سه جعبهٔ یکسان و سه مهره، برابر با دوازده مهره"
            >
              <span aria-hidden="true">▢ ▢ ▢ + ۳ = ۱۲</span>
            </div>
          )}
          {stage.id === '06' && (
            <div
              className={styles.fractionModel}
              role="img"
              aria-label="دو نیمهٔ برابر یک کل می‌سازند؛ چهار بخش یک‌چهارم نیز یک کل می‌سازند"
            >
              <span aria-hidden="true">
                <i />
                <i />
              </span>
              <span aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
          <p>{stage.concept.prompt}</p>
          <div className={styles.choices}>
            {stage.concept.choices.map((choice, i) => (
              <button
                key={choice}
                type="button"
                onClick={() => act({ type: 'concept', choice: i })}
              >
                {choice}
              </button>
            ))}
          </div>
          {session.conceptAttempts > 0 && <small>اشتباه‌ها مانع تلاش دوباره نمی‌شوند.</small>}
        </div>
      ) : (
        <div className={styles.problem}>
          <h2>{session.done ? 'منطقه پاسخ داد' : problem.prompt}</h2>
          <p>{problem.purpose}</p>
          <div className={styles.math} dir="ltr">
            <BlockMath math={equationTex(eq)} />
          </div>
          <div ref={ledgerRef} aria-live="polite">
            {session.puzzle.first && (
              <div className={styles.mathStep} dir="ltr" aria-label="نتیجهٔ گام اول">
                <BlockMath math={stateTex(session.puzzle.first)} />
              </div>
            )}
            {session.puzzle.second && (
              <div className={styles.mathStep} dir="ltr" aria-label="نتیجهٔ گام دوم">
                <BlockMath math={stateTex(session.puzzle.second)} />
              </div>
            )}
          </div>
          {(session.puzzle.phase === 'constant' || session.puzzle.phase === 'coefficient') && (
            <>
              <h3>
                {session.puzzle.phase === 'constant'
                  ? 'برای حذف ثابت، کدام عمل را در دو طرف انجام می‌دهی؟'
                  : 'برای تنها گذاشتن x، کدام عمل دوطرفه درست است؟'}
              </h3>
              <div className={styles.choices}>
                {choices.map((action, i) => (
                  <button
                    type="button"
                    key={`${session.puzzle.phase}-${i}`}
                    onClick={() => act({ type: 'puzzle', event: { type: 'step', action } })}
                  >
                    <BidiText>{operationText(action)}</BidiText>
                  </button>
                ))}
              </div>
            </>
          )}
          {session.puzzle.phase === 'answer' && (
            <form onSubmit={submit} className={styles.answer}>
              <label htmlFor={`stage-${stage.id}-answer`}>
                مقدار دقیق x را بنویس؛ کسر را با / وارد کن:
              </label>
              <div>
                <input
                  id={`stage-${stage.id}-answer`}
                  dir="ltr"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  inputMode="text"
                />
                <button type="submit">بررسی پاسخ</button>
              </div>
              <small>اعشار گرد شده پذیرفته نیست؛ کسر هم‌ارز پذیرفته است.</small>
            </form>
          )}
          {session.puzzle.phase === 'verify' && session.puzzle.answer && (
            <div className={styles.verify}>
              <h3>بررسی در معادلهٔ اصلی</h3>
              <div className={styles.math} dir="ltr">
                <BlockMath math={substitutionTex(eq, session.puzzle.answer)} />
              </div>
              <p>دو طرف دقیقاً برابر شده‌اند؟</p>
              <div className={styles.choices}>
                <button
                  type="button"
                  onClick={() => act({ type: 'puzzle', event: { type: 'verify', claim: 'equal' } })}
                >
                  بله، برابرند؛ تأیید می‌کنم
                </button>
                <button
                  type="button"
                  onClick={() =>
                    act({ type: 'puzzle', event: { type: 'verify', claim: 'unequal' } })
                  }
                >
                  نه، برابر نیستند
                </button>
              </div>
            </div>
          )}
          {session.puzzle.phase === 'complete' && (
            <div className={styles.success}>
              <strong>
                جواب دقیق:{' '}
                <span dir="ltr" className="math">
                  <BlockMath math={`x = ${tex(solution(eq))}`} />
                </span>
              </strong>
              <p>جواب در معادلهٔ اصلی بررسی شد.</p>
              {!session.done && (
                <button type="button" onClick={() => act({ type: 'next' })}>
                  مسئلهٔ بعدی ←
                </button>
              )}
              {session.done && (
                <div>
                  <strong>
                    مرحلهٔ {stage.id} کامل شد؛ {stage.points} امتیاز، فقط یک بار در این مرورگر.
                  </strong>
                  <br />
                  {nextId ? (
                    <Link to={`/game/level/${nextId}`}>ورود به مرحلهٔ {nextId} ←</Link>
                  ) : (
                    <Link to="/world">بازگشت به چهار منطقه ←</Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className={styles.tools}>
        {session.conceptPassed && !session.done && session.puzzle.phase !== 'complete' && (
          <button type="button" onClick={() => act({ type: 'puzzle', event: { type: 'hint' } })}>
            راهنمای گام {Math.min(3, session.puzzle.hintLevel + 1)}
          </button>
        )}
        {session.conceptPassed && !session.done && (
          <button type="button" onClick={() => act({ type: 'puzzle', event: { type: 'restart' } })}>
            شروع دوبارهٔ مسئله
          </button>
        )}
        <button type="button" onClick={() => act({ type: 'restart' })}>
          شروع دوبارهٔ مرحله
        </button>
      </div>
      <p className={styles.notice} role="status" aria-live="polite">
        <BidiText>{notice}</BidiText>
      </p>
      <p className={styles.note}>
        مرحلهٔ کامل‌شده و پاداش آن در مرورگر ذخیره می‌شود؛ پیشرویِ ناتمام هر مسئله با بارگذاری
        دوباره از نو شروع می‌شود.
      </p>
    </section>
  );
}
