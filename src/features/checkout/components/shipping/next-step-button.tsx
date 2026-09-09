'use client';

import { Button } from '@/src/shared/components/ui/button';
import { useCheckoutStepper } from '@/src/features/checkout/components/checkout-stepper';
import { MoveRight, MoveLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface AddressNextStepButtonProps {
    selectedAddressId: string | undefined;
}

export default function AddressNextStepButton({ selectedAddressId }: AddressNextStepButtonProps) {
    const t = useTranslations('checkout.shipping');
    const locale = useLocale();
    const { goToNextStep } = useCheckoutStepper();

    return (
        <div className="flex justify-end mt-6">
            <Button
                onClick={goToNextStep}
                disabled={!selectedAddressId}
                className="flex items-center gap-2"
            >
                {t('next')}
                {locale === 'ar'
                    ? <MoveLeft className="size-4" />
                    : <MoveRight className="size-4" />
                }
            </Button>
        </div>
    );
}
