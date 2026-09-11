import Image from 'next/image';
import { site } from '@/content/site';
import { activities } from '@/content/activities';
import { news } from '@/content/news';
import { works } from '@/content/works';
import { published } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { ArrowLink, NewsList, WorkList } from '@/components/ui/content';
export const metadata = pageMetadata('ホーム', site.description, '/');
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">舞鶴高専 / PROGRAMMERS COMMUNITY</p>
          <h1>
            プログラミング
            <br />
            コンテスト部<span className="blue-dot">.</span>
          </h1>
          <p className="hero-tagline">つくって、試して、またつくる。</p>
          <p className="hero-description">
            競技プログラミング / Web開発 / アプリ制作
          </p>
          <ArrowLink href="/activities">私たちの活動を知る</ArrowLink>
          <p className="hero-bottom">好きなことから、次の一歩へ。</p>
        </div>
        <div className={`hero-visual ${site.heroImage ? 'has-photo' : ''}`}>
          {site.heroImage ? (
            <Image
              src={site.heroImage.src}
              alt={site.heroImage.alt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 45vw"
            />
          ) : (
            <div className="type-poster" aria-hidden="true">
              <span className="poster-small">
                NITMC
                <br />
                PROGRAMMERS
                <br />
                COMMUNITY
              </span>
              <span className="poster-word">
                Think.
                <br />
                Code.
                <br />
                Create.
              </span>
              <span className="poster-bottom">
                MAIZURU, JAPAN <span>↗</span>
              </span>
            </div>
          )}
        </div>
      </section>
      <section className="section split-section">
        <div>
          <p className="eyebrow">01 / NEWS</p>
          <h2>お知らせ</h2>
          <ArrowLink href="/news">すべてのお知らせ</ArrowLink>
        </div>
        <NewsList items={published(news).slice(0, 3)} />
      </section>
      <section className="section activities-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / ACTIVITIES</p>
            <h2>
              考える。つくる。
              <br />
              仲間と、進む。
            </h2>
          </div>
          <p>
            ひとつの問題に向き合う時間も、
            <br />
            アイデアを形にする時間も。
            <br />
            プログラミングで、できることを広げていく。
          </p>
        </div>
        <div className="activity-index">
          {activities.map((activity, i) => (
            <article key={activity.slug}>
              <span className="index-number">0{i + 1}</span>
              <div>
                <h3>{activity.title}</h3>
                <p>{activity.summary}</p>
              </div>
              <span className="activity-english">{activity.english}</span>
            </article>
          ))}
        </div>
        <ArrowLink href="/activities">活動について詳しく</ArrowLink>
      </section>
      <section className="section split-section">
        <div>
          <p className="eyebrow">03 / WORKS</p>
          <h2>つくったもの</h2>
          <ArrowLink href="/works">作品一覧へ</ArrowLink>
        </div>
        <WorkList items={published(works).slice(0, 2)} />
      </section>
      <section className="join-section">
        <p className="eyebrow">JOIN OUR COMMUNITY</p>
        <h2>
          「つくってみたい」
          <br />
          を、ここから。
        </h2>
        <div>
          <p>
            活動や見学についてのご案内は、
            <br />
            お問い合わせページをご確認ください。
          </p>
          <ArrowLink href="/contact">入部・見学について</ArrowLink>
        </div>
      </section>
    </>
  );
}
