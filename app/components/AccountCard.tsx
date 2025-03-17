'use client'
import { useState } from 'react';
import DataTable, { SortDirection } from './Table';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = [
    '#0088FE',  // Blue
    '#00C49F',  // Green
    '#FFBB28',  // Yellow
    '#FF8042',  // Orange
    '#AF19FF',  // Purple
    '#FF1919',  // Red
    '#19FFFF',  // Cyan
    '#4CAF50'   // Dark Green
];    

interface AccountCardProps {
    account: { 
        name: string;
        holdings: Array<{
            units: number;
            unitPrice: number;
            categoryName?: string;
        }>;
    }
}

export default function AccountCard({ account }: AccountCardProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const totalValue = account.holdings.reduce((sum, holding) => 
        sum + (holding.units * holding.unitPrice), 0);

    // Group holdings by category
    const holdingsByCategory = account.holdings.reduce((acc, holding) => {
        const category = holding.categoryName || 'Uncategorized';
        const value = holding.units * holding.unitPrice;
        if (!acc[category]) {
            acc[category] = {
                categoryName: category,
                value,
                count: 1,
                color: '',
                id: category
            };
        } else {
            acc[category].value += value;
            acc[category].count += 1;
        }
        return acc;
    }, {} as Record<string, any>);

    const categoryEntries = Object.values(holdingsByCategory);
    // Assign colors to categories
    categoryEntries.forEach((entry, index) => {
        entry.color = COLORS[index % COLORS.length];
    });

    const Circle = ({color = 'black'}) => <div style={{'backgroundColor': `${color}`}}className="w-4 h-4 rounded-full dark:bg-gray-700"></div>
    const columns = [
        {
            label: 'Asset Class',
            key: 'class',
            renderCell: (holding: any) => <div><Circle color={holding.color} />{holding.categoryName}</div>,
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
                sortDirection === 'asc' ? a.categoryName.localeCompare(b.categoryName) : b.categoryName.localeCompare(a.categoryName)
        },
        {
            label: 'No. of Assets',
            key: 'numAssets',
            renderCell: (holding: any) => holding.count,
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => 
                sortDirection === 'asc' ? a.count - b.count : b.count - a.count
        },
        {
            label: '% of Assets',
            key: 'percentOfAssets',
            renderCell: (holding: any) => {
                return ((holding.value / totalValue) * 100).toFixed(2) + '%';
            },
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
                return sortDirection === 'asc' ? a.value - b.value : b.value - a.value;
            }
        },
        {
            label: 'Value',
            key: 'value',
            renderCell: (holding: any) => {
                return new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                }).format(holding.value);
            },
            sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
                return sortDirection === 'asc' ? a.value - b.value : b.value - a.value;
            }
        }
    ];

console.log(categoryEntries)
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
                <DataTable 
                    entries={categoryEntries} 
                    columns={columns} 
                    onRowHover={(entry) => setSelectedCategory(entry.categoryName)}
                    onRowLeave={() => setSelectedCategory(undefined)}
                    selectedId={selectedCategory}
                />
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={categoryEntries} 
                                dataKey="value" 
                                nameKey="categoryName" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={90} 
                                outerRadius={120} 
                                fill="#8884d8"
                            >
                                {categoryEntries.map((entry) => (
                                    <Cell 
                                        key={entry.categoryName} 
                                        fill={selectedCategory ? 
                                            (entry.categoryName === selectedCategory ? entry.color : '#E0E0E0') 
                                            : entry.color
                                        } 
                                    />
                                ))}
                            </Pie>
                        </PieChart>         
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
} 