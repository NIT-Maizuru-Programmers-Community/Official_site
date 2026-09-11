import { site } from '@/content/site';
import Link from 'next/link';
import { PageHeading } from '@/components/ui/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'お問い合わせ',
  '入部、見学、部活動へのお問い合わせについて。',
  '/contact',
);
export default function Contact() {
  return (
    <div className="page-wrap narrow">
      <PageHeading
        number="04"
        english="CONTACT"
        title="お問い合わせ"
        description="入部・見学、活動についてのご案内。"
      />
      <section className="detail-section">
        <h2>入部・見学をお考えの方へ</h2>
        <p>
          活動に興味を持っていただき、ありがとうございます。活動内容は活動紹介ページでご覧いただけます。
        </p>
        <Link className="arrow-link" href="/activities">
          活動紹介へ <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="detail-section">
        <h2>お問い合わせ窓口</h2>
        {site.contact ? (
          <>
            <p>
              お問い合わせは{site.contact.provider}
              の外部フォームで受け付けています。
            </p>
            <a className="button-link" href={site.contact.url}>
              お問い合わせフォームへ ↗
            </a>
            <p>
              外部サービスに移動します。送信前に
              <Link href="/privacy">プライバシーポリシー</Link>
              をご確認ください。
            </p>
          </>
        ) : (
          <p>
            お問い合わせ窓口は現在準備中です。受付方法が決まり次第、このページでご案内します。このサイトではお問い合わせの送信や個人情報の入力はできません。
          </p>
        )}
      </section>
      <section className="detail-section">
        <h2>お問い合わせの前に</h2>
        <p>
          パスワードなどの秘密情報や、第三者の個人情報を送らないでください。学校全般については、
          <a href="https://www.maizuru-ct.ac.jp/">
            舞鶴工業高等専門学校の公式サイト
          </a>
          をご確認ください。
        </p>
      </section>
    </div>
  );
}
