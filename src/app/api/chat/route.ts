import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createLLMProvider } from '@/lib/llm/providers';
import { buildInterviewerPrompt } from '@/lib/prompts/interviewer';
import { InterviewConfig } from '@/types/interview';
import { ProviderConfig } from '@/types/llm';

export const runtime = 'edge';

interface ChatRequestBody {
  messages: UIMessage[];
  config: InterviewConfig;
  providerConfig: ProviderConfig;
}

export async function POST(req: Request) {
  try {
    const { messages, config, providerConfig } = (await req.json()) as ChatRequestBody;

    if (!config || !providerConfig?.provider) {
      return Response.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    if (!providerConfig.apiKey && providerConfig.provider !== 'ollama') {
      return Response.json({ error: 'Missing API key. Please set API key first.' }, { status: 400 });
    }

    const { model } = createLLMProvider(providerConfig);
    const systemPrompt = buildInterviewerPrompt(config);

    const result = await streamText({
      model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 900,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to process chat request.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
