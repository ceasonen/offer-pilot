'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { InterviewerAvatar } from '@/components/interview/InterviewerAvatar';
import { InterviewTimer } from '@/components/interview/InterviewTimer';
import { InterviewProgress } from '@/components/interview/InterviewProgress';
import { ChatPanel } from '@/components/interview/ChatPanel';
import { AnswerInput } from '@/components/interview/AnswerInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from '@/components/interview/CodeEditor';
import { useInterviewStore } from '@/store/interview-store';
import { useHistoryStore } from '@/store/history-store';
import { useConfigStore } from '@/store/config-store';
import { buildInterviewerPrompt } from '@/lib/prompts/interviewer';
import { getCompanyName, getRoleName, buildFallbackReport } from '@/lib/utils/report-gen';
import { inferPhaseFromMessages } from '@/lib/interview/flow-engine';
import { upsertReport } from '@/lib/utils/storage';
import { InterviewMessage, InterviewRound, Level } from '@/types/interview';

const LEVEL_NAME_MAP: Record<Level, string> = {
  junior: '初级',
  mid: '中级',
  senior: '高级',
  expert: '专家',
};

const ROUND_NAME_MAP: Record<InterviewRound, string> = {
  first: '一面',
  second: '二面',
  third: '三面',
  hr: 'HR 面',
};

interface UIMessage {
  id: string;
  role: string;
  content: string;
}

export function InterviewRoom() {
  const router = useRouter();
  const [code, setCode] = useState('// 算法题作答区\nfunction solve() {\n  return null;\n}');

  const config = useInterviewStore((s) => s.config);
  const evaluations = useInterviewStore((s) => s.evaluations);
  const startedAt = useInterviewStore((s) => s.startedAt);
  const addEvaluation = useInterviewStore((s) => s.addEvaluation);
  const setReport = useInterviewStore((s) => s.setReport);
  const endInterview = useInterviewStore((s) => s.endInterview);

  const addHistory = useHistoryStore((s) => s.addReport);

  const provider = useConfigStore((s) => s.provider);
  const apiKey = useConfigStore((s) => s.apiKey);
  const hydrateConfig = useConfigStore((s) => s.hydrate);

  const systemPrompt = useMemo(() => (config ? buildInterviewerPrompt(config) : ''), [config]);

  const { messages, input, setInput, append, isLoading } = useChat({
    api: '/api/chat',
    body: {
      config,
      providerConfig: {
        provider,
        apiKey,
      },
    },
    initialMessages: systemPrompt
      ? [{ id: 'system-seed', role: 'system', content: systemPrompt }]
      : [],
  });

  useEffect(() => {
    hydrateConfig();
  }, [hydrateConfig]);

  useEffect(() => {
    if (!config) {
      router.replace('/');
    }
  }, [config, router]);

  useEffect(() => {
    if (!config) return;
    if (messages.length === 1) {
      append({ role: 'user', content: '[面试开始，请先做开场。]' });
    }
  }, [append, config, messages.length]);

  if (!config) return null;

  const visibleMessages = messages as UIMessage[];

  const submitAnswer = async () => {
    const content = input.trim();
    if (!content || isLoading) return;

    const lastQuestion = [...visibleMessages]
      .reverse()
      .find((item) => item.role === 'assistant')?.content;

    await append({ role: 'user', content });

    if (lastQuestion) {
      try {
        const response = await fetch('/api/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            config,
            providerConfig: {
              provider,
              apiKey,
            },
            question: lastQuestion,
            answer: content,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.evaluation) {
            addEvaluation(data.evaluation);
          }
        }
      } catch {
        // Ignore evaluation errors in MVP mode.
      }
    }

    setInput('');
  };

  const finishInterview = async () => {
    const normalizedMessages: InterviewMessage[] = visibleMessages
      .filter((item) => item.role !== 'system')
      .map((item, index, arr) => {
        const partial = arr.slice(0, index + 1).map((msg) => ({
          id: msg.id,
          role: msg.role === 'assistant' ? 'interviewer' : 'candidate',
          content: msg.content,
          timestamp: Date.now(),
          phase: 'greeting' as const,
        }));

        return {
          id: item.id,
          role: item.role === 'assistant' ? 'interviewer' : 'candidate',
          content: item.content,
          timestamp: Date.now(),
          phase: inferPhaseFromMessages(partial),
        };
      });

    let report = buildFallbackReport({
      config,
      messages: normalizedMessages,
      evaluations,
      startTime: startedAt ?? Date.now(),
    });

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config,
          messages: normalizedMessages,
          evaluations,
          startTime: startedAt,
          providerConfig: { provider, apiKey },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.report) {
          report = data.report;
        }
      }
    } catch {
      // Keep fallback report.
    }

    setReport(report);
    addHistory(report);
    upsertReport(report);
    endInterview();
    router.push(`/report/${report.id}`);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-[640px] bg-slate-950">
      <aside className="hidden w-80 shrink-0 border-r border-slate-800 p-4 lg:flex lg:flex-col">
        <InterviewerAvatar company={config.company} />
        <div className="mt-4 space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
          <div className="flex justify-between text-slate-300">
            <span>公司</span>
            <strong className="text-slate-100">{getCompanyName(config.company)}</strong>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>岗位</span>
            <strong className="text-slate-100">{getRoleName(config.role)}</strong>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>级别</span>
            <strong className="text-slate-100">{LEVEL_NAME_MAP[config.level]}</strong>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>轮次</span>
            <strong className="text-slate-100">{ROUND_NAME_MAP[config.round]}</strong>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <InterviewTimer duration={config.duration} isActive />
          <InterviewProgress messageCount={visibleMessages.filter((msg) => msg.role !== 'system').length} />
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs text-slate-400">当前已评分题目</p>
            <p className="mt-1 text-xl font-semibold text-slate-100">{evaluations.length}</p>
          </div>
        </div>

        <Button variant="danger" className="mt-auto" onClick={finishInterview}>
          结束面试并生成报告
        </Button>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Badge>{getCompanyName(config.company)}</Badge>
            <Badge>{getRoleName(config.role)}</Badge>
          </div>
          <Button variant="danger" size="sm" className="lg:hidden" onClick={finishInterview}>
            结束面试
          </Button>
        </div>

        <ChatPanel messages={visibleMessages} company={config.company} loading={isLoading} />

        {config.role === 'algorithm' ? (
          <div className="border-t border-slate-800 p-4">
            <p className="mb-2 text-xs text-slate-400">算法题作答区（可选）</p>
            <CodeEditor value={code} onChange={setCode} />
          </div>
        ) : null}

        <AnswerInput value={input} loading={isLoading} onChange={setInput} onSubmit={submitAnswer} />
      </main>
    </div>
  );
}
