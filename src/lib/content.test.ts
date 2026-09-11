import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { news } from '../content/news';
import { works } from '../content/works';
import { activities } from '../content/activities';
import { links } from '../content/links';
import { site } from '../content/site';
import { isValidDate, published, formatDate } from './content';
import type { Work } from '../types/content';
describe('content publication', () => {
  it('excludes drafts, sorts newest first, and preserves the source', () => {
    const items = [
      {
        slug: 'old',
        title: 'Old',
        summary: 'text',
        publishedAt: '2026-01-01' as const,
      },
      {
        slug: 'draft',
        title: 'Draft',
        summary: 'text',
        publishedAt: '2026-03-01' as const,
        draft: true,
      },
      {
        slug: 'new',
        title: 'New',
        summary: 'text',
        publishedAt: '2026-02-01' as const,
      },
    ];
    expect(published(items).map((item) => item.slug)).toEqual(['new', 'old']);
    expect(items[0].slug).toBe('old');
  });
  it('accepts calendar dates only, including leap-year rules', () => {
    expect(isValidDate('2024-02-29')).toBe(true);
    for (const date of [
      '2026-02-29',
      '2026-04-31',
      '2026-13-01',
      '2026-1-01',
      'not-a-date',
    ])
      expect(isValidDate(date)).toBe(false);
    expect(formatDate('2026-09-11')).toBe('2026.09.11');
  });
  for (const [name, items] of Object.entries({
    news,
    works,
    activities,
    links,
  })) {
    it(`${name} has unique, safe slugs and required text`, () => {
      expect(new Set(items.map((item) => item.slug)).size).toBe(items.length);
      for (const item of items) {
        expect(item.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        expect(item.title.trim()).not.toBe('');
      }
    });
  }
  it('validates dates, summaries, local images and HTTPS destinations', () => {
    for (const item of [...news, ...works]) {
      expect(isValidDate(item.publishedAt)).toBe(true);
      expect(item.summary.trim()).not.toBe('');
    }
    for (const item of works as readonly Work[]) {
      for (const url of [item.repositoryUrl, item.websiteUrl])
        if (url) expect(new URL(url).protocol).toBe('https:');
      if (item.image) {
        expect(item.image).toMatch(/^\/images\//);
        expect(item.imageAlt?.trim()).toBeTruthy();
        expect(existsSync(join(process.cwd(), 'public', item.image))).toBe(
          true,
        );
      }
    }
    for (const link of links) expect(new URL(link.url).protocol).toBe('https:');
    if (site.heroImage) {
      expect(site.heroImage.alt.trim()).toBeTruthy();
      expect(site.heroImage.src).toMatch(/^\/images\//);
      expect(
        existsSync(join(process.cwd(), 'public', site.heroImage.src)),
      ).toBe(true);
    }
    if (site.contact) {
      expect(new URL(site.contact.url).protocol).toBe('https:');
      for (const field of [
        site.contact.provider,
        site.contact.retention,
        site.contact.purpose,
      ])
        expect(field.trim()).toBeTruthy();
    }
  });
});
