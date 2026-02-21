import { Company } from '@/types/interview';
import { cn } from '@/lib/utils';

const COMPANY_AVATARS: Record<Company, { emoji: string; name: string; style: string }> = {
  bytedance: { emoji: '🔥', name: '字节面试官', style: 'bg-blue-600/30 text-blue-300' },
  alibaba: { emoji: '🟠', name: '阿里面试官', style: 'bg-orange-600/30 text-orange-300' },
  tencent: { emoji: '🐧', name: '腾讯面试官', style: 'bg-emerald-600/30 text-emerald-300' },
  meituan: { emoji: '🟡', name: '美团面试官', style: 'bg-yellow-600/30 text-yellow-300' },
  xiaohongshu: { emoji: '📕', name: '小红书面试官', style: 'bg-rose-600/30 text-rose-300' },
  pdd: { emoji: '🟤', name: '拼多多面试官', style: 'bg-red-700/30 text-red-300' },
};

interface InterviewerAvatarProps {
  company: Company;
}

export function InterviewerAvatar({ company }: InterviewerAvatarProps) {
  const avatar = COMPANY_AVATARS[company];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-center gap-3">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-full text-xl', avatar.style)}>
          {avatar.emoji}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-100">{avatar.name}</p>
          <p className="text-xs text-slate-400">模拟真实技术面试</p>
        </div>
      </div>
    </div>
  );
}
