import { Package, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddToCart from '../add-to-cart';
import AddToWishlist from '../add-to-wishlist';
import { calculateOriginalPrice } from '@/src/shared/lib/price.utils';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  // Translations
  const t = useTranslations('product');

  // Variables
  const currentPrice = Number(product.price);

  const isValidDiscountType =
    product.discountType === 'PERCENT' || product.discountType === 'FIXED';
  const originalPrice = isValidDiscountType
    ? calculateOriginalPrice(
        currentPrice,
        product.discountType as 'PERCENT' | 'FIXED',
        Number(product.discountValue)
      )
    : currentPrice;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col h-full">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-ds-plain dark:">{product.title}</h1>

        {/* Price and Stock */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {originalPrice > currentPrice && (
            <span className="text-2xl md:text-3xl font-bold text-ds-subtle line-through">
              {Math.round(originalPrice)}
            </span>
          )}
          <span className="text-2xl md:text-3xl font-bold text-ds-plain">
            {currentPrice}
            <span className="text-lg md:text-xl text-ds-plain font-semibold mx-1">
              {t('currency')}
            </span>
          </span>
          {!isOutOfStock && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-ds-soft px-3 py-1 text-sm font-medium text-ds-plain">
              <Package className="size-5 text-zinc-500" />
              {t('leftInStock', { count: product.stock })}
            </span>
          )}
          {isOutOfStock && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-600">
              <Package className="size-5 text-red-600" />
              {t('outOfStock')}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 border-y border-ds-soft py-4">
          <Star className="size-5 fill-yellow-500 text-yellow-500" />
          <span className="text-sm text-ds-text-plain">
            {t('rating', { rating: (product.rating ?? 0).toFixed(1) })}
          </span>
          <span className="text-sm text-ds-info cursor-pointer">
            {t('ratingsCount', { count: product._count.reviews })}
          </span>
        </div>

        {/* Description */}
        <div className="max-h-48 overflow-y-auto mt-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Add to cart and wishlist */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        {/* <AddToWishlist variant="details" productId={product.id} />
        <AddToCart variant="details" stock={product.stock} productId={product.id} /> */}
      </div>
    </div>
  );
}
