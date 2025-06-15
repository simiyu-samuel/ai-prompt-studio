import React, { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { SearchFilter } from './components/SearchFilter';
import { PromptCard } from './components/PromptCard';
import { PromptPacks } from './components/PromptPacks';
import { Statistics } from './components/Statistics';
import { ThemeProvider } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportPromptsAsJSON, exportPromptsAsTXT } from './utils/export';
import { Prompt, PromptPack, FilterOptions } from './types';

const DEFAULT_CATEGORIES = [
  'Writing', 'Coding', 'Marketing', 'Creative', 'Analysis', 
  'Research', 'Business', 'Education', 'General'
];

function AppContent() {
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>('ai-prompts', []);
  const [packs, setPacks] = useLocalStorage<PromptPack[]>('prompt-packs', []);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    packId: '',
    tags: []
  });
  const [showStats, setShowStats] = useState(false);

  const categories = useMemo(() => {
    const customCategories = [...new Set(prompts.map(p => p.category))];
    return [...new Set([...DEFAULT_CATEGORIES, ...customCategories])];
  }, [prompts]);

  const allTags = useMemo(() => {
    const tags = prompts.flatMap(p => p.tags);
    return [...new Set(tags)].sort();
  }, [prompts]);

  const packsWithCount = useMemo(() => {
    return packs.map(pack => ({
      ...pack,
      promptCount: prompts.filter(p => p.packId === pack.id).length
    }));
  }, [packs, prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = !filters.search || 
        prompt.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.content.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || prompt.category === filters.category;
      const matchesPack = !filters.packId || prompt.packId === filters.packId;
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(tag => prompt.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesPack && matchesTags;
    });
  }, [prompts, filters]);

  const savePrompt = (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => {
    const newPrompt: Prompt = {
      ...promptData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0
    };
    setPrompts([newPrompt, ...prompts]);
    toast.success('Prompt saved successfully!');
  };

  const updatePrompt = (updatedPrompt: Prompt) => {
    setPrompts(prompts.map(p => 
      p.id === updatedPrompt.id 
        ? { ...updatedPrompt, updatedAt: new Date().toISOString() }
        : p
    ));
    toast.success('Prompt updated successfully!');
  };

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
    toast.success('Prompt deleted successfully!');
  };

  const incrementUsage = (id: string) => {
    setPrompts(prompts.map(p => 
      p.id === id ? { ...p, usageCount: p.usageCount + 1 } : p
    ));
  };

  const createPack = (packData: Omit<PromptPack, 'id' | 'createdAt' | 'promptCount'>) => {
    const newPack: PromptPack = {
      ...packData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      promptCount: 0
    };
    setPacks([...packs, newPack]);
    toast.success('Prompt pack created successfully!');
  };

  const updatePack = (updatedPack: PromptPack) => {
    setPacks(packs.map(p => p.id === updatedPack.id ? updatedPack : p));
    toast.success('Prompt pack updated successfully!');
  };

  const deletePack = (id: string) => {
    // Remove pack association from prompts
    setPrompts(prompts.map(p => p.packId === id ? { ...p, packId: undefined } : p));
    setPacks(packs.filter(p => p.id !== id));
    toast.success('Prompt pack deleted successfully!');
  };

  const handleExport = () => {
    if (prompts.length === 0) {
      toast.error('No prompts to export');
      return;
    }
    
    const choice = window.confirm('Export as JSON? (Cancel for TXT format)');
    if (choice) {
      exportPromptsAsJSON(prompts, packs);
    } else {
      exportPromptsAsTXT(prompts);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.prompts && Array.isArray(data.prompts)) {
            setPrompts([...prompts, ...data.prompts]);
            if (data.packs && Array.isArray(data.packs)) {
              setPacks([...packs, ...data.packs]);
            }
            toast.success(`Imported ${data.prompts.length} prompts successfully!`);
          } else {
            toast.error('Invalid file format');
          }
        } catch (error) {
          toast.error('Failed to import file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        onExport={handleExport}
        onImport={handleImport}
        onShowStats={() => setShowStats(true)}
        totalPrompts={prompts.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromptForm
          onSave={savePrompt}
          packs={packsWithCount}
          categories={categories}
        />

        <PromptPacks
          packs={packsWithCount}
          onCreatePack={createPack}
          onUpdatePack={updatePack}
          onDeletePack={deletePack}
          selectedPackId={filters.packId}
          onSelectPack={(packId) => 
            setFilters({ ...filters, packId: filters.packId === packId ? '' : packId })
          }
        />

        <SearchFilter
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          packs={packsWithCount}
          allTags={allTags}
        />

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {prompts.length === 0 ? 'No prompts yet' : 'No prompts match your filters'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {prompts.length === 0 
                ? 'Create your first AI prompt to get started' 
                : 'Try adjusting your search or filters'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                pack={packsWithCount.find(p => p.id === prompt.packId)}
                onEdit={updatePrompt}
                onDelete={deletePrompt}
                onUse={incrementUsage}
              />
            ))}
          </div>
        )}
      </main>

      {showStats && (
        <Statistics
          prompts={prompts}
          packs={packsWithCount}
          onClose={() => setShowStats(false)}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;