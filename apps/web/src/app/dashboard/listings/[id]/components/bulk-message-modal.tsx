'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface BulkMessageModalProps {
  recipientCount: number;
  onSend: (message: string) => Promise<void>;
  onClose: () => void;
}

export function BulkMessageModal({
  recipientCount,
  onSend,
  onClose
}: BulkMessageModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    setSending(true);
    try {
      await onSend(message);
      alert(`Message sent to ${recipientCount} parent(s)!`);
      onClose();
    } catch (error: any) {
      alert('Failed to send messages: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Send Message to {recipientCount} Parent(s)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 mb-4">
            This message will be sent to the conversations for all selected applications.
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            placeholder="Type your message here..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />

          <div className="mt-2 text-xs text-gray-500">
            {message.length} characters
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            disabled={sending}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? 'Sending...' : `Send to ${recipientCount} Parent(s)`}
          </button>
        </div>
      </div>
    </div>
  );
}
