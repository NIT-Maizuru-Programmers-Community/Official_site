export type DatedContent = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: `${number}-${number}-${number}`;
  draft?: boolean;
};
export type Work = DatedContent & {
  image?: string;
  imageAlt?: string;
  repositoryUrl?: string;
  websiteUrl?: string;
  tags: readonly string[];
};
export type News = DatedContent & {
  category: '活動報告' | 'イベント' | 'お知らせ';
};
export type Activity = {
  slug: string;
  title: string;
  english: string;
  summary: string;
  detail: string;
};
export type RelatedLink = {
  slug: string;
  title: string;
  description: string;
  url: string;
};
export type Contact = {
  url: string;
  provider: string;
  retention: string;
  purpose: string;
};
