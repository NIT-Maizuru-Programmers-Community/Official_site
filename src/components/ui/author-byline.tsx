import type { ExternalUrl } from '@/types/content';
import { ExternalLink } from './external-link';

export function AuthorByline({
  author,
  authorUrl,
}: {
  author?: string;
  authorUrl?: ExternalUrl;
}) {
  const name = author?.trim();
  if (!name) return null;

  return (
    <span>
      執筆：
      {authorUrl ? (
        <ExternalLink className="author-link" href={authorUrl}>
          {name}
        </ExternalLink>
      ) : (
        name
      )}
    </span>
  );
}
