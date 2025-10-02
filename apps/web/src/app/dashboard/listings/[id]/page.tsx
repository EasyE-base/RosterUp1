import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, Clock, DollarSign, Eye, EyeOff, Edit } from 'lucide-react';
import { ApplicationsList } from './components/applications-list';
import { StatusToggle } from './components/status-toggle';

export default async function ListingDetailPage({
  params
}: {
  params: { id: string };
}) {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });

  // Get listing details
  const { data: listing } = await supabase
    .from('roster_spots')
    .select(`
      *,
      teams (
        id,
        name,
        sports (name),
        orgs (name)
      ),
      seasons (name),
      positions (name)
    `)
    .eq('id', params.id)
    .single();

  if (!listing) {
    notFound();
  }

  // Check if user has access to this listing
  const { data: hasAccess } = await supabase
    .from('team_admins')
    .select('user_id')
    .eq('user_id', profile.id)
    .eq('team_id', listing.team_id)
    .limit(1)
    .single();

  if (!hasAccess) {
    notFound();
  }

  // Get applications
  const { data: applications } = await supabase
    .from('applications')
    .select(`
      *,
      kids (
        id,
        first_name,
        last_name,
        birthdate,
        grade,
        photo_url
      ),
      profiles (
        id,
        full_name,
        city,
        state
      )
    `)
    .eq('roster_spot_id', listing.id)
    .order('created_at', { ascending: false });

  const applicationsByStatus = {
    submitted: applications?.filter(a => a.status === 'submitted') || [],
    in_review: applications?.filter(a => a.status === 'in_review') || [],
    accepted: applications?.filter(a => a.status === 'accepted') || [],
    waitlisted: applications?.filter(a => a.status === 'waitlisted') || [],
    rejected: applications?.filter(a => a.status === 'rejected') || [],
    withdrawn: applications?.filter(a => a.status === 'withdrawn') || []
  };

  const acceptedCount = applicationsByStatus.accepted.length;
  const capacityReached = listing.capacity && acceptedCount >= listing.capacity;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/listings"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Listings
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
              <p className="mt-1 text-sm text-gray-600">
                {listing.teams?.orgs?.name} • {listing.teams?.name} • {listing.teams?.sports?.name}
                {listing.seasons && ` • ${listing.seasons.name}`}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
              <StatusToggle listingId={listing.id} currentStatus={listing.status} />
              <Link
                href={`/dashboard/listings/${listing.id}/edit`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </div>
          </div>

          {listing.description && (
            <div className="mt-4 text-sm text-gray-700">
              <p>{listing.description}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Position</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {listing.positions?.name || 'Any position'}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Age Range</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {listing.min_age || listing.max_age
                  ? `${listing.min_age || 'Any'} - ${listing.max_age || 'Any'}`
                  : 'Any age'}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Grade Range</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {listing.min_grade || listing.max_grade
                  ? `${listing.min_grade || 'Any'} - ${listing.max_grade || 'Any'}`
                  : 'Any grade'}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Application Fee</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {listing.fee_cents && listing.fee_cents > 0
                  ? `$${(listing.fee_cents / 100).toFixed(2)}`
                  : 'Free'}
              </dd>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center text-sm text-gray-600">
              {listing.visibility === 'public' ? (
                <>
                  <Eye className="h-4 w-4 mr-2 text-green-500" />
                  Public listing
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 mr-2 text-yellow-500" />
                  Invite only
                </>
              )}
            </div>

            {listing.deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Closes {new Date(listing.deadline).toLocaleString()}
              </div>
            )}

            {listing.capacity && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {acceptedCount} / {listing.capacity} spots filled
                {capacityReached && (
                  <span className="ml-2 text-red-600 font-medium">
                    (Capacity reached)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ApplicationsList 
          listing={listing}
          applications={applicationsByStatus}
          capacityReached={capacityReached || false}
        />
      </div>
    </div>
  );
}
