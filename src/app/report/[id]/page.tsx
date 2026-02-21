'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReportPage } from '@/components/report/ReportPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInterviewStore } from '@/store/interview-store';
import { useHistoryStore } from '@/store/history-store';

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const currentReport = useInterviewStore((s) => s.report);
  const reports = useHistoryStore((s) => s.reports);
  const hydrateHistory = useHistoryStore((s) => s.hydrate);

  useEffect(() => {
    hydrateHistory();
  }, [hydrateHistory]);

  const report = useMemo(() => {
    if (currentReport?.id === params.id) return currentReport;
    return reports.find((item) => item.id === params.id) ?? null;
  }, [currentReport, params.id, reports]);

  if (!report) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <p className="text-sm text-slate-400">未找到报告，请先完成一次面试。</p>
          <Button className="mt-4" onClick={() => router.push('/')}>
            返回首页
          </Button>
        </Card>
      </div>
    );
  }

  return <ReportPage report={report} />;
}
