export type TopicId =
  | 'equation'
  | 'balance'
  | 'both-sides'
  | 'unknown'
  | 'parts'
  | 'inverse-operations'
  | 'solve'
  | 'verify'
  | 'fractions';

type Topic = {
  id: TopicId;
  title: string;
  eyebrow: string;
  summary: string;
  example: string;
  next?: TopicId;
};

export const topics: Topic[] = [
  {
    id: 'equation',
    title: 'معادله چیست؟',
    eyebrow: 'آغاز مسیر',
    summary: 'دو عبارت می‌توانند یک ارزش داشته باشند؛ علامت تساوی پیوند میان آن‌هاست.',
    example: '3 + 4 = 7',
    next: 'balance',
  },
  {
    id: 'balance',
    title: 'راز برابری',
    eyebrow: 'جزیرهٔ تعادل',
    summary: 'ترازو یادآوری می‌کند که دو سوی معادله باید هم‌ارزش بمانند.',
    example: '5 = 5',
    next: 'both-sides',
  },
  {
    id: 'both-sides',
    title: 'هر دو طرف',
    eyebrow: 'قانون تعادل',
    summary: 'اگر به هر دو طرف یک کار یکسان انجام دهیم، برابری حفظ می‌شود.',
    example: 'x + 2 = 6',
    next: 'unknown',
  },
  {
    id: 'unknown',
    title: 'مجهول کجاست؟',
    eyebrow: 'جنگل مجهول',
    summary: 'جعبهٔ x عددی را پنهان کرده که باید با دلیل پیدایش کنیم.',
    example: 'x + 3 = 7',
    next: 'parts',
  },
  {
    id: 'parts',
    title: 'اجزای معادله',
    eyebrow: 'نشانه‌ها و عددها',
    summary: 'ضریب، ثابت و مجهول هرکدام نقش جداگانه‌ای در معادله دارند.',
    example: '-2x + 3 = 9',
    next: 'inverse-operations',
  },
  {
    id: 'inverse-operations',
    title: 'عملیات معکوس',
    eyebrow: 'غار وارون',
    summary: 'برای باز کردن گرهٔ معادله، عمل مخالف را روی هر دو طرف انجام می‌دهیم.',
    example: '2x + 4 = 12',
    next: 'solve',
  },
  {
    id: 'solve',
    title: 'راه حل معادله',
    eyebrow: 'قدم به قدم',
    summary: 'هر گام باید برابری را نگه دارد تا در پایان x تنها بماند.',
    example: '2x = 8',
    next: 'verify',
  },
  {
    id: 'verify',
    title: 'بررسی جواب',
    eyebrow: 'پیش از گشودن دروازه',
    summary: 'جواب را در معادلهٔ اصلی جای‌گذاری می‌کنیم تا هر دو طرف برابر شوند.',
    example: '2(4) + 4 = 12',
    next: 'fractions',
  },
  {
    id: 'fractions',
    title: 'معادله‌های کسری',
    eyebrow: 'مسیر پیشرفته',
    summary: 'کسرها بخش اصلی سفرند: سهم‌های برابر، ضریب‌های کسری و جواب دقیق.',
    example: 'x/2 + 1/4 = 3/4',
  },
];
export const topicById = Object.fromEntries(topics.map((topic) => [topic.id, topic])) as Record<
  TopicId,
  Topic
>;
export const topicPath = (id: TopicId) => `/learning/${id}`;
