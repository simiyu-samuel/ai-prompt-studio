import { Prompt, PromptPack } from '../types';

export const exportPromptsAsJSON = (prompts: Prompt[], packs: PromptPack[]) => {
  const data = {
    prompts,
    packs,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-prompts-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportPromptsAsTXT = (prompts: Prompt[]) => {
  const txtContent = prompts.map(prompt => 
    `Title: ${prompt.title}\nCategory: ${prompt.category}\nTags: ${prompt.tags.join(', ')}\nDescription: ${prompt.description}\n\nContent:\n${prompt.content}\n\n---\n\n`
  ).join('');
  
  const blob = new Blob([txtContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-prompts-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};