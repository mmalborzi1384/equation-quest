import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../app/App';
import { topics } from '../data/topics';
import { levels } from '../data/levels';

beforeEach(() => {
  window.history.replaceState(null, '', '/#/');
  window.scrollTo = vi.fn();
});

describe('Phase 2 route structure', () => {
  it('renders Persian RTL home, shared links and a working learning navigation', async () => {
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /سرزمین/ })).toBeInTheDocument();
    expect(screen.getByRole('main').parentElement).toHaveAttribute('dir', 'rtl');
    fireEvent.click(screen.getByRole('link', { name: /آغاز مسیر یادگیری/ }));
    expect(await screen.findByRole('heading', { level: 1, name: /از برابری/ })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/learning');
  });

  it.each(topics)('supports a direct hash link to the $title route', async (topic) => {
    window.history.replaceState(null, '', `/#/learning/${topic.id}`);
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: topic.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'گام‌ها را خودت بساز' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'همهٔ موضوع‌ها' })).toHaveAttribute(
      'href',
      '#/learning',
    );
  });

  it.each([
    ['world', /چهار راه/],
    ['game', /ماجراجویی/],
    ['progress', /ردّ قدم/],
  ])('renders a distinct /%s route with working navigation', async (path, title) => {
    window.history.replaceState(null, '', `/#/${path}`);
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'اکویشن کوئست، خانه' })).toHaveAttribute('href', '#/');
  });

  it.each(levels)('deep-links to level $id: $title', async (level) => {
    window.history.replaceState(null, '', `/#/game/level/${level.id}`);
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: level.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'دیدن موضوع مرتبط' })).toHaveAttribute(
      'href',
      `#/learning/${level.topic}`,
    );
  });

  it('renders each level introduction and rejects an invalid level', async () => {
    window.history.replaceState(null, '', '/#/game/level/06');
    const { unmount } = render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'اتاق ضرب و تقسیم' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'دیدن موضوع مرتبط' })).toHaveAttribute(
      'href',
      '#/learning/fractions',
    );
    unmount();
    window.history.replaceState(null, '', '/#/game/level/99');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'اینجا راهی نیست.' }),
    ).toBeInTheDocument();
  });

  it('offers a useful not-found route', async () => {
    window.history.replaceState(null, '', '/#/unknown-route');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'اینجا راهی نیست.' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'بازگشت به خانه' })).toHaveAttribute('href', '#/');
  });

  it('opens and closes the mobile menu and navigates from it', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const menu = document.querySelector<HTMLButtonElement>('[aria-controls="site-navigation"]')!;
    fireEvent.click(menu);
    expect(
      document.querySelector<HTMLButtonElement>('[aria-controls="site-navigation"]')!,
    ).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'ناوبری اصلی' })).getByRole('link', {
        name: 'دنیای بازی',
      }),
    );
    expect(await screen.findByRole('heading', { level: 1, name: /چهار راه/ })).toBeInTheDocument();
    await waitFor(() =>
      expect(
        document.querySelector<HTMLButtonElement>('[aria-controls="site-navigation"]')!,
      ).toHaveAttribute('aria-expanded', 'false'),
    );
  });

  it('switches the carousel by buttons and keyboard, and its card goes to a real lesson route', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const next = screen.getByRole('button', { name: 'کارت بعدی' });
    fireEvent.click(next);
    expect(screen.getByTestId('carousel-status')).toHaveTextContent('جنگل مجهول 2 / 4');
    const stage = screen.getByRole('generic', { name: /کلیدهای جهت‌نما/ });
    fireEvent.keyDown(stage, { key: 'ArrowLeft' });
    expect(screen.getByTestId('carousel-status')).toHaveTextContent('غار وارون 3 / 4');
    fireEvent.click(screen.getByRole('button', { name: 'نمایش کارت کسرهای دقیق' }));
    fireEvent.click(screen.getByRole('link', { name: 'دیدن مسیر' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'معادله‌های کسری' }),
    ).toBeInTheDocument();
  });

  it('keeps the hash route intact when using the skip link, and provides a safe back fallback', async () => {
    window.history.replaceState(null, '', '/#/progress');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /ردّ قدم/ });
    fireEvent.click(screen.getByRole('link', { name: 'رفتن به محتوای اصلی' }));
    expect(document.activeElement).toBe(screen.getByRole('main'));
    expect(window.location.hash).toBe('#/progress');
    fireEvent.click(screen.getByRole('button', { name: /بازگشت/ }));
    expect(await screen.findByRole('heading', { level: 1, name: /سرزمین/ })).toBeInTheDocument();
  });

  it('allows touch-like swipes to change the selected carousel route', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const stage = screen.getByRole('generic', { name: /کلیدهای جهت‌نما/ });
    fireEvent.pointerDown(stage, { clientX: 200 });
    fireEvent.pointerUp(stage, { clientX: 90 });
    expect(screen.getByTestId('carousel-status')).toHaveTextContent('جنگل مجهول 2 / 4');
  });

  it('keeps the full Home narrative readable and carousel navigation independent of WebGL', async () => {
    const previous = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as typeof previous;
    try {
      render(<App />);
      await screen.findByRole('heading', { level: 1, name: /سرزمین/ });
      expect(document.querySelectorAll('[data-narrative]')).toHaveLength(8);
      expect(screen.getByRole('heading', { name: 'چهار ایستگاه؛ یک داستان' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'نمایش کارت کسرهای دقیق' }));
      fireEvent.click(screen.getByRole('link', { name: 'دیدن مسیر' }));
      expect(
        await screen.findByRole('heading', { level: 1, name: 'معادله‌های کسری' }),
      ).toBeInTheDocument();
    } finally {
      HTMLCanvasElement.prototype.getContext = previous;
    }
  });

  it('focuses the current carousel destination after activating an adjacent card', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const sideCard = screen.getAllByRole('button', { name: 'نمایش این کارت' })[0];
    fireEvent.click(sideCard);
    await waitFor(() =>
      expect(document.activeElement).toBe(screen.getByRole('link', { name: 'دیدن مسیر' })),
    );
  });

  it('does not navigate when a swipe ends over a card link', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const stage = screen.getByRole('generic', { name: /کلیدهای جهت‌نما/ });
    fireEvent.pointerDown(stage, { clientX: 220 });
    fireEvent.pointerUp(stage, { clientX: 70 });
    fireEvent.click(screen.getByRole('link', { name: 'دیدن مسیر' }));
    expect(window.location.hash).toBe('#/');
    expect(screen.getByTestId('carousel-status')).toHaveTextContent('جنگل مجهول 2 / 4');
  });

  it('persists the meaningful reduced-motion preference', async () => {
    render(<App />);
    await screen.findByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: 'حرکت کمتر: خاموش' });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: 'حرکت کمتر: روشن' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(document.querySelector('[data-motion]')).toHaveAttribute('data-motion', 'reduce');
    expect(window.localStorage.getItem('equation-quest-preferences')).toContain('true');
  });
});
