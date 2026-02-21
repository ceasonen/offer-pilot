import { create } from 'zustand';
import { LLMProvider } from '@/types/llm';
import {
  getStoredApiKey,
  getStoredProvider,
  setStoredApiKey,
  setStoredProvider,
} from '@/lib/utils/storage';

interface ConfigState {
  provider: LLMProvider;
  apiKey: string;
  setProvider: (provider: LLMProvider) => void;
  setApiKey: (apiKey: string) => void;
  hydrate: () => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  provider: 'deepseek',
  apiKey: '',
  setProvider: (provider) => {
    set({ provider });
    setStoredProvider(provider);
  },
  setApiKey: (apiKey) => {
    set({ apiKey });
    setStoredApiKey(apiKey);
  },
  hydrate: () => {
    const provider = getStoredProvider() as LLMProvider;
    const apiKey = getStoredApiKey();
    set({ provider, apiKey });
  },
}));
