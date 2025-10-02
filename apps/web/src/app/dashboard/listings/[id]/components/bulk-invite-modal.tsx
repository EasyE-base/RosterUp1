'use client';

import { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface BulkInviteModalProps {
  listingId: string;
  listingTitle: string;
  onClose: () => void;
}

export function BulkInviteModal({
  listingId,
  listingTitle,
  onClose
}: BulkInviteModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [sending, setSending] = useState(false);

  const parseEmails = (input: string): string[] => {
    // Split by comma, newline, or semicolon
    return input
      .split(/[\n,;]+/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
  };

  const handleSend = async () => {
    const emails = parseEmails(emailInput);

    if (emails.length === 0) {
      alert('Please enter at least one email address');
      return;
    }

    if (emails.length > 200) {
      alert('Maximum 200 emails per batch. Please split into smaller batches.');
      return;
    }

    if (!confirm(`Send invites to ${emails.length} email address(es)?`)) {
      return;
    }

    setSending(true);
    try {
      const response = await fetch(`/api/listings/${listingId}/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          customMessage: customMessage.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invites');
      }

      alert(data.message);
      onClose();
    } catch (error: any) {
      alert('Failed to send invites: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = parseEmails(text);
      setEmailInput(emails.join('\n'));
    };
    reader.readAsText(file);
  };

  const emailCount = parseEmails(emailInput).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Invite Parents to Apply
            </h3>
            <p className="text-sm text-gray-500 mt-1">{listingTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Addresses
            </label>
            <textarea
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              rows={8}
              placeholder="Enter email addresses (one per line, or comma-separated)&#10;example@email.com&#10;parent@email.com"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{emailCount} email(s) entered</span>
              <label className="cursor-pointer text-blue-600 hover:text-blue-700 flex items-center">
                <Upload className="h-3 w-3 mr-1" />
                Upload CSV
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Message (Optional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
              placeholder="Add a personal message to include in the invitation..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <div className="mt-1 text-xs text-gray-500">
              This will be included in the invitation email.
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Preview:</strong> Recipients will receive an email with details about this opportunity and a link to apply.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end space-x-3 rounded-b-lg sticky bottom-0">
          <button
            onClick={onClose}
            disabled={sending}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || emailCount === 0}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? 'Sending...' : `Send ${emailCount} Invite(s)`}
          </button>
        </div>
      </div>
    </div>
  );
}
