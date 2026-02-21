import { Company, InterviewConfig, InterviewMessage, InterviewReport, QuestionEvaluation, Role } from '@/types/interview';
import { calcOverallScore, calcOverallScores, deriveResult } from '@/lib/utils/score';
import { uid } from '@/lib/utils';

const COMPANY_NAME_MAP: Record<Company, string> = {
  bytedance: '字节跳动',
  alibaba: '阿里巴巴',
  tencent: '腾讯',
  meituan: '美团',
  xiaohongshu: '小红书',
  pdd: '拼多多',
};

const ROLE_NAME_MAP: Record<Role, string> = {
  frontend: '前端开发',
  backend: '后端开发',
  fullstack: '全栈开发',
  algorithm: '算法工程师',
  mobile: '移动端开发',
};

export function getCompanyName(company: Company) {
  return COMPANY_NAME_MAP[company] ?? company;
}

export function getRoleName(role: Role) {
  return ROLE_NAME_MAP[role] ?? role;
}

export function buildFallbackReport(input: {
  config: InterviewConfig;
  messages: InterviewMessage[];
  evaluations: QuestionEvaluation[];
  startTime: number;
  endTime?: number;
}): InterviewReport {
  const overallScores = calcOverallScores(input.evaluations);
  const overallScore = calcOverallScore(overallScores);
  const result = deriveResult(overallScore);
  const endTime = input.endTime ?? Date.now();

  return {
    id: uid('report'),
    config: input.config,
    startTime: input.startTime,
    endTime,
    totalDuration: Math.round((endTime - input.startTime) / 1000),
    messages: input.messages,
    evaluations: input.evaluations,
    overallScores,
    overallScore,
    result,
    strengths: [
      `在 ${getRoleName(input.config.role)} 相关知识上表现稳定`,
      '回答结构清晰，能完整表达思路',
    ],
    weaknesses: ['追问深度不够，建议补充更多边界条件和取舍分析'],
    improvements: [
      '每道题按“结论 -> 原理 -> 落地 -> 风险”四段回答',
      '对项目中的关键数据与指标准备可量化结果',
    ],
    studyResources: [
      `${getCompanyName(input.config.company)} 近一年常见面经整理`,
      '系统设计面试: 高频场景拆解',
      'LeetCode Hot 100 + 复杂度分析模板',
    ],
    interviewerComment:
      '整体具备面试通过潜力。建议在系统化表达和项目深挖细节上再提升一个层级。',
  };
}
