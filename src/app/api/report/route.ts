import { generateObject } from 'ai';
import { z } from 'zod';
import { createLLMProvider } from '@/lib/llm/providers';
import { buildReporterPrompt } from '@/lib/prompts/reporter';
import { buildFallbackReport } from '@/lib/utils/report-gen';
import { clampScore } from '@/lib/utils';
import { InterviewConfig, InterviewMessage, InterviewReport, QuestionEvaluation } from '@/types/interview';
import { ProviderConfig } from '@/types/llm';

export const runtime = 'nodejs';

interface ReportRequestBody {
  config: InterviewConfig;
  messages: InterviewMessage[];
  evaluations: QuestionEvaluation[];
  startTime?: number;
  providerConfig: ProviderConfig;
}

const reportSchema = z.object({
  overallScores: z.object({
    technicalDepth: z.number(),
    problemSolving: z.number(),
    codingAbility: z.number(),
    communication: z.number(),
    systemThinking: z.number(),
    learningPotential: z.number(),
  }),
  overallScore: z.number(),
  result: z.enum(['strong_hire', 'hire', 'weak_hire', 'no_hire']),
  strengths: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()).min(1),
  improvements: z.array(z.string()).min(1),
  studyResources: z.array(z.string()).min(1),
  interviewerComment: z.string(),
});

export async function POST(req: Request) {
  try {
    const { config, messages, evaluations, startTime, providerConfig } = (await req.json()) as ReportRequestBody;

    if (!config) {
      return Response.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const fallback = buildFallbackReport({
      config,
      messages: messages ?? [],
      evaluations: evaluations ?? [],
      startTime: startTime ?? Date.now(),
      endTime: Date.now(),
    });

    if (!providerConfig?.apiKey && providerConfig?.provider !== 'ollama') {
      return Response.json({ report: fallback });
    }

    const { model } = createLLMProvider(providerConfig);
    const system = buildReporterPrompt(config);

    const result = await generateObject({
      model,
      schema: reportSchema,
      system,
      prompt: `
面试消息（节选）：
${JSON.stringify(messages?.slice(-20) ?? [], null, 2)}

逐题评分：
${JSON.stringify(evaluations ?? [], null, 2)}
`,
      temperature: 0.25,
      maxOutputTokens: 1300,
    });

    const merged: InterviewReport = {
      ...fallback,
      overallScores: {
        technicalDepth: clampScore(result.object.overallScores.technicalDepth),
        problemSolving: clampScore(result.object.overallScores.problemSolving),
        codingAbility: clampScore(result.object.overallScores.codingAbility),
        communication: clampScore(result.object.overallScores.communication),
        systemThinking: clampScore(result.object.overallScores.systemThinking),
        learningPotential: clampScore(result.object.overallScores.learningPotential),
      },
      overallScore: clampScore(result.object.overallScore),
      result: result.object.result,
      strengths: result.object.strengths,
      weaknesses: result.object.weaknesses,
      improvements: result.object.improvements,
      studyResources: result.object.studyResources,
      interviewerComment: result.object.interviewerComment,
      endTime: Date.now(),
      totalDuration: Math.round((Date.now() - (startTime ?? fallback.startTime)) / 1000),
    };

    return Response.json({ report: merged });
  } catch {
    return Response.json({ error: 'Report generation failed.' }, { status: 500 });
  }
}
