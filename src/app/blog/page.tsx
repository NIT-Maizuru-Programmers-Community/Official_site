import { news } from '@/content/news';
import { published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { EmptyState, NewsList, PageHeading } from '@/components/ui/content';
import type { News } from '@/types/content';

export const metadata = pageMetadata(
  'ブログ',
  '部員による活動やものづくりについての記事を紹介します。',
  '/blog',
);

export default function Blog() {
  const posts = published<News>(news).filter(
    (item) => item.category === 'ブログ',
  );

  return (
    <div className="page-wrap">
      <PageHeading
        number="06"
        english="BLOG"
        title="ブログ"
        description="部員による活動やものづくりについての記事を紹介します。"
      />
      <h2 className="sr-only">ブログ記事一覧</h2>
      {posts.length ? (
        <NewsList items={posts} />
      ) : (
        <EmptyState>公開中のブログ記事はありません。</EmptyState>
      )}
    </div>
  );
}
