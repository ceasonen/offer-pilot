import { InterviewReport } from '@/types/interview';

export interface ReportListItem {
  id: string;
  createdAt: number;
  companyName: string;
  roleName: string;
  overallScore: number;
  result: InterviewReport['result'];
}

export type ResultBadge = {
  label: string;
  tone: 'green' | 'blue' | 'amber' | 'red';
};
