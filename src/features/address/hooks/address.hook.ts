'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/src/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { createAddressAction, CreateAddressInput } from '../actions/address.action';

export function useCreateAddress() {
    const router = useRouter();
    const t = useTranslations('address.form');

    return useMutation({
        mutationFn: (input: CreateAddressInput) => createAddressAction(input),
        onSuccess: () => {
            toast.success(t('success'));
            // Refresh server component tree so new address appears in list
            router.refresh();
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : t('error'));
        },
    });
}
