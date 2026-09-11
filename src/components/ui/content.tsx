import Link from 'next/link';
import Image from 'next/image';
import type { News, Work } from '@/types/content';
import { formatDate } from '@/lib/content';
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
      <p className="eyebrow">
        {number} / {english}
      </p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
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
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  ) : (
    <EmptyState>
      公開中のお知らせはありません。活動の様子やイベント情報を、こちらでお届けします。
    </EmptyState>
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
              <a className="arrow-link" href={item.repositoryUrl}>
                ソースコード <span aria-hidden="true">↗</span>
              </a>
            )}
            {item.websiteUrl && (
              <a className="arrow-link" href={item.websiteUrl}>
                作品を見る <span aria-hidden="true">↗</span>
              </a>
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
