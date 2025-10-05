'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Loader2,
  AlertCircle,
  Globe,
  Users
} from 'lucide-react';
import Link from 'next/link';

interface Team {
  id: string;
  name: string;
  city: string;
  state: string;
  home_field_address: string | null;
  logo_url: string | null;
  created_at: string;
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
}

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
  created_at: string;
  positions: {
    id: number;
    name: string;
    abbreviation: string;
  } | null;
}

export default function PublicTeamPage() {
  const params = useParams();
  const teamId = params.id as string;

  const [team, setTeam] = useState<Team | null>(null);
  const [openListings, setOpenListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeam();
  }, [teamId]);

  const loadTeam = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/teams/${teamId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load team');
      }

      setTeam(data.team);
      setOpenListings(data.openListings);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load team');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number | null) => {
    if (cents === null || cents === 0) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatAgeRange = (min: number | null, max: number | null) => {
    if (min && max) return `Ages ${min}-${max}`;
    if (min) return `Ages ${min}+`;
    if (max) return `Ages up to ${max}`;
    return 'All ages';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-6 text-slate-600 font-semibold text-lg">Loading team...</p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white shadow-premium-lg rounded-3xl p-10 text-center border border-slate-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Team Not Found</h1>
            <p className="text-slate-600 text-lg mb-8 font-medium">
              {error || 'This team does not exist or has been removed'}
            </p>
            <Link
              href="/browse/teams"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 transition-smooth"
            >
              Browse All Teams
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/browse/teams"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-smooth"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-premium-lg rounded-3xl border border-slate-200 overflow-hidden">
          <div className="md:flex">
            {/* Team Logo */}
            <div className="md:w-80 h-80 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              {team.logo_url ? (
                <img
                  src={team.logo_url}
                  alt={`${team.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-8xl font-bold text-slate-200">
                  {team.name.charAt(0)}
                </div>
              )}
              {/* Sport Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                {team.sports.name}
              </div>
            </div>

            {/* Team Info */}
            <div className="flex-1 p-8 md:p-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">{team.name}</h1>

              <div className="space-y-5">
                <div className="flex items-center py-3 border-b border-slate-100">
                  <Users className="h-6 w-6 mr-3 text-indigo-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-500">Organization</div>
                    <div className="text-lg font-bold text-slate-900">{team.orgs.name}</div>
                  </div>
                </div>

                {(team.city || team.state) && (
                  <div className="flex items-center py-3 border-b border-slate-100">
                    <MapPin className="h-6 w-6 mr-3 text-indigo-500" />
                    <div>
                      <div className="text-sm font-semibold text-slate-500">Location</div>
                      <div className="text-lg font-bold text-slate-900">
                        {team.city && team.state
                          ? `${team.city}, ${team.state}`
                          : team.city || team.state}
                      </div>
                    </div>
                  </div>
                )}

                {team.home_field_address && (
                  <div className="flex items-start py-3 border-b border-slate-100">
                    <MapPin className="h-6 w-6 mr-3 mt-1 text-indigo-500 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-slate-500">Home Field</div>
                      <div className="text-lg font-bold text-slate-900">{team.home_field_address}</div>
                    </div>
                  </div>
                )}

                {team.orgs.website_url && (
                  <div className="flex items-center py-3">
                    <Globe className="h-6 w-6 mr-3 text-indigo-500" />
                    <div className="flex-1">
                      <a
                        href={team.orgs.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-bold text-lg transition-smooth inline-flex items-center"
                      >
                        Visit Organization Website
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Open Positions
          </h2>
          <p className="mt-2 text-lg text-slate-600 font-medium">
            {openListings.length === 0
              ? 'No open positions at this time'
              : `${openListings.length} position${openListings.length !== 1 ? 's' : ''} available`}
          </p>
        </div>

        {openListings.length > 0 ? (
          <div className="space-y-6">
            {openListings.map(listing => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-premium border border-slate-200 hover:shadow-premium-lg hover:border-indigo-200 transition-smooth overflow-hidden p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-smooth">
                        {listing.title}
                      </h3>

                      {listing.description && (
                        <p className="text-slate-700 mb-4 line-clamp-2 font-medium">
                          {listing.description}
                        </p>
                      )}
                    </div>

                    {listing.fee_cents !== null && (
                      <div className="text-right ml-6 flex-shrink-0">
                        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                          {formatCurrency(listing.fee_cents)}
                        </div>
                        {listing.fee_cents > 0 && (
                          <div className="text-xs text-slate-500 font-semibold">application fee</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {listing.positions && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-900 border border-indigo-200">
                        <Users className="h-3 w-3 mr-1.5" />
                        {listing.positions.name}
                      </span>
                    )}

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border border-emerald-200">
                      {formatAgeRange(listing.min_age, listing.max_age)}
                    </span>

                    {listing.deadline && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-200">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        Deadline: {new Date(listing.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center text-indigo-600 group-hover:text-indigo-800 font-bold transition-smooth">
                      View Details & Apply
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-premium border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No Open Positions
            </h3>
            <p className="text-slate-600 text-lg font-medium mb-8 max-w-md mx-auto">
              This team doesn&apos;t have any open tryouts or roster spots at the moment.
              Check back later or browse other teams.
            </p>
            <Link
              href={`/browse/listings?sport=${team.sports.slug}&state=${team.state}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 transition-smooth active:scale-95"
            >
              Browse Similar Teams
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
