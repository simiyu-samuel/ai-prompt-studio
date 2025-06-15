import React, { useState } from 'react';
import { Plus, Folder, Edit, Trash2, Package } from 'lucide-react';
import { PromptPack } from '../types';

interface PromptPacksProps {
  packs: PromptPack[];
  onCreatePack: (pack: Omit<PromptPack, 'id' | 'createdAt' | 'promptCount'>) => void;
  onUpdatePack: (pack: PromptPack) => void;
  onDeletePack: (id: string) => void;
  selectedPackId?: string;
  onSelectPack: (packId: string) => void;
}

const PACK_COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
  '#EF4444', '#06B6D4', '#84CC16', '#F97316'
];

export const PromptPacks: React.FC<PromptPacksProps> = ({
  packs,
  onCreatePack,
  onUpdatePack,
  onDeletePack,
  selectedPackId,
  onSelectPack
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPack, setEditingPack] = useState<PromptPack | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: PACK_COLORS[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingPack) {
      onUpdatePack({
        ...editingPack,
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color
      });
      setEditingPack(null);
    } else {
      onCreatePack({
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color
      });
    }

    setFormData({ name: '', description: '', color: PACK_COLORS[0] });
    setShowCreateForm(false);
  };

  const startEdit = (pack: PromptPack) => {
    setEditingPack(pack);
    setFormData({
      name: pack.name,
      description: pack.description || '',
      color: pack.color
    });
    setShowCreateForm(true);
  };

  const cancelEdit = () => {
    setEditingPack(null);
    setFormData({ name: '', description: '', color: PACK_COLORS[0] });
    setShowCreateForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Prompt Packs
          </h2>
        </div>
        
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>New Pack</span>
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pack Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter pack name..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color
              </label>
              <div className="flex space-x-2">
                {PACK_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color 
                        ? 'border-gray-400 dark:border-gray-300' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Optional description..."
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
            >
              {editingPack ? 'Update Pack' : 'Create Pack'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map(pack => (
          <div
            key={pack.id}
            className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedPackId === pack.id
                ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => onSelectPack(pack.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: pack.color }}
                />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {pack.name}
                </h3>
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(pack);
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePack(pack.id);
                  }}
                  className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {pack.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {pack.description}
              </p>
            )}
            
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Folder className="w-3 h-3" />
              <span>{pack.promptCount} prompts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};