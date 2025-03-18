'use client'
import DataTable, { SortDirection } from './Table';
import { useAdvisorsWithAccounts } from '../hooks/useAdvisorsWithAccounts';
import type { Advisor } from '../hooks/useAdvisorsWithAccounts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const advisorColumns = [
    { label: 'Name', key: 'name', renderCell: (advisor: Advisor) => advisor.name, sortingFn: (a: Advisor, b: Advisor, sortDirection: SortDirection) => sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name) },
    { label: 'Total Accounts', key: 'accounts', renderCell: (advisor: Advisor) => <div className="text-right">{advisor.accounts?.length || 0}</div>, 
      sortingFn: (a: Advisor, b: Advisor, sortDirection: SortDirection) => {
        const aCount = a.accounts?.length || 0;
        const bCount = b.accounts?.length || 0;
        return sortDirection === 'asc' ? aCount - bCount : bCount - aCount;
      }
    },
];

export default function AdvisorTable() {
    const { data, error, isLoading } = useAdvisorsWithAccounts();
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('advisorId') || undefined;

    // Auto-select first advisor on initial load
    useEffect(() => {
        if (data && data.length > 0 && !selectedId) {
            router.replace(`?advisorId=${data[0].id}`, { scroll: false });
        }
    }, [data, selectedId, router]);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    
    const handleRowClick = (advisor: Advisor) => {
        router.push(`?advisorId=${advisor.id}`);
    };

    return (
        <DataTable 
            entries={data || []} 
            columns={advisorColumns} 
            onRowClick={handleRowClick}
            selectedId={selectedId}
            headerTextSize="xxs"
        />
    );
}
