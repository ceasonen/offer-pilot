'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { InterviewReport } from '@/types/interview';

interface ScoreRadarProps {
  scores: InterviewReport['overallScores'];
}

export function ScoreRadar({ scores }: ScoreRadarProps) {
  const data = [
    { subject: '技术深度', value: scores.technicalDepth },
    { subject: '问题解决', value: scores.problemSolving },
    { subject: '编码能力', value: scores.codingAbility },
    { subject: '沟通表达', value: scores.communication },
    { subject: '系统思维', value: scores.systemThinking },
    { subject: '学习潜力', value: scores.learningPotential },
  ];

  return (
    <div className="h-[320px] rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="mb-2 text-sm font-medium text-slate-100">能力雷达图</p>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 10]} tick={{ fill: '#64748b', fontSize: 11 }} />
          <Radar dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
