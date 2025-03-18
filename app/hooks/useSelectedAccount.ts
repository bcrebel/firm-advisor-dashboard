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

interface BaseHolding {
    ticker: string;
    units: number;
    unitPrice: number;
}

interface EnrichedHolding extends BaseHolding {
    id: string;
    categoryName: string;
    securityName?: string;
}

interface AccountWithEnrichedHoldings {
    name: string;
    number: string;
    repId: string;
    custodian: string;
    holdings: EnrichedHolding[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useSelectedAccount() {
    const { selectedAdvisor } = useSelectedAdvisor();
    const { data: categories, isLoading: isLoadingCategories } = useSWR<Category[]>('/api/categories', fetcher);
    const { data: securities, isLoading: isLoadingSecurities } = useSWR<Security[]>('/api/securities', fetcher);
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

    // Only process the account if we have all the required data
    const selectedAccount = (baseAccount && !isLoadingCategories && !isLoadingSecurities) ? {
        name: baseAccount.name,
        number: baseAccount.number,
        repId: baseAccount.repId,
        custodian: baseAccount.custodian,
        holdings: baseAccount.holdings.map((holding: BaseHolding) => {
            const security = securitiesMap.get(holding.ticker);
            const category = security ? categoriesMap.get(security.categoryId) : undefined;
            
            // Get the parent category if available
            let categoryName = category?.title;
            if (category?.parentId) {
                const parentCategory = categoriesMap.get(category.parentId);
                if (parentCategory) {
                    categoryName = parentCategory.title;
                }
            }

            return {
                ...holding,
                id: holding.ticker,
                categoryName: categoryName || 'Uncategorized',
                securityName: security?.name || undefined
            };
        })
    } as AccountWithEnrichedHoldings : undefined;

    return {
        selectedAccountNumber,
        selectedAccount,
        setSelectedAccount,
        isLoading: isLoadingCategories || isLoadingSecurities
    };
} 