import { generateObject } from 'ai';
import { z } from 'zod';
import { createLLMProvider } from '@/lib/llm/providers';
import { buildEvaluatorPrompt } from '@/lib/prompts/evaluator';
import { clampScore, uid } from '@/lib/utils';
import { InterviewConfig, QuestionEvaluation } from '@/types/interview';
import { ProviderConfig } from '@/types/llm';

export const runtime = 'nodejs';

interface EvaluateRequestBody {
  question: string;
  answer: string;
  config: InterviewConfig;
  providerConfig: ProviderConfig;
}

const evaluationSchema = z.object({
  scores: z.object({
    correctness: z.number(),
    depth: z.number(),
    clarity: z.number(),
    practicality: z.number(),
  }),
  feedback: z.string(),
  idealAnswer: z.string(),
});

function fallbackEvaluation(question: string, answer: string): QuestionEvaluation {
  return {
    questionId: uid('q'),
    question,
    answer,
    scores: {
      correctness: 7,
      depth: 6.5,
      clarity: answer.length > 40 ? 7.5 : 6,
      practicality: 6.5,
    },
    feedback: '回答结构基本完整。建议补充边界条件与线上落地细节。',
    idealAnswer: '先给结论，再讲原理、取舍、风险和监控指标。',
  };
}

export async function POST(req: Request) {
  try {
    const { question, answer, config, providerConfig } = (await req.json()) as EvaluateRequestBody;

    if (!question || !answer || !config) {
      return Response.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    if (!providerConfig?.apiKey && providerConfig?.provider !== 'ollama') {
      return Response.json({ evaluation: fallbackEvaluation(question, answer) });
    }

    const { model } = createLLMProvider(providerConfig);
    const system = buildEvaluatorPrompt(config);

    const result = await generateObject({
      model,
      schema: evaluationSchema,
      system,
      prompt: `问题：${question}\n候选人回答：${answer}`,
      temperature: 0.3,
      maxOutputTokens: 700,
    });

    const evaluation: QuestionEvaluation = {
      questionId: uid('q'),
      question,
      answer,
      scores: {
        correctness: clampScore(result.object.scores.correctness),
        depth: clampScore(result.object.scores.depth),
        clarity: clampScore(result.object.scores.clarity),
        practicality: clampScore(result.object.scores.practicality),
      },
      feedback: result.object.feedback,
      idealAnswer: result.object.idealAnswer,
    };

    return Response.json({ evaluation });
  } catch {
    return Response.json({ error: 'Evaluate failed.' }, { status: 500 });
  }
}
