import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import NewsArticle from './page';

vi.mock('@/content/news', () => ({
  news: [
    {
      slug: 'blog-post',
      title: 'ブログ記事',
      summary: '概要',
      publishedAt: '2026-01-01',
      category: 'ブログ',
      body: '本文',
    },
    {
      slug: 'news-post',
      title: 'お知らせ記事',
      summary: '概要',
      publishedAt: '2026-01-01',
      category: 'お知らせ',
      body: '本文',
    },
  ],
}));

it.each([
  ['blog-post', '06', 'BLOG', '/blog', 'ブログ一覧へ'],
  ['news-post', '03', 'NEWS', '/news', 'お知らせ一覧へ'],
])(
  '%s の区分と戻り先が一致する',
  async (slug, number, section, href, label) => {
    const page = await NewsArticle({ params: Promise.resolve({ slug }) });
    const html = renderToStaticMarkup(page);
    expect(html).toContain(`<p class="eyebrow">${number} / ${section}</p>`);
    expect(html).toContain(`href="${href}"`);
    expect(html).toContain(label);
  },
);
