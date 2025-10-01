import { getProfile } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Users, ClipboardList, MessageSquare, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
  const profile = await getProfile();
  const supabase = createServerComponentClient({ cookies });

  // Get counts for dashboard
  const isCoachOrAdmin = ['coach', 'admin', 'super_admin'].includes(profile.role);
  
  let stats = {
    orgs: 0,
    teams: 0,
    activeListings: 0,
    pendingApplications: 0
  };

  if (isCoachOrAdmin) {
    // Get orgs and teams the user has access to
    const { data: teamAdminData } = await supabase
      .from('team_admins')
      .select('team_id, teams(org_id, orgs(id))')
      .eq('user_id', profile.id);

    const orgIds = [...new Set(teamAdminData?.map(ta => ta.teams?.orgs?.id).filter(Boolean) || [])];
    stats.orgs = orgIds.length;
    stats.teams = teamAdminData?.length || 0;

    // Get active listings
    const teamIds = teamAdminData?.map(ta => ta.team_id) || [];
    if (teamIds.length > 0) {
      const { count: listingsCount } = await supabase
        .from('roster_spots')
        .select('*', { count: 'exact', head: true })
        .in('team_id', teamIds)
        .eq('status', 'open');
      
      stats.activeListings = listingsCount || 0;

      // Get pending applications
      const { count: appsCount } = await supabase
        .from('applications')
        .select('*, roster_spots!inner(team_id)', { count: 'exact', head: true })
        .in('roster_spots.team_id', teamIds)
        .in('status', ['submitted', 'in_review']);
      
      stats.pendingApplications = appsCount || 0;
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">
        Welcome back, {profile.full_name || 'Coach'}
      </p>

      {isCoachOrAdmin ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Organizations
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.orgs}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/dashboard/orgs" className="text-sm text-blue-600 hover:text-blue-500">
                  Manage orgs →
                </Link>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Teams
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.teams}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/dashboard/orgs" className="text-sm text-blue-600 hover:text-blue-500">
                  View teams →
                </Link>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ClipboardList className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Listings
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.activeListings}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/dashboard/listings" className="text-sm text-blue-600 hover:text-blue-500">
                  View all →
                </Link>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Applications
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.pendingApplications}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:text-blue-500">
                  Review →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/dashboard/orgs/new"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Create Organization</h3>
                  <p className="mt-1 text-sm text-gray-500">Set up a new sports organization</p>
                </div>
              </Link>

              <Link
                href="/dashboard/listings/new"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Post New Listing</h3>
                  <p className="mt-1 text-sm text-gray-500">Create a roster spot or tryout</p>
                </div>
              </Link>

              <Link
                href="/dashboard/sites"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Edit Team Site</h3>
                  <p className="mt-1 text-sm text-gray-500">Update your team's mini-site</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You're signed in as a parent. To access coach features, please contact your organization administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
