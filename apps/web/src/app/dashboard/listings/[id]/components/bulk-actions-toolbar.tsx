'use client';

import { useState } from 'react';
import { CheckSquare, Square, Download, Send, UserPlus } from 'lucide-react';
import { BulkMessageModal } from './bulk-message-modal';
import { BulkInviteModal } from './bulk-invite-modal';

interface BulkActionsToolbarProps {
  selectedCount: number;
  totalCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkStatusChange: (status: string) => Promise<void>;
  onBulkExport: () => Promise<void>;
  onBulkMessage: (message: string) => Promise<void>;
  listingId: string;
  listingTitle: string;
}

export function BulkActionsToolbar({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onDeselectAll,
  onBulkStatusChange,
  onBulkExport,
  onBulkMessage,
  listingId,
  listingTitle
}: BulkActionsToolbarProps) {
  const [statusChanging, setStatusChanging] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleStatusChange = async (status: string) => {
    if (!confirm(`Change status to "${status}" for ${selectedCount} application(s)?`)) {
      return;
    }

    setStatusChanging(true);
    try {
      await onBulkStatusChange(status);
    } finally {
      setStatusChanging(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await onBulkExport();
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={allSelected ? onDeselectAll : onSelectAll}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900"
            >
              {allSelected ? (
                <CheckSquare className="h-5 w-5 mr-2 text-blue-600" />
              ) : (
                <Square className="h-5 w-5 mr-2" />
              )}
              {selectedCount > 0 ? (
                <span className="font-medium">{selectedCount} selected</span>
              ) : (
                <span>Select all ({totalCount})</span>
              )}
            </button>

            {selectedCount > 0 && (
              <span className="text-sm text-gray-500">
                of {totalCount} application(s)
              </span>
            )}
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              {/* Status Change Dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleStatusChange(e.target.value);
                    e.target.value = '';
                  }
                }}
                disabled={statusChanging}
                className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Change Status...</option>
                <option value="in_review">In Review</option>
                <option value="accepted">Accept</option>
                <option value="waitlisted">Waitlist</option>
                <option value="rejected">Reject</option>
              </select>

              {/* Bulk Message */}
              <button
                onClick={() => setShowMessageModal(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Send className="h-4 w-4 mr-2" />
                Message
              </button>

              {/* Export */}
              <button
                onClick={handleExport}
                disabled={exporting}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {exporting ? 'Exporting...' : 'Export'}
              </button>
            </div>
          )}

          {selectedCount === 0 && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Parents
            </button>
          )}
        </div>
      </div>

      {showMessageModal && (
        <BulkMessageModal
          recipientCount={selectedCount}
          onSend={async (message) => {
            await onBulkMessage(message);
            setShowMessageModal(false);
          }}
          onClose={() => setShowMessageModal(false)}
        />
      )}

      {showInviteModal && (
        <BulkInviteModal
          listingId={listingId}
          listingTitle={listingTitle}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  );
}
