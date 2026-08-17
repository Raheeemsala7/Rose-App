'use client';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

export default function AddressFormModalButton() {
  const t = useTranslations('checkout.shipping');
  return (
    <Button
      variant="outline"
      className="w-full border-none mb-6 bg-ds-bg-primary-fade text-ds-text-primary"
    >
      {t('addNewAddress')}
    </Button>
  );
}
