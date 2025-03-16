import AdvisorTable from './components/AdvisorTable';
import AccountTable from './components/AccountTable';
import SecurityTable from './components/SecurityTable';
import type { Advisor } from './hooks/useAdvisorsWithAccounts';

interface Account {
  name: string;
  number: string;
  repId: string;
  holdings: {
    ticker: string;
    units: number;
    unitPrice: number;
  }[];
  custodian: string;
}

interface Security {
  id: string;
  ticker: string;
  name: string;
  dateAdded: string;
}
/*
  {
    label: 'ID',
    key: 'id',
    renderCell: (user: User) => user.id,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
*/


async function getData() {
  const advisorsRes = await fetch('http://localhost:3000/api/advisors');
  const accountsRes = await fetch('http://localhost:3000/api/accounts');
  const securitiesRes = await fetch('http://localhost:3000/api/securities');

  const advisors: Advisor[] = await advisorsRes.json();
  const accounts: Account[] = await accountsRes.json();
  const securities: Security[] = await securitiesRes.json();

  return { advisors, accounts, securities };
}

export default async function Page() {
    return (
        <div className="p-4 space-y-8">
            <section>
                <h1 className="text-2xl font-bold mb-4">Advisors</h1>
                <AdvisorTable />
            </section>
            <section>
                <AccountTable />
            </section>
            <section>
                <SecurityTable />
            </section>
        </div>
    );
}
