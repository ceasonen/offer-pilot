'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useConfigStore } from '@/store/config-store';

export function ApiKeyInput() {
  const apiKey = useConfigStore((s) => s.apiKey);
  const setApiKey = useConfigStore((s) => s.setApiKey);
  const [value, setValue] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiKey(value.trim());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-400">API Key</p>
        <Input
          placeholder="粘贴你的 API Key（仅保存在本地）"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="password"
          autoComplete="off"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          保存 Key
        </Button>
        {saved ? <span className="text-xs text-emerald-400">已保存</span> : null}
      </div>
    </form>
  );
}
