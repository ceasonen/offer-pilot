interface FollowUpInput {
  candidateAnswer: string;
  depth: number;
}

export function shouldFollowUp({ candidateAnswer, depth }: FollowUpInput) {
  const text = candidateAnswer.trim();
  if (!text) return true;
  if (depth >= 2) return false;
  return text.length < 120 || !/[。；;.!?]/.test(text);
}

export function getFollowUpHint(depth: number) {
  if (depth === 0) return '请补充你方案里的关键权衡。';
  if (depth === 1) return '如果线上流量翻倍，你会怎么调整？';
  return '请总结这个方案最大的风险点。';
}
