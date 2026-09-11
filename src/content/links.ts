import type { RelatedLink } from '@/types/content';
export const links = [
  {
    slug: 'school',
    title: '舞鶴工業高等専門学校',
    description: '学校の概要、入試情報、学校生活について。',
    url: 'https://www.maizuru-ct.ac.jp/',
  },
  {
    slug: 'github',
    title: 'GitHub Organization',
    description: '部活動のリポジトリと開発プロジェクト。',
    url: 'https://github.com/NIT-Maizuru-Programmers-Community',
  },
  {
    slug: 'procon',
    title: '全国高等専門学校プログラミングコンテスト',
    description: '高専プロコンの大会情報。',
    url: 'https://www.procon.gr.jp/',
  },
] satisfies readonly RelatedLink[];
