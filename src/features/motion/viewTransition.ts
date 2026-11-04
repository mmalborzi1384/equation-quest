import { flushSync } from 'react-dom';
import type { MouseEvent } from 'react';
import type { NavigateFunction } from 'react-router-dom';

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/** HashRouter is declarative, so react-router's `viewTransition` prop is not available here. */
export function supportsViewTransitions() {
  return (
    typeof document !== 'undefined' &&
    typeof (document as ViewTransitionDocument).startViewTransition === 'function'
  );
}

/**
 * Capture-phase handler for header navigation. Wraps the router update in a native
 * View Transition so the DOM change lands inside the transition callback.
 * Falls back to a plain navigation whenever motion is disabled or the API throws.
 */
export function handleRouteTransition(
  event: MouseEvent<HTMLElement>,
  navigate: NavigateFunction,
  enabled: boolean,
  onNavigate?: () => void,
) {
  if (!enabled || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#/"]');
  const href = anchor?.getAttribute('href');
  if (!href) return;

  event.preventDefault();
  // The Link/NavLink click handler must not navigate a second time.
  event.stopPropagation();
  onNavigate?.();

  const to = href.slice(1);
  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition) {
    navigate(to);
    return;
  }
  let navigated = false;
  const update = () => {
    if (navigated) return;
    navigated = true;
    flushSync(() => navigate(to));
  };
  try {
    doc.startViewTransition(update);
  } catch {
    if (!navigated) navigate(to);
  }
}
