import { activities } from '@/content/activities';
import { site } from '@/content/site';
import { PageHeading, ArrowLink } from '@/components/ui/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  '活動紹介',
  '競技プログラミングからWeb・アプリ開発まで、活動内容をご紹介します。',
  '/activities',
);
export default function Activities() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="01"
        english="ACTIVITIES"
        title="活動紹介"
        description="考えたことをコードにして、仲間と一緒に育てていく。"
      />
      <div className="activity-details">
        {activities.map((item, i) => (
          <section key={item.slug}>
            <span className="index-number">0{i + 1}</span>
            <div>
              <p className="eyebrow">{item.english}</p>
              <h2>{item.title}</h2>
              <p className="lead">{item.summary}</p>
              <p>{item.detail}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="detail-section">
        <h2>活動日時・場所</h2>
        <dl>
          <div>
            <dt>活動日時</dt>
            <dd>{site.schedule}</dd>
          </div>
          <div>
            <dt>活動場所</dt>
            <dd>{site.location}</dd>
          </div>
        </dl>
      </section>
      <section className="detail-section">
        <h2>年間の取り組み</h2>
        <p>大会参加やイベントなどの予定は、決まり次第お知らせします。</p>
        <ArrowLink href="/news">お知らせを見る</ArrowLink>
      </section>
      <ArrowLink href="/contact">入部・見学のご案内</ArrowLink>
    </div>
  );
}
