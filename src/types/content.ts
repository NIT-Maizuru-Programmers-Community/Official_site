export type DatedContent = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: `${number}-${number}-${number}`;
  draft?: boolean;
};
export type ExternalUrl = `https://${string}`;
export type Work = DatedContent & {
  image?: string;
  imageAlt?: string;
  repositoryUrl?: ExternalUrl;
  websiteUrl?: ExternalUrl;
  tags: readonly string[];
};
export type News = DatedContent & {
  category: '活動報告' | 'イベント' | 'お知らせ';
  body: string;
};
export type Achievement = DatedContent & {
  eventName: string;
  eventYear: number;
  summary: string;
  body: string;
  outcomes: readonly {
    division: string;
    entry?: string;
    result: string;
  }[];
  sources: readonly {
    title: string;
    url: ExternalUrl;
  }[];
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
  url: ExternalUrl;
};
export type Contact = {
  url: ExternalUrl;
  provider: string;
  retention: string;
  purpose: string;
};
