'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/src/shared/lib/utils';
import { Button } from '@/src/shared/components/ui/button';
import { formatLocaleNumber } from '@/src/shared/lib/utils/format-number';
import WishlistEmpty from './wishlist-empty';
import WishlistSkeleton from './skeleton/wishlist-skeleton';
import { useWishlist, useToggleWishlist } from '../hooks/wishlist.hooks';
import { useAddToCart } from '@/src/features/cart/hooks/add-cart.hook';

export default function WishlistBody() {
    const t = useTranslations('wishlist');
    const tCart = useTranslations('cart-list');
    const locale = useLocale();
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [addingId, setAddingId] = useState<string | null>(null);

    const { items, isEmpty, isWishlistLoading, isLoading } = useWishlist();
    const { mutateAsync: toggle } = useToggleWishlist();
    const { mutateAsync: addToCart } = useAddToCart();

    async function handleRemove(productId: string) {
        setRemovingId(productId);
        try {
            await toggle(productId);
        } finally {
            setRemovingId(null);
        }
    }

    async function handleAddToCart(productId: string) {
        setAddingId(productId);
        try {
            await addToCart({ productId, quantity: 1 });
            toast.success(tCart('cart-button'));
        } catch {
            toast.error('Failed to add to cart');
        } finally {
            setAddingId(null);
        }
    }

    if (isLoading) return <WishlistSkeleton />;
    if (isWishlistLoading) return <WishlistSkeleton />;
    if (isEmpty) return <WishlistEmpty />;

    return (
        <ul className="flex flex-col gap-4 mt-2 rounded-2xl border border-ds-border-muted p-4 sm:p-5">
            {items.map((item) => {
                const isRemoving = removingId === item.product.id;
                const isAdding = addingId === item.product.id;

                return (
                    <li
                        key={item.wishlistId}
                        className="flex gap-3 pb-4 border-b border-ds-border-muted last:border-b-0 last:pb-0 sm:gap-4"
                    >
                        {/* Thumbnail */}
                        <div className="relative shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden">
                            <Image
                                src={item.product.cover}
                                alt={item.product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 96px, 112px"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between flex-1 min-w-0 gap-2">
                            {/* Top */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <h3 className="font-semibold text-base text-ds-text-primary truncate sm:text-lg">
                                        {item.product.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="size-4 text-orange-500 fill-orange-500 shrink-0" />
                                        <span className="text-sm text-ds-text-default">
                                            {Number(item.product.rating.toFixed(1))}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => handleRemove(item.product.id)}
                                    variant="destructive"
                                    size="sm"
                                    disabled={isRemoving}
                                    className={cn('shrink-0 cursor-pointer', isRemoving && 'opacity-70')}
                                >
                                    {isRemoving
                                        ? <Loader2 className="size-4 animate-spin" />
                                        : <Trash2 className="size-4" />
                                    }
                                    <span className="hidden sm:inline ms-1.5">{t('remove')}</span>
                                </Button>
                            </div>

                            {/* Bottom — price + add to cart */}
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-lg text-ds-text-plain sm:text-xl">
                                    {formatLocaleNumber(Number(item.product.price), locale)}
                                    <span className="ms-1 text-sm font-medium text-ds-text-muted">
                                        {tCart('cart-currency')}
                                    </span>
                                </span>

                                <Button
                                    size="sm"
                                    disabled={isAdding}
                                    onClick={() => handleAddToCart(item.product.id)}
                                    className="flex items-center gap-1.5 cursor-pointer"
                                >
                                    {isAdding
                                        ? <Loader2 className="size-4 animate-spin" />
                                        : <ShoppingCart className="size-4" />
                                    }
                                    <span className="hidden sm:inline">{t('add-to-cart')}</span>
                                </Button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
