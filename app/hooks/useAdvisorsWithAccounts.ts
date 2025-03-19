import useSWR from 'swr';
import { useMemo } from 'react';

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

    const accountMap = useMemo(() => {
        const map = new Map();
        accounts?.forEach(account => {
            if (!map.has(account.repId)) {
                map.set(account.repId, []);
            }
            map.get(account.repId).push(account);
        });
        return map;
    }, [accounts]);

    const data = useMemo(() => 
        advisors?.map(advisor => ({
            ...advisor,
            accounts: accountMap.get(advisor.id) || []
        }))
    , [advisors, accountMap]);

    return {
        data,
        error,
        isLoading
    };
} 