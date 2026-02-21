'use client';

import { COMPANY_LIST } from '@/types/company';
import { Company } from '@/types/interview';
import { cn } from '@/lib/utils';

interface CompanyCardsProps {
  selected?: Company;
  onSelect: (company: Company) => void;
}

export function CompanyCards({ selected, onSelect }: CompanyCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {COMPANY_LIST.map((company) => (
        <button
          key={company.id}
          className={cn(
            'rounded-2xl border p-4 text-left transition',
            selected === company.id
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-800 bg-slate-900/60 hover:border-slate-600',
          )}
          onClick={() => onSelect(company.id)}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{company.logo}</span>
            <span className="text-xs text-slate-400">{company.nameEn}</span>
          </div>
          <h3 className="mt-3 text-lg font-medium text-slate-100">{company.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{company.interviewStyle}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {company.techStack.slice(0, 3).map((item) => (
              <span key={item} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
