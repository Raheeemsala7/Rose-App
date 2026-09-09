'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IAddress } from '../types/address';
import { AddressCard } from './address-card';
import AddressFormModalButton from '@/src/features/checkout/components/shipping/form-modal-button';
import AddressNextStepButton from '@/src/features/checkout/components/shipping/next-step-button';
import { useCheckoutStore } from '@/src/features/checkout/store/checkout.store';

interface AddressListProps {
    addresses: IAddress[];
}

export function AddressList({ addresses }: AddressListProps) {
    const t = useTranslations('address.list');

    const selectedAddressId = useCheckoutStore((state) => state.addressId);
    const updateCheckout = useCheckoutStore((state) => state.updateCheckout);

    // Auto-select: primary address when multiple, only address when one
    useEffect(() => {
        if (!addresses.length || selectedAddressId) return;

        const primary = addresses.find((a) => a.isPrimary);
        const autoSelect = addresses.length === 1 ? addresses[0] : primary;

        if (autoSelect) {
            updateCheckout({ addressId: autoSelect.id });
        }
    }, [addresses, selectedAddressId, updateCheckout]);

    return (
        <div className="space-y-4">
            {addresses.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-xl border border-ds-border-muted text-ds-text-muted">
                    {t('noAddresses')}
                </div>
            ) : (
                <div className="space-y-3 max-h-88 overflow-y-auto">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            isSelected={address.id === selectedAddressId}
                            onSelect={(a) => updateCheckout({ addressId: a.id })}
                        />
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 before:flex-1 before:border-t before:border-ds-border-muted after:flex-1 after:border-t after:border-ds-border-muted">
                <span className="text-sm text-ds-text-soft font-medium px-3">
                    {t('or')}
                </span>
            </div>

            <AddressFormModalButton />

            {addresses.length > 0 && (
                <AddressNextStepButton selectedAddressId={selectedAddressId || undefined} />
            )}
        </div>
    );
}
