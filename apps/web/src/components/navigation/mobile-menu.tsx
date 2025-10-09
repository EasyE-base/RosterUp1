'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

const navItems = [
  { name: 'Browse Teams', href: '/browse/listings' },
  { name: 'For Organizations', href: '/organizations' },
  { name: 'For Players', href: '/players' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[64px] right-0 bottom-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
