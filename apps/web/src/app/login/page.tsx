'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push('/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-900">
            RosterUp
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your teams and rosters
          </p>
        </div>
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`}
            magicLink
            showLinks={false}
          />
        </div>
      </div>
    </div>
  );
}
