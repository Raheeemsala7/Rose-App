import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Explore from './explore';
import BestSellerCarousel from './best-seller-carousel';
import { getProductsApi } from '@/src/features/products/apis/products';
import { Product } from '@/src/features/products/types/product';
import BestSellerCarouselSkeleton from '@/src/features/products/skeletons/best-seller-carousel.skeleton';


async function BestSellerCarouselSlot({
  products,
}: {
  products: Product[];
}) {
  const t = await getTranslations('home');

  if (products.length === 0) {
    return <div>{t('noProductsFound')}</div>;
  }

  return <BestSellerCarousel products={products} />;
}

export default async function BestSellerSection() {
  const productsApi = await getProductsApi({
    sortBy: 'bestSelling',
  });

  return (
    <div className="grid grid-cols-12 gap-9 max-w-11/12 mx-auto mt-27">
      <div className="col-span-3">
        <Explore />
      </div>

      <div className="col-span-9">
        {/* <ProductsErrorBoundary> */}
          <Suspense fallback={<BestSellerCarouselSkeleton />}>
            <BestSellerCarouselSlot products={productsApi.payload.data} />
          </Suspense>
        {/* </ProductsErrorBoundary> */}
      </div>
    </div>
  );
}
