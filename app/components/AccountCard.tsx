'use client';
import { useState } from 'react';
import DataTable, { SortDirection } from './Table';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SecurityTable from './SecurityTable';
import ModalDialog from './Modal';

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Green
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#AF19FF', // Purple
  '#FF1919', // Red
  '#19FFFF', // Cyan
  '#4CAF50', // Dark Green
];

interface AccountCardProps {
  account: {
    name: string;
    holdings: Array<{
      units: number;
      unitPrice: number;
      categoryName: string;
      ticker: string;
      securityName?: string;
    }>;
  };
}

export default function AccountCard({ account }: AccountCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);

  const holdings = account.holdings || [];
  const totalValue = holdings.reduce((sum, holding) => sum + holding.units * holding.unitPrice, 0);

  // Group holdings by category
  const holdingsByCategory = holdings.reduce(
    (acc, holding) => {
      const category = holding.categoryName;
      const value = holding.units * holding.unitPrice;
      if (!acc[category]) {
        acc[category] = {
          categoryName: category,
          value,
          count: 1,
          color: '',
          id: category,
        };
      } else {
        acc[category].value += value;
        acc[category].count += 1;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const categoryEntries = Object.values(holdingsByCategory);
  // Assign colors to categories
  categoryEntries.forEach((entry, index) => {
    entry.color = COLORS[index % COLORS.length];
  });

  const Circle = ({ color = 'black' }) => (
    <div style={{ backgroundColor: `${color}` }} className="w-2 h-2 rounded-full mr-2"></div>
  );
  const columns = [
    {
      label: 'Asset Class',
      key: 'class',
      renderCell: (holding: any) => (
        <div className="flex items-center">
          <Circle color={holding.color} />
          {holding.categoryName}
        </div>
      ),
      sortingFn: (a: any, b: any, sortDirection: SortDirection) =>
        sortDirection === 'asc'
          ? a.categoryName.localeCompare(b.categoryName)
          : b.categoryName.localeCompare(a.categoryName),
    },
    {
      label: 'No. of Assets',
      key: 'numAssets',
      renderCell: (holding: any) => holding.count,
      sortingFn: (a: any, b: any, sortDirection: SortDirection) =>
        sortDirection === 'asc' ? a.count - b.count : b.count - a.count,
    },
    {
      label: '% of Assets',
      key: 'percentOfAssets',
      headerOverride: 'text-right',
      renderCell: (holding: any) => {
        return (
          <div className="text-right">{((holding.value / totalValue) * 100).toFixed(2) + '%'}</div>
        );
      },
      sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
        return sortDirection === 'asc' ? a.value - b.value : b.value - a.value;
      },
    },
    {
      label: 'Value',
      key: 'value',
      headerOverride: 'text-right',
      renderCell: (holding: any) => {
        return (
          <div className="text-right">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(holding.value)}
          </div>
        );
      },
      sortingFn: (a: any, b: any, sortDirection: SortDirection) => {
        return sortDirection === 'asc' ? a.value - b.value : b.value - a.value;
      },
    },
  ];

  return (
    <div className="flex flex-col rounded-lg p-8 mb-6 bg-white h-full">
      <div>
        <div className="flex h-full min-h-[400px]">
          <div className="flex-grow max-w-[800px]">
            <div className="flex p-3 items-start space-x-4 bg-white mb-2">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-500">
                  {account.name.slice(0, 2)}
                </span>
              </div>
              <div className="flex items-center">
                <div>
                  <h3 className="font-semibold text-lg">{account.name}</h3>
                  <div>
                    <p className="font-semibold text-lg">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(totalValue)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center w-10 h-10 bg-gray-200 rounded-full justify-center ml-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 4.75C13 4.33579 12.6642 4 12.25 4C11.8358 4 11.5 4.33579 11.5 4.75V11L4.75 11C4.33579 11 4 11.3358 4 11.75C4 12.1642 4.33579 12.5 4.75 12.5H11.5V19.25C11.5 19.6642 11.8358 20 12.25 20C12.6642 20 13 19.6642 13 19.25V12.5H19.25C19.6642 12.5 20 12.1642 20 11.75C20 11.3358 19.6642 11 19.25 11H13V4.75Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <ModalDialog open={showModal} onClose={() => setShowModal(false)}>
                <SecurityTable holdings={holdings} accountName={account.name} />
              </ModalDialog>
            </div>
            <DataTable
              entries={categoryEntries}
              columns={columns}
              onRowHover={entry => setSelectedCategory(entry.categoryName)}
              onRowLeave={() => setSelectedCategory(undefined)}
              selectedId={selectedCategory}
              headerTextSize="xxs"
              bodyTextSize="xxs"
            />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={400} height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={categoryEntries}
                  dataKey="value"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  innerRadius={115}
                  outerRadius={145}
                  fill="#8884d8"
                >
                  {categoryEntries.map(entry => (
                    <Cell
                      key={entry.categoryName}
                      fill={
                        selectedCategory
                          ? entry.categoryName === selectedCategory
                            ? entry.color
                            : '#E0E0E0'
                          : entry.color
                      }
                    />
                  ))}
                </Pie>
                <foreignObject
                  x="50%"
                  y="50%"
                  width="300"
                  height="300"
                  transform="translate(-150, -150)"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {selectedCategory ? (
                      <>
                        <div className="text-sm font-medium text-gray-600">{selectedCategory}</div>
                        <div className="text-xl font-semibold mt-1">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(
                            categoryEntries.find(entry => entry.categoryName === selectedCategory)
                              ?.value || 0
                          )}
                        </div>
                        <div
                          className="text-sm mt-1 px-2 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              categoryEntries.find(entry => entry.categoryName === selectedCategory)
                                ?.color + '20',
                          }}
                        >
                          {(
                            ((categoryEntries.find(entry => entry.categoryName === selectedCategory)
                              ?.value || 0) /
                              totalValue) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-medium text-gray-600">Assets</div>
                        <div className="text-xl font-semibold mt-1">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(totalValue)}
                        </div>
                      </>
                    )}
                  </div>
                </foreignObject>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
