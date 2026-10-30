import { news } from '@/content/news';
import { published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { PageHeading, NewsList } from '@/components/ui/content';
export const metadata = pageMetadata(
  'お知らせ',
  '活動報告、イベント、ブログなど部活動からの情報を掲載します。',
  '/news',
);
export default function News() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="03"
        english="NEWS"
        title="お知らせ"
        description="活動報告、イベント、ブログなど部活動からの情報を掲載します。"
      />
      <h2 className="sr-only">お知らせ一覧</h2>
      <NewsList items={published(news)} />
    </div>
  );
}
