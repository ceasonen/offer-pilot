import { InterviewReport } from '@/types/interview';

interface ScoreBreakdownProps {
  report: InterviewReport;
}

export function ScoreBreakdown({ report }: ScoreBreakdownProps) {
  const entries = [
    ['技术深度', report.overallScores.technicalDepth],
    ['问题解决', report.overallScores.problemSolving],
    ['编码能力', report.overallScores.codingAbility],
    ['沟通表达', report.overallScores.communication],
    ['系统思维', report.overallScores.systemThinking],
    ['学习潜力', report.overallScores.learningPotential],
  ] as const;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="mb-4 text-sm font-medium text-slate-100">分项评分</p>
      <div className="space-y-3 text-sm">
        {entries.map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-slate-300">
              <span>{label}</span>
              <span className="font-medium text-slate-100">{value.toFixed(1)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, value * 10)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
