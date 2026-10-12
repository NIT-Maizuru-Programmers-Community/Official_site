'use client';

import { useEffect } from 'react';

const revealSelector = [
  '#main .hero-copy > *',
  '#main .hero-visual',
  '#main .split-section > *',
  '#main .section-heading',
  '#main .activity-index article',
  '#main .join-section > *',
  '#main .page-heading',
  '#main .detail-section',
  '#main .activity-details > section',
  '#main .related-links > a',
  '#main .works-list article',
  '#main .news-list article',
  '#main .not-found > *',
  '.site-footer > div',
  '.site-footer > .copyright',
].join(',');

export function ScrollMotion({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );

    const observeTargets = () => {
      document
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((target) => {
          if (target.dataset.reveal) return;

          const siblings = Array.from(
            target.parentElement?.children ?? [],
          ).filter((sibling) => sibling.matches(revealSelector));
          const delay = Math.min(Math.max(siblings.indexOf(target), 0), 3) * 85;

          target.dataset.reveal = 'true';
          target.style.setProperty('--reveal-delay', `${delay}ms`);
          observer.observe(target);
        });
    };

    observeTargets();
    document.documentElement.classList.add('motion-ready');

    const mutations = new MutationObserver(observeTargets);
    const main = document.querySelector('#main');

    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return <>{children}</>;
}
