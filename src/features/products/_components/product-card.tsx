import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '../types/product';
import { Link } from '@/src/i18n/navigation';
// import AddToWishlist from './add-to-wishlist';
import { calculateOriginalPrice, formatPrice } from '@/src/shared/lib/price.utils';
import { cn } from '@/src/shared/lib/utils';

export default function ProductCard({
  id,
  title,
  rating,
  price,
  discountType,
  discountValue,
  cover,
  stock,
  createdAt,
}: Product) {
  const t = useTranslations('product');

  const filledStars  = Math.round(rating ?? 0);
  const currentPrice = Number(price);
  const originalPrice = calculateOriginalPrice(
    currentPrice,
    discountType as 'PERCENT' | 'FIXED',
    Number(discountValue),
  );
  const hasDiscount = originalPrice > currentPrice;
  const discountPct = discountType === 'PERCENT' && discountValue ? Math.round(Number(discountValue)) : null;

  const now     = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const isNew   = !!createdAt && new Date(createdAt) >= weekAgo;
  const isHot   = discountType === 'PERCENT' && Number(discountValue) > 25;
  const isOut   = stock === 0;

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl overflow-hidden',
        'bg-white dark:bg-burgundy-900',
        'border border-cream-200 dark:border-burgundy-800',
        'shadow-sm hover:shadow-md dark:shadow-none',
        'transition-shadow duration-200',
      )}
    >
      {/* ── Image ── */}
      <div className="relative h-52 w-full overflow-hidden bg-cream-100 dark:bg-burgundy-800">
        <Link href={`/products/${id}`} className="block h-full">
          <Image
            src={cover}
            alt={title}
            fill
            loading="eager"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Out of stock overlay */}
          {isOut && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-sm font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                {t('outOfStock')}
              </span>
            </div>
          )}
        </Link>

        {/* Badges — top start */}
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {isNew && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-burgundy-700 text-cream-50">
              {t('new')}
            </span>
          )}
          {isHot && discountPct && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blush-500 text-white">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Wishlist button — top end */}
        {/* <AddToWishlist productId={id} /> */}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-2 p-3.5 flex-1">
        {/* Stars */}
        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < filledStars ? 'fill-gold-500 text-gold-500' : 'fill-transparent text-gold-300 dark:text-gold-700'}
            />
          ))}
          <span className="ms-1 text-xs text-burgundy-400 dark:text-burgundy-500">
            {(rating ?? 0).toFixed(1)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${id}`} className="no-underline">
          <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-burgundy-900 dark:text-cream-100 group-hover:text-burgundy-600 dark:group-hover:text-blush-300 transition-colors">
            {title}
          </h4>
        </Link>

        {/* Price row + cart button */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-col">
            <span className="text-base font-bold text-burgundy-800 dark:text-cream-100">
              {formatPrice(currentPrice)}
              <span className="text-xs font-medium text-burgundy-400 dark:text-burgundy-500 ms-1">EGP</span>
            </span>
            {hasDiscount && (
              <span className="text-xs text-burgundy-300 dark:text-burgundy-600 line-through">
                {formatPrice(originalPrice)} EGP
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            aria-label={t('addToCart')}
            disabled={isOut}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl transition-colors cursor-pointer flex-shrink-0',
              isOut
                ? 'bg-cream-200 dark:bg-burgundy-800 text-burgundy-300 cursor-not-allowed'
                : 'bg-burgundy-800 dark:bg-blush-600 text-cream-50 hover:bg-burgundy-700 dark:hover:bg-blush-500',
            )}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
