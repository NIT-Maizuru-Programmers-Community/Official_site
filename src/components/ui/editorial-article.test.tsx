import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { EditorialArticle } from './editorial-article';
import type { News } from '@/types/content';

it('執筆者が設定されている記事の本文に公開名を表示する', () => {
  const item: News = {
    slug: 'example',
    title: '記事',
    summary: '概要',
    publishedAt: '2026-01-01',
    category: 'ブログ',
    body: '本文',
    author: '部員の公開名',
  };
  const html = renderToStaticMarkup(
    <EditorialArticle
      item={item}
      number="06"
      section="BLOG"
      backHref="/blog"
      backLabel="ブログ一覧へ"
    />,
  );
  expect(html).toContain('執筆：部員の公開名');
});
