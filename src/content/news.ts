import type { News } from '@/types/content';
// draft: true の記事はサイトに表示されません。確認後に公開してください。
export const news = [
  {
    slug: 'procon-37-results',
    title: '第37回高専プロコンの結果',
    summary:
      '自由部門「かんおん‼」が本選に出場し、競技部門は準決勝に出場しました。',
    publishedAt: '2026-10-11',
    category: '活動報告',
    body: [
      '第37回全国高等専門学校プログラミングコンテストに参加しました。自由部門「かんおん‼」が本選に出場し、競技部門は準決勝に出場しました。',
      '部門別の記録と公式情報は[第37回大会の実績ページ](/results/procon-37-2026)をご覧ください。',
    ].join('\n\n'),
  },
  {
    slug: 'first-report',
    title: '活動報告のタイトル',
    summary: '公開を承認された活動内容に置き換えてください。',
    publishedAt: '2026-09-11',
    category: '活動報告',
    body: '公開を承認された活動内容へ置き換えてください。',
    draft: true,
  },
] satisfies readonly News[];
