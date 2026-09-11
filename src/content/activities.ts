import type { Activity } from '@/types/content';
export const activities = [
  {
    slug: 'competitive',
    title: '競技プログラミング',
    english: 'Competitive programming',
    summary: '問題を読み解く。解き方を考える。',
    detail:
      'アルゴリズムとデータ構造を学び、プログラムで問題を解く力を磨きます。解法を共有しながら、よりよいコードを考えます。',
  },
  {
    slug: 'development',
    title: 'Web・アプリ開発',
    english: 'Web & app development',
    summary: 'アイデアを、動くものに。',
    detail:
      '身近な「こんなものがあったら」を出発点に、Webサイトやアプリを制作。設計から実装、改善まで、ものづくりに取り組みます。',
  },
  {
    slug: 'team',
    title: 'チームでのものづくり',
    english: 'Team development',
    summary: '得意を持ち寄って、つくる。',
    detail:
      'GitHubでコードを共有し、意見を交わしながら制作を進めます。つくったものを伝えることも、大切な活動のひとつです。',
  },
] satisfies readonly Activity[];
