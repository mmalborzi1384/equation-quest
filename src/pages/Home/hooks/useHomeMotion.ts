import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreferences } from '../../../store/usePreferences';

// Decorative enhancement only: no content is hidden while animation is unavailable.
export function useHomeMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = usePreferences((state) => state.reduceMotion);

  useEffect(() => {
    const element = root.current;
    if (!element || typeof window.matchMedia !== 'function') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: gsap.Context | undefined;
    let disposed = false;

    function syncMotion() {
      context?.revert();
      context = undefined;
      if (!element || reduceMotion || preference.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const scene = element.querySelector<HTMLElement>('[data-scene]');
        const hero = element.querySelector<HTMLElement>('[data-hero]');
        if (scene && hero && window.innerWidth > 900) {
          gsap.to(scene, {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
          });
        }
      }, element);
    }

    syncMotion();
    preference.addEventListener('change', syncMotion);
    void document.fonts?.ready.then(() => {
      if (!disposed && context) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      preference.removeEventListener('change', syncMotion);
      context?.revert();
    };
  }, [reduceMotion]);

  return root;
}
