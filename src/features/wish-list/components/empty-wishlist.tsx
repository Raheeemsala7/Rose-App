import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { ContinueShoppingButton } from './continue-shopping-button';

export function EmptyWishlist() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <Heart className="size-10 text-ds-text-muted" />
      <p className="text-sm text-ds-text-muted">{t('wishlist.empty')}</p>
     <ContinueShoppingButton />
    </div>
  );
}