'use client'
import DataTable, { SortDirection } from './Table';
import { useAdvisorsWithAccounts } from '../hooks/useAdvisorsWithAccounts';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';

interface Security {
    id: string;
    ticker: string;
    name: string;
    dateAdded: string;
}

function AccountCard({ account }: { 
    account: { 
        name: string;
        holdings: Array<{
            units: number;
            unitPrice: number;
        }>;
    }
}) {
    const totalValue = account.holdings.reduce((sum, holding) => 
        sum + (holding.units * holding.unitPrice), 0);

    return (
        <div className="border rounded-lg p-4 mb-6 flex items-center space-x-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                    {account.name.slice(0, 2)}
                </span>
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{account.name}</h3>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                <p className="font-semibold text-lg">
                    {new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD' 
                    }).format(totalValue)}
                </p>
            </div>
        </div>
    );
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const securityColumns = [
    { 
        label: 'Ticker', 
        key: 'ticker', 
        renderCell: (holding: any) => holding.ticker,
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker)
    },
    { 
        label: 'Units', 
        key: 'units', 
        renderCell: (holding: any) => holding.units.toLocaleString(),
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.units - b.units : b.units - a.units
    },
    { 
        label: 'Unit Price', 
        key: 'unitPrice', 
        renderCell: (holding: any) => new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(holding.unitPrice),
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.unitPrice - b.unitPrice : b.unitPrice - a.unitPrice
    },
    {
        label: 'Total Value',
        key: 'totalValue',
        renderCell: (holding: any) => {
            const total = holding.units * holding.unitPrice;
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
            }).format(total);
        },
        sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
            const aTotal = a.units * a.unitPrice;
            const bTotal = b.units * b.unitPrice;
            return sortDirection === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        }
    }
];

export default function SecurityTable() {
    const { data: advisorsData } = useAdvisorsWithAccounts();
    const { data: securitiesData } = useSWR<Security[]>('/api/securities', fetcher);
    const searchParams = useSearchParams();
    const selectedAdvisorId = searchParams.get('advisorId');
    const selectedAccountNumber = searchParams.get('accountNumber');

    if (!selectedAdvisorId || !selectedAccountNumber) {
        return <div className="text-gray-500 italic">Select an account to view its securities</div>;
    }

    const selectedAdvisor = advisorsData?.find(advisor => advisor.id === selectedAdvisorId);
    if (!selectedAdvisor) {
        return <div className="text-red-500">Advisor not found</div>;
    }

    const selectedAccount = selectedAdvisor.accounts?.find(account => account.number === selectedAccountNumber);
    if (!selectedAccount) {
        return <div className="text-red-500">Account not found</div>;
    }

    const holdings = selectedAccount.holdings || [];
    if (holdings.length === 0) {
        return <div className="text-gray-500 italic">No securities found in this account</div>;
    }

    // Add an id field to each holding and join with securities data
    const holdingsWithIds = holdings.map((holding, index) => {
        const security = securitiesData?.find(s => s.ticker === holding.ticker);
        return {
            ...holding,
            id: `${selectedAccountNumber}-${holding.ticker}-${index}`,
            securityName: security?.name // Add the security name from the securities data
        };
    });

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Securities in {selectedAccount.name}</h2>
            <AccountCard account={selectedAccount} />
            <DataTable 
                entries={holdingsWithIds}
                columns={securityColumns}
            />
        </div>
    );
} 