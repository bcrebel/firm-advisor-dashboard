'use client'
import DataTable, { SortDirection } from './Table';
import { useAdvisorsWithAccounts } from '../hooks/useAdvisorsWithAccounts';
import type { Advisor } from '../hooks/useAdvisorsWithAccounts';
import { useRouter, useSearchParams } from 'next/navigation';

const advisorColumns = [
    { label: 'Name', key: 'name', renderCell: (advisor: Advisor) => advisor.name, sortingFn: (a: Advisor, b: Advisor, sortDirection: SortDirection) => sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name) },
    { label: 'Number of Accounts', key: 'accounts', renderCell: (advisor: Advisor) => advisor.accounts?.length || 0, 
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

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    
    const handleRowClick = (advisor: Advisor) => {
        router.push(`?advisorId=${advisor.id}`);
    };

    return (
        <DataTable 
            entries={data} 
            columns={advisorColumns} 
            onRowClick={handleRowClick}
            selectedId={selectedId}
        />
    );
}
