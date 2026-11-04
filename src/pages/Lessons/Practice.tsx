import { useState, type FormEvent } from 'react';
import { BlockMath } from 'react-katex';
import type { Lesson } from '../../data/lessons';
import { generate } from '../../features/equation-engine/generate';
import {
  equationTex,
  fromStrings,
  grade,
  operationText,
  solution,
  stateTex,
  step,
  substitutionTex,
  type Action,
  type FeedbackCode,
  type Stage,
} from '../../features/equation-engine/equation';
import {
  equals,
  negate,
  one,
  reciprocal,
  tex,
  text,
  zero,
} from '../../features/equation-engine/rational';
import styles from './TopicRoute.module.css';
import { BidiText } from './BidiText';
import { ResetAction } from '../../components/ui/ResetAction';
import { useFractionPractice } from '../../store/useFractionPractice';
import type { Rational } from '../../features/equation-engine/rational';
import { useMotionList } from '../../features/motion/useMotionList';

const explanations: Record<FeedbackCode, string> = {
  correct: 'درست است: همان عمل در هر دو طرف انجام شد و برابری حفظ شد.',
  'unilateral-change':
    'فقط یک طرف را تغییر دادی؛ برای حفظ برابری، همان عمل را روی هر دو طرف انجام بده.',
  'wrong-inverse': 'این عمل، جملهٔ موردنظر را حذف نمی‌کند. به علامت و عمل وارون دقت کن.',
  'division-by-zero': 'تقسیم بر صفر تعریف نشده است؛ ضریب x در این تمرین صفر نیست.',
  'zero-denominator': 'مخرج نمی‌تواند صفر باشد؛ یک کسر معتبر بنویس.',
  'invalid-input':
    'فقط عدد صحیح یا کسر دقیق مانند ۲/۳ (با مخرج غیرصفر) بنویس؛ اعشار گرد شده پذیرفته نیست.',
  'premature-rounding': 'این تمرین جواب دقیق کسری می‌خواهد؛ به‌جای اعشار گرد شده، صورت/مخرج بنویس.',
  incorrect:
    'جای‌گذاری این عدد در معادلهٔ اصلی، دو مقدار متفاوت می‌دهد. علامت‌ها و تقسیم را دوباره بررسی کن.',
  'verification-mismatch': 'دو طرف معادلهٔ اصلی برابر نشده‌اند؛ به گام‌های حل برگرد.',
};
function choices(
  stage: Stage,
  a: ReturnType<typeof fromStrings>['a'],
  b: ReturnType<typeof fromStrings>['b'],
): Action[] {
  if (stage === 'constant')
    return [
      { operation: 'subtract', amount: b, sides: 'left' },
      { operation: 'subtract', amount: negate(b), sides: 'both' },
      { operation: 'subtract', amount: b, sides: 'both' },
    ];
  return [
    { operation: 'divide', amount: zero, sides: 'both' },
    { operation: 'multiply', amount: a, sides: 'both' },
    { operation: 'divide', amount: a, sides: 'both' },
    { operation: 'multiply', amount: reciprocal(a), sides: 'both' },
  ];
}
export function Practice({ lesson, fractions }: { lesson: Lesson; fractions: boolean }) {
  const ledgerRef = useMotionList<HTMLDivElement>();
  const practiceRecord = useFractionPractice((state) => state.record);
  const markVerified = useFractionPractice((state) => state.markVerified);
  const resetPractice = useFractionPractice((state) => state.reset);
  const [index, setIndex] = useState(() =>
    fractions ? useFractionPractice.getState().record.verifiedCount : 0,
  );
  const [acceptedAnswer, setAcceptedAnswer] = useState<Rational | null>(null);
  const [phase, setPhase] = useState<'constant' | 'coefficient' | 'answer' | 'verify' | 'done'>(
    'constant',
  );
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(0);
  const eq =
    index < lesson.exercise.length
      ? fromStrings(...lesson.exercise[index])
      : fractions
        ? generate(index - lesson.exercise.length, 'fraction')
        : fromStrings(...lesson.exercise[index % lesson.exercise.length]);
  const currentStage = phase === 'constant' || phase === 'coefficient' ? phase : null;
  const status =
    phase === 'constant'
      ? 1
      : phase === 'coefficient'
        ? 2
        : phase === 'answer'
          ? 3
          : phase === 'verify'
            ? 4
            : 5;
  const hint =
    phase === 'constant'
      ? [
          `به جملهٔ ثابت در سمت x نگاه کن.`,
          `این جمله ${text(eq.b)} است؛ کدام عمل آن را صفر می‌کند؟`,
          'یکی از عمل‌های دوطرفه را انتخاب کن که ثابت سمت چپ را حذف کند.',
        ]
      : phase === 'coefficient'
        ? [
            `ضریب x هنوز ${text(eq.a)} است.`,
            'برای تبدیل ضریب به ۱، بر ضریب غیرصفر تقسیم کن یا در وارون آن ضرب کن.',
            'تقسیم بر صفر یا تغییر یک‌طرفه راه‌حل نیست.',
          ]
        : [
            'در معادلهٔ اصلی مقدار را آزمایش کن؛ کسر هم‌ارز را هم می‌توانی بنویسی.',
            'عدد صحیح یا صورت/مخرج دقیق وارد کن؛ علامت منفی را فراموش نکن.',
            'از مقدار سمت راست، ثابت را کم و سپس بر ضریب تقسیم کن.',
          ];
  function tryAction(action: Action) {
    if (!currentStage) return;
    const result = step(eq, currentStage, action);
    if (result.code === 'correct') {
      setFeedback(
        `${explanations.correct} ${currentStage === 'constant' ? 'جملهٔ ثابت حذف شد.' : 'ضریب x به ۱ رسید.'}`,
      );
      setMistakes(0);
      setShowHint(0);
      setPhase(currentStage === 'constant' && !equals(eq.a, one) ? 'coefficient' : 'answer');
    } else {
      setMistakes((n) => n + 1);
      setFeedback(
        `${explanations[result.code]} ${mistakes > 0 ? hint[Math.min(mistakes - 1, 2)] : ''}`,
      );
    }
  }
  function tryAnswer(event: FormEvent) {
    event.preventDefault();
    const result = grade(eq, input);
    if (result.code === 'correct') {
      setAcceptedAnswer(result.answer!);
      setPhase('verify');
      setMistakes(0);
      setShowHint(0);
      setFeedback(
        'عدد درست است؛ هنوز کار تمام نشده. آن را در معادلهٔ اصلی جای‌گذاری و دو طرف را بررسی کن.',
      );
    } else {
      setMistakes((n) => n + 1);
      setFeedback(
        `${explanations[result.code]} ${mistakes > 0 ? hint[Math.min(mistakes - 1, 2)] : ''}`,
      );
    }
  }
  function next() {
    setIndex((n) => n + 1);
    setPhase('constant');
    setInput('');
    setAcceptedAnswer(null);
    setFeedback('');
    setMistakes(0);
    setShowHint(0);
  }
  return (
    <section data-story className={styles.practice} aria-labelledby="practice-title">
      <div className={styles.sectionHeading}>
        <span>۰۳ / نوبت شما</span>
        <h2 id="practice-title">گام‌ها را خودت بساز</h2>
      </div>
      <p>
        تمرین {index + 1} · مرحلهٔ {status}. برای رسیدن به جواب، هر دو طرف را تغییر بده و سپس در
        معادلهٔ اصلی بررسی کن.
      </p>
      <div className={styles.mathCard} dir="ltr">
        <BlockMath math={equationTex(eq)} />
      </div>
      <div ref={ledgerRef} aria-live="polite">
        {status > 1 && (
          <div className={styles.stepResult} dir="ltr" aria-label="نتیجهٔ گام اول">
            <BlockMath
              math={stateTex(
                step(eq, 'constant', { operation: 'subtract', amount: eq.b, sides: 'both' }).state!,
              )}
            />
          </div>
        )}
        {(phase === 'verify' || phase === 'done') && (
          <div className={styles.stepResult} dir="ltr" aria-label="نتیجهٔ گام دوم">
            <BlockMath math={`x = ${tex(solution(eq))}`} />
          </div>
        )}
      </div>
      {currentStage && (
        <div>
          <h3>
            {currentStage === 'constant'
              ? 'چگونه جملهٔ ثابت را حذف می‌کنی؟'
              : 'چگونه ضریب x را ۱ می‌کنی؟'}
          </h3>
          <div className={styles.choices}>
            {choices(currentStage, eq.a, eq.b).map((action, i) => (
              <button key={`${currentStage}-${i}`} type="button" onClick={() => tryAction(action)}>
                <BidiText>{operationText(action)}</BidiText>
              </button>
            ))}
          </div>
        </div>
      )}
      {phase === 'answer' && (
        <form onSubmit={tryAnswer} className={styles.answerForm}>
          <label htmlFor="exact-answer">حالا مقدار دقیق x را بنویس (مثلاً ۱/۲):</label>
          <div>
            <span className="math" dir="ltr">
              x =
            </span>
            <input
              id="exact-answer"
              dir="ltr"
              inputMode="text"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">بررسی جواب</button>
          </div>
        </form>
      )}
      {phase === 'verify' && (
        <div className={styles.verify}>
          <h3>بازگشت به معادلهٔ اصلی</h3>
          <p>این جای‌گذاری را بخوان: آیا مقدار دو طرف دقیقاً یکسان است؟</p>
          <div dir="ltr">
            <BlockMath math={substitutionTex(eq, solution(eq))} />
          </div>
          <div className={styles.choices}>
            <button
              type="button"
              onClick={() => {
                if (fractions && acceptedAnswer) markVerified(index, acceptedAnswer);
                setPhase('done');
                setFeedback(
                  'درست است: با جای‌گذاری جواب در معادلهٔ اصلی، دو طرف دقیقاً برابر شدند.',
                );
              }}
            >
              برابرند؛ جواب تأیید می‌شود
            </button>
            <button
              type="button"
              onClick={() =>
                setFeedback(
                  'در معادلهٔ اصلی هر دو طرف برابر شده‌اند. حاصل ضرب و جمع را دوباره بخوان؛ بعد نتیجه بگیر.',
                )
              }
            >
              برابر نیستند؛ جواب رد می‌شود
            </button>
          </div>
        </div>
      )}
      {phase === 'done' && (
        <button type="button" className={styles.nextButton} onClick={next}>
          {fractions ? 'تمرین کسری بعدی' : 'یک تمرین دیگر'} ←
        </button>
      )}
      {phase !== 'done' && phase !== 'verify' && (
        <button
          type="button"
          className={styles.hintButton}
          onClick={() => setShowHint((n) => Math.min(3, n + 1))}
        >
          راهنمای گام {Math.min(3, showHint + 1)}
        </button>
      )}
      {showHint > 0 && phase !== 'done' && (
        <p className={styles.hint}>
          راهنما: <BidiText>{hint[showHint - 1]}</BidiText>
        </p>
      )}
      {fractions && (
        <div>
          <p>{practiceRecord.verifiedCount} تمرین کسری بررسی‌شده در این مرورگر ذخیره شده است.</p>
          <ResetAction
            label="ریست تمرین‌های کسری"
            scope="فقط تعداد تمرین‌های کسری، جای ادامه و آخرین جواب دقیق پاک می‌شود."
            onConfirm={() => {
              resetPractice();
              setIndex(0);
              setPhase('constant');
              setInput('');
              setAcceptedAnswer(null);
              setFeedback('تمرین‌های کسری پاک شدند.');
              setMistakes(0);
              setShowHint(0);
            }}
          />
        </div>
      )}
      <p role="status" aria-live="polite" className={styles.feedback}>
        {feedback}
      </p>
    </section>
  );
}
