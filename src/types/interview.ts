export type Company =
  | 'bytedance'
  | 'alibaba'
  | 'tencent'
  | 'meituan'
  | 'xiaohongshu'
  | 'pdd';

export type Role = 'frontend' | 'backend' | 'fullstack' | 'algorithm' | 'mobile';

export type Level = 'junior' | 'mid' | 'senior' | 'expert';

export type InterviewRound = 'first' | 'second' | 'third' | 'hr';

export type InterviewPhase =
  | 'greeting'
  | 'self-intro'
  | 'project-deep'
  | 'tech-questions'
  | 'coding'
  | 'system-design'
  | 'behavioral'
  | 'reverse-qa'
  | 'ending';

export interface InterviewConfig {
  company: Company;
  role: Role;
  level: Level;
  round: InterviewRound;
  duration: number;
  language: 'zh' | 'en';
  resumeText?: string;
}

export interface InterviewMessage {
  id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: number;
  phase: InterviewPhase;
  metadata?: {
    questionId?: string;
    followUpDepth?: number;
    difficulty?: number;
  };
}

export interface QuestionEvaluation {
  questionId: string;
  question: string;
  answer: string;
  scores: {
    correctness: number;
    depth: number;
    clarity: number;
    practicality: number;
  };
  feedback: string;
  idealAnswer: string;
}

export interface InterviewReport {
  id: string;
  config: InterviewConfig;
  startTime: number;
  endTime: number;
  totalDuration: number;
  messages: InterviewMessage[];
  evaluations: QuestionEvaluation[];
  overallScores: {
    technicalDepth: number;
    problemSolving: number;
    codingAbility: number;
    communication: number;
    systemThinking: number;
    learningPotential: number;
  };
  overallScore: number;
  result: 'strong_hire' | 'hire' | 'weak_hire' | 'no_hire';
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  studyResources: string[];
  interviewerComment: string;
}

export interface CompanyRoundPreference {
  round: InterviewRound;
  focus: string;
  duration: number;
}

export interface CompanyProfile {
  id: Company;
  name: string;
  nameEn: string;
  logo: string;
  color: string;
  interviewStyle: string;
  techStack: string[];
  cultureKeywords: string[];
  rounds: CompanyRoundPreference[];
}
