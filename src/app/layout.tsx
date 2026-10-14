import type { Metadata } from 'next';
import Link from 'next/link';
import '@fontsource-variable/inter';
import './globals.css';
import { site, navigation } from '@/content/site';
import { ExternalLink } from '@/components/ui/external-link';
import { Navigation } from '@/components/layout/navigation';
import { ScrollMotion } from '@/components/layout/scroll-motion';
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
          <ScrollMotion>{children}</ScrollMotion>
        </main>
        <footer className="site-footer">
          <div>
            <p className="eyebrow">MAIZURU KOSEN</p>
            <Link href="/" className="footer-name">
              プログラマーズ
              <br />
              コミュニティ部
            </Link>
            <p>{site.english}</p>
          </div>
          <div className="footer-links">
            {navigation.slice(1).map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <ExternalLink href={site.github}>GitHub ↗</ExternalLink>
            <Link href="/privacy">プライバシーポリシー</Link>
          </div>
          <p className="copyright">© {site.english}</p>
        </footer>
      </body>
    </html>
  );
}
