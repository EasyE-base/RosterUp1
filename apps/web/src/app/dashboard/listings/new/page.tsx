'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@rosterup/lib';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teams, setTeams] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    team_id: '',
    season_id: '',
    position_id: '',
    min_age: '',
    max_age: '',
    min_grade: '',
    max_grade: '',
    capacity: '',
    deadline: '',
    visibility: 'public',
    fee_cents: '',
  });

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      loadSeasons(selectedTeam);
      const team = teams.find(t => t.id === selectedTeam);
      if (team) {
        setSelectedSport(team.sport_id);
        loadPositions(team.sport_id);
      }
    }
  }, [selectedTeam, teams]);

  const loadTeams = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('team_admins')
      .select(`
        teams (
          id,
          name,
          sport_id,
          sports (name)
        )
      `)
      .eq('user_id', user.id);

    setTeams(data?.map(ta => ta.teams).filter(Boolean) || []);
  };

  const loadSeasons = async (teamId: string) => {
    const { data } = await supabase
      .from('seasons')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });
    setSeasons(data || []);
  };

  const loadPositions = async (sportId: number) => {
    const { data } = await supabase
      .from('positions')
      .select('*')
      .eq('sport_id', sportId)
      .order('sort_order');
    setPositions(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('roster_spots')
        .insert({
          title: formData.title,
          description: formData.description || null,
          team_id: formData.team_id,
          season_id: formData.season_id || null,
          position_id: formData.position_id || null,
          min_age: formData.min_age ? parseInt(formData.min_age) : null,
          max_age: formData.max_age ? parseInt(formData.max_age) : null,
          min_grade: formData.min_grade ? parseInt(formData.min_grade) : null,
          max_grade: formData.max_grade ? parseInt(formData.max_grade) : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          deadline: formData.deadline || null,
          visibility: formData.visibility as 'public' | 'invite',
          fee_cents: formData.fee_cents ? Math.round(parseFloat(formData.fee_cents) * 100) : null,
          status: 'open'
        });

      if (insertError) throw insertError;
      router.push('/dashboard/listings');
    } catch (err: any) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    setFormData({ ...formData, team_id: teamId, season_id: '', position_id: '' });
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard/listings"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Listings
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Create New Listing</h2>
          <p className="mt-1 text-sm text-gray-600">
            Post a roster spot or tryout opportunity
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Listing Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="12U Travel Team - Pitcher"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Looking for experienced pitchers for our competitive travel team..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="team_id" className="block text-sm font-medium text-gray-700">
                  Team *
                </label>
                <select
                  name="team_id"
                  id="team_id"
                  required
                  value={formData.team_id}
                  onChange={(e) => handleTeamChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.sports?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">
                  Season
                </label>
                <select
                  name="season_id"
                  id="season_id"
                  value={formData.season_id}
                  onChange={(e) => setFormData({ ...formData, season_id: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={!selectedTeam}
                >
                  <option value="">Select a season</option>
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="position_id" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <select
                name="position_id"
                id="position_id"
                value={formData.position_id}
                onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                disabled={!selectedSport}
              >
                <option value="">Any position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <label htmlFor="min_age" className="block text-sm font-medium text-gray-700">
                  Min Age
                </label>
                <input
                  type="number"
                  name="min_age"
                  id="min_age"
                  min="5"
                  max="18"
                  value={formData.min_age}
                  onChange={(e) => setFormData({ ...formData, min_age: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="max_age" className="block text-sm font-medium text-gray-700">
                  Max Age
                </label>
                <input
                  type="number"
                  name="max_age"
                  id="max_age"
                  min="5"
                  max="18"
                  value={formData.max_age}
                  onChange={(e) => setFormData({ ...formData, max_age: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="min_grade" className="block text-sm font-medium text-gray-700">
                  Min Grade
                </label>
                <input
                  type="number"
                  name="min_grade"
                  id="min_grade"
                  min="1"
                  max="12"
                  value={formData.min_grade}
                  onChange={(e) => setFormData({ ...formData, min_grade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="max_grade" className="block text-sm font-medium text-gray-700">
                  Max Grade
                </label>
                <input
                  type="number"
                  name="max_grade"
                  id="max_grade"
                  min="1"
                  max="12"
                  value={formData.max_grade}
                  onChange={(e) => setFormData({ ...formData, max_grade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Number of Spots
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Leave blank for unlimited"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="datetime-local"
                  name="deadline"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="fee_cents" className="block text-sm font-medium text-gray-700">
                  Application Fee ($)
                </label>
                <input
                  type="number"
                  name="fee_cents"
                  id="fee_cents"
                  min="0"
                  step="0.01"
                  value={formData.fee_cents}
                  onChange={(e) => setFormData({ ...formData, fee_cents: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Visibility
              </label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Public - Anyone can view and apply
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="invite"
                    checked={formData.visibility === 'invite'}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Invite Only - Only accessible via direct link
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard/listings"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
