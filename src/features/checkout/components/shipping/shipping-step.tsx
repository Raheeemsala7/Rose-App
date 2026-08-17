import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { AddressList } from '@/features/address/components/address-list';
import AddressStepSkeleton from '@/features/address/skeletons/address-step.skeleton';
import { getAddresses } from '@/features/address/apis/address.api';

async function ShippingStepContent({ locale }: { locale: 'en' | 'ar' }) {
  const addresses = await getAddresses(locale);

  return <AddressList addresses={addresses} />;
}

export function ShippingStep({ locale }: { locale: 'en' | 'ar' }) {
  // Translation
  const t = useTranslations('checkout.shipping');

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4 text-ds-text-plain">{t('title')}</h2>

      <Suspense fallback={<AddressStepSkeleton />}>
        <ShippingStepContent locale={locale} />
      </Suspense>
    </div>
  );
}
