'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@rosterup/lib';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewTeamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sports, setSports] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    sport_id: '',
    city: '',
    state: '',
    home_field_address: ''
  });

  useEffect(() => {
    loadSports();
  }, []);

  const loadSports = async () => {
    const { data } = await supabase
      .from('sports')
      .select('*')
      .order('name');
    setSports(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create the team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          org_id: params.id,
          name: formData.name,
          sport_id: parseInt(formData.sport_id),
          city: formData.city || null,
          state: formData.state || null,
          home_field_address: formData.home_field_address || null
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

      router.push(`/dashboard/orgs/${params.id}?tab=teams`);
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/orgs/${params.id}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Organization
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Create New Team</h2>
          <p className="mt-1 text-sm text-gray-600">
            Add a team to your organization.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Team Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="12U Gold"
              />
            </div>

            <div>
              <label htmlFor="sport_id" className="block text-sm font-medium text-gray-700">
                Sport *
              </label>
              <select
                name="sport_id"
                id="sport_id"
                required
                value={formData.sport_id}
                onChange={(e) => setFormData({ ...formData, sport_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a sport</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Dallas"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  maxLength={2}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="TX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="home_field_address" className="block text-sm font-medium text-gray-700">
                Home Field Address
              </label>
              <input
                type="text"
                name="home_field_address"
                id="home_field_address"
                value={formData.home_field_address}
                onChange={(e) => setFormData({ ...formData, home_field_address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="123 Baseball Way, Dallas, TX 75201"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href={`/dashboard/orgs/${params.id}`}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
