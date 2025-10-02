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
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Listings</h1>
          <p className="mt-2 text-lg text-slate-600 font-medium">
            Manage your roster spots and tryout listings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 transition-smooth active:scale-95"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Listing
          </Link>
        </div>
      </div>

      {/* Active Listings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Listings</h2>
        {activeListings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center">
              <Plus className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Listings</h3>
            <p className="text-slate-600 font-medium mb-6">Create one to start recruiting!</p>
            <Link
              href="/dashboard/listings/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 transition-smooth active:scale-95"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/dashboard/listings/${listing.id}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-premium border border-slate-200 hover:shadow-premium-lg hover:border-indigo-200 transition-smooth p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-smooth">
                          {listing.title}
                        </h3>
                        <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                          listing.visibility === 'public'
                            ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border border-emerald-200'
                            : 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          {listing.visibility}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center font-medium">
                          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-indigo-500" />
                          {listing.teams?.name} - {listing.teams?.sports?.name}
                        </span>
                        {listing.seasons?.name && (
                          <span className="flex items-center font-medium">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-indigo-500" />
                            {listing.seasons.name}
                          </span>
                        )}
                        {listing.positions?.name && (
                          <span className="font-medium">{listing.positions.name}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="font-semibold text-slate-700">
                          {listing.applications?.[0]?.count || 0} applications
                        </span>
                        {listing.capacity && (
                          <span className="font-semibold text-slate-700">
                            {listing.capacity} spots
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      {listing.fee_cents && listing.fee_cents > 0 && (
                        <div className="mb-3">
                          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            ${(listing.fee_cents / 100).toFixed(2)}
                          </div>
                          <div className="text-xs text-slate-500 font-semibold">application fee</div>
                        </div>
                      )}
                      {listing.deadline && (
                        <div className="flex items-center text-sm font-semibold text-slate-600">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Closes {new Date(listing.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Closed Listings */}
      {closedListings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Closed Listings</h2>
          <div className="space-y-3">
            {closedListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {listing.title}
                    </p>
                    <p className="text-sm text-slate-600 font-medium mt-1">
                      {listing.teams?.name} - {listing.seasons?.name}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                    Closed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
