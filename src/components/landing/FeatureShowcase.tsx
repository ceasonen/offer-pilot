import { Card } from '@/components/ui/card';

const FEATURES = [
  {
    title: '公司风格差异化',
    content: '每家公司的提问重点、追问习惯和表达风格独立建模。',
  },
  {
    title: '多轮追问机制',
    content: 'AI 会根据你的回答质量继续深挖，不是固定问答脚本。',
  },
  {
    title: '结构化评分报告',
    content: '从正确性、深度、表达和实战性生成可执行改进方案。',
  },
];

export function FeatureShowcase() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title}>
          <h3 className="text-base font-semibold text-slate-100">{feature.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{feature.content}</p>
        </Card>
      ))}
    </section>
  );
}
