import ProductCard from './product-card';
import { getProductsApi } from '../apis/products';
import PaginationProducts from './pagination-products';

interface ProductsGridProps {
  page: number;
  categoryId?: string;
  occasionId?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
}

export async function ProductsGrid({
  page,
  categoryId,
  occasionId,
  minRating,
  maxPrice,
  minPrice,
}: ProductsGridProps) {
  const products = await getProductsApi({
    page,
    limit: 12,
    categoryId,
    occasionId,
    minRating,
    maxPrice,
    minPrice,
  });

  if (!products.status) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-burgundy-500 dark:text-burgundy-400 text-base">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  const totalPages = Number(products.payload.metadata.totalPages ?? 1);

  if (products.payload.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-burgundy-500 dark:text-burgundy-400 text-base">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/*
        Columns:
        mobile  (<sm):  2 columns — compact cards work well at this width
        sm–md:         2 columns
        md–lg:         3 columns (before sidebar appears)
        lg+:           3 columns (sidebar takes ~72, grid gets the rest)
        xl+:           4 columns when there is enough room
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {products.payload.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationProducts page={page} totalPages={totalPages} />
      )}
    </div>
  );
}
