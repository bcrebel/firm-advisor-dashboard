'use client';
import { useEffect } from 'react';
import DataTable, { SortDirection } from './Table';
import { useSelectedAdvisor } from '../hooks/useSelectedAdvisor';
import { useSelectedAccount } from '../hooks/useSelectedAccount';
import type { Account } from '../types/account';
import AccountCard from './AccountCard';

const accountColumns = [
  {
    label: 'Account Name',
    key: 'name',
    renderCell: (account: Account) => account.name,
    sortingFn: (a: Account, b: Account, sortDirection: SortDirection) =>
      sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  },
  {
    label: 'Account Number',
    key: 'number',
    renderCell: (account: Account) => account.number,
    sortingFn: (a: Account, b: Account, sortDirection: SortDirection) =>
      sortDirection === 'asc' ? a.number.localeCompare(b.number) : b.number.localeCompare(a.number),
  },
  {
    label: 'Custodian',
    key: 'custodian',
    renderCell: (account: Account) => account.custodian,
    sortingFn: (a: Account, b: Account, sortDirection: SortDirection) =>
      sortDirection === 'asc'
        ? a.custodian.localeCompare(b.custodian)
        : b.custodian.localeCompare(a.custodian),
  },
  {
    label: 'Total Holdings Value',
    key: 'holdingsValue',
    renderCell: (account: Account) => {
      const total =
        account.holdings?.reduce((sum, holding) => sum + holding.units * holding.unitPrice, 0) || 0;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total);
    },
    sortingFn: (a: Account, b: Account, sortDirection: SortDirection) => {
      const aTotal =
        a.holdings?.reduce((sum, holding) => sum + holding.units * holding.unitPrice, 0) || 0;
      const bTotal =
        b.holdings?.reduce((sum, holding) => sum + holding.units * holding.unitPrice, 0) || 0;
      return sortDirection === 'asc' ? aTotal - bTotal : bTotal - aTotal;
    },
  },
];

export default function AccountTable() {
  const { selectedAdvisor } = useSelectedAdvisor();
  const { selectedAccountNumber, setSelectedAccount, selectedAccount, isLoading } =
    useSelectedAccount();

  // Add an id field to each account for the DataTable component
  const accounts = selectedAdvisor?.accounts || [];
  const accountsWithIds = accounts.map((account: Account) => ({
    ...account,
    id: account.number,
  }));

  const handleRowClick = (account: Account) => {
    setSelectedAccount(account.number);
  };

  useEffect(() => {
    if (!selectedAccountNumber && accounts.length > 0) {
      setSelectedAccount(accounts[0].number);
    }
  }, [selectedAccountNumber, accounts, setSelectedAccount]);

  if (selectedAdvisor && accounts.length === 0) {
    return <div className="text-gray-500 italic">No accounts found for this advisor</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {selectedAccount && !isLoading && (
        <div className="mb-2">
          <AccountCard account={selectedAccount} />
        </div>
      )}
      {selectedAdvisor && (
        <h2 className="text-sm font-semibold my-2">Accounts for {selectedAdvisor.name}</h2>
      )}

      <DataTable<Account & { id: string }>
        entries={accountsWithIds}
        columns={accountColumns}
        onRowClick={handleRowClick}
        selectedId={selectedAccountNumber}
        headerTextSize="xs"
        bodyTextSize="xxs"
      />
    </div>
  );
}
