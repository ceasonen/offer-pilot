'use client';

import { useMemo } from 'react';
import { useInterviewStore } from '@/store/interview-store';

export function useInterview() {
  const state = useInterviewStore();

  return useMemo(
    () => ({
      config: state.config,
      messages: state.messages,
      isActive: state.isActive,
      startedAt: state.startedAt,
      evaluations: state.evaluations,
      currentPhase: state.currentPhase,
      report: state.report,
      startInterview: state.startInterview,
      endInterview: state.endInterview,
      addMessage: state.addMessage,
      addEvaluation: state.addEvaluation,
      setConfig: state.setConfig,
      setReport: state.setReport,
      reset: state.reset,
    }),
    [state],
  );
}
