import { createOpenAI } from '@ai-sdk/openai';
import { OLLAMA_CONFIG } from '@/lib/llm/ollama';
import { DEEPSEEK_CONFIG } from '@/lib/llm/deepseek';
import { OPENAI_CONFIG } from '@/lib/llm/openai';
import { QWEN_CONFIG } from '@/lib/llm/qwen';
import { LLMProvider, ProviderConfig } from '@/types/llm';

const DEFAULT_MODELS: Record<LLMProvider, string> = {
  deepseek: DEEPSEEK_CONFIG.defaultModel,
  openai: OPENAI_CONFIG.defaultModel,
  qwen: QWEN_CONFIG.defaultModel,
  ollama: OLLAMA_CONFIG.defaultModel,
};

const BASE_URLS: Record<LLMProvider, string> = {
  deepseek: DEEPSEEK_CONFIG.baseURL,
  openai: OPENAI_CONFIG.baseURL,
  qwen: QWEN_CONFIG.baseURL,
  ollama: OLLAMA_CONFIG.baseURL,
};

export function getProviderDefaults(provider: LLMProvider) {
  return {
    model: DEFAULT_MODELS[provider],
    baseURL: BASE_URLS[provider],
  };
}

export function createLLMProvider(config: ProviderConfig) {
  const baseURL = config.baseURL || BASE_URLS[config.provider];
  const model = config.model || DEFAULT_MODELS[config.provider];

  const provider = createOpenAI({
    apiKey: config.apiKey,
    baseURL,
  });

  return {
    model: provider(model),
    modelId: model,
  };
}
