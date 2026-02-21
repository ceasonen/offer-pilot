import { Company } from '@/types/interview';
import { cn } from '@/lib/utils';

const COMPANY_AVATARS: Record<Company, { emoji: string; bg: string }> = {
  bytedance: { emoji: '🔥', bg: 'bg-blue-600' },
  alibaba: { emoji: '🟠', bg: 'bg-orange-600' },
  tencent: { emoji: '🐧', bg: 'bg-green-600' },
  meituan: { emoji: '🟡', bg: 'bg-yellow-600 text-slate-900' },
  xiaohongshu: { emoji: '📕', bg: 'bg-red-600' },
  pdd: { emoji: '🟤', bg: 'bg-orange-800' },
};

interface MessageBubbleProps {
  role: 'interviewer' | 'candidate';
  content: string;
  company: Company;
}

export function MessageBubble({ role, content, company }: MessageBubbleProps) {
  const isInterviewer = role === 'interviewer';
  const avatar = COMPANY_AVATARS[company];

  return (
    <div className={cn('flex gap-3', !isInterviewer && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base',
          isInterviewer ? avatar.bg : 'bg-slate-700',
        )}
      >
        {isInterviewer ? avatar.emoji : '👤'}
      </div>
      <div
        className={cn(
          'max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isInterviewer
            ? 'rounded-tl-sm bg-slate-800 text-slate-100'
            : 'rounded-tr-sm bg-cyan-500 text-slate-950',
        )}
      >
        {content}
      </div>
    </div>
  );
}
