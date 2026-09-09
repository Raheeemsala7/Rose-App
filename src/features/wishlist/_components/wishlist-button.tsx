'use client';

import { Heart } from 'lucide-react';
import { Link } from '@/src/i18n/navigation';
import { cn } from '@/src/shared/lib/utils';
import { useWishlist } from '../hooks/wishlist.hooks';

export function WishlistButton() {
    const { count } = useWishlist();

    return (
        <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-1.5 rounded-full text-burgundy-700 dark:text-blush-200 hover:bg-burgundy-50 dark:hover:bg-burgundy-800 transition-colors"
        >
            <Heart size={20} />
            {count > 0 && (
                <span className={cn(
                    'absolute -top-0.5 -end-0.5 flex h-4 w-4 items-center justify-center',
                    'rounded-full bg-blush-500 text-white text-[10px] font-bold leading-none'
                )}>
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    );
}
