'use client';

import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useClearWishlist } from '../hooks/use-clear-wishlist';

export function ClearWishlistButton() {
  const t = useTranslations();
  const clearWishlist = useClearWishlist();

  return (
    <Button
      variant="destructive"
      onClick={() => clearWishlist.mutate()}
      isLoading={clearWishlist.isPending}
    >
      <Trash2 />
      {t('wishlist.clearWishlist')}
    </Button>
  );
}