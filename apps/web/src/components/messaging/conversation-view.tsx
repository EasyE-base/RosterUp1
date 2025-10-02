'use client';

import { MessageSquare } from 'lucide-react';

interface ConversationViewProps {
  conversationId: string;
  currentUserId: string;
}

/**
 * ConversationView - Messaging interface component
 *
 * TODO: Implement full messaging functionality
 * - Message list with real-time updates
 * - Message composer with file attachments
 * - Read receipts and typing indicators
 * - Message threading
 */
export function ConversationView({
  conversationId,
  currentUserId,
}: ConversationViewProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Messaging Coming Soon
      </h3>
      <p className="text-sm text-gray-600 max-w-md mx-auto">
        Direct messaging functionality is currently being developed. You'll be able to communicate
        with applicants and coaches directly from this interface.
      </p>
      <div className="mt-4 text-xs text-gray-400">
        Conversation ID: {conversationId}
      </div>
    </div>
  );
}
