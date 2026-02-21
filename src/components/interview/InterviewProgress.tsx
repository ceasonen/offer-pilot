import { Progress } from '@/components/ui/progress';

interface InterviewProgressProps {
  messageCount: number;
}

export function InterviewProgress({ messageCount }: InterviewProgressProps) {
  const value = Math.min(100, (messageCount / 24) * 100);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>面试进度</span>
        <span>{Math.round(value)}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
