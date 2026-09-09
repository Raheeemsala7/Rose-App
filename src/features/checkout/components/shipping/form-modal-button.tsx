'use client';

import { useState } from 'react';
import { Button } from '@/src/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AddressFormModal } from '@/src/features/address/components/address-form-modal';
import { useRouter } from '@/src/i18n/navigation';

interface AddressFormModalButtonProps {
    /** Called after a new address is successfully created so the parent can refetch */
    onCreated?: () => void;
}

export default function AddressFormModalButton({ onCreated }: AddressFormModalButtonProps) {
    const t = useTranslations('checkout.shipping');
    const router = useRouter();
    const [open, setOpen] = useState(false);

    function handleCreated() {
        // Refresh the server component tree so the new address appears in the list
        router.refresh();
        onCreated?.();
    }

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="w-full border-ds-border-primary-faint bg-ds-primary-fade text-ds-text-primary hover:bg-ds-primary-faint"
            >
                <Plus className="size-4 me-2" />
                {t('addNewAddress')}
            </Button>

            <AddressFormModal
                open={open}
                onOpenChange={setOpen}
                onCreated={handleCreated}
            />
        </>
    );
}
