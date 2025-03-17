'use client'
import DataTable, { SortDirection } from './Table';
import { useSelectedAccount } from '../hooks/useSelectedAccount';
import AccountCard from './AccountCard';

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