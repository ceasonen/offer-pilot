import { InterviewConfig } from '@/types/interview';
import { BASE_SYSTEM_PROMPT } from '@/lib/prompts/system';
import { bytedancePrompt } from '@/lib/prompts/companies/bytedance';
import { alibabaPrompt } from '@/lib/prompts/companies/alibaba';
import { tencentPrompt } from '@/lib/prompts/companies/tencent';
import { meituanPrompt } from '@/lib/prompts/companies/meituan';
import { xiaohongshuPrompt } from '@/lib/prompts/companies/xiaohongshu';
import { pddPrompt } from '@/lib/prompts/companies/pdd';

const COMPANY_PROMPTS = {
  bytedance: bytedancePrompt,
  alibaba: alibabaPrompt,
  tencent: tencentPrompt,
  meituan: meituanPrompt,
  xiaohongshu: xiaohongshuPrompt,
  pdd: pddPrompt,
};

export function buildInterviewerPrompt(config: InterviewConfig) {
  return `${BASE_SYSTEM_PROMPT}

公司画像：\n${COMPANY_PROMPTS[config.company]}

面试配置：
- 岗位：${config.role}
- 级别：${config.level}
- 轮次：${config.round}
- 时长：${config.duration} 分钟

流程要求：
1. 先开场寒暄并请候选人做 60 秒自我介绍。
2. 然后进入项目深挖，至少追问 2 轮。
3. 再进行技术问答，优先问岗位核心题。
4. 如果候选人是算法岗，插入一道手写代码题。
5. 临近结束时开放反问环节，并礼貌收尾。

输出格式：
- 只输出“面试官要说的话”，不要输出额外说明。
- 每次回复控制在 80~180 字。
`;
}
