'use client'
import DataTable, { SortDirection } from './Table';
import { useSelectedAccount } from '../hooks/useSelectedAccount';

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

    const columns = [
        {
            label: 'Asset Class',
            key: 'class',
            renderCell: (holding: any) => holding.categoryName,
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
                sortDirection === 'asc' ? a.categoryName.localeCompare(b.categoryName) : b.categoryName.localeCompare(a.categoryName)
        },
        {
            label: 'No. of Assets',
            key: 'numAssets',
            renderCell: (holding: any) => account.holdings.filter(h => h.categoryName === holding.categoryName).length,
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
                sortDirection === 'asc' ? a.holdings.length - b.holdings.length : b.holdings.length - a.holdings.length
        },
        {
            label: '% of Assets',
            key: 'percentOfAssets',
            renderCell: (holding: any) => {
                const total = holding.units * holding.unitPrice;
                return ((total / totalValue) * 100).toFixed(2) + '%';
            }
        },
        {
            label: 'Value',
            key: 'value',
            renderCell: (holding: any) => {
                const total = holding.units * holding.unitPrice;
                return new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                }).format(total);
            }
        }
    ]
    return (
        <div className="border flex flex-col rounded-lg p-4 mb-6">
            <div>
                <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 shadow-sm mb-2">
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
                <DataTable entries={account.holdings} columns={columns} />  
        </div>
        </div>
    );
}

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
    const { selectedAccount } = useSelectedAccount();

    if (!selectedAccount) {
        return <div className="text-gray-500 italic">Select an account to view its securities</div>;
    }

    const holdings = selectedAccount.holdings || [];
    if (holdings.length === 0) {
        return <div className="text-gray-500 italic">No securities found in this account</div>;
    }

    // Add an id field to each holding
    const holdingsWithIds = holdings.map((holding: { ticker: string; units: number; unitPrice: number; categoryName?: string }, index: number) => ({
        ...holding,
        id: `${selectedAccount.number}-${holding.ticker}-${index}`
    }));

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