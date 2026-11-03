import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MechanicsLab } from './MechanicsLab';
import { useWorkshopProgress } from '../../store/useWorkshopProgress';
import { emptyRewards } from '../../features/progression/rewards';
import { challenges, challengeEquation } from '../../features/level-manager/workshop';
import { solution, operationText } from '../../features/equation-engine/equation';
import { text } from '../../features/equation-engine/rational';
afterEach(() => {
  cleanup();
  useWorkshopProgress.setState({ rewards: emptyRewards });
});
function button(name: string) {
  return screen.getByRole('button', { name });
}
function solve(index: number) {
  const eq = challengeEquation(challenges[index]);
  fireEvent.click(button(operationText({ operation: 'subtract', amount: eq.b, sides: 'both' })));
  fireEvent.click(button(operationText({ operation: 'divide', amount: eq.a, sides: 'both' })));
  fireEvent.change(screen.getByLabelText(/مقدار دقیق x را بنویس/), {
    target: { value: text(solution(eq)) },
  });
  fireEvent.click(button('آزمایش جواب'));
  fireEvent.click(button('بله، برابرند؛ تأیید می‌کنم'));
}
describe('interactive mechanics workshop', () => {
  it('offers mistake-specific progressive help then gates signed and fractional trials on verification', () => {
    render(<MechanicsLab />);
    const nav = screen.getByRole('navigation', { name: 'آزمایش‌های سازوکار' });
    fireEvent.click(within(nav).getByRole('button', { name: /علامت‌ها را نگه دار/ }));
    expect(screen.getByRole('status')).toHaveTextContent(/هنوز باز نشده/);
    fireEvent.click(button('راهنمای گام 1'));
    expect(screen.getByRole('status')).toHaveTextContent(/جملهٔ ثابت/);
    fireEvent.click(button('تفریق 4 فقط در طرف چپ'));
    expect(screen.getByRole('status')).toHaveTextContent(/فقط یک طرف/);
    solve(0);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: /علامت‌ها را نگه دار/ })).toHaveTextContent(
      'آماده',
    );
    fireEvent.click(button('آزمایش بعدی ←'));
    solve(1);
    fireEvent.click(button('آزمایش بعدی ←'));
    solve(2);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(within(nav).getAllByText(/انجام‌شده/)).toHaveLength(3);
    fireEvent.click(button('شروع دوبارهٔ همین آزمایش'));
    solve(2);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/پاداش تکراری ندارد/);
  });
  it('does not credit mere steps, wrong answers or incorrect original-equation claims', () => {
    render(<MechanicsLab />);
    const eq = challengeEquation(challenges[0]);
    fireEvent.click(button(operationText({ operation: 'subtract', amount: eq.b, sides: 'both' })));
    fireEvent.click(button(operationText({ operation: 'divide', amount: eq.a, sides: 'both' })));
    fireEvent.change(screen.getByLabelText(/مقدار دقیق x را بنویس/), { target: { value: '5' } });
    fireEvent.click(button('آزمایش جواب'));
    expect(screen.getByRole('status')).toHaveTextContent(/برابری را نمی‌سازد/);
    expect(useWorkshopProgress.getState().rewards.points).toBe(0);
    fireEvent.change(screen.getByLabelText(/مقدار دقیق x را بنویس/), { target: { value: '4' } });
    fireEvent.click(button('آزمایش جواب'));
    fireEvent.click(button('نه، برابر نیستند'));
    expect(useWorkshopProgress.getState().rewards.points).toBe(0);
  });
});
