'use client';
import { Button } from '@/shared/components/ui/button';
import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { MoveRight, MoveLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function AddressNextStepButton({
  selectedAddressId,
}: {
  selectedAddressId: string | undefined;
}) {
  // Translation
  const t = useTranslations('checkout.shipping');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Functions
  const { goToNextStep } = useCheckoutStepper();

  return (
    <div className="flex justify-end">
      <Button
        onClick={goToNextStep}
        disabled={!selectedAddressId}
        className="bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated"
      >
        {t('next')}{' '}
        {isRTL ? <MoveLeft className="ml-2 h-4 w-4" /> : <MoveRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
