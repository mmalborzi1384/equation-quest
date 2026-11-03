import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ResetAction } from './ResetAction';
afterEach(cleanup);
describe('confirmed destructive controls', () => {
  it('does nothing on cancel and calls deletion only on confirm', () => {
    const onConfirm = vi.fn();
    render(
      <ResetAction
        label="حذف همهٔ داده‌ها"
        scope="فقط داده‌های برنامه پاک می‌شوند."
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'حذف همهٔ داده‌ها' }));
    expect(screen.getByRole('group', { name: 'تأیید حذف همهٔ داده‌ها' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'انصراف' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('group'), { key: 'Escape' });
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'حذف همهٔ داده‌ها' }));
    fireEvent.click(screen.getByRole('button', { name: 'انصراف' }));
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'حذف همهٔ داده‌ها' }));
    fireEvent.click(screen.getByRole('button', { name: 'بله، حذف شود' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('حذف');
  });
});
