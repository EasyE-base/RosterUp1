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

  const ApplicationCard = ({ app }: { app: any }) => {
    const age = calculateAge(app.kids.birthdate);

    return (
      <div className="bg-white rounded-2xl shadow-premium border border-slate-200 hover:shadow-premium-lg hover:border-indigo-200 transition-smooth p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {app.kids.photo_url ? (
              <img
                className="h-16 w-16 rounded-full ring-2 ring-slate-200"
                src={app.kids.photo_url}
                alt={app.kids.first_name}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center ring-2 ring-slate-200">
                <User className="h-8 w-8 text-slate-400" />
              </div>
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {app.kids.first_name} {app.kids.last_name}
                </h3>
                <div className="text-sm text-slate-600 font-medium mt-1">
                  {age && `Age ${age}`}
                  {age && app.kids.grade && ' • '}
                  {app.kids.grade && `Grade ${app.kids.grade}`}
                </div>
              </div>
              <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${
                app.status === 'submitted' ? 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-200' :
                app.status === 'in_review' ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 border border-blue-200' :
                app.status === 'accepted' ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border border-emerald-200' :
                app.status === 'waitlisted' ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-900 border border-orange-200' :
                'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 border border-slate-200'
              }`}>
                {app.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {/* Listing */}
              <div className="flex items-center text-sm">
                <ClipboardList className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">{app.roster_spots?.title}</span>
                  <span className="text-slate-600 mx-2">•</span>
                  <span className="text-slate-600 font-medium">
                    {app.roster_spots?.teams?.name}
                    {app.roster_spots?.seasons?.name && ` • ${app.roster_spots.seasons.name}`}
                  </span>
                </div>
              </div>

              {/* Parent */}
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">{app.profiles?.full_name || 'Unknown'}</span>
                  {(app.profiles?.city || app.profiles?.state) && (
                    <>
                      <span className="text-slate-600 mx-2">•</span>
                      <span className="text-slate-600 font-medium">
                        {[app.profiles.city, app.profiles.state].filter(Boolean).join(', ')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
                <span className="text-slate-600 font-medium">
                  Applied {new Date(app.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/listings/${app.roster_spots?.id}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 font-semibold rounded-lg hover:from-slate-200 hover:to-slate-100 transition-smooth border border-slate-200"
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                View Listing
              </Link>
              {app.conversations?.[0] && (
                <Link
                  href={`/dashboard/applications/${app.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-smooth shadow-lg shadow-indigo-500/25"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Applications</h1>
        <p className="mt-2 text-lg text-slate-600 font-medium">
          Review and manage applications across all your teams
        </p>
      </div>

      {/* New Applications */}
      {newApplications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            New Applications ({newApplications.length})
          </h2>
          <div className="space-y-4">
            {newApplications.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* In Review */}
      {inReview.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            In Review ({inReview.length})
          </h2>
          <div className="space-y-4">
            {inReview.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Decisions */}
      {recentDecisions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Recent Decisions
          </h2>
          <div className="space-y-4">
            {recentDecisions.slice(0, 10).map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {applications?.length === 0 && (
        <div className="bg-white rounded-3xl shadow-premium border border-slate-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center">
            <MessageSquare className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">No Applications Yet</h3>
          <p className="text-slate-600 text-lg font-medium max-w-md mx-auto">
            Applications will appear here when parents apply to your listings.
          </p>
        </div>
      )}
    </div>
  );
}
