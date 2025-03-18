'use client'
import DataTable, { SortDirection } from './Table';

interface Holding {
    ticker: string;
    units: number;
    unitPrice: number;
    categoryName?: string;
    securityName?: string;
}

interface SecurityTableProps {
    holdings: Holding[];
    accountName?: string;
}

const securityColumns = [
    { 
        label: 'Ticker', 
        key: 'ticker', 
        renderCell: (holding: Holding) => holding.ticker,
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker)
    },
    {
        label: 'Name',
        key: 'securityName',
        renderCell: (holding: Holding) => holding.securityName || '-',
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => 
            sortDirection === 'asc' 
                ? (a.securityName || '').localeCompare(b.securityName || '') 
                : (b.securityName || '').localeCompare(a.securityName || '')
    },
    {
        label: 'Category',
        key: 'categoryName',
        renderCell: (holding: Holding) => holding.categoryName || 'Uncategorized',
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => 
            sortDirection === 'asc' 
                ? (a.categoryName || '').localeCompare(b.categoryName || '') 
                : (b.categoryName || '').localeCompare(a.categoryName || '')
    },
    { 
        label: 'Units', 
        key: 'units', 
        renderCell: (holding: Holding) => holding.units.toLocaleString(),
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.units - b.units : b.units - a.units
    },
    { 
        label: 'Unit Price', 
        key: 'unitPrice', 
        renderCell: (holding: Holding) => new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(holding.unitPrice),
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => 
            sortDirection === 'asc' ? a.unitPrice - b.unitPrice : b.unitPrice - a.unitPrice
    },
    {
        label: 'Total Value',
        key: 'totalValue',
        renderCell: (holding: Holding) => {
            const total = holding.units * holding.unitPrice;
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
            }).format(total);
        },
        sortingFn: (a: Holding, b: Holding, sortDirection: SortDirection) => {
            const aTotal = a.units * a.unitPrice;
            const bTotal = b.units * b.unitPrice;
            return sortDirection === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        }
    }
];

export default function SecurityTable({ holdings = [], accountName }: SecurityTableProps) {
    if (!holdings || holdings.length === 0) {
        return <div className="text-gray-500 italic">No securities found in this account</div>;
    }

    // Add an id field to each holding
    const holdingsWithIds = holdings.map((holding: Holding, index: number) => ({
        ...holding,
        id: `${holding.ticker}-${index}`
    }));

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Securities {accountName ? `in ${accountName}` : ''}</h2>
            <DataTable 
                entries={holdingsWithIds}
                columns={securityColumns}
                headerTextSize="xxs"
                bodyTextSize="xxs"
            />
        </div>
    );
} 