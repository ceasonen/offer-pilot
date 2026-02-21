import { InterviewConfig, InterviewReport } from '@/types/interview';

const KEYS = {
  apiKey: 'offer-pilot:api-key',
  provider: 'offer-pilot:provider',
  config: 'offer-pilot:config',
  history: 'offer-pilot:history',
  activeReport: 'offer-pilot:active-report',
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredApiKey() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(KEYS.apiKey) ?? '';
}

export function setStoredApiKey(apiKey: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.apiKey, apiKey.trim());
}

export function getStoredProvider() {
  if (typeof window === 'undefined') return 'deepseek';
  return localStorage.getItem(KEYS.provider) ?? 'deepseek';
}

export function setStoredProvider(provider: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.provider, provider);
}

export function getStoredConfig() {
  return safeGet<InterviewConfig | null>(KEYS.config, null);
}

export function setStoredConfig(config: InterviewConfig | null) {
  if (!config) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.config);
    }
    return;
  }
  safeSet(KEYS.config, config);
}

export function getStoredReports() {
  return safeGet<InterviewReport[]>(KEYS.history, []);
}

export function setStoredReports(reports: InterviewReport[]) {
  safeSet(KEYS.history, reports);
}

export function upsertReport(report: InterviewReport) {
  const reports = getStoredReports();
  const next = [report, ...reports.filter((item) => item.id !== report.id)].slice(0, 50);
  setStoredReports(next);
  safeSet(KEYS.activeReport, report);
}

export function getActiveReport() {
  return safeGet<InterviewReport | null>(KEYS.activeReport, null);
}

export function setActiveReport(report: InterviewReport | null) {
  if (!report) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.activeReport);
    }
    return;
  }
  safeSet(KEYS.activeReport, report);
}

export const STORAGE_KEYS = KEYS;
