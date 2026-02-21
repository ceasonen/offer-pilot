import { Card } from '@/components/ui/card';

export function DemoPreview() {
  return (
    <Card className="mt-6 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40">
      <p className="text-sm text-slate-300">面试片段预览</p>
      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-xl bg-slate-800/70 p-3 text-slate-200">
          面试官：你在最近项目里做过一次性能优化吗？请给出数据前后对比。
        </div>
        <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-100">
          候选人：我们把首页首屏 JS 从 890KB 降到 420KB，LCP 从 3.8s 优化到 2.1s。
        </div>
        <div className="rounded-xl bg-slate-800/70 p-3 text-slate-200">
          面试官追问：如果流量翻倍，当前缓存策略会遇到什么瓶颈？
        </div>
      </div>
    </Card>
  );
}
