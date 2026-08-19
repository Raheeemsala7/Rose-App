'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, Trash2 } from 'lucide-react';
import { Button } from '@/src/shared/components/ui/button';
import { Product } from '../../products/types/product';
import AddToCart from '../../products/_components/add-to-cart';
import { calculateOriginalPrice } from '@/src/shared/lib/price.utils copy';
import { formatPrice } from '@/src/shared/lib/price.utils';


interface WishlistItemCardProps {
  product: Product;
  onRemove: () => void;
  isRemoving?: boolean;
}

export function WishlistItemCard({ product, onRemove, isRemoving }: WishlistItemCardProps) {
  // Translation
  const t = useTranslations();

  // Variables
  const isInStock = product.stock > 0;
  const currentPrice = Number(product.price);
  const originalPrice = calculateOriginalPrice(
    currentPrice,
    product.discountType as 'PERCENT' | 'FIXED',
    Number(product.discountValue)
  );
  const hasDiscount = originalPrice > currentPrice;

  return (
    <div className="flex items-center gap-4 border-b border-ds-border-subtle py-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-ds-bg-subtle">
        <Image src={product.cover} alt={product.title} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <span
          className={`text-xs font-medium ${isInStock ? 'text-ds-text-success' : 'text-ds-text-danger'}`}
        >
          {isInStock ? t('wishlist.inStock') : t('wishlist.outOfStock')}
        </span>

        <h3 className="text-sm font-semibold text-ds-text-default">{product.title}</h3>

        <div className="flex items-center gap-1">
          <span className="flex items-center gap-0.5 rounded bg-ds-bg-warning  px-1.5 py-0.5 text-xs font-semibold text-ds-text-plain">
            <Star className="size-3 fill-current" />
            {product.rating}/5
          </span>
          <span className="text-xs text-ds-text-primary">
            ({t('wishlist.ratingsCount', { count: product.ratings })})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-ds-text-default">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-ds-text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button
          variant="destructive"
          size="icon"
          onClick={onRemove}
          // isLoading={isRemoving}
          aria-label={t('wishlist.remove')}
          className="bg-ds-bg-primary-fade hover:bg-ds-bg-primary-faint px-2 py-2 group/remove transition-transform hover:scale-110 active:scale-95"
        >
          <Trash2 className="text-ds-text-danger transition-transform group-hover/remove:rotate-12" />
        </Button>

        {isInStock ? (
          <AddToCart variant="wishlist" productId={product.id} stock={product.stock} />
        ) : (
          <Button className="bg-ds-bg-primary-fade text-ds-text-primary hover:bg-ds-bg-primary-faint px-2 py-2 border-none" variant="subtle">{t('wishlist.exploreSimilar')}</Button>
        )}
      </div>
     
    </div>
    
  );
}