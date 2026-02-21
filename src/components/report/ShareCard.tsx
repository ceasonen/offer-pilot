import Link from 'next/link';
import { InterviewReport } from '@/types/interview';
import { RESULT_LABEL_MAP } from '@/lib/constants';

interface ShareCardProps {
  report: InterviewReport;
}

export function ShareCard({ report }: ShareCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-4">
      <p className="text-sm text-slate-300">面试结果</p>
      <p className="mt-1 text-2xl font-semibold text-slate-100">{report.overallScore.toFixed(1)} / 10</p>
      <p className="mt-1 text-sm text-cyan-300">{RESULT_LABEL_MAP[report.result]}</p>
      <p className="mt-3 text-xs text-slate-400">将链接分享给朋友查看你的模拟面试表现。</p>
      <Link href="/" className="mt-4 inline-flex rounded-lg bg-cyan-500 px-3 py-2 text-xs font-medium text-slate-950">
        再来一场
      </Link>
    </div>
  );
}
