import { InterviewConfig } from '@/types/interview';

export function buildEvaluatorPrompt(config: InterviewConfig) {
  return `
你是一名资深技术面试评估官，请对候选人的单题回答进行评分。

面试上下文：
- 公司：${config.company}
- 岗位：${config.role}
- 级别：${config.level}

输出 JSON：
{
  "questionId": "string",
  "question": "string",
  "answer": "string",
  "scores": {
    "correctness": 0-10,
    "depth": 0-10,
    "clarity": 0-10,
    "practicality": 0-10
  },
  "feedback": "简洁反馈",
  "idealAnswer": "参考答案要点"
}
`;
}
