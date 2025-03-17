'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useSelectedAdvisor } from './useSelectedAdvisor';
import { type Account } from './useAdvisorsWithAccounts';
import useSWR from 'swr';

interface Category {
    id: number;
    parentId: number | null;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface Security {
    id: string;
    ticker: string;
    name: string;
    dateAdded: string;
    categoryId: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useSelectedAccount() {
    const { selectedAdvisor } = useSelectedAdvisor();
    const { data: categories } = useSWR<Category[]>('/api/categories', fetcher);
    const { data: securities } = useSWR<Security[]>('/api/securities', fetcher);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedAccountNumber, setSelectedAccountNumber] = useState<string | undefined>(
        searchParams.get('accountNumber') || undefined
    );

    // Create lookup maps for securities and categories
    const securitiesMap = useMemo(() => {
        if (!securities) return new Map();
        return new Map(securities.map(security => [security.ticker, security]));
    }, [securities]);

    const categoriesMap = useMemo(() => {
        if (!categories) return new Map();
        return new Map(categories.map(category => [category.id, category]));
    }, [categories]);

    // Sync state with URL params
    useEffect(() => {
        const accountFromUrl = searchParams.get('accountNumber');
        if (accountFromUrl !== selectedAccountNumber) {
            setSelectedAccountNumber(accountFromUrl || undefined);
        }
    }, [searchParams]);

    // Auto-select first account when advisor is selected
    useEffect(() => {
        if (!selectedAdvisor) return;
        
        const accounts = selectedAdvisor.accounts || [];
        if (accounts.length > 0 && !selectedAccountNumber) {
            const firstAccountNumber = accounts[0].number;
            setSelectedAccountNumber(firstAccountNumber);
            const params = new URLSearchParams(searchParams);
            params.set('accountNumber', firstAccountNumber);
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [selectedAdvisor, selectedAccountNumber, router, searchParams]);

    const setSelectedAccount = (accountNumber: string) => {
        setSelectedAccountNumber(accountNumber);
        const params = new URLSearchParams(searchParams);
        params.set('accountNumber', accountNumber);
        router.push(`?${params.toString()}`);
    };

    const baseAccount = selectedAdvisor?.accounts?.find(
        (account: Account) => account.number === selectedAccountNumber
    );

    const selectedAccount = baseAccount ? {
        ...baseAccount,
        holdings: baseAccount.holdings.map((holding: Account['holdings'][0]) => {
            const security = securitiesMap.get(holding.ticker);
            const category = security ? categoriesMap.get(security.categoryId) : undefined;
            return {
                ...holding,
                categoryName: category?.title
            };
        })
    } : undefined;

    return {
        selectedAccountNumber,
        selectedAccount,
        setSelectedAccount,
    };
} 