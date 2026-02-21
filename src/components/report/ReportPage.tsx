'use client';

import { useMemo, useRef } from 'react';
import { InterviewReport } from '@/types/interview';
import { ScoreRadar } from '@/components/report/ScoreRadar';
import { ScoreBreakdown } from '@/components/report/ScoreBreakdown';
import { QuestionReview } from '@/components/report/QuestionReview';
import { ImprovementPlan } from '@/components/report/ImprovementPlan';
import { ShareCard } from '@/components/report/ShareCard';
import { Button } from '@/components/ui/button';
import { exportNodeToPdf } from '@/lib/utils/export-pdf';
import { getCompanyName, getRoleName } from '@/lib/utils/report-gen';

interface ReportPageProps {
  report: InterviewReport;
}

export function ReportPage({ report }: ReportPageProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const dateText = useMemo(
    () =>
      new Date(report.endTime).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    [report.endTime],
  );

  const exportPdf = async () => {
    if (!reportRef.current) return;
    await exportNodeToPdf(reportRef.current, `offer-pilot-report-${report.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">面试报告</h1>
          <p className="text-sm text-slate-400">
            {getCompanyName(report.config.company)} · {getRoleName(report.config.role)} · {dateText}
          </p>
        </div>
        <Button onClick={exportPdf}>导出 PDF</Button>
      </div>

      <div ref={reportRef} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <ScoreRadar scores={report.overallScores} />
          <div className="space-y-4">
            <ScoreBreakdown report={report} />
            <ShareCard report={report} />
          </div>
        </div>

        <ImprovementPlan report={report} />

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-slate-100">逐题回顾</h2>
          <QuestionReview report={report} />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-base font-medium text-slate-100">面试官总评</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{report.interviewerComment}</p>
        </section>
      </div>
    </div>
  );
}
