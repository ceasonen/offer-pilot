export type LLMProvider = 'deepseek' | 'openai' | 'qwen' | 'ollama';

export interface ProviderConfig {
  provider: LLMProvider;
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface ModelOption {
  id: LLMProvider;
  label: string;
  defaultModel: string;
  placeholderKey: string;
}
