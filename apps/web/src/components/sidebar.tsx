'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Organizations', href: '/dashboard/orgs', icon: Users },
  { name: 'Listings', href: '/dashboard/listings', icon: ClipboardList },
  { name: 'Applications', href: '/dashboard/applications', icon: MessageSquare },
  { name: 'Team Sites', href: '/dashboard/sites', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-indigo-900 to-indigo-950 border-r border-indigo-800/30">
      {/* Logo Header */}
      <div className="flex h-20 items-center justify-center border-b border-indigo-800/30">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
          RosterUp
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-smooth
                ${isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                }
              `}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-indigo-300'}`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="flex-shrink-0 p-4 border-t border-indigo-800/30">
        <button
          onClick={handleSignOut}
          className="group flex w-full items-center px-4 py-3 text-sm font-semibold text-indigo-200 rounded-xl hover:bg-indigo-800/50 hover:text-white transition-smooth"
        >
          <LogOut className="mr-3 h-5 w-5 text-indigo-300" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
