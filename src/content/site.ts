import type { Contact } from '@/types/content';
export const site = {
  name: 'プログラマーズコミュニティ部',
  school: '舞鶴工業高等専門学校',
  english: 'NITMC Programmers Community',
  description:
    '舞鶴工業高等専門学校 プログラマーズコミュニティ部。競技プログラミング、Web開発、アプリ制作、大会実績などを紹介します。',
  github: 'https://github.com/NIT-Maizuru-Programmers-Community' as const,
  schedule: '活動日時は現在ご案内の準備中です。',
  location: '活動場所は現在ご案内の準備中です。',
  contact: null as Contact | null,
  heroImage: null as { src: string; alt: string } | null,
};
export const navigation = [
  ['/', 'ホーム'],
  ['/activities', '活動紹介'],
  ['/works', '作品紹介'],
  ['/results', '大会・イベント実績'],
  ['/news', 'お知らせ'],
  ['/contact', 'お問い合わせ'],
  ['/links', '各種リンク'],
] as const;
