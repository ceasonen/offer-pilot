import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.14),transparent_35%),#070d1d] px-8 py-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-sm uppercase tracking-[0.22em] text-cyan-300"
      >
        OfferPilot
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-100 md:text-5xl"
      >
        AI 大厂面试官，完整模拟字节 / 阿里 / 腾讯 / 美团真实技术面试
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
        className="mt-5 max-w-2xl text-base text-slate-300"
      >
        输入岗位配置后直接开面。AI 会持续追问、实时打分，并生成结构化面试报告和改进计划。
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-3"
      >
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">1. 选择公司与岗位</div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">2. 进入实时多轮面试</div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">3. 获取可执行改进报告</div>
      </motion.div>
    </section>
  );
}
