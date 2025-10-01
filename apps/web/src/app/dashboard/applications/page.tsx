import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { MessageSquare, User, Calendar, MapPin, ClipboardList } from 'lucide-react';

export default async function ApplicationsPage() {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });

  // Get teams the user has access to
  const { data: teamAdminData } = await supabase
    .from('team_admins')
    .select('team_id')
    .eq('user_id', profile.id);

  const teamIds = teamAdminData?.map(ta => ta.team_id) || [];

  // Get all applications for those teams
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
      ),
      roster_spots (
        id,
        title,
        teams (
          name,
          sports (name)
        ),
        seasons (name)
      ),
      conversations (id)
    `)
    .in('roster_spots.team_id', teamIds)
    .in('status', ['submitted', 'in_review', 'accepted', 'waitlisted'])
    .order('created_at', { ascending: false });

  const newApplications = applications?.filter(a => a.status === 'submitted') || [];
  const inReview = applications?.filter(a => a.status === 'in_review') || [];
  const recentDecisions = applications?.filter(a => ['accepted', 'waitlisted'].includes(a.status)) || [];

  const calculateAge = (birthdate: string | null) => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const ApplicationRow = ({ app }: { app: any }) => {
    const age = calculateAge(app.kids.birthdate);

    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            {app.kids.photo_url ? (
              <img
                className="h-10 w-10 rounded-full"
                src={app.kids.photo_url}
                alt={app.kids.first_name}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {app.kids.first_name} {app.kids.last_name}
              </div>
              <div className="text-sm text-gray-500">
                {age && `Age ${age}`}
                {age && app.kids.grade && ' • '}
                {app.kids.grade && `Grade ${app.kids.grade}`}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{app.roster_spots?.title}</div>
          <div className="text-sm text-gray-500">
            {app.roster_spots?.teams?.name}
            {app.roster_spots?.seasons?.name && ` • ${app.roster_spots.seasons.name}`}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{app.profiles?.full_name || 'Unknown'}</div>
          {(app.profiles?.city || app.profiles?.state) && (
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {[app.profiles.city, app.profiles.state].filter(Boolean).join(', ')}
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            app.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
            app.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
            app.status === 'waitlisted' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {app.status.replace('_', ' ')}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(app.created_at).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center space-x-3">
            <Link
              href={`/dashboard/listings/${app.roster_spots?.id}`}
              className="text-blue-600 hover:text-blue-900"
            >
              <ClipboardList className="h-5 w-5" />
            </Link>
            {app.conversations?.[0] && (
              <Link
                href={`/dashboard/applications/${app.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                <MessageSquare className="h-5 w-5" />
              </Link>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage applications across all your teams
          </p>
        </div>
      </div>

      {newApplications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            New Applications ({newApplications.length})
          </h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newApplications.map((app) => (
                  <ApplicationRow key={app.id} app={app} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {inReview.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            In Review ({inReview.length})
          </h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inReview.map((app) => (
                  <ApplicationRow key={app.id} app={app} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {recentDecisions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Decisions
          </h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDecisions.slice(0, 10).map((app) => (
                  <ApplicationRow key={app.id} app={app} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {applications?.length === 0 && (
        <div className="mt-8 text-center py-12 bg-white rounded-lg shadow">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
          <p className="mt-1 text-sm text-gray-500">
            Applications will appear here when parents apply to your listings.
          </p>
        </div>
      )}
    </div>
  );
}
