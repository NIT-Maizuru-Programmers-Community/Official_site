import Image from 'next/image';
import { notFound } from 'next/navigation';
import { works } from '@/content/works';
import { ArrowLink, PageHeading } from '@/components/ui/content';
import { ExternalLink } from '@/components/ui/external-link';
import { MarkdownBody } from '@/components/ui/markdown';
import { formatDate, published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import type { Work } from '@/types/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return published(works).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = published(works).find((entry) => entry.slug === slug);
  if (!item) return {};
  return pageMetadata(item.title, item.summary, `/works/${item.slug}`);
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item: Work | undefined = published(works).find(
    (entry) => entry.slug === slug,
  );
  if (!item) notFound();
  return (
    <div className="page-wrap">
      <PageHeading
        number="02"
        english="WORKS"
        title={item.title}
        description={item.summary}
      />
      <article className="editorial-article">
        <p className="article-meta">
          WORKS ・{' '}
          <time dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </p>
        {item.image && (
          <Image
            src={item.image}
            alt={item.imageAlt ?? ''}
            width={1200}
            height={750}
            className="article-image"
          />
        )}
        {item.body && <MarkdownBody source={item.body} />}
        {item.tags.length > 0 && (
          <section className="article-sources" aria-labelledby="work-tags">
            <h2 id="work-tags">使用技術</h2>
            <ul className="tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>
        )}
        {(item.repositoryUrl || item.websiteUrl || item.videoUrl) && (
          <section className="article-sources" aria-labelledby="work-links">
            <h2 id="work-links">関連リンク</h2>
            <ul>
              {item.repositoryUrl && (
                <li>
                  <ExternalLink href={item.repositoryUrl}>
                    ソースコード <span aria-hidden="true">↗</span>
                  </ExternalLink>
                </li>
              )}
              {item.websiteUrl && (
                <li>
                  <ExternalLink href={item.websiteUrl}>
                    作品を見る <span aria-hidden="true">↗</span>
                  </ExternalLink>
                </li>
              )}
              {item.videoUrl && (
                <li>
                  <ExternalLink href={item.videoUrl}>
                    動画を見る <span aria-hidden="true">↗</span>
                  </ExternalLink>
                </li>
              )}
            </ul>
          </section>
        )}
      </article>
      <ArrowLink href="/works">作品一覧へ</ArrowLink>
    </div>
  );
}
