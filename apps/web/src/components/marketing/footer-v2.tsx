import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const sports = [
  'Baseball', 'Softball', 'Basketball', 'Volleyball', 
  'Soccer', 'Lacrosse', 'Hockey', 'Football', 'All Others'
];

const product = [
  { name: 'Browse Teams', href: '/browse/listings' },
  { name: 'Player Profiles', href: '/features/profiles' },
  { name: 'Tryout Management', href: '/features/tryouts' },
  { name: 'Team Listings', href: '/features/teams' },
  { name: 'Recruitment Tools', href: '/features/recruiting' },
  { name: 'Pricing', href: '/pricing' },
];

const resources = [
  { name: 'Help Center', href: '/support' },
  { name: 'RosterUp University', href: '/university' },
  { name: 'API Documentation', href: '/developers' },
  { name: 'System Status', href: '/status' },
];

const company = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Press', href: '/press' },
  { name: 'Contact', href: '/contact' },
];

export function FooterV2() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Top section */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Logo and tagline */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-bold text-white">RosterUp</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Connecting talented players with elite travel sports teams nationwide.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Sports */}
            <div>
              <h4 className="text-white font-semibold mb-4">Sports</h4>
              <ul className="space-y-2">
                {sports.map((sport) => (
                  <li key={sport}>
                    <Link 
                      href={`/sports/${sport.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      {sport}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {product.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {resources.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition">
                Cookies
              </Link>
            </div>
            
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RosterUp. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
