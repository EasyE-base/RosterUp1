'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';

export function AppleHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'
      )}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 24px' }}>
        <nav style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '64px' }}>
          {/* Left: Logo */}
          <div style={{ justifySelf: 'start' }}>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/rosterup-logo.png" alt="RosterUp" width={32} height={32} />
              <span className="text-lg font-semibold tracking-tight">RosterUp</span>
            </Link>
          </div>

          {/* Center: Nav */}
          <div className="hidden md:flex items-center gap-8" style={{ justifySelf: 'center' }}>
            <Link href="/browse/listings" className="text-sm font-medium text-gray-700 hover:text-blue-600">Browse Teams</Link>
            <Link href="/organizations" className="text-sm font-medium text-gray-700 hover:text-blue-600">For Organizations</Link>
            <Link href="/players" className="text-sm font-medium text-gray-700 hover:text-blue-600">For Players</Link>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3" style={{ justifySelf: 'end' }}>
            <Link href="/login" className="hidden md:inline-flex h-11 items-center rounded-full px-4 text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="hidden md:inline-flex h-11 items-center rounded-full bg-blue-500 px-7 text-[17px] font-medium text-white hover:bg-blue-600"
            >
              Get Started
            </Link>
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
