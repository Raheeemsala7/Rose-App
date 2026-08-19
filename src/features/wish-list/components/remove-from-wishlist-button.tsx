'use client';

import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useRemoveFromWishlist } from '../hooks/use-remove-from-wishlist';

interface RemoveFromWishlistButtonProps {
  wishlistItemId: string;
}

export function RemoveFromWishlistButton({ wishlistItemId }: RemoveFromWishlistButtonProps) {
  // Translation
  const t = useTranslations();

  // Hooks
  const removeFromWishlist = useRemoveFromWishlist();

  // Handlers
  const handleRemove = () => {
    removeFromWishlist.mutate({ id: wishlistItemId });
  };

  return (
    <Button
      variant="destructive"
      size="icon-sm"
      onClick={handleRemove}
      isLoading={removeFromWishlist.isPending}
      aria-label={t('wishlist.remove')}
      className="absolute end-2 top-2 z-10"
    >
      <Trash2 />
    </Button>
  );
}