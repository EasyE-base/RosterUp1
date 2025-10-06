'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          {/* Left: Logo */}
          <div className="justify-self-start">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/rosterup-logo.png"
                alt="RosterUp"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">RosterUp</span>
            </Link>
          </div>

          {/* Center: Nav */}
          <div className="hidden md:flex items-center gap-8 justify-self-center">
            <Link href="/browse/listings" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Teams
            </Link>
            <Link href="/players" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Players
            </Link>
            <Link href="/coaches" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Coaches
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3 justify-self-end">
            <Link
              href="/login"
              className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex h-10 items-center rounded-full bg-blue-500 px-6 text-sm font-medium text-white hover:bg-blue-600 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
