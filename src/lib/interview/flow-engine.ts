import { InterviewMessage, InterviewPhase, Role } from '@/types/interview';

const PHASE_ORDER: InterviewPhase[] = [
  'greeting',
  'self-intro',
  'project-deep',
  'tech-questions',
  'coding',
  'system-design',
  'behavioral',
  'reverse-qa',
  'ending',
];

function shouldSkipCoding(role: Role) {
  return role !== 'algorithm';
}

export function getNextPhase(currentPhase: InterviewPhase, role: Role): InterviewPhase {
  const idx = PHASE_ORDER.indexOf(currentPhase);
  if (idx === -1 || idx === PHASE_ORDER.length - 1) return 'ending';

  let next = PHASE_ORDER[idx + 1];
  if (next === 'coding' && shouldSkipCoding(role)) {
    next = PHASE_ORDER[idx + 2] ?? 'ending';
  }

  return next;
}

export function inferPhaseFromMessages(messages: InterviewMessage[]): InterviewPhase {
  if (messages.length <= 2) return 'self-intro';
  if (messages.length <= 6) return 'project-deep';
  if (messages.length <= 12) return 'tech-questions';
  if (messages.length <= 18) return 'system-design';
  if (messages.length <= 24) return 'behavioral';
  if (messages.length <= 28) return 'reverse-qa';
  return 'ending';
}
