'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-white">
            Join RosterUp
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Create your account to start coaching or find your team
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 py-8 px-4 shadow-lg rounded-2xl sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#06b6d4',
                    brandAccent: '#0891b2',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`}
            magicLink
            view="sign_up"
            showLinks={true}
          />
        </div>
      </div>
    </div>
  );
}
