import { Package, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { calculateOriginalPrice } from '@/src/shared/lib/price.utils';
import { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations('product');

  const currentPrice = Number(product.price);
  const isValidDiscountType =
    product.discountType === 'PERCENT' || product.discountType === 'FIXED';
  const originalPrice = isValidDiscountType
    ? calculateOriginalPrice(
        currentPrice,
        product.discountType as 'PERCENT' | 'FIXED',
        Number(product.discountValue),
      )
    : currentPrice;

  const hasDiscount  = originalPrice > currentPrice;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Title ── */}
      <h1 className="text-2xl md:text-3xl font-bold text-burgundy-900 dark:text-cream-50 leading-snug">
        {product.title}
      </h1>

      {/* ── Price block ── */}
      <div className="flex flex-wrap items-end gap-2">
        <span className="text-3xl md:text-4xl font-extrabold text-burgundy-800 dark:text-cream-100">
          {currentPrice}
          <span className="text-lg font-semibold text-burgundy-400 dark:text-burgundy-400 ms-1">
            {t('currency')}
          </span>
        </span>
        {hasDiscount && (
          <span className="text-xl font-medium text-burgundy-300 dark:text-burgundy-600 line-through">
            {Math.round(originalPrice)} {t('currency')}
          </span>
        )}

        {/* Stock badge */}
        {isOutOfStock ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400">
            <Package size={15} />
            {t('outOfStock')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200 dark:bg-burgundy-800 px-3 py-1 text-sm font-medium text-burgundy-600 dark:text-cream-300">
            <Package size={15} className="text-burgundy-400 dark:text-blush-400" />
            {t('leftInStock', { count: product.stock })}
          </span>
        )}
      </div>

      {/* ── Rating row ── */}
      <div className="flex items-center gap-3 border-y border-cream-300 dark:border-burgundy-800 py-4">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={17}
              className={
                i < Math.round(product.rating ?? 0)
                  ? 'fill-gold-500 text-gold-500'
                  : 'fill-transparent text-gold-300 dark:text-gold-700'
              }
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-burgundy-700 dark:text-cream-200">
          {(product.rating ?? 0).toFixed(1)}
        </span>
        <span className="text-sm text-burgundy-400 dark:text-burgundy-500 cursor-pointer hover:underline">
          {t('ratingsCount', { count: product._count.reviews })}
        </span>
      </div>

      {/* ── Description ── */}
      <div className="max-h-48 overflow-y-auto">
        <p className="text-sm leading-relaxed text-burgundy-600 dark:text-cream-300">
          {product.description}
        </p>
      </div>

      {/* ── Actions (currently commented out — preserved as placeholder) ── */}
      <div className="flex items-center gap-3 mt-auto">
        {/* <AddToWishlist variant="details" productId={product.id} />
        <AddToCart variant="details" stock={product.stock} productId={product.id} /> */}
      </div>
    </div>
  );
}
