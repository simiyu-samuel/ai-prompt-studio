import React from 'react';
import { Zap, Moon, Sun, Download, Upload, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onExport: () => void;
  onImport: () => void;
  onShowStats: () => void;
  totalPrompts: number;
}

export const Header: React.FC<HeaderProps> = ({ onExport, onImport, onShowStats, totalPrompts }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Prompt Studio
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {totalPrompts} prompts saved
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onShowStats}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="View Statistics"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            
            <button
              onClick={onImport}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="Import Prompts"
            >
              <Upload className="w-5 h-5" />
            </button>
            
            <button
              onClick={onExport}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="Export Prompts"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};