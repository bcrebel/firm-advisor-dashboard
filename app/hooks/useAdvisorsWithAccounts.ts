import useSWR from 'swr';

export interface Account {
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

export interface Advisor {
  id: string;
  name: string;
  dateAdded: string;
  accounts?: Account[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAdvisorsWithAccounts() {
    const { data: advisors, error: advisorsError } = useSWR<Advisor[]>('/api/advisors', fetcher);
    const { data: accounts, error: accountsError } = useSWR<Account[]>('/api/accounts', fetcher);

    const isLoading = !advisors || !accounts;
    const error = advisorsError || accountsError;

    const data = advisors?.map(advisor => ({
        ...advisor,
        accounts: accounts?.filter(account => 
            account.repId === advisor.id
        )
    }));

    return {
        data,
        error,
        isLoading
    };
} 