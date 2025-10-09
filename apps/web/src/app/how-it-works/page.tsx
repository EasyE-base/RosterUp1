import { WaitlistForm } from '@/components/waitlist-form';
import Link from 'next/link';
import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { Footer } from '@/components/footer/footer';

export const metadata: Metadata = {
  title: pageMetadata.howItWorks.title,
  description: pageMetadata.howItWorks.description,
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How RosterUp Works
          </h1>
          <p className="text-xl text-gray-600">
            A simple, two-sided marketplace connecting youth sports organizations with talented players.
          </p>
        </div>

        {/* For Organizations */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              For Organizations
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Create Your Organization Profile</h3>
                  <p className="text-gray-700">Set up your organization and add all your teams (10U, 12U, 14U, etc.) in one centralized hub.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Post Tryout Listings</h3>
                  <p className="text-gray-700">Create listings for open positions on any of your teams. Specify age groups, positions, and requirements.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Review Applications</h3>
                  <p className="text-gray-700">Players apply through the platform. Review their profiles, stats, and highlights all in one place.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Build Your Rosters</h3>
                  <p className="text-gray-700">Invite players to tryouts, manage your recruiting pipeline, and build championship teams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Players */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              For Players
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Build Your Athlete Profile</h3>
                  <p className="text-gray-700">Create a comprehensive profile with your stats, achievements, position, and highlight videos.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Search for Teams</h3>
                  <p className="text-gray-700">Browse tryout listings and open positions. Filter by sport, location, age group, and skill level.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Apply to Tryouts</h3>
                  <p className="text-gray-700">Submit applications with one click. Your profile is shared directly with the organization's coaches.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get Discovered</h3>
                  <p className="text-gray-700">Receive invitations to tryouts and connect with elite travel sports programs looking for talent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Join the waitlist to be notified when we launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/organizations"
              className="inline-flex items-center justify-center h-12 px-8 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              I'm an Organization
            </Link>
            <Link
              href="/players"
              className="inline-flex items-center justify-center h-12 px-8 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors"
            >
              I'm a Player
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
