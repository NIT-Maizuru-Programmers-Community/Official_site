import { news } from '@/content/news';
import { published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { PageHeading, NewsList } from '@/components/ui/content';
export const metadata = pageMetadata(
  'お知らせ',
  '活動報告、イベント、部活動からのお知らせを掲載します。',
  '/news',
);
export default function News() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="03"
        english="NEWS"
        title="お知らせ"
        description="日々の活動と、これからのこと。"
      />
      <h2 className="sr-only">お知らせ一覧</h2>
      <NewsList items={published(news)} />
    </div>
  );
}
