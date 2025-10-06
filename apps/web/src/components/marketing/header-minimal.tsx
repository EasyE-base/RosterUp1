'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const navItems = [
  { name: 'Teams', href: '/browse/listings' },
  { name: 'For Players', href: '/players' },
  { name: 'For Coaches', href: '/coaches' },
  { name: 'How It Works', href: '/how-it-works' },
];

export function HeaderMinimal() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-32 md:h-40">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/rosterup-logo.png"
              alt="RosterUp"
              className="h-28 md:h-36 w-auto transition-all group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div>
            <Button
              size="lg"
              variant="apple-blue"
              asChild
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </nav>

      </Container>
    </header>
  );
}
