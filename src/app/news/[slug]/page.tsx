import { notFound } from 'next/navigation';
import { news } from '@/content/news';
import { EditorialArticle } from '@/components/ui/editorial-article';
import { pageMetadata } from '@/lib/metadata';
import { published } from '@/lib/content';
import { readNewsBody } from '@/lib/news-body';
import type { News } from '@/types/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return published(news).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = published<News>(news).find((entry) => entry.slug === slug);
  if (!item) return {};
  return pageMetadata(item.title, item.summary, `/news/${item.slug}`);
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = published<News>(news).find((entry) => entry.slug === slug);
  if (!item) notFound();
  const body = readNewsBody(item);
  return (
    <EditorialArticle
      item={item}
      number="03"
      section="NEWS"
      backHref={item.category === 'ブログ' ? '/blog' : '/news'}
      backLabel={item.category === 'ブログ' ? 'ブログ一覧へ' : 'お知らせ一覧へ'}
      body={body}
    />
  );
}
