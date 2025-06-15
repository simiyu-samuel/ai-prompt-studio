import React, { useState } from 'react';
import { Copy, Edit, Trash2, Tag, Clock, TrendingUp, Check } from 'lucide-react';
import { Prompt, PromptPack } from '../types';
import toast from 'react-hot-toast';

interface PromptCardProps {
  prompt: Prompt;
  pack?: PromptPack;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onUse: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, pack, onEdit, onDelete, onUse }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      onUse(prompt.id);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy prompt');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {prompt.title}
          </h3>
          {prompt.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {prompt.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(prompt)}
            className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
            title="Edit prompt"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(prompt.id)}
            className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
            title="Delete prompt"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {prompt.content}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
            {prompt.category}
          </span>
          
          {pack && (
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: pack.color }}
            >
              {pack.name}
            </span>
          )}
          
          {prompt.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {prompt.tags.slice(0, 2).join(', ')}
                {prompt.tags.length > 2 && ` +${prompt.tags.length - 2}`}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>{prompt.usageCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(prompt.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};