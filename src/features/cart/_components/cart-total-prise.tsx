'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '../hooks/cart.hooks';
import { formatLocaleNumber } from '@/src/shared/lib/utils/format-number';


export default function CartTotalPrise() {
  // Translations
  const t = useTranslations('cart-list');

  const locale = useLocale();

  // Cart Context
  const { totalPrice, isLoading } = useCart();

  if (isLoading || !totalPrice) return;
  return (
    <div className="cart-total flex items-center justify-between mt-6">
      <span className="font-semibold text-xl text-ds-text-plain">{t('cart-total')}</span>
      <h2 className="font-bold text-2xl text-ds-text-plain">
        {formatLocaleNumber(totalPrice, locale)}
        <span className="font-medium text-base ms-1.5">{t('cart-currency')}</span>
      </h2>
    </div>
  );
}
