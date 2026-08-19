import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Product } from '@/src/features/products/types/product';
import BestSellerCarousel from './best-seller-carousel';
import { getProductsApi } from '@/src/features/products/apis/products';
import Explore from './explore';
import ProductsErrorBoundary from '@/src/shared/error-boundary';
import BestSellerCarouselSkeleton from '@/src/features/products/skeletons/best-seller-carousel.skeleton';


export async function BestSellerCarouselSlot({
  products,
  variant = 'default',
}: {
  variant?: 'default' | 'related';
  products: Product[];
}) {
  const t = await getTranslations('home');

  if (products.length === 0) {
    return <div>{t('noProductsFound')}</div>;
  }

  return <BestSellerCarousel products={products} variant={variant} />;
}

// export default async function BestSellerSection() {
//   const products = await getProductsApi({
//     sortBy: 'bestSelling',
//   });

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 max-w-11/12 mx-auto mt-27">
//       <div className="lg:col-span-3">
//         <Explore />
//       </div>

//       <div className="lg:col-span-9">
//         <ProductsErrorBoundary>
//           <Suspense fallback={<BestSellerCarouselSkeleton />}>
//             <BestSellerCarouselSlot products={products.payload.data || []} />
//           </Suspense>
//         </ProductsErrorBoundary>
//       </div>
//     </div>
//   );
// }
