import { useEffect } from 'react';

/** Visual-only enhancement: semantic text and controls remain in the DOM before observation. */
export function useStoryReveal(route: string, reduceMotion: boolean) {
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (
      !main ||
      reduceMotion ||
      typeof window.IntersectionObserver !== 'function' ||
      typeof window.MutationObserver !== 'function'
    )
      return;
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (preference?.matches) return;
    const seen = new WeakSet<Element>();
    const segmentCount = (text: string) =>
      typeof Intl.Segmenter === 'function'
        ? [...new Intl.Segmenter('fa', { granularity: 'grapheme' }).segment(text)].length
        : Array.from(text).length;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          section.dataset.storyEntered = 'true';
          const title = section.querySelector<HTMLElement>('[data-reveal], h2');
          if (title && !title.querySelector('.katex, .math')) {
            title.style.setProperty(
              '--story-steps',
              `${Math.min(28, Math.max(9, segmentCount(title.textContent || '')))}`,
            );
            title.dataset.storyType = 'true';
          }
          observer.unobserve(section);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );
    const scan = () => {
      main.querySelectorAll<HTMLElement>('[data-narrative], [data-story]').forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);
        observer.observe(node);
      });
    };
    const changes = new MutationObserver(scan);
    changes.observe(main, { childList: true, subtree: true });
    scan();
    const stop = () => {
      if (!preference?.matches) return;
      observer.disconnect();
      main
        .querySelectorAll<HTMLElement>('[data-story-entered], [data-story-type]')
        .forEach((node) => {
          delete node.dataset.storyEntered;
          delete node.dataset.storyType;
        });
    };
    preference?.addEventListener('change', stop);
    return () => {
      changes.disconnect();
      observer.disconnect();
      preference?.removeEventListener('change', stop);
    };
  }, [route, reduceMotion]);
}
