'use client';

import { useState, useEffect } from 'react';
import { ConversationView } from '@/components/messaging/conversation-view';
import { MessageSquare, Loader2 } from 'lucide-react';

interface MessagingSectionProps {
  applicationId: string;
  currentUserId: string;
  existingConversationId?: string;
}

export function MessagingSection({
  applicationId,
  currentUserId,
  existingConversationId
}: MessagingSectionProps) {
  const [conversationId, setConversationId] = useState<string | null>(existingConversationId || null);
  const [loading, setLoading] = useState(!existingConversationId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existingConversationId) {
      createOrGetConversation();
    }
  }, [applicationId, existingConversationId]);

  const createOrGetConversation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create conversation');
      }

      setConversationId(data.conversation.id);
    } catch (err: any) {
      setError(err.message);
      console.error('Create conversation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Messages
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">
            <p className="text-sm">{error}</p>
            <button
              onClick={createOrGetConversation}
              className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
            >
              Try again
            </button>
          </div>
        ) : conversationId ? (
          <ConversationView
            conversationId={conversationId}
            currentUserId={currentUserId}
          />
        ) : (
          <p className="text-sm text-gray-500 text-center py-8">
            Unable to load conversation
          </p>
        )}
      </div>
    </div>
  );
}
