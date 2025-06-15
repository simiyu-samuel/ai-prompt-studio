export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  packId?: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

export interface PromptPack {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  promptCount: number;
}

export interface FilterOptions {
  search: string;
  category: string;
  packId: string;
  tags: string[];
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}