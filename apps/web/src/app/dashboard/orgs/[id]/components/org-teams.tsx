'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, MapPin, Users, Edit } from 'lucide-react';
import { supabase } from '@rosterup/lib';
import { useRouter } from 'next/navigation';

type Team = {
  id: string;
  name: string;
  sport_id: number;
  city: string | null;
  state: string | null;
  sports: { name: string };
  seasons: Array<{
    id: string;
    name: string;
    starts_on: string | null;
    ends_on: string | null;
  }>;
};

export function OrgTeams({ org, teams }: { org: any; teams: Team[] }) {
  const router = useRouter();
  const [creatingSeasons, setCreatingSeasons] = useState<Set<string>>(new Set());
  const [editingSeasons, setEditingSeasons] = useState<Set<string>>(new Set());

  const handleCreateSeason = async (teamId: string) => {
    const seasonName = prompt('Enter season name (e.g., "Spring 2025"):');
    if (!seasonName) return;

    setCreatingSeasons(prev => new Set(prev).add(teamId));

    try {
      const { error } = await supabase
        .from('seasons')
        .insert({
          team_id: teamId,
          name: seasonName
        });

      if (error) throw error;
      router.refresh();
    } catch (err: any) {
      alert('Failed to create season: ' + err.message);
    } finally {
      setCreatingSeasons(prev => {
        const next = new Set(prev);
        next.delete(teamId);
        return next;
      });
    }
  };

  const handleEditSeason = async (season: any) => {
    const newName = prompt('Enter new season name:', season.name);
    if (!newName || newName === season.name) return;

    const startsOn = prompt('Start date (YYYY-MM-DD, optional):', season.starts_on || '');
    const endsOn = prompt('End date (YYYY-MM-DD, optional):', season.ends_on || '');

    setEditingSeasons(prev => new Set(prev).add(season.id));

    try {
      const { error } = await supabase
        .from('seasons')
        .update({
          name: newName,
          starts_on: startsOn || null,
          ends_on: endsOn || null
        })
        .eq('id', season.id);

      if (error) throw error;
      router.refresh();
    } catch (err: any) {
      alert('Failed to update season: ' + err.message);
    } finally {
      setEditingSeasons(prev => {
        const next = new Set(prev);
        next.delete(season.id);
        return next;
      });
    }
  };

  return (
    <div>
      {teams.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No teams yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first team.
          </p>
          <div className="mt-6">
            <Link
              href={`/dashboard/orgs/${org.id}/teams/new`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Team
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {teams.map((team) => (
            <div key={team.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.sports.name}</p>
                  {(team.city || team.state) && (
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {[team.city, team.state].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/dashboard/orgs/${org.id}/teams/${team.id}/edit`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/teams/${team.id}`}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Manage →
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Seasons</h4>
                  <button
                    onClick={() => handleCreateSeason(team.id)}
                    disabled={creatingSeasons.has(team.id)}
                    className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  >
                    <Plus className="inline h-3 w-3 mr-1" />
                    Add Season
                  </button>
                </div>

                {team.seasons.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No seasons created yet</p>
                ) : (
                  <div className="space-y-2">
                    {team.seasons.map((season) => (
                      <div
                        key={season.id}
                        className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-2"
                      >
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{season.name}</span>
                          {season.starts_on && season.ends_on && (
                            <span className="text-gray-500 ml-2">
                              ({new Date(season.starts_on).toLocaleDateString()} - {new Date(season.ends_on).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditSeason(season)}
                            disabled={editingSeasons.has(season.id)}
                            className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <Link
                            href={`/dashboard/listings?season=${season.id}`}
                            className="text-blue-600 hover:text-blue-500"
                          >
                            View Listings →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
