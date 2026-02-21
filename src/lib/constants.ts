import { InterviewRound, Level, Role } from '@/types/interview';

export const ROLE_OPTIONS: { value: Role; label: string; description: string }[] = [
  { value: 'frontend', label: '前端开发', description: 'React/Vue、工程化、性能优化' },
  { value: 'backend', label: '后端开发', description: 'Java/Go、数据库、分布式系统' },
  { value: 'fullstack', label: '全栈开发', description: '前后端协同与交付能力' },
  { value: 'algorithm', label: '算法工程师', description: '数据结构、算法设计、复杂度分析' },
  { value: 'mobile', label: '移动端开发', description: 'iOS/Android、跨端技术与体验' },
];

export const LEVEL_OPTIONS: { value: Level; label: string; description: string }[] = [
  { value: 'junior', label: '初级', description: '1 年以内，基础能力为主' },
  { value: 'mid', label: '中级', description: '1-3 年，独立完成模块交付' },
  { value: 'senior', label: '高级', description: '3-5 年，能主导复杂功能' },
  { value: 'expert', label: '专家', description: '5 年以上，系统与团队影响力' },
];

export const ROUND_OPTIONS: { value: InterviewRound; label: string; description: string }[] = [
  { value: 'first', label: '一面', description: '基础 + 项目深挖' },
  { value: 'second', label: '二面', description: '系统设计 + 追问' },
  { value: 'third', label: '三面', description: '综合能力评估' },
  { value: 'hr', label: 'HR 面', description: '文化匹配 + 职业规划' },
];

export const RESULT_LABEL_MAP = {
  strong_hire: '强烈建议录用',
  hire: '建议录用',
  weak_hire: '保留录用',
  no_hire: '暂不录用',
} as const;
