import ProductCard from '@/src/features/products/_components/product-card';
import { Product } from '@/src/features/products/types/product';
import { useTranslations } from 'next-intl';


interface MostPopularProductsGridProps {
  products: Product[];
}

export default function MostPopularProductsGrid({ products }: MostPopularProductsGridProps) {
  const t = useTranslations('home');

  if (products.length === 0) {
    return <p className="text-ds-text-muted text-base">{t('noProductsForOccasion')}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
