'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Save, Eye } from 'lucide-react';

const BLOCK_TYPES = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'text', label: 'Text Block' },
  { value: 'roster', label: 'Team Roster' },
  { value: 'schedule', label: 'Schedule' },
  { value: 'image', label: 'Image' },
  { value: 'cta', label: 'Call to Action' }
];

export default function PageEditorPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId as string;
  const pageId = params.pageId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    loadPage();
  }, [pageId]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load page');
      }

      setPage(data.page);
      setBlocks(data.page.page_blocks || []);
    } catch (err: any) {
      alert('Failed to load page: ' + err.message);
      router.push(`/dashboard/teams/${teamId}/site`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlock = (type: string) => {
    const defaultData: any = {
      hero: { title: 'Welcome', subtitle: 'Your team subtitle', backgroundImage: '' },
      text: { content: 'Enter your text here...' },
      roster: { showPhotos: true },
      schedule: { upcomingOnly: false },
      image: { src: '', alt: '', caption: '' },
      cta: { text: 'Join Our Team', buttonText: 'Apply Now', link: '' }
    };

    setBlocks([...blocks, {
      type,
      data: defaultData[type] || {}
    }]);
  };

  const handleUpdateBlock = (index: number, data: any) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], data };
    setBlocks(updated);
  };

  const handleDeleteBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const updated = [...blocks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setBlocks(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/pages/${pageId}/blocks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blocks');
      }

      alert('Page saved successfully!');
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
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
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/dashboard/teams/${teamId}/site`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Site
        </Link>
        <div className="flex items-center space-x-3">
          <Link
            href={`/sites/${teamId}/${page?.slug}`}
            target="_blank"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{page?.title}</h1>
        <p className="mt-2 text-gray-600">Edit page content with blocks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Block Palette */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-4 sticky top-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add Blocks</h3>
            <div className="space-y-2">
              {BLOCK_TYPES.map((blockType) => (
                <button
                  key={blockType.value}
                  onClick={() => handleAddBlock(blockType.value)}
                  className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 hover:border-blue-500 transition-colors"
                >
                  <Plus className="h-3 w-3 inline mr-2" />
                  {blockType.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Block Editor */}
        <div className="lg:col-span-3 space-y-4">
          {blocks.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-12 text-center text-gray-500">
              <p>No blocks yet. Add blocks from the left panel to start building your page.</p>
            </div>
          ) : (
            blocks.map((block, index) => (
              <BlockEditor
                key={index}
                block={block}
                index={index}
                totalBlocks={blocks.length}
                onUpdate={(data) => handleUpdateBlock(index, data)}
                onDelete={() => handleDeleteBlock(index)}
                onMove={handleMoveBlock}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMove
}: {
  block: any;
  index: number;
  totalBlocks: number;
  onUpdate: (data: any) => void;
  onDelete: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}) {
  const blockTypeLabel = BLOCK_TYPES.find(t => t.value === block.type)?.label || block.type;

  return (
    <div className="bg-white shadow rounded-lg border-2 border-gray-200">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">{blockTypeLabel}</h4>
        <div className="flex items-center space-x-2">
          {index > 0 && (
            <button
              onClick={() => onMove(index, 'up')}
              className="text-gray-400 hover:text-gray-600"
            >
              ↑
            </button>
          )}
          {index < totalBlocks - 1 && (
            <button
              onClick={() => onMove(index, 'down')}
              className="text-gray-400 hover:text-gray-600"
            >
              ↓
            </button>
          )}
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {block.type === 'hero' && (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.title || ''}
              onChange={(e) => onUpdate({ ...block.data, title: e.target.value })}
              placeholder="Hero Title"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={block.data.subtitle || ''}
              onChange={(e) => onUpdate({ ...block.data, subtitle: e.target.value })}
              placeholder="Subtitle"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={block.data.backgroundImage || ''}
              onChange={(e) => onUpdate({ ...block.data, backgroundImage: e.target.value })}
              placeholder="Background Image URL"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        )}
        {block.type === 'text' && (
          <textarea
            value={block.data.content || ''}
            onChange={(e) => onUpdate({ ...block.data, content: e.target.value })}
            rows={5}
            placeholder="Enter text content..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        )}
        {block.type === 'image' && (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.src || ''}
              onChange={(e) => onUpdate({ ...block.data, src: e.target.value })}
              placeholder="Image URL"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={block.data.alt || ''}
              onChange={(e) => onUpdate({ ...block.data, alt: e.target.value })}
              placeholder="Alt text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        )}
        {block.type === 'cta' && (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.text || ''}
              onChange={(e) => onUpdate({ ...block.data, text: e.target.value })}
              placeholder="CTA Text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={block.data.buttonText || ''}
              onChange={(e) => onUpdate({ ...block.data, buttonText: e.target.value })}
              placeholder="Button Text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              value={block.data.link || ''}
              onChange={(e) => onUpdate({ ...block.data, link: e.target.value })}
              placeholder="Link URL"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        )}
        {(block.type === 'roster' || block.type === 'schedule') && (
          <p className="text-sm text-gray-500">
            This block will automatically display your team's {block.type} data.
          </p>
        )}
      </div>
    </div>
  );
}
