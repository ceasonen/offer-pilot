import { InterviewReport } from '@/types/interview';

interface QuestionReviewProps {
  report: InterviewReport;
}

export function QuestionReview({ report }: QuestionReviewProps) {
  if (report.evaluations.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
        当前没有逐题评分数据。你可以在后续迭代中接入更细粒度评估。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {report.evaluations.map((item) => (
        <div key={item.questionId} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm font-medium text-slate-100">Q: {item.question}</p>
          <p className="mt-2 text-sm text-slate-300">你的回答：{item.answer}</p>
          <p className="mt-2 text-xs text-cyan-300">反馈：{item.feedback}</p>
        </div>
      ))}
    </div>
  );
}
