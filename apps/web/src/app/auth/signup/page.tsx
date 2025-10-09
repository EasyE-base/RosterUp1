import { WaitlistForm } from '@/components/waitlist-form';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';

export const metadata: Metadata = {
  title: pageMetadata.signup.title,
  description: pageMetadata.signup.description,
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-20">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <Image src="/rosterup-logo.png" alt="RosterUp" width={48} height={48} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-[-0.003em] mb-4">
            Get Started with RosterUp
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Join the waitlist to be notified when we launch. Connect with elite organizations or talented players.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/organizations"
            className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              I'm an Organization
            </h3>
            <p className="text-gray-600">
              Manage multiple teams and recruit talented players
            </p>
            <div className="mt-4 text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
              Learn more →
            </div>
          </Link>

          <Link
            href="/players"
            className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              I'm a Player
            </h3>
            <p className="text-gray-600">
              Build your profile and get discovered by elite teams
            </p>
            <div className="mt-4 text-green-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
              Learn more →
            </div>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
