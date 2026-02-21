import { create } from 'zustand';
import { InterviewReport } from '@/types/interview';
import { getStoredReports, setStoredReports } from '@/lib/utils/storage';

interface HistoryState {
  reports: InterviewReport[];
  hydrate: () => void;
  addReport: (report: InterviewReport) => void;
  removeReport: (reportId: string) => void;
  clearReports: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  reports: [],
  hydrate: () => set({ reports: getStoredReports() }),
  addReport: (report) => {
    const next = [report, ...get().reports.filter((item) => item.id !== report.id)].slice(0, 50);
    set({ reports: next });
    setStoredReports(next);
  },
  removeReport: (reportId) => {
    const next = get().reports.filter((item) => item.id !== reportId);
    set({ reports: next });
    setStoredReports(next);
  },
  clearReports: () => {
    set({ reports: [] });
    setStoredReports([]);
  },
}));
