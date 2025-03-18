import AdvisorTable from './components/AdvisorTable';
import AccountTable from './components/AccountTable';
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

export default async function Page() {
    return (
        <div className="flex px-6 py-8 gap-6">
            <section>
                <AdvisorTable />
            </section>
            <section className="flex-1 max-h-[calc(100vh-2rem)] overflow-y-auto">
                <AccountTable />
            </section>
        </div>
    );
}
