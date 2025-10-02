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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-lg text-slate-600 font-medium">
          Welcome back, {profile.full_name || 'Coach'}
        </p>
      </div>

      {isCoachOrAdmin ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Organizations Card */}
            <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden transition-smooth hover:shadow-premium-lg hover:border-indigo-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <dt className="text-sm font-semibold text-slate-500 truncate">
                      Organizations
                    </dt>
                    <dd className="mt-1">
                      <div className="text-3xl font-bold text-slate-900">
                        {stats.orgs}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 border-t border-slate-200">
                <Link href="/dashboard/orgs" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-smooth inline-flex items-center">
                  Manage orgs
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Teams Card */}
            <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden transition-smooth hover:shadow-premium-lg hover:border-indigo-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <dt className="text-sm font-semibold text-slate-500 truncate">
                      Teams
                    </dt>
                    <dd className="mt-1">
                      <div className="text-3xl font-bold text-slate-900">
                        {stats.teams}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 border-t border-slate-200">
                <Link href="/dashboard/orgs" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-smooth inline-flex items-center">
                  View teams
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Active Listings Card */}
            <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden transition-smooth hover:shadow-premium-lg hover:border-indigo-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <dt className="text-sm font-semibold text-slate-500 truncate">
                      Active Listings
                    </dt>
                    <dd className="mt-1">
                      <div className="text-3xl font-bold text-slate-900">
                        {stats.activeListings}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 border-t border-slate-200">
                <Link href="/dashboard/listings" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-smooth inline-flex items-center">
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Pending Applications Card */}
            <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden transition-smooth hover:shadow-premium-lg hover:border-indigo-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <dt className="text-sm font-semibold text-slate-500 truncate">
                      Pending Applications
                    </dt>
                    <dd className="mt-1">
                      <div className="text-3xl font-bold text-slate-900">
                        {stats.pendingApplications}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 border-t border-slate-200">
                <Link href="/dashboard/applications" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-smooth inline-flex items-center">
                  Review
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/dashboard/orgs/new"
                className="group relative rounded-2xl border-2 border-slate-200 bg-white px-8 py-6 shadow-premium hover:shadow-premium-lg hover:border-indigo-300 transition-smooth"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-smooth">Create Organization</h3>
                  <p className="mt-2 text-sm text-slate-600 font-medium">Set up a new sports organization</p>
                </div>
              </Link>

              <Link
                href="/dashboard/listings/new"
                className="group relative rounded-2xl border-2 border-slate-200 bg-white px-8 py-6 shadow-premium hover:shadow-premium-lg hover:border-indigo-300 transition-smooth"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-smooth">Post New Listing</h3>
                  <p className="mt-2 text-sm text-slate-600 font-medium">Create a roster spot or tryout</p>
                </div>
              </Link>

              <Link
                href="/dashboard/sites"
                className="group relative rounded-2xl border-2 border-slate-200 bg-white px-8 py-6 shadow-premium hover:shadow-premium-lg hover:border-indigo-300 transition-smooth"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-smooth">Edit Team Site</h3>
                  <p className="mt-2 text-sm text-slate-600 font-medium">Update your team's mini-site</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-r-xl p-6 shadow-premium">
            <div className="flex">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-amber-800">
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
