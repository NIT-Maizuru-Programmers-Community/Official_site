import Image from 'next/image';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { ReactNode } from 'react';
import type { ExternalUrl } from '@/types/content';
import { ExternalLink } from './external-link';

type MarkdownNode = {
  type: string;
  value?: string;
  url?: string;
  alt?: string;
  depth?: number;
  ordered?: boolean;
  start?: number;
  lang?: string;
  children?: readonly MarkdownNode[];
};

const parser = unified().use(remarkParse);

function safeHref(value: string): string | ExternalUrl | null {
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? (url.href as ExternalUrl) : null;
  } catch {
    return null;
  }
}

function isExternalUrl(value: string): value is ExternalUrl {
  return value.startsWith('https:');
}

function renderNode(node: MarkdownNode, key: number | string): ReactNode {
  const children = node.children?.map((child, index) =>
    renderNode(child, `${key}-${index}`),
  );
  switch (node.type) {
    case 'root':
      return children ?? null;
    case 'paragraph':
      return <p key={key}>{children}</p>;
    case 'heading': {
      const Tag = `h${Math.min((node.depth ?? 1) + 1, 6)}` as
        'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return <Tag key={key}>{children}</Tag>;
    }
    case 'text':
      return node.value;
    case 'emphasis':
      return <em key={key}>{children}</em>;
    case 'strong':
      return <strong key={key}>{children}</strong>;
    case 'delete':
      return <del key={key}>{children}</del>;
    case 'inlineCode':
      return <code key={key}>{node.value}</code>;
    case 'code':
      return (
        <pre key={key}>
          <code>{node.value}</code>
        </pre>
      );
    case 'list': {
      return node.ordered ? (
        <ol key={key} start={node.start}>
          {children}
        </ol>
      ) : (
        <ul key={key}>{children}</ul>
      );
    }
    case 'listItem':
      return <li key={key}>{children}</li>;
    case 'blockquote':
      return <blockquote key={key}>{children}</blockquote>;
    case 'link': {
      const href = node.url ? safeHref(node.url) : null;
      return href && isExternalUrl(href) ? (
        <ExternalLink key={key} href={href}>
          {children}
        </ExternalLink>
      ) : href ? (
        <a key={key} href={href}>
          {children}
        </a>
      ) : (
        <span key={key}>{children}</span>
      );
    }
    case 'image':
      return node.url?.startsWith('/images/') && node.alt ? (
        <Image
          key={key}
          src={node.url}
          alt={node.alt}
          width={1200}
          height={750}
          className="article-image"
        />
      ) : null;
    case 'thematicBreak':
      return <hr key={key} />;
    case 'break':
      return <br key={key} />;
    // Markdownの生HTMLや未対応ノードは、そのままDOMへ流さない。
    case 'html':
      return null;
    default:
      return children ?? null;
  }
}

export function MarkdownBody({ source }: { source: string }) {
  const tree = parser.parse(source) as unknown as MarkdownNode;
  return <div className="article-body">{renderNode(tree, 'markdown')}</div>;
}
