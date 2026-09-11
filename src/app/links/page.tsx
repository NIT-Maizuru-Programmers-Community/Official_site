import { links } from '@/content/links';
import { PageHeading } from '@/components/ui/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  '各種リンク',
  '学校、GitHub、関連大会のWebサイトをご紹介します。',
  '/links',
);
export default function Links() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="05"
        english="LINKS"
        title="各種リンク"
        description="学校のこと、開発のこと、大会のこと。"
      />
      <div className="related-links">
        {links.map((item, i) => (
          <a href={item.url} key={item.slug}>
            <span className="index-number">0{i + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <small>{new URL(item.url).hostname}</small>
            </div>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
