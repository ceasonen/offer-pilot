'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureShowcase } from '@/components/landing/FeatureShowcase';
import { DemoPreview } from '@/components/landing/DemoPreview';
import { CompanySelector } from '@/components/setup/CompanySelector';
import { RoleSelector } from '@/components/setup/RoleSelector';
import { LevelSelector } from '@/components/setup/LevelSelector';
import { RoundSelector } from '@/components/setup/RoundSelector';
import { ResumeUpload } from '@/components/setup/ResumeUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModelSelector } from '@/components/common/ModelSelector';
import { ApiKeyInput } from '@/components/common/ApiKeyInput';
import { useConfigStore } from '@/store/config-store';
import { useInterviewStore } from '@/store/interview-store';
import { Company, InterviewConfig, InterviewRound, Level, Role } from '@/types/interview';
import { setStoredConfig } from '@/lib/utils/storage';

type SetupState = {
  company?: Company;
  role?: Role;
  level?: Level;
  round: InterviewRound;
  duration: number;
  resumeText: string;
};

export default function HomePage() {
  const router = useRouter();
  const hydrateConfig = useConfigStore((s) => s.hydrate);
  const setConfig = useInterviewStore((s) => s.setConfig);
  const startInterview = useInterviewStore((s) => s.startInterview);

  const [setup, setSetup] = useState<SetupState>({
    round: 'first',
    duration: 45,
    resumeText: '',
  });

  useEffect(() => {
    hydrateConfig();
  }, [hydrateConfig]);

  const canStart = useMemo(
    () => Boolean(setup.company && setup.role && setup.level),
    [setup.company, setup.level, setup.role],
  );

  const handleStart = () => {
    if (!setup.company || !setup.role || !setup.level) return;
    const nextConfig: InterviewConfig = {
      company: setup.company,
      role: setup.role,
      level: setup.level,
      round: setup.round,
      duration: setup.duration,
      language: 'zh',
      resumeText: setup.resumeText.trim() || undefined,
    };

    setConfig(nextConfig);
    setStoredConfig(nextConfig);
    startInterview();
    router.push('/room');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-8">
      <HeroSection />

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-100">1. 选择目标公司</h2>
            <p className="mt-1 text-sm text-slate-400">不同公司有不同提问风格与技术偏好。</p>
            <div className="mt-4">
              <CompanySelector
                value={setup.company}
                onChange={(company) => setSetup((prev) => ({ ...prev, company }))}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-100">2. 选择岗位与级别</h2>
            <div className="mt-4 space-y-5">
              <RoleSelector
                value={setup.role}
                onChange={(role) => setSetup((prev) => ({ ...prev, role }))}
              />
              <LevelSelector
                value={setup.level}
                onChange={(level) => setSetup((prev) => ({ ...prev, level }))}
              />
              <RoundSelector
                value={setup.round}
                onChange={(round) => setSetup((prev) => ({ ...prev, round }))}
              />
            </div>
          </Card>

          <ResumeUpload
            value={setup.resumeText}
            onChange={(resumeText) => setSetup((prev) => ({ ...prev, resumeText }))}
          />

          <div className="flex justify-end">
            <Button size="lg" disabled={!canStart} onClick={handleStart}>
              开始面试
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-base font-semibold text-slate-100">模型与 Key</h3>
            <ModelSelector />
            <ApiKeyInput />
            <p className="text-xs text-slate-500">API Key 仅保存在浏览器本地，不上传到服务器数据库。</p>
          </Card>
          <DemoPreview />
        </div>
      </section>

      <FeatureShowcase />
    </div>
  );
}
