'use client';

import { useState } from 'react';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';
import { MessageSquare, User, Calendar, MapPin, Check, X, Clock } from 'lucide-react';
import Link from 'next/link';
import { trackOfferSent } from '@/lib/analytics';

type Application = {
  id: string;
  status: string;
  note: string | null;
  created_at: string;
  kids: {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: string | null;
    grade: number | null;
    photo_url: string | null;
  };
  profiles: {
    id: string;
    full_name: string | null;
    city: string | null;
    state: string | null;
  };
};

type ApplicationsByStatus = {
  submitted: Application[];
  in_review: Application[];
  accepted: Application[];
  waitlisted: Application[];
  rejected: Application[];
  withdrawn: Application[];
};

export function ApplicationsList({
  listing,
  applications,
  capacityReached
}: {
  listing: any;
  applications: ApplicationsByStatus;
  capacityReached: boolean;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState<Set<string>>(new Set());
  const [makingOffer, setMakingOffer] = useState<Set<string>>(new Set());

  const updateStatus = async (applicationId: string, newStatus: string) => {
    setUpdating(prev => new Set(prev).add(applicationId));

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;
      router.refresh();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(prev => {
        const next = new Set(prev);
        next.delete(applicationId);
        return next;
      });
    }
  };

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

  const handleMakeOffer = async (applicationId: string) => {
    if (!confirm('Are you sure you want to make an offer to this applicant? This will notify the parent.')) {
      return;
    }

    setMakingOffer(prev => new Set(prev).add(applicationId));

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, expiresInDays: 7 })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create offer');
      }

      // Track analytics event
      if (data.offer?.id) {
        trackOfferSent(data.offer.id, applicationId);
      }

      alert('Offer created successfully! The parent will be notified.');
      router.refresh();
    } catch (err: any) {
      alert('Failed to create offer: ' + err.message);
    } finally {
      setMakingOffer(prev => {
        const next = new Set(prev);
        next.delete(applicationId);
        return next;
      });
    }
  };

  const ApplicationCard = ({ app, showActions = true }: { app: Application; showActions?: boolean }) => {
    const age = calculateAge(app.kids.birthdate);
    const isUpdating = updating.has(app.id);

    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {app.kids.photo_url ? (
              <img
                src={app.kids.photo_url}
                alt={app.kids.first_name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {app.kids.first_name} {app.kids.last_name}
              </h4>
              <div className="mt-1 text-sm text-gray-500 space-y-1">
                {(age || app.kids.grade) && (
                  <p className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {age && `Age ${age}`}
                    {age && app.kids.grade && ' • '}
                    {app.kids.grade && `Grade ${app.kids.grade}`}
                  </p>
                )}
                {(app.profiles.city || app.profiles.state) && (
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {[app.profiles.city, app.profiles.state].filter(Boolean).join(', ')}
                  </p>
                )}
                <p className="text-xs">
                  Applied {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>
              {app.note && (
                <p className="mt-2 text-sm text-gray-600 italic">"{app.note}"</p>
              )}
            </div>
          </div>
          <Link
            href={`/dashboard/applications/${app.id}`}
            className="text-blue-600 hover:text-blue-500 p-2"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>
        </div>

        {showActions && app.status !== 'withdrawn' && (
          <div className="mt-4 flex items-center space-x-2">
            {app.status === 'submitted' && (
              <>
                <button
                  onClick={() => updateStatus(app.id, 'in_review')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Review
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'accepted')}
                  disabled={isUpdating || capacityReached}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  title={capacityReached ? 'Capacity reached' : ''}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'rejected')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </button>
              </>
            )}
            {app.status === 'in_review' && (
              <>
                <button
                  onClick={() => updateStatus(app.id, 'accepted')}
                  disabled={isUpdating || capacityReached}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  title={capacityReached ? 'Capacity reached' : ''}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'waitlisted')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Waitlist
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'rejected')}
                  disabled={isUpdating}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </button>
              </>
            )}
            {app.status === 'waitlisted' && !capacityReached && (
              <button
                onClick={() => updateStatus(app.id, 'accepted')}
                disabled={isUpdating}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <Check className="h-3 w-3 mr-1" />
                Accept from Waitlist
              </button>
            )}
            {app.status === 'accepted' && (
              <button
                onClick={() => handleMakeOffer(app.id)}
                disabled={makingOffer.has(app.id)}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {makingOffer.has(app.id) ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Making Offer...
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Make Offer
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const totalApplications = Object.values(applications).flat().length;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Applications ({totalApplications})
        </h2>

        <div className="space-y-6">
          {applications.submitted.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                New Applications ({applications.submitted.length})
              </h3>
              <div className="space-y-3">
                {applications.submitted.map(app => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {applications.in_review.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                In Review ({applications.in_review.length})
              </h3>
              <div className="space-y-3">
                {applications.in_review.map(app => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {applications.accepted.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-green-700 mb-3">
                Accepted ({applications.accepted.length})
              </h3>
              <div className="space-y-3">
                {applications.accepted.map(app => (
                  <ApplicationCard key={app.id} app={app} showActions={false} />
                ))}
              </div>
            </div>
          )}

          {applications.waitlisted.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-yellow-700 mb-3">
                Waitlisted ({applications.waitlisted.length})
              </h3>
              <div className="space-y-3">
                {applications.waitlisted.map(app => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {applications.rejected.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-red-700 mb-3">
                Rejected ({applications.rejected.length})
              </h3>
              <div className="space-y-3 opacity-60">
                {applications.rejected.map(app => (
                  <ApplicationCard key={app.id} app={app} showActions={false} />
                ))}
              </div>
            </div>
          )}

          {applications.withdrawn.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Withdrawn ({applications.withdrawn.length})
              </h3>
              <div className="space-y-3 opacity-60">
                {applications.withdrawn.map(app => (
                  <ApplicationCard key={app.id} app={app} showActions={false} />
                ))}
              </div>
            </div>
          )}

          {totalApplications === 0 && (
            <p className="text-center text-gray-500 py-8">
              No applications yet. Share your listing to start receiving applications!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
