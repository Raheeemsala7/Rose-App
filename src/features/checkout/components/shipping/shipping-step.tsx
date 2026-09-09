import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { AddressList } from '@/src/features/address/components/address-list';
import AddressStepSkeleton from '@/src/features/address/skeletons/address-step.skeleton';
import { getAddresses } from '@/src/features/address/apis/address.api';

interface ShippingStepProps {
    locale: 'en' | 'ar';
}

// Server component — fetches addresses with auth on the server.
// Wrapped in Suspense so the skeleton renders immediately while data loads.
async function ShippingStepContent({ locale }: ShippingStepProps) {
    const addresses = await getAddresses(locale);
    return <AddressList addresses={addresses} />;
}

export function ShippingStep({ locale }: ShippingStepProps) {
    const t = useTranslations('checkout.shipping');

    return (
        <div className="py-6">
            <h2 className="mb-6 text-2xl font-bold text-ds-text-plain">
                {t('title')}
            </h2>
            <Suspense fallback={<AddressStepSkeleton />}>
                <ShippingStepContent locale={locale} />
            </Suspense>
        </div>
    );
}
