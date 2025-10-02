'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@rosterup/lib';
import Link from 'next/link';
import { ArrowLeft, Globe, Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function TeamSitePage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [team, setTeam] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    primary_color: '#3B82F6',
    secondary_color: '#1E40AF',
    font_family: 'Inter',
    custom_domain: ''
  });

  useEffect(() => {
    loadData();
  }, [teamId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load team
      const { data: teamData } = await supabase
        .from('teams')
        .select('*, sports(name), orgs(name)')
        .eq('id', teamId)
        .single();

      setTeam(teamData);

      // Load site settings
      const siteResponse = await fetch(`/api/teams/${teamId}/site`);
      const siteData = await siteResponse.json();
      if (siteData.site) {
        setSiteSettings({
          primary_color: siteData.site.primary_color || '#3B82F6',
          secondary_color: siteData.site.secondary_color || '#1E40AF',
          font_family: siteData.site.font_family || 'Inter',
          custom_domain: siteData.site.custom_domain || ''
        });
      }

      // Load pages
      const pagesResponse = await fetch(`/api/teams/${teamId}/pages`);
      const pagesData = await pagesResponse.json();
      setPages(pagesData.pages || []);
    } catch (err) {
      console.error('Load data error:', err);
      alert('Failed to load site data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/teams/${teamId}/site`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }

      alert('Settings saved successfully!');
    } catch (err: any) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePage = async () => {
    const slug = prompt('Enter page URL slug (e.g., "about", "roster"):');
    if (!slug) return;

    const title = prompt('Enter page title:');
    if (!title) return;

    try {
      const response = await fetch(`/api/teams/${teamId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, status: 'draft' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create page');
      }

      await loadData();
      alert('Page created successfully!');
    } catch (err: any) {
      alert('Failed to create page: ' + err.message);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete page');
      }

      await loadData();
      alert('Page deleted successfully!');
    } catch (err: any) {
      alert('Failed to delete page: ' + err.message);
    }
  };

  const handleToggleStatus = async (pageId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update status');
      }

      await loadData();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href={`/dashboard/orgs/${team?.org_id}?tab=teams`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Organization
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Globe className="h-8 w-8 mr-3" />
          {team?.name} Mini-Site
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your team's public website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Site Settings</h2>
          </div>
          <div className="px-6 py-5">
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Color
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    value={siteSettings.primary_color}
                    onChange={(e) => setSiteSettings({ ...siteSettings, primary_color: e.target.value })}
                    className="h-10 w-20 rounded border-gray-300"
                  />
                  <input
                    type="text"
                    value={siteSettings.primary_color}
                    onChange={(e) => setSiteSettings({ ...siteSettings, primary_color: e.target.value })}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Secondary Color
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    value={siteSettings.secondary_color}
                    onChange={(e) => setSiteSettings({ ...siteSettings, secondary_color: e.target.value })}
                    className="h-10 w-20 rounded border-gray-300"
                  />
                  <input
                    type="text"
                    value={siteSettings.secondary_color}
                    onChange={(e) => setSiteSettings({ ...siteSettings, secondary_color: e.target.value })}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Font Family
                </label>
                <select
                  value={siteSettings.font_family}
                  onChange={(e) => setSiteSettings({ ...siteSettings, font_family: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Roboto">Roboto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Custom Domain (Optional)
                </label>
                <input
                  type="text"
                  value={siteSettings.custom_domain}
                  onChange={(e) => setSiteSettings({ ...siteSettings, custom_domain: e.target.value })}
                  placeholder="team.example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        </div>

        {/* Pages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Pages</h2>
            <button
              onClick={handleCreatePage}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Page
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {pages.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <p className="text-sm">No pages yet. Create your first page!</p>
              </div>
            ) : (
              pages.map((page) => (
                <div key={page.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{page.title}</h3>
                    <p className="text-xs text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(page.id, page.status)}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                        page.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      {page.status}
                    </button>
                    <Link
                      href={`/dashboard/teams/${teamId}/site/pages/${page.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
