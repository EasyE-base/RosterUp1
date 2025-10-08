import { WaitlistForm } from '@/components/waitlist-form';
import Link from 'next/link';

export default function PlayersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <WaitlistForm
          title="For Players - Coming Soon"
          description="Create your athlete profile, showcase your stats and highlights, and get discovered by elite teams. Join the waitlist to be notified when we launch."
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
