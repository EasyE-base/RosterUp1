import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, Users, Settings } from 'lucide-react';
import { OrgTeams } from './components/org-teams';
import { OrgSettings } from './components/org-settings';

export default async function OrgDetailPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });
  const tab = searchParams.tab || 'teams';

  // Get org details
  const { data: org } = await supabase
    .from('orgs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!org) {
    notFound();
  }

  // Check if user has access to this org
  const { data: hasAccess } = await supabase
    .from('team_admins')
    .select('teams!inner(org_id)')
    .eq('user_id', profile.id)
    .eq('teams.org_id', org.id)
    .limit(1)
    .single();

  if (!hasAccess) {
    notFound();
  }

  // Get teams
  const { data: teams } = await supabase
    .from('teams')
    .select(`
      *,
      sports (name),
      seasons (*)
    `)
    .eq('org_id', org.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/orgs"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Organizations
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{org.name}</h1>
              {org.slug && (
                <p className="mt-1 text-sm text-gray-500">rosterup.com/{org.slug}</p>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href={`/dashboard/orgs/${org.id}/teams/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Team
              </Link>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <Link
                href={`/dashboard/orgs/${org.id}?tab=teams`}
                className={`${
                  tab === 'teams'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Users className="mr-2 h-4 w-4" />
                Teams & Seasons
              </Link>
              <Link
                href={`/dashboard/orgs/${org.id}?tab=settings`}
                className={`${
                  tab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>

          <div className="mt-6">
            {tab === 'teams' && <OrgTeams org={org} teams={teams || []} />}
            {tab === 'settings' && <OrgSettings org={org} />}
          </div>
        </div>
      </div>
    </div>
  );
}
