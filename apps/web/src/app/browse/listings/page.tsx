'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Filter, Loader2, Calendar, DollarSign, Users } from 'lucide-react';
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
    sports: {
      id: number;
      name: string;
      slug: string;
    };
    orgs: {
      id: string;
      name: string;
      logo_url: string | null;
    };
  };
}

const SPORTS = [
  { slug: 'baseball', name: 'Baseball' },
  { slug: 'softball', name: 'Softball' },
  { slug: 'soccer', name: 'Soccer' },
  { slug: 'basketball', name: 'Basketball' },
  { slug: 'volleyball', name: 'Volleyball' },
  { slug: 'lacrosse', name: 'Lacrosse' },
  { slug: 'hockey', name: 'Hockey' },
  { slug: 'football', name: 'Football' }
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function BrowseListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [sport, setSport] = useState(searchParams.get('sport') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [minAge, setMinAge] = useState(searchParams.get('minAge') || '');
  const [maxAge, setMaxAge] = useState(searchParams.get('maxAge') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    loadListings();
  }, [sport, state, city, minAge, maxAge, search]);

  const loadListings = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (sport) params.append('sport', sport);
      if (state) params.append('state', state);
      if (city) params.append('city', city);
      if (minAge) params.append('minAge', minAge);
      if (maxAge) params.append('maxAge', maxAge);
      if (search) params.append('search', search);

      const response = await fetch(`/api/browse/listings?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load listings');
      }

      setListings(data.listings);
      setTotal(data.total);
    } catch (err: any) {
      console.error('Failed to load listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number | null) => {
    if (cents === null) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatAgeRange = (min: number | null, max: number | null) => {
    if (min && max) return `Ages ${min}-${max}`;
    if (min) return `Ages ${min}+`;
    if (max) return `Ages up to ${max}`;
    return 'All ages';
  };

  const formatGradeRange = (min: number | null, max: number | null) => {
    if (min && max) return `Grades ${min}-${max}`;
    if (min) return `Grade ${min}+`;
    if (max) return `Up to grade ${max}`;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 border-b border-indigo-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Browse Open Positions</h1>
          <p className="mt-3 text-lg text-indigo-100">
            Find tryouts and roster spots on travel sports teams
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search positions, teams, or organizations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth placeholder:text-slate-400 font-medium text-slate-900 shadow-premium"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sport
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth bg-white text-slate-900 font-medium"
              >
                <option value="">All Sports</option>
                {SPORTS.map(s => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth bg-white text-slate-900 font-medium"
              >
                <option value="">All States</option>
                {US_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Age Range */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Min Age
                </label>
                <input
                  type="number"
                  placeholder="8"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth placeholder:text-slate-400 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max Age
                </label>
                <input
                  type="number"
                  placeholder="18"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-smooth placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-600">
            {loading ? 'Loading...' : (
              <>
                <span className="text-indigo-600">{total}</span> position{total !== 1 ? 's' : ''} found
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
        )}

        {/* Listings Grid */}
        {!loading && listings.length > 0 && (
          <div className="space-y-6">
            {listings.map(listing => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-premium border border-slate-200 hover:shadow-premium-lg hover:border-indigo-200 transition-smooth overflow-hidden">
                  <div className="md:flex">
                    {/* Team Logo */}
                    <div className="md:w-56 h-56 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      {listing.teams.logo_url ? (
                        <img
                          src={listing.teams.logo_url}
                          alt={listing.teams.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-smooth"
                        />
                      ) : (
                        <div className="text-6xl font-bold text-slate-200 group-hover:scale-110 transition-smooth">
                          {listing.teams.name.charAt(0)}
                        </div>
                      )}
                      {/* Sport Badge */}
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {listing.teams.sports.name}
                      </div>
                    </div>

                    {/* Listing Info */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-smooth">
                            {listing.title}
                          </h3>
                          <p className="text-slate-600 font-medium">
                            {listing.teams.name} · {listing.teams.orgs.name}
                          </p>
                        </div>
                        {listing.fee_cents !== null && (
                          <div className="text-right ml-4">
                            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                              {formatCurrency(listing.fee_cents)}
                            </div>
                            {listing.fee_cents > 0 && (
                              <div className="text-xs text-slate-500 font-semibold">application fee</div>
                            )}
                          </div>
                        )}
                      </div>

                      {listing.description && (
                        <p className="text-slate-700 mb-5 line-clamp-2 font-medium">
                          {listing.description}
                        </p>
                      )}

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

                        {formatGradeRange(listing.min_grade, listing.max_grade) && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 border border-slate-200">
                            {formatGradeRange(listing.min_grade, listing.max_grade)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        {(listing.teams.city || listing.teams.state) && (
                          <div className="flex items-center font-medium">
                            <MapPin className="h-4 w-4 mr-1.5 text-indigo-500" />
                            <span>
                              {listing.teams.city && listing.teams.state
                                ? `${listing.teams.city}, ${listing.teams.state}`
                                : listing.teams.city || listing.teams.state}
                            </span>
                          </div>
                        )}

                        {listing.deadline && (
                          <div className="flex items-center font-medium">
                            <Calendar className="h-4 w-4 mr-1.5 text-amber-500" />
                            <span>
                              Deadline: {new Date(listing.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Filter className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No positions found</h3>
            <p className="mt-3 text-slate-600 max-w-md mx-auto">
              Try adjusting your filters or search terms to discover more opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
