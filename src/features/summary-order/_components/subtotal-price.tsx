'use client';

import { useCart } from '@/src/features/cart/hooks/cart.hooks';
import { useLocale, useTranslations } from 'next-intl';
import { formatLocaleNumber } from '@/src/shared/lib/utils/format-number';

interface SubTotalPriceProps {
    currency?: string;
}

export function SubTotalPrice({ currency = 'EGP' }: SubTotalPriceProps) {
    const t = useTranslations('order-summary');
    const locale = useLocale();
    const { totalPrice } = useCart();

    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-ds-text-soft">{t('sub-total')}</span>
            <span className="text-sm font-medium text-ds-text-soft">
                {formatLocaleNumber(Number(totalPrice) || 0, locale)}
                <span className="ms-1 text-xs">{currency}</span>
            </span>
        </div>
    );
}
