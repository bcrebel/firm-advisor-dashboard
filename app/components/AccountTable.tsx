'use client'
import DataTable, { SortDirection } from './Table';
import { useAdvisorsWithAccounts } from '../hooks/useAdvisorsWithAccounts';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const accountColumns = [
    { 
        label: 'Account Name', 
        key: 'name', 
        renderCell: (account: any) => account.name,
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    },
    { 
        label: 'Account Number', 
        key: 'number', 
        renderCell: (account: any) => account.number,
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.number.localeCompare(b.number) : b.number.localeCompare(a.number)
    },
    { 
        label: 'Custodian', 
        key: 'custodian', 
        renderCell: (account: any) => account.custodian,
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.custodian.localeCompare(b.custodian) : b.custodian.localeCompare(a.custodian)
    },
    {
        label: 'Total Holdings Value',
        key: 'holdingsValue',
        renderCell: (account: any) => {
            const total = account.holdings?.reduce((sum: number, holding: any) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
            }).format(total);
        },
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
            const aTotal = a.holdings?.reduce((sum: number, holding: any) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            const bTotal = b.holdings?.reduce((sum: number, holding: any) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            return sortDirection === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        }
    }
];

export default function AccountTable() {
    const { data } = useAdvisorsWithAccounts();
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedAdvisorId = searchParams.get('advisorId');
    const selectedAccountNumber = searchParams.get('accountNumber') || undefined;

    useEffect(() => {
        if (!selectedAdvisorId || !data) return;
        
        const selectedAdvisor = data.find(advisor => advisor.id === selectedAdvisorId);
        if (!selectedAdvisor) return;

        const accounts = selectedAdvisor.accounts || [];
        if (accounts.length > 0 && !selectedAccountNumber) {
            const params = new URLSearchParams(searchParams);
            params.set('advisorId', selectedAdvisorId);
            params.set('accountNumber', accounts[0].number);
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [selectedAdvisorId, selectedAccountNumber, data, router, searchParams]);

    if (!selectedAdvisorId) {
        return <div className="text-gray-500 italic">Select an advisor to view their accounts</div>;
    }

    const selectedAdvisor = data?.find(advisor => advisor.id === selectedAdvisorId);
    if (!selectedAdvisor) {
        return <div className="text-red-500">Advisor not found</div>;
    }

    const accounts = selectedAdvisor.accounts || [];
    if (accounts.length === 0) {
        return <div className="text-gray-500 italic">No accounts found for this advisor</div>;
    }

    // Add an id field to each account for the DataTable component
    const accountsWithIds = accounts.map(account => ({
        ...account,
        id: account.number // Using account number as the unique identifier
    }));

    const handleRowClick = (account: any) => {
        const params = new URLSearchParams(searchParams);
        params.set('advisorId', selectedAdvisorId);
        params.set('accountNumber', account.number);
        router.push(`?${params.toString()}`);
    };

    const handleRowHover = (account: any) => {
        // Only update hover state if no account is currently selected
        if (!selectedAccountNumber) {
            const params = new URLSearchParams(searchParams);
            params.set('advisorId', selectedAdvisorId);
            params.set('accountNumber', account.number);
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Accounts for {selectedAdvisor.name}</h2>
            <DataTable 
                entries={accountsWithIds}
                columns={accountColumns}
                onRowClick={handleRowClick}
                onRowHover={handleRowHover}
                selectedId={selectedAccountNumber}
            />
        </div>
    );
} 