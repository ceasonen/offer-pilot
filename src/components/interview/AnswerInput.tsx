'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AnswerInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AnswerInput({ value, loading, onChange, onSubmit }: AnswerInputProps) {
  return (
    <div className="border-t border-slate-800 bg-slate-950 p-4">
      <div className="flex gap-3">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="输入你的回答...（Shift + Enter 换行）"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <Button type="button" className="self-end" disabled={loading || !value.trim()} onClick={onSubmit}>
          发送
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-500">像真实面试一样回答，面试官会基于你的回答继续追问。</p>
    </div>
  );
}
