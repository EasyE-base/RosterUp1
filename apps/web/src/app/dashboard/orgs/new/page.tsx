'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@rosterup/lib';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewOrgPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    website_url: '',
    refund_window_days: 7,
    refund_policy_text: 'Refunds are available up to 7 days before the event start date. The platform processing fee is non-refundable.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create the org
      const { data: org, error: orgError } = await supabase
        .from('orgs')
        .insert({
          name: formData.name,
          slug: formData.slug || null,
          website_url: formData.website_url || null,
          refund_window_days: formData.refund_window_days,
          refund_policy_text: formData.refund_policy_text
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Create a default team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          org_id: org.id,
          name: formData.name + ' Team',
          sport_id: 1 // Default to baseball, can be changed later
        })
        .select()
        .single();

      if (teamError) throw teamError;

      // Add current user as admin
      const { error: adminError } = await supabase
        .from('team_admins')
        .insert({
          team_id: team.id,
          user_id: user.id,
          role: 'admin'
        });

      if (adminError) throw adminError;

      router.push(`/dashboard/orgs/${org.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData({ ...formData, slug });
  };

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
          <h2 className="text-lg font-medium text-gray-900">Create New Organization</h2>
          <p className="mt-1 text-sm text-gray-600">
            Set up your sports organization to start managing teams and rosters.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Organization Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Dallas Elite Baseball"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                URL Slug
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  rosterup.com/
                </span>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="dallas-elite"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Optional: Create a custom URL for your organization
              </p>
            </div>

            <div>
              <label htmlFor="website_url" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                name="website_url"
                id="website_url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="refund_window_days" className="block text-sm font-medium text-gray-700">
                Refund Window (days before event)
              </label>
              <input
                type="number"
                name="refund_window_days"
                id="refund_window_days"
                min="0"
                max="365"
                value={formData.refund_window_days}
                onChange={(e) => setFormData({ ...formData, refund_window_days: parseInt(e.target.value) || 7 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="refund_policy_text" className="block text-sm font-medium text-gray-700">
                Refund Policy
              </label>
              <textarea
                name="refund_policy_text"
                id="refund_policy_text"
                rows={3}
                value={formData.refund_policy_text}
                onChange={(e) => setFormData({ ...formData, refund_policy_text: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                This will be displayed to parents during checkout
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard/orgs"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Organization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
