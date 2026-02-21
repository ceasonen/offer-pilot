'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHistoryStore } from '@/store/history-store';
import { getCompanyName, getRoleName } from '@/lib/utils/report-gen';
import { RESULT_LABEL_MAP } from '@/lib/constants';

export default function HistoryPage() {
  const reports = useHistoryStore((s) => s.reports);
  const hydrate = useHistoryStore((s) => s.hydrate);
  const clearReports = useHistoryStore((s) => s.clearReports);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100">历史记录</h1>
        <Button variant="secondary" size="sm" onClick={clearReports}>
          清空记录
        </Button>
      </div>

      {reports.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">暂无面试记录，先去开始一场模拟面试。</p>
          <Link href="/" className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200">
            前往面试大厅
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-100">
                  {getCompanyName(report.config.company)} · {getRoleName(report.config.role)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(report.endTime).toLocaleString('zh-CN')} · {RESULT_LABEL_MAP[report.result]}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-cyan-300">{report.overallScore.toFixed(1)}</p>
                <Link href={`/report/${report.id}`} className="text-xs text-slate-300 hover:text-slate-100">
                  查看报告
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
