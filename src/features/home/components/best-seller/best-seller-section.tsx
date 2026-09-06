import { getTranslations } from 'next-intl/server';
import { Product } from '@/src/features/products/types/product';
import BestSellerCarousel from './best-seller-carousel';


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


