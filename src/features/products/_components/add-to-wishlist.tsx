'use client';


import { HeartMinus, HeartPlus } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { getGuestWishlist, toggleGuestWishlistItem } from '../../wish-list/storage/guest-wishlist';
import { Button } from '@/src/shared/components/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { useAddToWishlist } from '../../wish-list/hooks/use-add-to-wishlist';

type AddToWishlistVariant = 'card' | 'details';

interface AddToWishlistProps {
  variant?: AddToWishlistVariant;
  productId: string;
}

export default function AddToWishlist({ variant = 'card', productId }: AddToWishlistProps) {
  // Translations
  const t = useTranslations('product');

  // Hooks
  const { data: session } = useSession();
  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();

  // State - initialize from localStorage for guest users
  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === 'undefined') return false;
    const guestWishlist = getGuestWishlist();
    return guestWishlist.some((item) => item.productId === productId);
  });

  const handleToggle = () => {
    if (session?.user) {
      // Authenticated user - use API
      if (isWishlisted) {
        // For authenticated users, we'd need the wishlist item ID to remove
        // For now, we'll just toggle the state and let the parent component handle removal
        setIsWishlisted(false);
      } else {
        addToWishlist({ productId });
        setIsWishlisted(true);
      }
    } else {
      // Guest user - use localStorage
      const newState = toggleGuestWishlistItem(productId);
      setIsWishlisted(newState);
    }
  };

  if (variant === 'details') {
    return (
      <Button
        className={cn(
          'shrink-0 size-12 rounded-xl bg-ds-bg-muted dark:bg-ds-bg-subtle text-ds-text-plain hover:bg-ds-bg-muted dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center border border-ds-border-soft',
          isWishlisted &&
            'bg-burgundy-800 hover:bg-burgundy-800 dark:bg-burgundy-700 text-cream-100 dark:text-cream-100'
        )}
        onClick={handleToggle}
        disabled={isAdding}
        aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
      >
        {isWishlisted ? <HeartMinus className="size-5" /> : <HeartPlus className="size-5" />}
      </Button>
    );
  }

  return (
    <>
      {isWishlisted ? (
        <Button
          className="absolute top-2 inset-s-2 flex items-center justify-center text-white bg-zinc-800 rounded-full h-7.5 p-2.5 gap-0.75 cursor-pointer hover:bg-zinc-800"
          onClick={handleToggle}
          disabled={isAdding}
        >
          <HeartMinus className="w-4.5 h-4.5" />
          <p>{t('removeFromWishlist')}</p>
        </Button>
      ) : (
        <Button
          className="absolute top-2 inset-s-2 h-7.5 w-7.5 rounded-full bg-white p-0 text-burgundy-700 hover:bg-white cursor-pointer overflow-hidden transition-all duration-200 hover:w-auto hover:px-2.5 [&>span]:gap-0 hover:[&>span]:gap-1.5 hover:[&_p]:max-w-40 hover:[&_p]:opacity-100"
          onClick={handleToggle}
          disabled={isAdding}
        >
          <HeartPlus className="size-4.5 shrink-0" />
          <p className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-burgundy-700 opacity-0 transition-all duration-200">
            {t('addToWishlist')}
          </p>
        </Button>
      )}
    </>
  );
}
