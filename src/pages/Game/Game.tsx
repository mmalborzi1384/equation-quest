import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro } from '../../components/ui/PageIntro';
import { landmarks, type Landmark } from '../../data/exploration';
import {
  advance,
  directions,
  keyDirection,
  nearest,
  type Direction,
  type Point,
} from '../../features/exploration/movement';
import { usePreferences } from '../../store/usePreferences';
import styles from './Game.module.css';
import { SceneBoundary } from './SceneBoundary';
import { MechanicsLab } from './MechanicsLab';
import { islandStatus } from '../../features/progression/levels';
import { useLevelProgress } from '../../store/useLevelProgress';
import { ResetAction } from '../../components/ui/ResetAction';

const ExplorationScene = lazy(() => import('../../three/ExplorationScene'));
type Quality = 'low' | 'balanced' | 'high';
function webglAvailable() {
  if (typeof WebGLRenderingContext === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
export default function Game() {
  const [canRender] = useState(webglAvailable);
  const [view, setView] = useState<'3d' | 'map'>(canRender ? '3d' : 'map');
  const [quality, setQuality] = useState<Quality>('balanced');
  const [position, setPosition] = useState<Point>({ x: 0, z: 0 });
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState(
    'از مرکز به یکی از چهار نشان نزدیک شو؛ یا آن را از فهرست انتخاب کن.',
  );
  const completedLevels = useLevelProgress((state) => state.record.rewards.completedIds);

  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const [osReduced, setOsReduced] = useState(
    () =>
      (typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ||
      false,
  );
  const root = useRef<HTMLElement>(null);
  const resumeButton = useRef<HTMLButtonElement>(null);
  const wasPaused = useRef(false);
  const keys = useRef(new Set<Direction>());
  const touch = useRef(new Set<Direction>());
  const positionRef = useRef<Point>(position);
  const nearby = nearest(position, landmarks);
  const inspected = landmarks.find((item) => item.id === selected);
  const active = !paused && inView;

  const inspect = useCallback((landmark: Landmark) => {
    setSelected(landmark.id);
    setMessage(`${landmark.name}: ${landmark.detail} از پیوند مرحله برای ورود به معما استفاده کن.`);
  }, []);
  const inspectNear = useCallback(() => {
    const target = nearest(positionRef.current, landmarks);
    if (target) inspect(target);
    else setMessage('هنوز کنار نشانی نیستی. به یکی از چهار منطقه نزدیک شو یا از فهرست بازدید کن.');
  }, [inspect]);
  const togglePause = useCallback(() => {
    keys.current.clear();
    touch.current.clear();
    setPaused((previous) => !previous);
  }, []);
  function walkOnce(direction: Direction) {
    if (paused) return;
    const next = advance(positionRef.current, new Set([direction]), 0.05);
    positionRef.current = next;
    setPosition(next);
  }
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setOsReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused) {
      requestAnimationFrame(() => resumeButton.current?.focus());
    } else if (wasPaused.current) {
      requestAnimationFrame(() => root.current?.focus());
    }
    wasPaused.current = paused;
  }, [paused]);
  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.01,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function eligible() {
      const target = document.activeElement;
      if (
        target instanceof HTMLElement &&
        target.closest('input, select, textarea, [contenteditable=true]')
      )
        return false;
      return (
        target === document.body ||
        target === document.getElementById('main-content') ||
        Boolean(target && root.current?.contains(target))
      );
    }
    function down(event: KeyboardEvent) {
      if (!eligible() || event.altKey || event.ctrlKey || event.metaKey) return;
      const direction = keyDirection(event.key);
      if (direction) {
        event.preventDefault();
        if (!paused) keys.current.add(direction);
      } else if (event.key.toLowerCase() === 'e' && !event.repeat && !paused) {
        event.preventDefault();
        inspectNear();
      } else if (event.key === 'Escape' && !event.repeat) {
        event.preventDefault();
        togglePause();
      }
    }
    function up(event: KeyboardEvent) {
      const direction = keyDirection(event.key);
      if (direction) keys.current.delete(direction);
    }
    function reset() {
      keys.current.clear();
      touch.current.clear();
    }
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', reset);
    };
  }, [paused, inspectNear, togglePause]);
  useEffect(() => {
    if (!active) return;
    let frame = 0,
      previous = 0;
    function tick(timestamp: number) {
      if (previous) {
        const pressed = new Set([...keys.current, ...touch.current]);
        const next = advance(positionRef.current, pressed, (timestamp - previous) / 1000);
        if (next !== positionRef.current) {
          positionRef.current = next;
          setPosition(next);
        }
      }
      previous = timestamp;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  const hasScene = canRender && view === '3d';
  return (
    <>
      <PageIntro
        eyebrow="کارگاه کاوش / فاز ۷"
        title="ماجراجویی از اینجا شکل می‌گیرد"
        description="در این کارگاه می‌توانی در یک جزیرهٔ سه‌بعدی قدم بزنی و چهار نشان را بررسی کنی. چهار نشان، ورودی هشت مرحلهٔ قابل‌بازی هستند. زیر نقشه نیز سه آزمایش مستقل سازوکار با امتیاز ذخیره‌شده در همین مرورگر در دسترس است."
      >
        <Link to="/world">نقشهٔ چهار منطقه</Link>
        <Link to="/learning">مرور درس‌ها</Link>
        <button
          type="button"
          onClick={() => document.getElementById('mechanics-lab')?.scrollIntoView()}
        >
          شروع آزمایش‌های معادله ↓
        </button>
      </PageIntro>
      <div className={styles.resetProgress}>
        <ResetAction
          label="ریست پیشرفت مرحله‌ها"
          scope="فقط مرحله‌ها، امتیاز و کریستال آن‌ها پاک می‌شوند؛ آزمایش‌های کارگاه و تنظیمات می‌مانند."
          onConfirm={useLevelProgress.getState().reset}
        />
      </div>
      <section
        ref={root}
        tabIndex={-1}
        className={styles.workshop}
        aria-label="کارگاه کاوش"
        data-quality={quality}
      >
        <header data-story className={styles.heading}>
          <div>
            <span>کشف / ۰۱</span>
            <h2>جزیرهٔ تعادل</h2>
            <p>چهار نشان، هشت مرحله؛ هر منطقه پس از حل و بررسی هر دو مرحله روشن می‌شود.</p>
          </div>
          <div className={styles.options}>
            {canRender && (
              <>
                <label htmlFor="scene-quality">کیفیت نمایش</label>
                <select
                  id="scene-quality"
                  value={quality}
                  onChange={(event) => setQuality(event.target.value as Quality)}
                >
                  <option value="low">کم‌مصرف</option>
                  <option value="balanced">متعادل</option>
                  <option value="high">بالا</option>
                </select>
              </>
            )}
            {canRender && (
              <button type="button" onClick={() => setView(view === '3d' ? 'map' : '3d')}>
                {view === '3d' ? 'نمای متنی نقشه' : 'نمای سه‌بعدی'}
              </button>
            )}
            <button type="button" aria-pressed={paused} onClick={togglePause}>
              {paused ? 'ادامهٔ کاوش' : 'وقفه در کاوش'}
            </button>
          </div>
        </header>
        <div className={styles.grid}>
          <div>
            <div className={styles.stage} data-view={hasScene ? '3d' : 'map'}>
              {hasScene ? (
                <SceneBoundary
                  onFailure={() => {
                    setView('map');
                    setMessage('نمای سه‌بعدی با خطا روبه‌رو شد؛ نقشهٔ متنی و کنترل‌ها فعال‌اند.');
                  }}
                >
                  <Suspense
                    fallback={
                      <p role="status" className={styles.loading}>
                        در حال آماده‌سازی جزیرهٔ سه‌بعدی…
                      </p>
                    }
                  >
                    <ExplorationScene
                      completedLevels={completedLevels}
                      position={position}
                      quality={quality}
                      selected={selected}
                      reducedMotion={reduceMotion || osReduced}
                      paused={!active}
                      onInspect={(id) => {
                        const station = landmarks.find((item) => item.id === id);
                        if (station && !paused) inspect(station);
                      }}
                      onContextLost={() => {
                        setView('map');
                        setMessage(
                          'ارتباط با پردازندهٔ گرافیکی قطع شد؛ نقشهٔ متنی و همهٔ کنترل‌ها همچنان فعال‌اند.',
                        );
                      }}
                    />
                  </Suspense>
                </SceneBoundary>
              ) : (
                <div className={styles.fallback} aria-label="نقشهٔ متنی قابل استفاده بدون وب‌جی‌ال">
                  <span className={styles.mapTitle}>چهار راه / نمای بالا</span>
                  {landmarks.map((item, i) => (
                    <button
                      type="button"
                      key={item.id}
                      disabled={paused}
                      className={styles[`point${i}`]}
                      onClick={() => inspect(item)}
                    >
                      {item.name}
                    </button>
                  ))}
                  <span
                    className={styles.avatar}
                    style={{
                      left: `${50 + (position.x / 12) * 80}%`,
                      top: `${50 + (position.z / 12) * 80}%`,
                    }}
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              )}
              {paused && (
                <div className={styles.pauseOverlay} role="region" aria-label="کاوش متوقف شده است">
                  <h3>کاوش متوقف شد</h3>
                  <p>جای تو محفوظ است؛ هیچ پیشرفتی ثبت نمی‌شود.</p>
                  <button ref={resumeButton} type="button" onClick={togglePause}>
                    ادامهٔ حرکت
                  </button>
                  <Link to="/world">بازگشت به نقشه</Link>
                </div>
              )}
            </div>
            {!canRender && (
              <p className={styles.fallbackNote} role="status">
                وب‌جی‌ال در دسترس نیست؛ نقشهٔ متنی، حرکت و بازدید از هر چهار نشان همچنان کار می‌کند.
              </p>
            )}
            <div className={styles.dock}>
              <div>
                <h3>جوی‌استیک لمسی / کنترل جهت</h3>
                <div className={styles.pad}>
                  {(Object.keys(directions) as Direction[]).map((direction) => (
                    <button
                      key={direction}
                      type="button"
                      disabled={paused}
                      aria-label={
                        { north: 'بالا', south: 'پایین', east: 'راست', west: 'چپ' }[direction]
                      }
                      className={styles[direction]}
                      onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        touch.current.add(direction);
                      }}
                      onPointerUp={() => touch.current.delete(direction)}
                      onPointerCancel={() => touch.current.delete(direction)}
                      onClick={() => walkOnce(direction)}
                    >
                      {{ north: '↑', south: '↓', east: '→', west: '←' }[direction]}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.actions}>
                <button type="button" disabled={paused || !nearby} onClick={inspectNear}>
                  بررسی نشان نزدیک / E
                </button>
                <span aria-live="polite">
                  {nearby ? `نزدیک: ${nearby.name}` : 'هنوز کنار نشانی نیستی'}
                </span>
                <small>
                  حرکت: WASD یا کلیدهای جهت‌نما · توقف: Escape · در موبایل: نگه‌داشتن جهت
                </small>
              </div>
            </div>
          </div>
          <aside className={styles.sidebar} aria-label="نشان‌های چهار منطقه">
            <span className={styles.kicker}>نقشهٔ سرنخ‌ها / ۴ منطقه</span>
            <p>می‌توانی بدون حرکت یا بدون نمایش سه‌بعدی نیز هر نشان را از فهرست بازدید کنی.</p>
            <div className={styles.landmarks}>
              {landmarks.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  disabled={paused}
                  aria-pressed={selected === item.id}
                  onClick={() => inspect(item)}
                >
                  <span>۰{i + 1}</span>
                  <strong>{item.name}</strong>
                  <small>{item.detail}</small>
                </button>
              ))}
            </div>
            <p className={styles.coordinates} dir="ltr">
              X {position.x.toFixed(1)} · Z {position.z.toFixed(1)}
            </p>
            <p role="status" aria-live="polite" className={styles.message}>
              {message}
            </p>
            {inspected && (
              <div className={styles.inspection}>
                <h3>{inspected.name}</h3>
                <p>{inspected.detail}</p>
                <div>
                  <Link to={`/learning/${inspected.lesson}`}>درس مرتبط ←</Link>
                  <Link to={`/game/level/${inspected.level}`}>بازی مرحلهٔ {inspected.level} ←</Link>
                </div>
                <small>
                  {islandStatus(inspected.level, completedLevels) === 'restored'
                    ? 'هر دو مرحلهٔ این منطقه کامل شده‌اند.'
                    : 'برای باز شدن مرحله‌های بعد، جواب‌ها را در معادلهٔ اصلی بررسی کن.'}
                </small>
              </div>
            )}
          </aside>
        </div>
      </section>
      <div data-story id="mechanics-lab">
        <MechanicsLab />
      </div>
    </>
  );
}
