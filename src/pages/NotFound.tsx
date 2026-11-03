import { Link } from 'react-router-dom';
import { PageIntro } from '../components/ui/PageIntro';

export default function NotFound({
  detail = 'این مسیر روی نقشهٔ سرزمین جبر پیدا نشد.',
}: {
  detail?: string;
}) {
  return (
    <PageIntro eyebrow="مسیر نامعلوم / ۴۰۴" title="اینجا راهی نیست." description={detail}>
      <Link to="/">بازگشت به خانه</Link>
      <Link to="/world">دیدن نقشه</Link>
    </PageIntro>
  );
}
