import type { News } from '@/types/content';
// draft: true の記事はサイトに表示されません。確認後に公開してください。
export const news = [
  {
    slug: 'first-report',
    title: '活動報告のタイトル',
    summary: '公開を承認された活動内容に置き換えてください。',
    publishedAt: '2026-09-11',
    category: '活動報告',
    draft: true,
  },
] satisfies readonly News[];
