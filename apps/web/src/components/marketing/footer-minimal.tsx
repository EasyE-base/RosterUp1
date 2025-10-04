import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const navigation = {
  product: [
    { name: 'Browse Teams', href: '/browse/listings' },
    { name: 'For Players', href: '/players' },
    { name: 'For Coaches', href: '/coaches' },
    { name: 'How It Works', href: '/how-it-works' },
  ],
  sports: [
    { name: 'Baseball', href: '/sports/baseball' },
    { name: 'Basketball', href: '/sports/basketball' },
    { name: 'Soccer', href: '/sports/soccer' },
    { name: 'All Sports', href: '/sports/all-sports' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
};

const social = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function FooterMinimal() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
                  <span className="text-white font-black text-xl">R</span>
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  RosterUp
                </span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                Connecting talented players with elite travel sports teams nationwide.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Product
              </h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Sports
              </h3>
              <ul className="space-y-3">
                {navigation.sports.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} RosterUp. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Trusted by 10,000+ Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
