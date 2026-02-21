import { InterviewReport, QuestionEvaluation } from '@/types/interview';
import { clampScore } from '@/lib/utils';

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, item) => sum + item, 0) / values.length;
}

export function calcOverallScores(evaluations: QuestionEvaluation[]): InterviewReport['overallScores'] {
  const correctness = average(evaluations.map((item) => item.scores.correctness));
  const depth = average(evaluations.map((item) => item.scores.depth));
  const clarity = average(evaluations.map((item) => item.scores.clarity));
  const practicality = average(evaluations.map((item) => item.scores.practicality));

  return {
    technicalDepth: clampScore((correctness + depth) / 2),
    problemSolving: clampScore((depth + practicality) / 2),
    codingAbility: clampScore((correctness + practicality) / 2),
    communication: clampScore(clarity),
    systemThinking: clampScore((depth + practicality) / 2),
    learningPotential: clampScore((clarity + depth) / 2),
  };
}

export function calcOverallScore(scores: InterviewReport['overallScores']) {
  const values = Object.values(scores);
  return clampScore(average(values));
}

export function deriveResult(score: number): InterviewReport['result'] {
  if (score >= 8.5) return 'strong_hire';
  if (score >= 7) return 'hire';
  if (score >= 5.5) return 'weak_hire';
  return 'no_hire';
}
