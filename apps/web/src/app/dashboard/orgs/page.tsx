import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Plus, Building2, Users } from 'lucide-react';

export default async function OrgsPage() {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });

  // Get orgs the user has access to
  const { data: teamAdminData } = await supabase
    .from('team_admins')
    .select(`
      team_id,
      teams (
        id,
        name,
        sport_id,
        sports (name),
        orgs (
          id,
          name,
          slug,
          logo_url
        )
      )
    `)
    .eq('user_id', profile.id);

  // Group teams by org
  const orgMap = new Map();
  teamAdminData?.forEach(ta => {
    const org = ta.teams?.orgs;
    if (org) {
      if (!orgMap.has(org.id)) {
        orgMap.set(org.id, {
          ...org,
          teams: []
        });
      }
      if (ta.teams) {
        orgMap.get(org.id).teams.push(ta.teams);
      }
    }
  });

  const orgs = Array.from(orgMap.values());

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Organizations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your sports organizations and teams
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/dashboard/orgs/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Organization
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orgs.map((org) => (
          <div key={org.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                {org.logo_url ? (
                  <img
                    className="h-12 w-12 rounded-full"
                    src={org.logo_url}
                    alt={org.name}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                  {org.slug && (
                    <p className="text-sm text-gray-500">@{org.slug}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <Users className="inline h-4 w-4 mr-1" />
                  {org.teams.length} team{org.teams.length !== 1 ? 's' : ''}
                </p>
                <div className="mt-2">
                  {org.teams.slice(0, 3).map((team: any) => (
                    <span
                      key={team.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-1"
                    >
                      {team.name} ({team.sports?.name})
                    </span>
                  ))}
                  {org.teams.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{org.teams.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <Link
                href={`/dashboard/orgs/${org.id}`}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Manage →
              </Link>
            </div>
          </div>
        ))}

        {orgs.length === 0 && (
          <div className="col-span-full">
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new organization.
              </p>
              <div className="mt-6">
                <Link
                  href="/dashboard/orgs/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Organization
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
