import { useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useMotionAllowed } from './useMotionAllowed';

/**
 * Animates only the addition/removal of step lines in an equation ledger.
 * Motion is disabled for both the OS and the stored reduced-motion preference.
 * Lazy lesson/level routes only: never import this from Home.
 */
export function useMotionList<T extends HTMLElement>() {
  const allowed = useMotionAllowed();
  const [ref, setEnabled] = useAutoAnimate<T>({ duration: 240, easing: 'ease-out' });
  useEffect(() => {
    setEnabled(allowed);
  }, [allowed, setEnabled]);
  return ref;
}
