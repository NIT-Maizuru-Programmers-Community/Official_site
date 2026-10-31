import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import Blog from './page';

vi.mock('@/content/news', () => ({
  news: [
    {
      slug: 'older',
      title: '古いブログ',
      summary: '本文',
      publishedAt: '2026-01-01',
      category: 'ブログ',
      body: '本文',
    },
    {
      slug: 'newer',
      title: '新しいブログ',
      author: '部員の公開名',
      summary: '本文',
      publishedAt: '2026-02-01',
      category: 'ブログ',
      body: '本文',
    },
    {
      slug: 'draft',
      title: '下書きブログ',
      summary: '本文',
      publishedAt: '2026-03-01',
      category: 'ブログ',
      body: '本文',
      draft: true,
    },
    {
      slug: 'news',
      title: '普通のお知らせ',
      summary: '本文',
      publishedAt: '2026-04-01',
      category: 'お知らせ',
      body: '本文',
    },
  ],
}));

it('公開ブログだけを新しい順に一覧表示し、既存の記事にリンクする', () => {
  const html = renderToStaticMarkup(<Blog />);
  expect(html).toContain('href="/news/newer"');
  expect(html).toContain('href="/news/older"');
  expect(html).toContain('執筆：部員の公開名');
  expect(html.indexOf('新しいブログ')).toBeLessThan(html.indexOf('古いブログ'));
  expect(html).not.toContain('下書きブログ');
  expect(html).not.toContain('普通のお知らせ');
});
