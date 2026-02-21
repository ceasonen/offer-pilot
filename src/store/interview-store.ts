import { create } from 'zustand';
import { InterviewConfig, InterviewMessage, InterviewPhase, InterviewReport, QuestionEvaluation } from '@/types/interview';

interface InterviewState {
  config: InterviewConfig | null;
  setConfig: (config: InterviewConfig) => void;

  isActive: boolean;
  currentPhase: InterviewPhase;
  messages: InterviewMessage[];
  evaluations: QuestionEvaluation[];
  isAiThinking: boolean;
  startedAt: number | null;

  startInterview: () => void;
  addMessage: (message: InterviewMessage) => void;
  addEvaluation: (evaluation: QuestionEvaluation) => void;
  setPhase: (phase: InterviewPhase) => void;
  setAiThinking: (thinking: boolean) => void;
  endInterview: () => void;

  report: InterviewReport | null;
  setReport: (report: InterviewReport) => void;

  reset: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),

  isActive: false,
  currentPhase: 'greeting',
  messages: [],
  evaluations: [],
  isAiThinking: false,
  startedAt: null,

  startInterview: () =>
    set({
      isActive: true,
      currentPhase: 'greeting',
      messages: [],
      evaluations: [],
      startedAt: Date.now(),
      report: null,
    }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  addEvaluation: (evaluation) => set((state) => ({ evaluations: [...state.evaluations, evaluation] })),
  setPhase: (phase) => set({ currentPhase: phase }),
  setAiThinking: (thinking) => set({ isAiThinking: thinking }),
  endInterview: () => set({ isActive: false, currentPhase: 'ending' }),

  report: null,
  setReport: (report) => set({ report }),

  reset: () =>
    set({
      config: null,
      isActive: false,
      currentPhase: 'greeting',
      messages: [],
      evaluations: [],
      isAiThinking: false,
      startedAt: null,
      report: null,
    }),
}));
