'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/components/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { useWishlist, useToggleWishlist } from '@/src/features/wishlist/hooks/wishlist.hooks';

type AddToWishlistVariant = 'card' | 'details';

interface AddToWishlistProps {
    variant?: AddToWishlistVariant;
    productId: string;
}

export default function AddToWishlist({ variant = 'card', productId }: AddToWishlistProps) {
    const t = useTranslations('product');
    const { isWishlisted } = useWishlist();
    const { mutate: toggle, isPending } = useToggleWishlist();

    const wishlisted = isWishlisted(productId);

    function handleToggle(e: React.MouseEvent) {
        e.preventDefault(); // prevent link navigation when inside a card
        toggle(productId);
    }

    if (variant === 'details') {
        return (
            <Button
                onClick={handleToggle}
                disabled={isPending}
                aria-label={wishlisted ? t('removeFromWishlist') : t('addToWishlist')}
                className={cn(
                    'shrink-0 size-12 rounded-xl cursor-pointer flex items-center justify-center border transition-colors',
                    wishlisted
                        ? 'bg-blush-500 border-blush-600 text-white hover:bg-blush-600'
                        : 'bg-ds-subtle border-ds-border-soft text-ds-text-plain hover:bg-ds-primary-fade hover:border-ds-border-primary'
                )}
            >
                <Heart className={cn('size-5', wishlisted && 'fill-white')} />
            </Button>
        );
    }

    // card variant — absolute positioned over image
    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isPending}
            aria-label={wishlisted ? t('removeFromWishlist') : t('addToWishlist')}
            className={cn(
                'absolute top-2 end-2 flex size-8 items-center justify-center rounded-full transition-all cursor-pointer',
                'shadow-sm',
                wishlisted
                    ? 'bg-blush-500 text-white hover:bg-blush-600'
                    : 'bg-white/90 text-burgundy-700 hover:bg-white hover:text-blush-500'
            )}
        >
            <Heart className={cn('size-4', wishlisted && 'fill-white')} />
        </button>
    );
}
