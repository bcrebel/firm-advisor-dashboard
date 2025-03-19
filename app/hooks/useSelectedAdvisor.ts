'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAdvisorsWithAccounts } from './useAdvisorsWithAccounts';
import type { Advisor } from '../types/account';

export function useSelectedAdvisor() {
  const { data: advisors } = useAdvisorsWithAccounts();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedAdvisorId = searchParams.get('advisorId');

  // Auto-select first advisor on initial load
  useEffect(() => {
    if (advisors && advisors.length > 0 && !selectedAdvisorId) {
      router.replace(`?advisorId=${advisors[0].id}`, { scroll: false });
    }
  }, [advisors, selectedAdvisorId, router]);

  const setSelectedAdvisor = (advisorId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('advisorId', advisorId);
    // Clear the account selection when changing advisors
    params.delete('accountNumber');
    router.push(`?${params.toString()}`);
  };

  const selectedAdvisor = advisors?.find(advisor => advisor.id === selectedAdvisorId);

  return {
    selectedAdvisorId: selectedAdvisorId || undefined,
    selectedAdvisor,
    setSelectedAdvisor,
    advisors: advisors || [],
  };
}
