import { useEffect, useState } from 'react';
import { usePreferences } from '../../store/usePreferences';

/** True only when BOTH the stored preference and the OS allow spatial motion. */
export function useMotionAllowed() {
  const reduceMotion = usePreferences((state) => state.reduceMotion);
  const [osReduced, setOsReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  );

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setOsReduced(media.matches);
    update();
    // Safari < 14 exposed addListener/removeListener only.
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return !reduceMotion && !osReduced;
}
