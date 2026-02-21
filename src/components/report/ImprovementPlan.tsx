import { InterviewReport } from '@/types/interview';

interface ImprovementPlanProps {
  report: InterviewReport;
}

export function ImprovementPlan({ report }: ImprovementPlanProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-medium text-emerald-300">优势</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {report.strengths.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-medium text-amber-300">短板</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {report.weaknesses.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-medium text-cyan-300">改进计划</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {report.improvements.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
