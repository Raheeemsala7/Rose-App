
import { Star } from 'lucide-react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { Product } from '../types/product';
import { Link } from '@/src/i18n/navigation';
import { Badge } from '@/src/shared/components/ui/badge';
import AddToWishlist from './add-to-wishlist';
import AddToCart from './add-to-cart';
import { calculateOriginalPrice, formatPrice } from '@/src/shared/lib/price.utils';



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
  // Translation
  const t = useTranslations('product');
  // Variables
  const totalStars = 5;
  const filledStars = Math.round(rating);

  const currentPrice = Number(price);
  // Calculate original price
  const originalPrice = calculateOriginalPrice(
    currentPrice,
    discountType as 'PERCENT' | 'FIXED',
    Number(discountValue)
  );

  // Check if product is new (created within last week)
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const isNew = !!createdAt && new Date(createdAt) >= weekAgo;

  // Check if product is hot (discount is greater than 25%)
  const isHot = discountType === 'PERCENT' && discountValue ? Number(discountValue) > 25 : false;

  return (
    <div>
      <div className="relative h-[300px] w-full rounded-2xl overflow-hidden">
        <Link href={`/products/${id}`} className="block h-full relative">
          <Image
            src={cover}
            alt={title}
            fill
            loading="eager"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute top-2 inset-e-2 flex gap-1.5">
            {stock === 0 && <Badge>{t('outOfStock')}</Badge>}
            {isNew && <Badge className="bg-white text-zinc-700 hover:bg-white">{t('new')}</Badge>}
            {isHot && (
              <Badge className="bg-burgundy-50 text-burgundy-700 hover:bg-burgundy-50">{t('hot')}</Badge>
            )}
          </div>
        </Link>

        <AddToWishlist />
      </div>

      <Link href={`/products/${id}`}>
        <h4 className="line-clamp-1 text-lg font-semibold text-ds-text-primary mt-3">{title}</h4>
      </Link>

      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, index) => (
              <Star
                key={index}
                size={18}
                className={
                  index < filledStars
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'fill-transparent text-yellow-500'
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5 mt-2">
            <span className="text-base text-ds-text-primary">{formatPrice(currentPrice)}</span>

            <span className="text-base text-zinc-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        </div>

        <AddToCart />
      </div>
    </div>
  );
}
