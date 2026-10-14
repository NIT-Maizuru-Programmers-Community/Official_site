import { links } from '@/content/links';
import { PageHeading } from '@/components/ui/content';
import { ExternalLink } from '@/components/ui/external-link';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  '各種リンク',
  '学校、部の発信、関連大会や地域連携のWebサイトをご紹介します。',
  '/links',
);
export default function Links() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="05"
        english="LINKS"
        title="各種リンク"
        description="学校のこと、部の発信、大会や地域連携のこと。リンクは別タブで開きます。"
      />
      <div className="related-links">
        {links.map((item, i) => (
          <ExternalLink href={item.url} key={item.slug}>
            <span className="index-number">0{i + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <small>{new URL(item.url).hostname}</small>
            </div>
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
