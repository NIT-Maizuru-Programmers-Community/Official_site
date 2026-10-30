import { ArrowLink, PageHeading } from '@/components/ui/content';
import { ExternalLink } from '@/components/ui/external-link';
import { MarkdownBody } from '@/components/ui/markdown';
import { formatDate } from '@/lib/content';
import type { Achievement, News } from '@/types/content';

type Props = {
  item: News | Achievement;
  number: string;
  section: string;
  backHref: string;
  backLabel: string;
  body?: string;
};

export function EditorialArticle({
  item,
  number,
  section,
  backHref,
  backLabel,
  body,
}: Props) {
  const achievement = 'outcomes' in item ? item : null;
  const news = 'category' in item ? item : null;
  return (
    <div className="page-wrap">
      <PageHeading
        number={number}
        english={section}
        title={item.title}
        description={item.summary}
      />
      <article className="editorial-article">
        <p className="article-meta">
          {achievement ? `${achievement.eventYear}年 / ` : ''}
          {news?.category ?? section}
          {' ・ '}
          <time dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </p>
        {achievement && (
          <ul className="achievement-outcomes" aria-label="大会結果">
            {achievement.outcomes.map((outcome) => (
              <li key={`${outcome.division}-${outcome.entry ?? 'team'}`}>
                <strong>{outcome.division}</strong>
                {outcome.entry && <span>{outcome.entry}</span>}
                <span>{outcome.result}</span>
              </li>
            ))}
          </ul>
        )}
        <MarkdownBody source={body ?? item.body ?? ''} />
        {achievement?.sources.length ? (
          <section
            className="article-sources"
            aria-labelledby="sources-heading"
          >
            <h2 id="sources-heading">公式情報</h2>
            <ul>
              {achievement.sources.map((source) => (
                <li key={source.url}>
                  <ExternalLink href={source.url}>
                    {source.title} <span aria-hidden="true">↗</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
      <ArrowLink href={backHref}>{backLabel}</ArrowLink>
    </div>
  );
}
