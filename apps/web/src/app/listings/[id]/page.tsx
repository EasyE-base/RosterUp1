'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Listing {
  id: string;
  title: string;
  description: string | null;
  min_age: number | null;
  max_age: number | null;
  min_grade: number | null;
  max_grade: number | null;
  capacity: number | null;
  deadline: string | null;
  fee_cents: number | null;
  currency: string;
  status: string;
  visibility: string;
  created_at: string;
  positions: {
    id: number;
    name: string;
    abbreviation: string;
  } | null;
  teams: {
    id: string;
    name: string;
    city: string;
    state: string;
    logo_url: string | null;
    home_field_address: string | null;
    sports: {
      id: number;
      name: string;
      slug: string;
    };
    orgs: {
      id: string;
      name: string;
      logo_url: string | null;
      website_url: string | null;
    };
  };
  seasons: {
    id: string;
    name: string;
    starts_on: string | null;
    ends_on: string | null;
  } | null;
}

export default function PublicListingPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadListing();
  }, [listingId]);

  const loadListing = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/listings/${listingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load listing');
      }

      setListing(data.listing);
      setAcceptedCount(data.acceptedCount);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number | null) => {
    if (cents === null || cents === 0) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatAgeRange = (min: number | null, max: number | null) => {
    if (min && max) return `${min}-${max}`;
    if (min) return `${min}+`;
    if (max) return `up to ${max}`;
    return 'All ages';
  };

  const formatGradeRange = (min: number | null, max: number | null) => {
    if (min && max) return `${min}-${max}`;
    if (min) return `${min}+`;
    if (max) return `up to ${max}`;
    return null;
  };

  const isDeadlinePassed = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const isFull = listing?.capacity && acceptedCount >= listing.capacity;
  const canApply = listing && !isDeadlinePassed(listing.deadline) && !isFull;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-6 text-slate-600 font-semibold text-lg">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white shadow-premium-lg rounded-3xl p-10 text-center border border-slate-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Position Not Found</h1>
            <p className="text-slate-600 text-lg mb-8 font-medium">
              {error || 'This listing is no longer available or has been removed'}
            </p>
            <Link
              href="/browse/listings"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 transition-smooth"
            >
              Browse All Positions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/browse/listings"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-smooth"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Card */}
        <div className="bg-white shadow-premium-lg rounded-3xl overflow-hidden border border-slate-200 mb-8">
          {/* Hero Section */}
          <div className="md:flex">
            {/* Team Logo */}
            <div className="md:w-80 h-80 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              {listing.teams.logo_url ? (
                <img
                  src={listing.teams.logo_url}
                  alt={listing.teams.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-8xl font-bold text-slate-200">
                  {listing.teams.name.charAt(0)}
                </div>
              )}
              {/* Sport Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                {listing.teams.sports.name}
              </div>
            </div>

            {/* Header Info */}
            <div className="flex-1 p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {listing.title}
                  </h1>
                  <div className="flex items-center text-slate-600 mb-4 text-lg font-medium">
                    <span className="font-bold text-slate-900">{listing.teams.name}</span>
                    <span className="mx-3 text-slate-400">·</span>
                    <span>{listing.teams.orgs.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {listing.positions && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-900 border border-indigo-200">
                        {listing.positions.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Fee */}
                {listing.fee_cents !== null && (
                  <div className="text-right ml-6">
                    <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      {formatCurrency(listing.fee_cents)}
                    </div>
                    {listing.fee_cents > 0 && (
                      <div className="text-sm text-slate-500 font-bold mt-1">application fee</div>
                    )}
                  </div>
                )}
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                {isFull && (
                  <div className="flex items-center text-sm font-bold text-red-700 bg-gradient-to-r from-red-100 to-red-50 px-4 py-2 rounded-full border border-red-200">
                    <Users className="h-4 w-4 mr-2" />
                    Full ({acceptedCount}/{listing.capacity})
                  </div>
                )}
                {listing.deadline && !isDeadlinePassed(listing.deadline) && (
                  <div className="flex items-center text-sm font-bold text-amber-700 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2 rounded-full border border-amber-200">
                    <Clock className="h-4 w-4 mr-2" />
                    Deadline: {new Date(listing.deadline).toLocaleDateString()}
                  </div>
                )}
                {listing.deadline && isDeadlinePassed(listing.deadline) && (
                  <div className="flex items-center text-sm font-bold text-red-700 bg-gradient-to-r from-red-100 to-red-50 px-4 py-2 rounded-full border border-red-200">
                    <Clock className="h-4 w-4 mr-2" />
                    Applications Closed
                  </div>
                )}
                {!isFull && canApply && (
                  <div className="flex items-center text-sm font-bold text-emerald-700 bg-gradient-to-r from-emerald-100 to-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accepting Applications
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-slate-200 bg-slate-50 px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Age Range */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-600 mb-1">Age Range</div>
                <div className="text-xl font-bold text-slate-900">
                  {formatAgeRange(listing.min_age, listing.max_age)}
                </div>
              </div>

              {/* Grade Range */}
              {(listing.min_grade || listing.max_grade) && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">Grade Range</div>
                  <div className="text-xl font-bold text-slate-900">
                    {formatGradeRange(listing.min_grade, listing.max_grade)}
                  </div>
                </div>
              )}

              {/* Location */}
              {(listing.teams.city || listing.teams.state) && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">Location</div>
                  <div className="text-xl font-bold text-slate-900">
                    {listing.teams.city && listing.teams.state
                      ? `${listing.teams.city}, ${listing.teams.state}`
                      : listing.teams.city || listing.teams.state}
                  </div>
                </div>
              )}

              {/* Season */}
              {listing.seasons && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">Season</div>
                  <div className="text-xl font-bold text-slate-900">
                    {listing.seasons.name}
                  </div>
                </div>
              )}

              {/* Capacity */}
              {listing.capacity && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">Spots Available</div>
                  <div className="text-xl font-bold text-slate-900">
                    {listing.capacity - acceptedCount} / {listing.capacity}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Description Section */}
        {listing.description && (
          <div className="bg-white shadow-premium rounded-3xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Position</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">{listing.description}</p>
            </div>
          </div>
        )}

        {/* Team Info Section */}
        <div className="bg-white shadow-premium rounded-3xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Team Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-600 font-semibold">Team Name:</span>
              <span className="font-bold text-slate-900">{listing.teams.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-600 font-semibold">Organization:</span>
              <span className="font-bold text-slate-900">{listing.teams.orgs.name}</span>
            </div>
            {listing.teams.orgs.website_url && (
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 font-semibold">Website:</span>
                <a
                  href={listing.teams.orgs.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-bold transition-smooth inline-flex items-center"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            {listing.teams.home_field_address && (
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600 font-semibold">Home Field:</span>
                <span className="font-bold text-slate-900 text-right max-w-md">
                  {listing.teams.home_field_address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 text-center shadow-premium-lg">
          {canApply ? (
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-4">Ready to Join the Team?</h3>
              <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">
                Create a free account to submit your application and connect with the coaching staff.
              </p>
              <Link
                href={`/auth/login?redirect=/apply/${listing.id}`}
                className="inline-flex items-center px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-xl hover:bg-indigo-50 shadow-xl transition-smooth active:scale-95"
              >
                <CheckCircle className="h-6 w-6 mr-3" />
                Sign In to Apply
              </Link>
            </div>
          ) : (
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-4">
                {isFull ? 'Position Full' : 'Applications Closed'}
              </h3>
              <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">
                {isFull
                  ? 'This position has reached capacity. Check back later or browse other opportunities.'
                  : 'The application deadline has passed for this position.'}
              </p>
              <Link
                href="/browse/listings"
                className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur-sm text-white text-lg font-bold rounded-xl hover:bg-white/30 border-2 border-white/30 transition-smooth"
              >
                Browse Other Positions
              </Link>
            </div>
          )}
        </div>

        {/* Similar Listings */}
        <div className="mt-8 text-center">
          <Link
            href={`/browse/listings?sport=${listing.teams.sports.slug}&state=${listing.teams.state}`}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-bold text-lg transition-smooth"
          >
            View similar positions in {listing.teams.state}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
