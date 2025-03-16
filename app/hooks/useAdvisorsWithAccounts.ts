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
  custodians: {
    name: string;
    repId: string;
  }[];
  accounts?: Account[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAdvisorsWithAccounts() {
    const { data: advisors, error: advisorError, isLoading: advisorLoading } = useSWR<Advisor[]>('/api/advisors', fetcher);
    const { data: accounts, error: accountError, isLoading: accountLoading } = useSWR<Account[]>('/api/accounts', fetcher);

    const advisorsWithAccounts = advisors?.map(advisor => ({
        ...advisor,
        accounts: accounts?.filter(account => 
            advisor.custodians.some(custodian => 
                custodian.repId === account.repId && custodian.name === account.custodian
            )
        )
    })) || [];

    return {
        data: advisorsWithAccounts,
        isLoading: advisorLoading || accountLoading,
        error: advisorError || accountError
    };
} 