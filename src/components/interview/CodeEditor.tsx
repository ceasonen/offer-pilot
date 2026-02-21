'use client';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-[260px] rounded-xl bg-slate-900 p-3 text-xs text-slate-500">编辑器加载中...</div>,
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
      <MonacoEditor
        height="260px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={value}
        options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
        onChange={(next) => onChange(next ?? '')}
      />
    </div>
  );
}
