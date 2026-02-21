'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from '@/components/interview/MessageBubble';
import { Company } from '@/types/interview';

interface ChatMessage {
  id: string;
  role: string;
  content: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  company: Company;
  loading: boolean;
}

export function ChatPanel({ messages, company, loading }: ChatPanelProps) {
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-6">
      {messages
        .filter((message) => message.role !== 'system')
        .map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role === 'assistant' ? 'interviewer' : 'candidate'}
            content={message.content}
            company={company}
          />
        ))}
      {loading ? (
        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900/80 px-3 py-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:100ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:200ms]" />
          面试官正在思考...
        </div>
      ) : null}
      <div ref={anchorRef} />
    </div>
  );
}
