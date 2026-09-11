import { works } from '@/content/works';
import { site } from '@/content/site';
import { published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { PageHeading, WorkList } from '@/components/ui/content';
export const metadata = pageMetadata(
  '作品紹介',
  '部員が制作したWebサイト、アプリ、競技作品などを紹介します。',
  '/works',
);
export default function Works() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="02"
        english="WORKS"
        title="作品紹介"
        description="アイデアから生まれた、私たちのものづくり。"
      />
      <h2 className="sr-only">作品一覧</h2>
      <WorkList items={published(works)} />
      <div className="detail-section">
        <h2>開発の様子をGitHubで</h2>
        <p>公開リポジトリはこちらからご覧いただけます。</p>
        <a className="arrow-link" href={site.github}>
          GitHub Organization <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
