import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MouseEvent } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { usePreferences } from '../../store/usePreferences';
import { useMotionAllowed } from './useMotionAllowed';
import { handleRouteTransition, supportsViewTransitions } from './viewTransition';

// jsdom has no View Transitions API; patch it through a loose shape because the
// DOM lib declares a richer ViewTransition return type than a test stub needs.
const doc = document as unknown as { startViewTransition?: unknown };

function installViewTransition() {
  const startViewTransition = vi.fn((callback: () => void) => {
    callback();
    return { finished: Promise.resolve() };
  });
  Object.defineProperty(doc, 'startViewTransition', {
    configurable: true,
    value: startViewTransition,
  });
  return startViewTransition;
}

function fakeMatchMedia(matches: boolean) {
  return vi.fn().mockImplementation(() => ({
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

function clickEvent(target: HTMLElement) {
  return {
    defaultPrevented: false,
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    target,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  } as unknown as MouseEvent<HTMLElement>;
}

describe('motion permission', () => {
  beforeEach(() => {
    usePreferences.setState({ reduceMotion: false });
    vi.stubGlobal('matchMedia', fakeMatchMedia(false));
    Reflect.deleteProperty(doc, 'startViewTransition');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('allows motion only when both the OS and the stored preference agree', () => {
    expect(renderHook(() => useMotionAllowed()).result.current).toBe(true);

    vi.stubGlobal('matchMedia', fakeMatchMedia(true));
    expect(renderHook(() => useMotionAllowed()).result.current).toBe(false);

    vi.stubGlobal('matchMedia', fakeMatchMedia(false));
    usePreferences.setState({ reduceMotion: true });
    expect(renderHook(() => useMotionAllowed()).result.current).toBe(false);
  });

  it('reports View Transition support from the document', () => {
    expect(supportsViewTransitions()).toBe(false);
    installViewTransition();
    expect(supportsViewTransitions()).toBe(true);
  });

  it('leaves normal links alone when motion is disabled', () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#/world');
    document.body.append(anchor);
    const event = clickEvent(anchor);
    const navigate = vi.fn() as unknown as NavigateFunction;

    handleRouteTransition(event, navigate, false);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigates once, inside a View Transition when available', () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#/world');
    document.body.append(anchor);
    const navigate = vi.fn() as unknown as NavigateFunction;
    const startViewTransition = installViewTransition();
    const event = clickEvent(anchor);

    handleRouteTransition(event, navigate, true);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(event.stopPropagation).toHaveBeenCalledOnce();
    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledExactlyOnceWith('/world');
  });
});
