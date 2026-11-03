import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { ResetAction } from '../../components/ui/ResetAction';
import { stages } from '../../features/level-manager/stages';
import { useLevelProgress } from '../../store/useLevelProgress';
import { useWorkshopProgress } from '../../store/useWorkshopProgress';
import { useFractionPractice } from '../../store/useFractionPractice';
import { usePreferences } from '../../store/usePreferences';
import { clearAllSaved } from '../../store/clearAllSaved';
import styles from './Progress.module.css';

export default function Progress() {
  const record = useLevelProgress((s) => s.record);
  const workshop = useWorkshopProgress((s) => s.rewards);
  const practice = useFractionPractice((s) => s.record);
  const reduceMotion = usePreferences((s) => s.reduceMotion);
  const cleared = new Set(record.rewards.completedIds);
  const crystals = cleared.size;
  const achievements = [
    cleared.has('02') && 'جزیرهٔ تعادل بازسازی شد',
    cleared.has('06') && 'کسرها را دقیق حل کردی',
    cleared.has('08') && 'هر هشت مرحله بررسی شد',
  ].filter((value): value is string => Boolean(value));
  return (
    <>
      <PageIntro
        eyebrow="دفتر مسیر / پیشرفت من"
        title="راهی که واقعاً پیموده‌ای"
        description="پیشرفت در مرورگر همین دستگاه ذخیره می‌شود؛ بدون حساب کاربری یا سرور. پاک‌کردن داده‌های مرورگر آن را از بین می‌برد."
      >
        <Link to="/world">بازگشت به مرحله‌ها</Link>
        <Link to="/learning/fractions">تمرین کسرها</Link>
      </PageIntro>
      <section className={styles.dashboard} aria-label="وضعیت پیشرفت ذخیره‌شده">
        <header className={styles.summary}>
          <span>{cleared.size} از ۸ مرحلهٔ بررسی‌شده</span>
          <strong>{record.rewards.points} امتیاز (XP)</strong>
          <span>{crystals} کریستالِ مرحلهٔ تأییدشده</span>
        </header>
        <div className={styles.grid}>
          <article data-story>
            <h2>مرحله‌ها</h2>
            {cleared.size === 0 ? (
              <p>هنوز مرحله‌ای بررسی و ذخیره نشده است. از مرحلهٔ ۰۱ شروع کن.</p>
            ) : (
              <p>جواب هر مرحله پس از جای‌گذاری در معادلهٔ اصلی ثبت شده است.</p>
            )}
            <ol>
              {stages.map((stage) => (
                <li key={stage.id}>
                  <span>
                    مرحلهٔ {stage.id} · {cleared.has(stage.id) ? 'کامل‌شده' : 'در انتظار'}
                  </span>
                  {cleared.has(stage.id) && record.bestAttempts[stage.id] !== undefined && (
                    <small>بهترین تلاش: {record.bestAttempts[stage.id]} تلاش</small>
                  )}
                </li>
              ))}
            </ol>
            {record.lastLevelId && (
              <Link to={`/game/level/${record.lastLevelId}`}>
                بازدید دوباره از آخرین مرحلهٔ تأییدشده ←
              </Link>
            )}
            <ResetAction
              label="ریست پیشرفت مرحله‌ها"
              scope="تکمیل هشت مرحله، امتیاز، کریستال، پاسخ‌های دقیق، بهترین تلاش و آخرین مرحله حذف می‌شود؛ تنظیمات و تمرین‌ها می‌مانند."
              onConfirm={useLevelProgress.getState().reset}
            />
          </article>
          <article data-story>
            <h2>آزمایش سازوکار</h2>
            <p>
              {workshop.completedIds.length} از ۳ آزمایش · {workshop.points} امتیاز جدا از مرحله‌ها
            </p>
            <Link to="/game">بازگشت به کارگاه ←</Link>
            <ResetAction
              label="ریست آزمایش‌ها"
              scope="فقط سه آزمایش سازوکار و امتیاز آن‌ها حذف می‌شود."
              onConfirm={useWorkshopProgress.getState().reset}
            />
          </article>
          <article data-story>
            <h2>تمرین کسری</h2>
            <p>{practice.verifiedCount} تمرین کسری با بررسی جواب در معادلهٔ اصلی ثبت شده است.</p>
            {practice.lastAnswer && (
              <p>
                آخرین جواب دقیق:{' '}
                <bdi dir="ltr">
                  {practice.lastAnswer.numerator}/{practice.lastAnswer.denominator}
                </bdi>
              </p>
            )}
            <Link to="/learning/fractions">ادامهٔ تمرین ←</Link>
            <ResetAction
              label="ریست تمرین‌های کسری"
              scope="تعداد تمرین‌های بررسی‌شده، آخرین جواب دقیق و جای ادامهٔ تمرین پاک می‌شود."
              onConfirm={useFractionPractice.getState().reset}
            />
          </article>
          <article data-story>
            <h2>تنظیمات نمایش</h2>
            <p>حرکت کمتر: {reduceMotion ? 'روشن' : 'خاموش'}</p>
            <ResetAction
              label="ریست تنظیم حرکت کمتر"
              scope="فقط تنظیم ذخیره‌شدهٔ حرکت کمتر به حالت خاموش بازمی‌گردد."
              onConfirm={usePreferences.getState().reset}
            />
          </article>
        </div>
        <section data-story className={styles.achievements} aria-label="دستاوردهای واقعی">
          <h2>دستاوردها</h2>
          {achievements.length ? (
            <ul>
              {achievements.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : (
            <p>هنوز دستاوردی ثبت نشده؛ با حل مرحله‌ها به‌دست می‌آیند.</p>
          )}
        </section>
        <div data-story className={styles.danger}>
          <h2>حذف همهٔ داده‌های این برنامه</h2>
          <p>
            فقط پیشرفت مرحله‌ها، آزمایش‌ها، تمرین‌های کسری و تنظیم حرکت کمتر در این مرورگر حذف
            می‌شوند؛ داده‌های سایت‌های دیگر دست‌نخورده می‌مانند.
          </p>
          <ResetAction
            label="حذف همهٔ داده‌های ذخیره‌شده"
            scope="تمام چهار دستهٔ دادهٔ خود این برنامه پاک می‌شود؛ بازگشت به وضعیت قبلی ممکن نیست."
            onConfirm={clearAllSaved}
          />
        </div>
        <small className={styles.storageNote}>
          داده‌های این دستگاه به دستگاه دیگر منتقل نمی‌شوند. ذخیرهٔ محلی نسخه‌دار است و دادهٔ ناسالم
          به وضعیت امن بازمی‌گردد.
        </small>
      </section>
    </>
  );
}
