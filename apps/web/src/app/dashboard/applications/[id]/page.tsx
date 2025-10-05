import { requireCoachOrAdmin } from '@/lib/auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, MapPin } from 'lucide-react';
import { MessagingSection } from './components/messaging-section';

export default async function ApplicationDetailPage({
  params
}: {
  params: { id: string };
}) {
  const profile = await requireCoachOrAdmin();
  const supabase = createServerComponentClient({ cookies });

  // Get application details
  const { data: application } = await supabase
    .from('applications')
    .select(`
      *,
      kids (
        id,
        first_name,
        last_name,
        birthdate,
        grade,
        bio,
        photo_url
      ),
      profiles (
        id,
        full_name,
        city,
        state,
        postal_code
      ),
      roster_spots (
        id,
        title,
        teams (
          id,
          name,
          sports (name)
        ),
        seasons (name),
        positions (name)
      ),
      conversations (
        id,
        messages (
          id,
          content,
          sender_id,
          created_at,
          profiles (full_name)
        )
      )
    `)
    .eq('id', params.id)
    .single();

  if (!application) {
    notFound();
  }

  // Check if user has access to this application
  const { data: hasAccess } = await supabase
    .from('team_admins')
    .select('user_id')
    .eq('user_id', profile.id)
    .eq('team_id', application.roster_spots?.teams?.id)
    .limit(1)
    .single();

  if (!hasAccess) {
    notFound();
  }

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

  const age = calculateAge(application.kids.birthdate);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Applications
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Application Details */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Application Details</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Listing</h3>
                <p className="text-sm text-gray-900">{application.roster_spots?.title}</p>
                <p className="text-sm text-gray-500">
                  {application.roster_spots?.teams?.name} • {application.roster_spots?.teams?.sports?.name}
                  {application.roster_spots?.seasons?.name && ` • ${application.roster_spots.seasons.name}`}
                  {application.roster_spots?.positions?.name && ` • ${application.roster_spots.positions.name}`}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  application.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                  application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  application.status === 'waitlisted' ? 'bg-orange-100 text-orange-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {application.status.replace('_', ' ')}
                </span>
              </div>

              {application.note && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Application Note</h3>
                  <p className="text-sm text-gray-600 italic">"{application.note}"</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Applied</h3>
                <p className="text-sm text-gray-900">
                  {new Date(application.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <MessagingSection
            applicationId={application.id}
            currentUserId={profile.id}
            existingConversationId={application.conversations?.[0]?.id}
          />
        </div>

        {/* Applicant Info */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Applicant Info</h2>
              
              <div className="text-center mb-4">
                {application.kids.photo_url ? (
                  <img
                    src={application.kids.photo_url}
                    alt={`${application.kids.first_name} ${application.kids.last_name}`}
                    className="h-24 w-24 rounded-full mx-auto object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  {application.kids.first_name} {application.kids.last_name}
                </h3>
              </div>

              <dl className="space-y-3">
                {(age || application.kids.grade) && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Age & Grade</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {age && `Age ${age}`}
                      {age && application.kids.grade && ' • '}
                      {application.kids.grade && `Grade ${application.kids.grade}`}
                    </dd>
                  </div>
                )}

                {application.kids.bio && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900">{application.kids.bio}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">Parent</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.profiles?.full_name || 'Unknown'}
                  </dd>
                </div>

                {(application.profiles?.city || application.profiles?.state) && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {[application.profiles.city, application.profiles.state].filter(Boolean).join(', ')}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6">
                <Link
                  href={`/dashboard/listings/${application.roster_spots?.id}`}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Applications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
