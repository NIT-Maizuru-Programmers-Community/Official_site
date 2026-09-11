import type { Metadata } from 'next';
import { site } from '@/content/site';
const origin = process.env.NEXT_PUBLIC_SITE_URL;
if (
  origin &&
  (new URL(origin).protocol !== 'https:' || new URL(origin).pathname !== '/')
)
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin');
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(origin
      ? {
          alternates: { canonical: new URL(path, origin).href },
          openGraph: {
            title: `${title} | ${site.name}`,
            description,
            url: new URL(path, origin).href,
            images: [new URL('/images/common/og.png', origin).href],
            locale: 'ja_JP',
            type: 'website',
            siteName: site.name,
          },
          twitter: { card: 'summary_large_image' },
        }
      : {}),
  };
}
