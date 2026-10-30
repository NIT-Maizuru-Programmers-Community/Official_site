import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { readNewsBody } from './news-body';
import type { News } from '../types/content';

const base = {
  slug: 'article',
  title: '記事',
  summary: '概要',
  publishedAt: '2026-10-31',
  category: 'ブログ',
} as const;

describe('news markdown source', () => {
  it('reads a markdown file for a file-backed article', () => {
    const root = mkdtempSync(join(tmpdir(), 'news-markdown-'));
    try {
      mkdirSync(join(root, 'src/content/news'), { recursive: true });
      writeFileSync(join(root, 'src/content/news/article.md'), '# 記事\n本文');
      const article = { ...base, markdown: true } satisfies News;
      expect(readNewsBody(article, root)).toBe('# 記事\n本文');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
  it('keeps existing inline news unchanged', () => {
    expect(readNewsBody({ ...base, body: '従来の記事' })).toBe('従来の記事');
  });
  it('rejects an unsafe slug before reading from disk', () => {
    expect(() =>
      readNewsBody({ ...base, slug: '../other', markdown: true }),
    ).toThrow('Invalid news slug');
  });
  it('fails when the markdown file does not exist', () => {
    expect(() => readNewsBody({ ...base, markdown: true }, tmpdir())).toThrow();
  });
});
