'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '../hooks/cart.hooks';

export default function CartQuantities() {
  // Translations
  const t = useTranslations('cart-list');

  // Cart Context
  const { products } = useCart();

  // Items Count
  const itemsCount =  products?.length ;

  return (
    <span className="font-medium text-sm text-ds-text-muted ms-1.5 sm:text-base sm:ms-2.5">
      {t('cart-count', { count: itemsCount || 0 })}
    </span>
  );
}
