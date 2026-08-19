import { Star } from 'lucide-react';
import ReviewsItem from './reviews';
import SectionTitle from '@/shared/components/section-title';
import { getTranslations } from 'next-intl/server';
import getProductReviews from '../../../apis/get-product-reviews.api';
import { IProduct } from '@/features/products/types/products';

export interface IProductId {
  product: IProduct;
}

export default async function ProductReviews({ product }: IProductId) {
  // Translations
  const t = await getTranslations('product.product-reviews');

  // Get Reviews Data
  const reviewsData = await getProductReviews(product?.id);

  return (
    <div className="pt-2.5 my-12.5 flex flex-col gap-4">
      {/* Section Title */}
      <SectionTitle title={t('title')} />

      {/* General Rating */}
      <div className="general-rating flex flex-col gap-1 pb-4 border-b border-b-ds-border-muted dark:border-b-ds-border-subtle">
        {/* Header */}
        <h1 className="font-semibold text-xl text-ds-text-plain">{t('general-rating')}</h1>

        {/* Rate */}
        <h2 className="font-bold text-2xl text-ds-text-plain">
          {/* Product Rating Number */}
          {product?.rating.toFixed(1)} {/* Product Rating Icon */}
          <span className="font-medium text-sm text-ds-text-soft">
            ({(product?.ratings ?? 0) > 0 ? `${product?.ratings} ${t('ratings')}` : t('no-ratings')}
            )
          </span>
        </h2>

        {/* Star Icon */}
        <span className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < (product?.rating ?? 0) ? 'fill-orange-500 text-orange-500' : 'text-orange-500'
              }
            />
          ))}
        </span>
      </div>

      {/* Reviews */}
      <ReviewsItem productId={product.id} reviews={reviewsData?.data} />
    </div>
  );
}
