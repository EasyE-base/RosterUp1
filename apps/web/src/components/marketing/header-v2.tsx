'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const sports = [
  { name: 'Baseball', icon: '⚾' },
  { name: 'Softball', icon: '🥎' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Football', icon: '🏈' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Soccer', icon: '⚽' },
  { name: 'Lacrosse', icon: '🥍' },
  { name: 'All Sports', icon: '🏆' },
];

const features = [
  { name: 'Team Management', href: '#features' },
  { name: 'Tryout Management', href: '#tryouts' },
  { name: 'Payment Processing', href: '#payments' },
  { name: 'Live Streaming', href: '#streaming' },
  { name: 'Team Sites', href: '#sites' },
];

export function HeaderV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200",
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800" 
          : "bg-gray-900/80 backdrop-blur-sm"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">RosterUp</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Sports dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => setSportsOpen(true)}
                onMouseLeave={() => setSportsOpen(false)}
              >
                Sports
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {sportsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-xl border border-gray-700"
                    onMouseEnter={() => setSportsOpen(true)}
                    onMouseLeave={() => setSportsOpen(false)}
                  >
                    <div className="p-2">
                      {sports.map((sport) => (
                        <Link
                          key={sport.name}
                          href={`/sports/${sport.name.toLowerCase()}`}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                        >
                          <span className="text-xl">{sport.icon}</span>
                          <span>{sport.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Features dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-xl border border-gray-700"
                    onMouseEnter={() => setFeaturesOpen(true)}
                    onMouseLeave={() => setFeaturesOpen(false)}
                  >
                    <div className="p-2">
                      {features.map((feature) => (
                        <Link
                          key={feature.name}
                          href={feature.href}
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                        >
                          {feature.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>

            <Link href="/resources" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Resources
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/auth/signup">Join Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-900 border-t border-gray-800"
          >
            <Container>
              <div className="space-y-1 py-4">
                <div className="pb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sports</p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {sports.map((sport) => (
                      <Link
                        key={sport.name}
                        href={`/sports/${sport.name.toLowerCase()}`}
                        className="flex flex-col items-center p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">{sport.icon}</span>
                        <span className="text-xs">{sport.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Features</p>
                  <div className="mt-2 space-y-1">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/auth/signup">Join Us</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
