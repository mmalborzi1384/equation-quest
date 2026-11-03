import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Game from './Game';
afterEach(cleanup);
function open() {
  render(
    <MemoryRouter>
      <Game />
    </MemoryRouter>,
  );
}
describe('exploration DOM and no-WebGL parity', () => {
  it('uses a meaningful map when WebGL is absent and keeps all four landmarks inspectable', () => {
    open();
    expect(screen.getByText(/وب‌جی‌ال در دسترس نیست/)).toBeInTheDocument();
    expect(screen.getByLabelText('نقشهٔ متنی قابل استفاده بدون وب‌جی‌ال')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /غار وارون/ })).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: /غار وارون/ })[0]);
    expect(screen.getByRole('heading', { name: /غار وارون/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /درس مرتبط/ })).toHaveAttribute(
      'href',
      '/learning/fractions',
    );
    expect(screen.getByRole('link', { name: /بازی مرحلهٔ 05/ })).toHaveAttribute(
      'href',
      '/game/level/05',
    );
  });
  it('moves via accessible directional buttons and pauses/resumes without fabricating progress', async () => {
    open();
    const coordinates = screen.getByText(/X 0.0 · Z 0.0/);
    fireEvent.click(screen.getByRole('button', { name: 'بالا' }));
    expect(coordinates).not.toHaveTextContent('Z 0.0');
    fireEvent.click(screen.getByRole('button', { name: 'وقفه در کاوش' }));
    expect(screen.getByRole('region', { name: 'کاوش متوقف شده است' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'بالا' })).toBeDisabled();
    expect(screen.getByText(/هیچ پیشرفتی ثبت نمی‌شود/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'ادامهٔ حرکت' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'بالا' })).toBeEnabled());
  });
  it('hides WebGL-only quality controls in fallback and keeps trials separate from playable levels', () => {
    open();
    expect(screen.queryByLabelText('کیفیت نمایش')).not.toBeInTheDocument();
    expect(screen.getByText(/سه آزمایش مستقل سازوکار/)).toBeInTheDocument();
  });
});
