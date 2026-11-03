import type { TopicId } from './topics';

export type LevelInfo = {
  id: string;
  title: string;
  island: string;
  focus: string;
  topic: TopicId;
};
export const levels: LevelInfo[] = [
  {
    id: '01',
    title: 'راز ترازو',
    island: 'جزیرهٔ تعادل',
    focus: 'برابری با عددهای صحیح کوچک',
    topic: 'balance',
  },
  {
    id: '02',
    title: 'قانون تعادل',
    island: 'جزیرهٔ تعادل',
    focus: 'عمل یکسان روی هر دو طرف',
    topic: 'both-sides',
  },
  {
    id: '03',
    title: 'جعبهٔ اسرارآمیز',
    island: 'جنگل مجهول',
    focus: 'پیدا کردن مجهول',
    topic: 'unknown',
  },
  {
    id: '04',
    title: 'دروازهٔ مجهول',
    island: 'جنگل مجهول',
    focus: 'ضریب‌ها و عددهای علامت‌دار',
    topic: 'parts',
  },
  {
    id: '05',
    title: 'تونل جمع و تفریق',
    island: 'غار وارون',
    focus: 'عمل معکوس با عددهای علامت‌دار',
    topic: 'inverse-operations',
  },
  {
    id: '06',
    title: 'اتاق ضرب و تقسیم',
    island: 'غار وارون',
    focus: 'معرفی کسرها و عمل وارون',
    topic: 'fractions',
  },
  {
    id: '07',
    title: 'برج معادلات',
    island: 'قلعهٔ معادله',
    focus: 'حل مرحله‌ای معادله‌های کسری',
    topic: 'solve',
  },
  {
    id: '08',
    title: 'آزمون نهایی',
    island: 'قلعهٔ معادله',
    focus: 'حل و بررسی معادله‌های صحیح و کسری',
    topic: 'verify',
  },
];
export const islands = [
  {
    name: 'جزیرهٔ تعادل',
    label: '01 تا 02',
    detail: 'برابری از اینجا آغاز می‌شود.',
    level: '01',
    tone: 'mint',
  },
  {
    name: 'جنگل مجهول',
    label: '03 تا 04',
    detail: 'برای x معنایی پیدا کن.',
    level: '03',
    tone: 'violet',
  },
  {
    name: 'غار وارون',
    label: '05 تا 06',
    detail: 'گره‌ها را با عمل وارون باز کن.',
    level: '05',
    tone: 'ocean',
  },
  {
    name: 'قلعهٔ معادله',
    label: '07 تا 08',
    detail: 'راه‌حل را بساز و بررسی کن.',
    level: '07',
    tone: 'gold',
  },
];
