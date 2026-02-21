'use client';

import { Company } from '@/types/interview';
import { CompanyCards } from '@/components/landing/CompanyCards';

interface CompanySelectorProps {
  value?: Company;
  onChange: (company: Company) => void;
}

export function CompanySelector({ value, onChange }: CompanySelectorProps) {
  return <CompanyCards selected={value} onSelect={onChange} />;
}
