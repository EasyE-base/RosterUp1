import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Plus, Calendar, Users, Clock, DollarSign } from 'lucide-react';

export default async function ListingsPage() {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });

  // Get teams the user has access to
  const { data: teamAdminData } = await supabase
    .from('team_admins')
    .select('team_id')
    .eq('user_id', profile.id);

  const teamIds = teamAdminData?.map(ta => ta.team_id) || [];

  // Get listings for those teams
  const { data: listings } = await supabase
    .from('roster_spots')
    .select(`
      *,
      teams (
        name,
        sports (name)
      ),
      seasons (name),
      positions (name),
      applications (count)
    `)
    .in('team_id', teamIds)
    .order('created_at', { ascending: false });

  const activeListings = listings?.filter(l => l.status === 'open') || [];
  const closedListings = listings?.filter(l => l.status === 'closed') || [];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your roster spots and tryout listings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Listings</h2>
        {activeListings.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
            No active listings. Create one to start recruiting!
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {activeListings.map((listing) => (
                <li key={listing.id}>
                  <Link
                    href={`/dashboard/listings/${listing.id}`}
                    className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {listing.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              listing.visibility === 'public' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {listing.visibility}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex space-x-4 text-sm text-gray-500">
                            <p className="flex items-center">
                              <Users className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {listing.teams?.name} - {listing.teams?.sports?.name}
                            </p>
                            {listing.seasons?.name && (
                              <p className="flex items-center">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                {listing.seasons.name}
                              </p>
                            )}
                            {listing.positions?.name && (
                              <p>{listing.positions.name}</p>
                            )}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            {listing.fee_cents && listing.fee_cents > 0 && (
                              <p className="flex items-center mr-4">
                                <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                ${(listing.fee_cents / 100).toFixed(2)}
                              </p>
                            )}
                            {listing.deadline && (
                              <p className="flex items-center">
                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                Closes {new Date(listing.deadline).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {listing.applications?.[0]?.count || 0} applications
                          {listing.capacity && ` • ${listing.capacity} spots`}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {closedListings.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Closed Listings</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {closedListings.map((listing) => (
                <li key={listing.id}>
                  <div className="px-4 py-4 sm:px-6 opacity-60">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {listing.teams?.name} - {listing.seasons?.name}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
