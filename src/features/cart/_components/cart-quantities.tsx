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
    <span className="font-medium text-base text-ds-text-muted ms-2.5">
      {t('cart-count', { count: itemsCount || 0 })}
    </span>
  );
}
