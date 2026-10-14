import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { ExternalUrl } from '@/types/content';

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'rel' | 'target'
> & {
  href: ExternalUrl;
  children: ReactNode;
};

export function ExternalLink({ href, children, ...props }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
