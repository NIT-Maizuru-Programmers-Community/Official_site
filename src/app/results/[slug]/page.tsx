import { notFound } from 'next/navigation';
import { results } from '@/content/results';
import { EditorialArticle } from '@/components/ui/editorial-article';
import { orderedAchievements } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return orderedAchievements(results).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = orderedAchievements(results).find(
    (entry) => entry.slug === slug,
  );
  if (!item) return {};
  return pageMetadata(item.title, item.summary, `/results/${item.slug}`);
}

export default async function ResultArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = orderedAchievements(results).find(
    (entry) => entry.slug === slug,
  );
  if (!item) notFound();
  return (
    <EditorialArticle
      item={item}
      number="04"
      section="RESULTS"
      backHref="/results"
      backLabel="実績一覧へ"
    />
  );
}
