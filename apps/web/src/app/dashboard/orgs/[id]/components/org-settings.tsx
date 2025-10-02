'use client';

import { useState } from 'react';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';
import { StripeConnect } from './stripe-connect';

export function OrgSettings({ org }: { org: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: org.name,
    slug: org.slug || '',
    logo_url: org.logo_url || '',
    website_url: org.website_url || '',
    refund_window_days: org.refund_window_days,
    refund_policy_text: org.refund_policy_text || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('orgs')
        .update({
          name: formData.name,
          slug: formData.slug || null,
          logo_url: formData.logo_url || null,
          website_url: formData.website_url || null,
          refund_window_days: formData.refund_window_days,
          refund_policy_text: formData.refund_policy_text,
          updated_at: new Date().toISOString()
        })
        .eq('id', org.id);

      if (error) throw error;
      router.refresh();
      alert('Settings saved successfully');
    } catch (err: any) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <StripeConnect org={org} />
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Organization Details</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Organization Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
          />
        </div>
      </div>

      <div>
        <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
          Logo URL
        </label>
        <input
          type="url"
          name="logo_url"
          id="logo_url"
          value={formData.logo_url}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="https://example.com/logo.png"
        />
        <p className="mt-1 text-xs text-gray-500">
          Enter a URL to an image for your organization logo
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
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
      </div>
    </div>
  );
}
