'use client';
import AdvisorTable from './components/AdvisorTable';
import AccountTable from './components/AccountTable';
import LoadingSpinner from './components/LoadingSpinner';
import { useAdvisorsWithAccounts } from './hooks/useAdvisorsWithAccounts';
import { useSelectedAccount } from './hooks/useSelectedAccount';

export default function Page() {
  const { isLoading: isLoadingAdvisors } = useAdvisorsWithAccounts();
  const { isLoading: isLoadingAccount } = useSelectedAccount();

  if (isLoadingAdvisors || isLoadingAccount) {
    return <LoadingSpinner />;
  }

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
