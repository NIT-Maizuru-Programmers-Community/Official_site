import Link from 'next/link';
import { site } from '@/content/site';
import { PageHeading } from '@/components/ui/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'プライバシーポリシー',
  '当サイトの情報の取り扱いと外部サービスについて。',
  '/privacy',
);
export default function Privacy() {
  return (
    <div className="page-wrap narrow">
      <PageHeading
        number="06"
        english="PRIVACY POLICY"
        title="プライバシーポリシー"
        description="このサイトにおける情報の取り扱いについて。"
      />
      <section className="detail-section">
        <h2>取得する情報・利用目的</h2>
        <p>
          このサイトにはログイン、コメント、独自のお問い合わせ送信機能はありません。独自のアクセス解析ツールや広告Cookieは使用していません。
        </p>
        <p>
          配信サービスの運用に伴い、IPアドレスやアクセス日時などの通信情報が、セキュリティや安定した配信のために処理される場合があります。
        </p>
      </section>
      <section className="detail-section">
        <h2>外部サービス</h2>
        <p>
          Cloudflare Workersでの配信を予定しています。配信時の情報の取り扱いは
          <a href="https://www.cloudflare.com/privacypolicy/">
            Cloudflareのプライバシーポリシー
          </a>
          をご確認ください。外部リンク先での情報の取り扱いは、各サイトの方針に従います。
        </p>
        <p>
          フォントはサイトと同じ配信元から読み込み、Google
          Fontsへの通信は行いません。
        </p>
      </section>
      <section className="detail-section">
        <h2>お問い合わせ情報</h2>
        {site.contact ? (
          <>
            <p>受付サービス：{site.contact.provider}</p>
            <p>利用目的：{site.contact.purpose}</p>
            <p>保存期間：{site.contact.retention}</p>
          </>
        ) : (
          <p>
            お問い合わせ窓口は準備中のため、現在このサイトでお問い合わせ情報を収集・保存していません。受付開始前に、サービス、利用目的、保存期間をこのページに掲載します。
          </p>
        )}
        <Link className="arrow-link" href="/contact">
          お問い合わせのご案内 <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="detail-section">
        <h2>方針の変更</h2>
        <p>
          掲載する機能や利用するサービスが変わる場合は、このページを更新します。
        </p>
      </section>
    </div>
  );
}
