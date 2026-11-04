import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotionAllowed } from '../../features/motion/useMotionAllowed';

/**
 * The single signature GSAP timeline in the product. The module is imported only
 * by the lazily-loaded #/intro route, so GSAP never enters the Home chunk.
 * useLayoutEffect sets the initial state before first paint, so there is no
 * flash of visible-then-hidden content. With reduced motion, no JS, or a
 * failed route, the balanced static state is the fallback.
 */
export function useIntroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !allowed) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      timeline
        .from('[data-intro-line]', {
          y: 14,
          opacity: 0,
          duration: 0.55,
          stagger: 0.09,
          clearProps: 'all',
        })
        .from('[data-intro-scene]', { scale: 1.06, duration: 1.1, clearProps: 'all' }, 0);
    }, element);

    return () => context.revert();
  }, [allowed]);

  return root;
}
