# Architecture

- Frontend pages: `/`, `/room`, `/report/[id]`, `/history`, `/settings`
- API routes: `/api/chat`, `/api/evaluate`, `/api/report`
- State: Zustand stores
- Prompt Engine: `src/lib/prompts/*`
- LLM Adapter: `src/lib/llm/providers.ts`
