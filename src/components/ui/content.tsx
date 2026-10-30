import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from '@/components/ui/external-link';
import type { Achievement, News, Work } from '@/types/content';
import { formatDate } from '@/lib/content';
import { ThreeScene } from '@/components/visual/three-scene';
export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="arrow-link" href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function PageHeading({
  number,
  english,
  title,
  description,
}: {
  number: string;
  english: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div className="page-heading-copy">
        <p className="eyebrow">
          {number} / {english}
        </p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <ThreeScene compact variant={number} />
    </div>
  );
}
export function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="empty-state">{children}</p>;
}
export function NewsList({ items }: { items: readonly News[] }) {
  return items.length ? (
    <div className="news-list">
      {items.map((item) => (
        <article key={item.slug} id={item.slug}>
          <div className="news-meta">
            <time dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
            <span>{item.category}</span>
          </div>
          <h3>
            <Link href={`/news/${item.slug}`}>{item.title}</Link>
          </h3>
          <p>{item.summary}</p>
          <Link className="article-read-link" href={`/news/${item.slug}`}>
            記事を読む <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  ) : (
    <EmptyState>
      公開中のお知らせはありません。活動の様子やイベント情報を、こちらでお届けします。
    </EmptyState>
  );
}

export function AchievementList({ items }: { items: readonly Achievement[] }) {
  if (!items.length)
    return (
      <EmptyState>
        大会・イベントの実績は現在、掲載準備中です。確認できた結果から紹介します。
      </EmptyState>
    );

  const years = [...new Set(items.map((item) => item.eventYear))].sort(
    (a, b) => b - a,
  );
  return (
    <div className="achievement-years">
      {years.map((year) => (
        <section className="achievement-year" key={year}>
          <h2>{year}</h2>
          <div className="works-list">
            {items
              .filter((item) => item.eventYear === year)
              .map((item) => (
                <article key={item.slug}>
                  <p className="eyebrow">
                    {item.eventName} · {item.eventYear}
                  </p>
                  <h3>
                    <Link href={`/results/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.summary}</p>
                  <ul className="achievement-outcomes" aria-label="大会結果">
                    {item.outcomes.map((outcome) => (
                      <li
                        key={`${outcome.division}-${outcome.entry ?? 'team'}`}
                      >
                        <strong>{outcome.division}</strong>
                        {outcome.entry && <span>{outcome.entry}</span>}
                        <span>{outcome.result}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="article-read-link"
                    href={`/results/${item.slug}`}
                  >
                    実績の詳細 <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
export function WorkList({ items }: { items: readonly Work[] }) {
  return items.length ? (
    <div className="works-list">
      {items.map((item) => (
        <article key={item.slug} id={item.slug}>
          {item.image && (
            <Image
              src={item.image}
              alt={item.imageAlt ?? ''}
              width={960}
              height={600}
              className="work-image"
            />
          )}
          <p className="eyebrow">
            <time dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
          </p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <ul className="tags" aria-label="使用技術">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-6">
            {item.repositoryUrl && (
              <ExternalLink className="arrow-link" href={item.repositoryUrl}>
                ソースコード <span aria-hidden="true">↗</span>
              </ExternalLink>
            )}
            {item.websiteUrl && (
              <ExternalLink className="arrow-link" href={item.websiteUrl}>
                作品を見る <span aria-hidden="true">↗</span>
              </ExternalLink>
            )}
            {item.videoUrl && (
              <ExternalLink className="arrow-link" href={item.videoUrl}>
                動画を見る <span aria-hidden="true">↗</span>
              </ExternalLink>
            )}
          </div>
        </article>
      ))}
    </div>
  ) : (
    <EmptyState>
      作品は現在、掲載準備中です。公開の準備が整ったものから紹介します。
    </EmptyState>
  );
}
