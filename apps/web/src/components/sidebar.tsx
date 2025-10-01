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
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">RosterUp</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex-shrink-0 p-4">
        <button
          onClick={handleSignOut}
          className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
