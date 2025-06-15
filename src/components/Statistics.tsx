import React from 'react';
import { BarChart3, TrendingUp, Tag, Calendar, X } from 'lucide-react';
import { Prompt, PromptPack } from '../types';

interface StatisticsProps {
  prompts: Prompt[];
  packs: PromptPack[];
  onClose: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ prompts, packs, onClose }) => {
  const totalPrompts = prompts.length;
  const totalUsage = prompts.reduce((sum, prompt) => sum + prompt.usageCount, 0);
  const avgUsage = totalPrompts > 0 ? (totalUsage / totalPrompts).toFixed(1) : '0';
  
  const categoryStats = prompts.reduce((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const mostUsedPrompts = prompts
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 5);

  const recentPrompts = prompts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Statistics & Analytics
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Total Prompts</p>
                  <p className="text-2xl font-bold">{totalPrompts}</p>
                </div>
                <Tag className="w-8 h-8 text-indigo-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Usage</p>
                  <p className="text-2xl font-bold">{totalUsage}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Avg Usage</p>
                  <p className="text-2xl font-bold">{avgUsage}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Prompt Packs</p>
                  <p className="text-2xl font-bold">{packs.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Categories */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Categories
              </h3>
              <div className="space-y-3">
                {topCategories.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: `${(count / totalPrompts) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Used Prompts */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Most Used Prompts
              </h3>
              <div className="space-y-3">
                {mostUsedPrompts.map((prompt, index) => (
                  <div key={prompt.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        #{index + 1} {prompt.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {prompt.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {prompt.usageCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Prompts
            </h3>
            <div className="space-y-3">
              {recentPrompts.map(prompt => (
                <div key={prompt.id} className="flex items-center justify-between py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {prompt.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {prompt.category} • {new Date(prompt.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Used {prompt.usageCount} times
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};