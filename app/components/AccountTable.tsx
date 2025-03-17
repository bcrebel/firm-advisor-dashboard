'use client'
import DataTable, { SortDirection } from './Table';
import { useSelectedAdvisor } from '../hooks/useSelectedAdvisor';
import { useSelectedAccount } from '../hooks/useSelectedAccount';
import type { Account } from '../types/account';

const accountColumns = [
    { 
        label: 'Account Name', 
        key: 'name', 
        renderCell: (account: Account) => account.name,
        sortingFn: (a: Account, b: Account, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    },
    { 
        label: 'Account Number', 
        key: 'number', 
        renderCell: (account: Account) => account.number,
        sortingFn: (a: Account, b: Account, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.number.localeCompare(b.number) : b.number.localeCompare(a.number)
    },
    { 
        label: 'Custodian', 
        key: 'custodian', 
        renderCell: (account: Account) => account.custodian,
        sortingFn: (a: Account, b: Account, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.custodian.localeCompare(b.custodian) : b.custodian.localeCompare(a.custodian)
    },
    {
        label: 'Total Holdings Value',
        key: 'holdingsValue',
        renderCell: (account: Account) => {
            const total = account.holdings?.reduce((sum, holding) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
            }).format(total);
        },
        sortingFn: (a: Account, b: Account, sortDirection: SortDirection) => {
            const aTotal = a.holdings?.reduce((sum, holding) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            const bTotal = b.holdings?.reduce((sum, holding) => 
                sum + (holding.units * holding.unitPrice), 0) || 0;
            return sortDirection === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        }
    }
];

export default function AccountTable() {
    const { selectedAdvisor } = useSelectedAdvisor();
    const { selectedAccountNumber, setSelectedAccount } = useSelectedAccount();

    if (!selectedAdvisor) {
        return <div className="text-gray-500 italic">Select an advisor to view their accounts</div>;
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

    const handleRowClick = (account: Account) => {
        setSelectedAccount(account.number);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Accounts for {selectedAdvisor.name}</h2>
            <DataTable 
                entries={accountsWithIds}
                columns={accountColumns}
                onRowClick={handleRowClick}
                selectedId={selectedAccountNumber}
            />
        </div>
    );
} 