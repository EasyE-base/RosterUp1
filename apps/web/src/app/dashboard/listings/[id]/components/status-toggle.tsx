'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@rosterup/lib';
import { Lock, Unlock } from 'lucide-react';

interface StatusToggleProps {
  listingId: string;
  currentStatus: 'open' | 'closed';
}

export function StatusToggle({ listingId, currentStatus }: StatusToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const toggleStatus = async () => {
    const newStatus = status === 'open' ? 'closed' : 'open';
    setLoading(true);

    try {
      const { error } = await supabase
        .from('roster_spots')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      setStatus(newStatus);
      router.refresh();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        status === 'open'
          ? 'bg-green-100 text-green-800 hover:bg-green-200'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      } disabled:opacity-50`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      ) : status === 'open' ? (
        <Unlock className="h-4 w-4 mr-2" />
      ) : (
        <Lock className="h-4 w-4 mr-2" />
      )}
      {status === 'open' ? 'Open' : 'Closed'}
    </button>
  );
}
