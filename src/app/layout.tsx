import type { Metadata } from 'next';
import Link from 'next/link';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-jp';
import './globals.css';
import { site, navigation } from '@/content/site';
import { Navigation } from '@/components/layout/navigation';
export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.school}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <header className="site-header">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              m<span>.</span>
            </span>
            <span>
              <strong>{site.school}</strong>
              <small>{site.english}</small>
            </span>
          </Link>
          <Navigation />
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div>
            <p className="eyebrow">MAIZURU KOSEN</p>
            <Link href="/" className="footer-name">
              プログラミング
              <br />
              コンテスト部
            </Link>
            <p>{site.english}</p>
          </div>
          <div className="footer-links">
            {navigation.slice(1).map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <a href={site.github}>GitHub ↗</a>
            <Link href="/privacy">プライバシーポリシー</Link>
          </div>
          <p className="copyright">© {site.english}</p>
        </footer>
      </body>
    </html>
  );
}
