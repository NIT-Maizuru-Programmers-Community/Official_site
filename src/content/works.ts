import type { Work } from '@/types/content';
export const works = [
  {
    slug: 'first-work',
    title: '作品タイトル',
    summary: '公開を承認された作品の概要に置き換えてください。',
    publishedAt: '2026-09-11',
    tags: ['TypeScript'],
    draft: true,
  },
] satisfies readonly Work[];
