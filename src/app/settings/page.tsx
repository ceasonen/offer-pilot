'use client';

import { useEffect } from 'react';
import { ApiKeyInput } from '@/components/common/ApiKeyInput';
import { ModelSelector } from '@/components/common/ModelSelector';
import { Card } from '@/components/ui/card';
import { useConfigStore } from '@/store/config-store';

export default function SettingsPage() {
  const hydrate = useConfigStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-8">
      <h1 className="text-2xl font-semibold text-slate-100">设置</h1>
      <Card className="space-y-4">
        <ModelSelector />
        <ApiKeyInput />
      </Card>
      <Card>
        <h2 className="text-base font-semibold text-slate-100">安全说明</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>• API Key 默认仅存储在本地浏览器 `localStorage`。</li>
          <li>• 你可以随时覆盖或清空 Key。</li>
          <li>• 如需多人共享历史记录，可在下一阶段接入 Supabase。</li>
        </ul>
      </Card>
    </div>
  );
}
