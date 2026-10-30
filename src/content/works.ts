import type { Work } from '@/types/content';
export const works = [
  {
    slug: 'bushitsuou',
    title: '部⭐︎室⭐︎王',
    summary:
      '部室に足を運び、部員同士が交流するきっかけをつくる作品です。来室時のポイント、みんなで順位を予想するデイリーレース、メッセージ付きのポイント送信などを組み合わせ、部室の活性化を目指します。Hack U KOSEN 2025 OSAKAに向けて開発しました。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/BU-SHITU-OH_hackukosen2025',
    videoUrl: 'https://youtu.be/jdonjW2NpKw?t=844',
    tags: ['Vue', 'FastAPI', 'NFC'],
    draft: true,
  },
  {
    slug: 'first-work',
    title: '作品タイトル',
    summary: '公開を承認された作品の概要に置き換えてください。',
    publishedAt: '2026-09-11',
    tags: ['TypeScript'],
    draft: true,
  },
] satisfies readonly Work[];
