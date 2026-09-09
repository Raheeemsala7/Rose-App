'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Loader2, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/src/shared/lib/utils';
import { Button } from '@/src/shared/components/ui/button';
import CartEmpty from './cart-empty';
import CartSkeleton from './skeleton/cart-skeleton';
import CartFooter from './cart-footer';
import { useCart } from '../hooks/cart.hooks';
import { useRemoveItemCart } from '../hooks/add-cart.hook';

export default function CartBody() {
    const t = useTranslations('cart-list');
    const [removingId, setRemovingId] = useState<string | null>(null);

    const { isEmpty, products, isLoading } = useCart();
    const { mutateAsync } = useRemoveItemCart();

    async function removeItem(id: string) {
        setRemovingId(id);
        try {
            await mutateAsync(id);
        } catch {
            toast.error(t('cart-remove-error'));
        } finally {
            setRemovingId(null);
        }
    }

    if (isLoading) return <CartSkeleton />;
    if (isEmpty) return <CartEmpty />;

    return (
        <ul className="flex flex-col gap-4 mt-2 rounded-2xl border border-ds-border-muted p-4 sm:p-5 max-h-[600px] overflow-y-auto">
            {products?.map((item) => {
                const removeId = item.cartId ?? item.product.id;
                const isRemoving = removingId === item.product.id;

                return (
                    <li
                        key={item.product.id}
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
                            {/* Top row */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <h3 className="font-semibold text-base text-ds-text-primary truncate sm:text-lg">
                                        {item.product.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="size-4 text-orange-500 fill-orange-500 shrink-0" />
                                        <p className="text-sm text-ds-text-default">
                                            {t.rich('cart-rating', {
                                                rating: Number(item.product.rating.toFixed(1)),
                                                bold: (chunks) => <span className="font-medium">{chunks}</span>,
                                            })}
                                        </p>
                                        <span className="text-sm font-medium text-blue-600">
                                            ({t('cart-rating-count', { count: Number(item.product.ratings) })})
                                        </span>
                                    </div>
                                </div>

                                {/* Remove button */}
                                <Button
                                    onClick={() => removeItem(removeId)}
                                    variant="destructive"
                                    size="sm"
                                    disabled={isRemoving}
                                    className={cn('shrink-0 flex items-center gap-1.5 cursor-pointer', isRemoving && 'opacity-70')}
                                >
                                    {isRemoving
                                        ? <Loader2 className="size-4 animate-spin" />
                                        : <Trash2 className="size-4" />
                                    }
                                    <span className="hidden sm:inline">{t('cart-remove')}</span>
                                </Button>
                            </div>

                            {/* Footer — price + qty controls */}
                            <CartFooter item={item} />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
