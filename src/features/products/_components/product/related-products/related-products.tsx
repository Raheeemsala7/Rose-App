
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';
import { IProductId } from '../product-reviews/product-reviews';
import { getProductsApi } from '../../../apis/products';
import SectionTitle from '@/src/shared/components/section-title';
import ProductsErrorBoundary from '@/src/shared/error-boundary';
import BestSellerCarouselSkeleton from '../../../skeletons/best-seller-carousel.skeleton';
import { BestSellerCarouselSlot } from '@/src/features/home/components/best-seller/best-seller-section';

export default async function RelatedProducts({ productCategoryId , rating = 3 }: {productCategoryId:string , rating?:number}) {
  // Translations
  const t = await getTranslations('product');


  // Get Related Products by Filter
  const relatedProduct = await getProductsApi({
    categoryId: productCategoryId,
    minRating: rating,
    limit: 20,
  })

  if (!relatedProduct.status) {
    return <p>dklskdl</p>
  }

  return (
    <div className="p-2.5 flex flex-col gap-4">
      {/* SectionTitle */}
      <SectionTitle title={t('related-product')} />

      {/* Related Products Carousel */}
      <div className="related p-2.5">
        <ProductsErrorBoundary>
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            <BestSellerCarouselSlot products={relatedProduct.payload.data || []} variant={'related'} />
          </Suspense>
        </ProductsErrorBoundary>
      </div>
    </div>
  );
}
