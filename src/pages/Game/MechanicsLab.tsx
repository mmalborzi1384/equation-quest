import { useState, type FormEvent } from 'react';
import { BlockMath } from 'react-katex';
import {
  challenges,
  challengeEquation,
  isUnlocked,
  workshopOrder,
} from '../../features/level-manager/workshop';
import {
  equationTex,
  operationText,
  solution,
  stateTex,
  substitutionTex,
  type Action,
} from '../../features/equation-engine/equation';
import { negate, reciprocal, tex, zero } from '../../features/equation-engine/rational';
import {
  feedbackText,
  hintFor,
  startPuzzle,
  transition,
  type Event,
} from '../../features/puzzle-engine/puzzle';
import { useWorkshopProgress } from '../../store/useWorkshopProgress';
import { BidiText } from '../Lessons/BidiText';
import styles from './MechanicsLab.module.css';
import { ResetAction } from '../../components/ui/ResetAction';

export function MechanicsLab() {
  const [selectedId, setSelectedId] = useState(challenges[0].id);
  const [session, setSession] = useState(startPuzzle);
  const [input, setInput] = useState('');
  const [notice, setNotice] = useState(
    'نخست عمل یکسان را روی هر دو طرف انجام بده؛ حدس جواب کافی نیست.',
  );
  const rewards = useWorkshopProgress((state) => state.rewards);
  const grantVerified = useWorkshopProgress((state) => state.grantVerified);
  const resetWorkshop = useWorkshopProgress((state) => state.reset);
  const challenge = challenges.find((item) => item.id === selectedId)!;
  const eq = challengeEquation(challenge);
  const completed = new Set(rewards.completedIds);
  const index = workshopOrder.indexOf(selectedId);
  const next = challenges[index + 1];
  const isCompleted = rewards.earnedIds.includes(challenge.id);
  function select(id: string) {
    if (!isUnlocked(id, workshopOrder, completed)) {
      setNotice(
        'این آزمایش هنوز باز نشده است؛ ابتدا آزمایش قبلی را با بررسی جواب در معادلهٔ اصلی تمام کن.',
      );
      return;
    }
    setSelectedId(id);
    setSession(startPuzzle());
    setInput('');
    setNotice('گام نخست: جملهٔ ثابت را در هر دو طرف حذف کن.');
  }
  function act(event: Event) {
    const before = isCompleted;
    const result = transition(eq, session, event);
    setSession(result.session);
    if (event.type === 'restart') {
      setInput('');
      setNotice('از ابتدا شروع کن؛ امتیازهای قبلی پاک یا دوباره داده نمی‌شوند.');
      return;
    }
    if (event.type === 'hint') {
      setNotice(hintFor(eq, result.session));
      return;
    }
    if (result.verifiedNow) {
      grantVerified(challenge.id);
      setNotice(
        before
          ? 'بررسی دقیق درست بود؛ این آزمایش قبلاً امتیاز گرفته است، پس پاداش تکراری ندارد.'
          : 'دو طرف معادلهٔ اصلی برابرند؛ این آزمایش برای اولین بار در این مرورگر امتیاز گرفت.',
      );
      return;
    }
    const code = result.session.feedback;
    if (code)
      setNotice(`${feedbackText[code]} ${code === 'correct' ? '' : hintFor(eq, result.session)}`);
  }
  function answer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    act({ type: 'answer', input });
  }
  const stepOptions: Action[] =
    session.phase === 'constant'
      ? [
          { operation: 'subtract', amount: eq.b, sides: 'left' },
          { operation: 'subtract', amount: negate(eq.b), sides: 'both' },
          { operation: 'subtract', amount: eq.b, sides: 'both' },
        ]
      : session.phase === 'coefficient'
        ? [
            { operation: 'divide', amount: zero, sides: 'both' },
            { operation: 'multiply', amount: eq.a, sides: 'both' },
            { operation: 'divide', amount: eq.a, sides: 'both' },
            { operation: 'multiply', amount: reciprocal(eq.a), sides: 'both' },
          ]
        : [];
  return (
    <section className={styles.lab} data-puzzle-panel aria-label="کارگاه سازوکار معادله">
      <header data-story className={styles.heading}>
        <div>
          <span>آزمایش سازوکار / نه مرحلهٔ بازی</span>
          <h2>برابری را به حرکت درآور</h2>
          <p>سه تمرین پیوسته برای آزمایش راه‌حل؛ این‌ها هشت مرحلهٔ اصلی نیستند.</p>
        </div>
        <div className={styles.ledger}>
          <strong>{rewards.points}</strong>
          <span>امتیاز ذخیره‌شده</span>
          <small>با بارگذاری دوبارهٔ صفحه پاک می‌شود.</small>
        </div>
      </header>
      <div className={styles.grid}>
        <nav aria-label="آزمایش‌های سازوکار" className={styles.trials}>
          {challenges.map((item, i) => {
            const unlocked = isUnlocked(item.id, workshopOrder, completed);
            return (
              <button
                type="button"
                key={item.id}
                aria-current={selectedId === item.id ? 'step' : undefined}
                onClick={() => select(item.id)}
              >
                <span>
                  ۰{i + 1} /{' '}
                  {unlocked
                    ? completed.has(item.id)
                      ? 'انجام‌شده'
                      : 'آماده'
                    : 'نیازمند آزمایش قبلی'}
                </span>
                <strong>{item.title}</strong>
                <small>{item.objective}</small>
              </button>
            );
          })}
        </nav>
        <div className={styles.puzzle}>
          <span className={styles.label}>
            آزمایش {index + 1} از ۳ · {session.phase === 'complete' ? 'بررسی‌شده' : 'در حال کار'}
          </span>
          <h3>{challenge.title}</h3>
          <p>{challenge.objective}</p>
          <div className={styles.math} dir="ltr">
            <BlockMath math={equationTex(eq)} />
          </div>
          {session.first && (
            <div className={styles.mathStep} dir="ltr" aria-label="نتیجهٔ گام اول">
              <BlockMath math={stateTex(session.first)} />
            </div>
          )}
          {session.second && (
            <div className={styles.mathStep} dir="ltr" aria-label="نتیجهٔ گام دوم">
              <BlockMath math={stateTex(session.second)} />
            </div>
          )}
          {(session.phase === 'constant' || session.phase === 'coefficient') && (
            <div>
              <h4>
                {session.phase === 'constant'
                  ? 'برای حذف ثابت کدام عمل را انجام می‌دهی؟'
                  : 'برای تبدیل ضریب x به ۱ کدام عمل را انجام می‌دهی؟'}
              </h4>
              <div className={styles.choices}>
                {stepOptions.map((action, i) => (
                  <button
                    key={`${session.phase}-${i}`}
                    type="button"
                    onClick={() => act({ type: 'step', action })}
                  >
                    <BidiText>{operationText(action)}</BidiText>
                  </button>
                ))}
              </div>
            </div>
          )}
          {session.phase === 'answer' && (
            <form className={styles.answer} onSubmit={answer}>
              <label htmlFor="workshop-answer">مقدار دقیق x را بنویس؛ مثلاً ۱/۲:</label>
              <div>
                <span className="math">x =</span>
                <input
                  id="workshop-answer"
                  dir="ltr"
                  inputMode="text"
                  autoComplete="off"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit">آزمایش جواب</button>
              </div>
            </form>
          )}
          {session.phase === 'verify' && session.answer && (
            <div className={styles.check}>
              <h4>در معادلهٔ اصلی جای‌گذاری کن</h4>
              <div dir="ltr">
                <BlockMath math={substitutionTex(eq, session.answer)} />
              </div>
              <p>آیا دو طرف معادلهٔ اصلی دقیقاً برابرند؟</p>
              <div className={styles.choices}>
                <button type="button" onClick={() => act({ type: 'verify', claim: 'equal' })}>
                  بله، برابرند؛ تأیید می‌کنم
                </button>
                <button type="button" onClick={() => act({ type: 'verify', claim: 'unequal' })}>
                  نه، برابر نیستند
                </button>
              </div>
            </div>
          )}
          {session.phase === 'complete' && (
            <div className={styles.complete}>
              <strong>راه‌حل و جای‌گذاری درست بود.</strong>
              <p>پاداش این آزمایش فقط یک بار در این مرورگر ذخیره می‌شود.</p>
              {next && (
                <button type="button" onClick={() => select(next.id)}>
                  آزمایش بعدی ←
                </button>
              )}
            </div>
          )}
          <ResetAction
            label="ریست آزمایش‌های سازوکار"
            scope="فقط سه آزمایش و امتیاز آن‌ها پاک می‌شود؛ مرحله‌ها و تنظیمات باقی می‌مانند."
            onConfirm={() => {
              resetWorkshop();
              setSelectedId(challenges[0].id);
              setSession(startPuzzle());
              setInput('');
              setNotice('آزمایش‌ها پاک شدند؛ از ابتدا شروع کن.');
            }}
          />
          <div className={styles.tools}>
            {session.phase !== 'complete' && (
              <button type="button" onClick={() => act({ type: 'hint' })}>
                راهنمای گام {Math.min(3, session.hintLevel + 1)}
              </button>
            )}
            <button type="button" onClick={() => act({ type: 'restart' })}>
              شروع دوبارهٔ همین آزمایش
            </button>
          </div>
          <p role="status" aria-live="polite" className={styles.notice}>
            <BidiText>{notice}</BidiText>
          </p>
          {session.phase === 'answer' && (
            <span className={styles.exactNote}>
              اعشار گرد شده پذیرفته نیست؛ کسرهای هم‌ارز مانند ۲/۴ و ۱/۲ برابرند.
            </span>
          )}
          {session.phase === 'complete' && (
            <div className={styles.mathStep} dir="ltr">
              <BlockMath math={`x = ${tex(solution(eq))}`} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
