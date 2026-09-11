'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '@/content/site';
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? '閉じる −' : 'メニュー ＋'}
      </button>
      <nav
        id="main-navigation"
        className={`navigation ${open ? 'is-open' : ''}`}
        aria-label="メインナビゲーション"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
            document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
          }
        }}
      >
        {navigation.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (pathname.replace(/\/$/, '') || '/') === href ? 'page' : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
