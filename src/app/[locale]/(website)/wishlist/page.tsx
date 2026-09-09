'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/components/ui/button';
import { MoveLeft } from 'lucide-react';
import WishlistBody from '@/src/features/wishlist/_components/wishlist-body';
import { useWishlist } from '@/src/features/wishlist/hooks/wishlist.hooks';

export default function WishlistPage() {
    const t = useTranslations('wishlist');

    return (
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10 py-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="flex flex-wrap items-baseline gap-2 text-3xl font-bold text-ds-text-plain sm:text-4xl lg:text-5xl">
                    <Heart className="size-8 text-blush-500 fill-blush-500 sm:size-10" />
                    {t('title')}
                    <WishlistCount />
                </h1>
            </div>

            {/* Items */}
            <WishlistBody />

            {/* Continue shopping */}
            <Link href="/products" className="mt-2 self-start">
                <Button className="flex items-center gap-2 cursor-pointer">
                    <MoveLeft className="size-4 rtl:rotate-180" />
                    {t('browse')}
                </Button>
            </Link>
        </div>
    );
}

function WishlistCount() {
    const t = useTranslations('wishlist');
    const { count } = useWishlist();

    return (
        <span className="font-medium text-sm text-ds-text-muted ms-1.5 sm:text-base sm:ms-2.5">
            {t('count', { count: count || 0 })}
        </span>
    );
}
