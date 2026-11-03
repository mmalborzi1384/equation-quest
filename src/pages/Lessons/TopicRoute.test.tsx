import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { topics } from '../../data/topics';
import TopicRoute from './TopicRoute';

afterEach(cleanup);
function open(id: (typeof topics)[number]['id']) {
  render(
    <MemoryRouter>
      <TopicRoute id={id} />
    </MemoryRouter>,
  );
}
describe('independent learning routes', () => {
  it.each(topics)('teaches and practices $id', ({ id, title }) => {
    open(id);
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'گام‌ها را خودت بساز' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'یک تصمیم با دلیل' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /بازگشت به فهرست/ })).toHaveAttribute(
      'href',
      '/learning',
    );
  });
  it('models both-sided balance, one-sided break and reset through accessible buttons', () => {
    open('balance');
    fireEvent.click(screen.getByRole('button', { name: '۱ به چپ' }));
    expect(screen.getByText(/دو کفه برابر نیستند/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '۱ به راست' }));
    expect(screen.getByText('دو کفه هم‌ارزش‌اند.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'از نو: ۵ = ۵' }));
    expect(screen.getByLabelText(/کفهٔ چپ 5، کفهٔ راست 5/)).toBeInTheDocument();
  });
  it('does not reveal solution before steps, gives math feedback, then requires original substitution', () => {
    open('solve');
    expect(screen.queryByRole('textbox', { name: /مقدار دقیق/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'تفریق 4 فقط در طرف چپ' }));
    expect(screen.getByText(/فقط یک طرف را تغییر دادی/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'تفریق 4 در هر دو طرف' }));
    fireEvent.click(screen.getByRole('button', { name: 'تقسیم 2 در هر دو طرف' }));
    const answer = screen.getByRole('textbox', { name: /مقدار دقیق/ });
    fireEvent.change(answer, { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: 'بررسی جواب' }));
    expect(screen.getByText(/دو مقدار متفاوت/)).toBeInTheDocument();
    fireEvent.change(answer, { target: { value: '۴' } });
    fireEvent.click(screen.getByRole('button', { name: 'بررسی جواب' }));
    expect(screen.getByRole('heading', { name: 'بازگشت به معادلهٔ اصلی' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /جواب رد می‌شود/ }));
    expect(screen.getByText(/حاصل ضرب و جمع را دوباره بخوان/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /جواب تأیید می‌شود/ }));
    expect(screen.getByText(/دو طرف دقیقاً برابر شدند/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /یک تمرین دیگر/ }));
    expect(screen.getByText(/تمرین 2/)).toBeInTheDocument();
  });
  it('teaches fraction equivalence and repeats with rational practice', () => {
    open('fractions');
    expect(screen.getByText(/نیم \+ یک چهارم/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '۲/۶' }));
    expect(screen.getByText(/مخرج‌ها تعداد سهم‌های هم‌اندازه/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '۳/۴' }));
    expect(screen.getByText(/^درست: ۲\/۴\+۱\/۴=۳\/۴/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'راهنمای گام 1' }));
    expect(screen.getByText(/به جملهٔ ثابت/)).toBeInTheDocument();
  });
});
