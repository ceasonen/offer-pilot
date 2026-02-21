'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-slate-100">
          OfferPilot
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-300">
          <Link href="/">面试大厅</Link>
          <Link href="/history">历史记录</Link>
          <Link href="/settings">设置</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
