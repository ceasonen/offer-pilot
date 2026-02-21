'use client';

import { Select } from '@/components/ui/select';
import { useConfigStore } from '@/store/config-store';
import { LLMProvider } from '@/types/llm';

const OPTIONS: Array<{ value: LLMProvider; label: string }> = [
  { value: 'deepseek', label: 'DeepSeek (推荐)' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'qwen', label: '通义千问' },
  { value: 'ollama', label: 'Ollama (本地)' },
];

export function ModelSelector() {
  const provider = useConfigStore((s) => s.provider);
  const setProvider = useConfigStore((s) => s.setProvider);

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-slate-400">LLM Provider</p>
      <Select value={provider} onChange={(e) => setProvider(e.target.value as LLMProvider)}>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
