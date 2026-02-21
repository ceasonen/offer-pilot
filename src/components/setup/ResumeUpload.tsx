'use client';

import { ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ResumeUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResumeUpload({ value, onChange }: ResumeUploadProps) {
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    onChange(text.slice(0, 10000));
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="text-sm font-medium text-slate-100">简历信息（可选）</p>
      <p className="text-xs text-slate-400">可粘贴文本，或上传 txt/md 让面试官按你的项目背景追问。</p>
      <input
        type="file"
        accept=".txt,.md"
        onChange={handleFile}
        className="block w-full text-xs text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-slate-200"
      />
      <Textarea
        rows={6}
        placeholder="在这里粘贴简历内容..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
