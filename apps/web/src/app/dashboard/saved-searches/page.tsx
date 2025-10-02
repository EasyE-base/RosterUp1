'use client';

import { useState, useEffect } from 'react';
import { Save, Bell, Trash2, Edit2, Plus, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface SavedSearch {
  id: string;
  name: string;
  filters: Record<string, string | number>;
  notification_frequency: string;
  is_active: boolean;
  created_at: string;
  last_notified_at: string | null;
}

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/saved-searches');
      const data = await response.json();

      if (response.ok) {
        setSearches(data.searches);
      }
    } catch (err) {
      console.error('Failed to load saved searches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/saved-searches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentValue })
      });

      if (response.ok) {
        loadSearches();
      }
    } catch (err) {
      console.error('Failed to toggle search:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this saved search?')) {
      return;
    }

    try {
      const response = await fetch(`/api/saved-searches/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadSearches();
      }
    } catch (err) {
      console.error('Failed to delete search:', err);
    }
  };

  const buildSearchUrl = (filters: Record<string, string | number>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    return `/browse/listings?${params.toString()}`;
  };

  const getFilterDescription = (filters: Record<string, string | number>) => {
    const parts = [];
    if (filters.sport) parts.push(`Sport: ${filters.sport}`);
    if (filters.state) parts.push(`State: ${filters.state}`);
    if (filters.city) parts.push(`City: ${filters.city}`);
    if (filters.minAge) parts.push(`Min Age: ${filters.minAge}`);
    if (filters.maxAge) parts.push(`Max Age: ${filters.maxAge}`);
    if (filters.distance) parts.push(`Within ${filters.distance} miles`);

    return parts.length > 0 ? parts.join(' · ') : 'All listings';
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'immediate':
        return 'Immediately';
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      default:
        return frequency;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Searches</h1>
        <p className="text-gray-600">
          Get notified when new positions match your search criteria
        </p>
      </div>

      {/* Empty State */}
      {searches.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Save className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Saved Searches Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Save your search filters to get notified when new positions match
          </p>
          <Link
            href="/browse/listings"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Browse Listings
          </Link>
        </div>
      )}

      {/* Searches List */}
      {searches.length > 0 && (
        <div className="space-y-4">
          {searches.map((search) => (
            <div
              key={search.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {search.name}
                    </h3>
                    {search.is_active ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Bell className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Paused
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {getFilterDescription(search.filters)}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Notifications: {getFrequencyLabel(search.notification_frequency)}</span>
                    {search.last_notified_at && (
                      <span>
                        Last notified: {new Date(search.last_notified_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Link
                    href={buildSearchUrl(search.filters)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="View search results"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>

                  <button
                    onClick={() => handleToggleActive(search.id, search.is_active)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title={search.is_active ? 'Pause notifications' : 'Resume notifications'}
                  >
                    <Bell className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(search.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete search"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              How Email Alerts Work
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>We check for new positions that match your criteria</li>
                <li>You&apos;ll receive an email based on your notification frequency</li>
                <li>You can pause or delete saved searches at any time</li>
                <li>Each email includes direct links to apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
