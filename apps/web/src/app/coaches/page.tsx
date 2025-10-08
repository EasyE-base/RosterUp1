import { WaitlistForm } from '@/components/waitlist-form';
import Link from 'next/link';

export default function CoachesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <WaitlistForm
          title="For Coaches - Coming Soon"
          description="Manage tryouts, review applications, and build championship rosters with powerful recruiting tools. Join the waitlist to be first to access."
        />

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
