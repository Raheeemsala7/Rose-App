import ProductImageGallery from '@/src/features/products/_components/product/product-image-gallery';
import ProductInfo from '@/src/features/products/_components/product/product-info';
import ProductReviews from '@/src/features/products/_components/product/product-reviews/product-reviews';
import RelatedProducts from '@/src/features/products/_components/product/related-products/related-products';
import { getSingleProductApi } from '@/src/features/products/apis/products';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations('product');

  let productData;
  try {
    const product = await getSingleProductApi(id);
    productData = product.payload.product;
  } catch {
    // API threw (product not found or server error) → show 404
    notFound();
  }

  if (!productData) notFound();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

      {/* ── Gallery + Info ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
        <ProductImageGallery product={productData} />
        <ProductInfo product={productData} />
      </div>

      {/* ── Divider ── */}
      <div className="my-10 h-px bg-cream-300 dark:bg-burgundy-800" />

      {/* ── Reviews ── */}
      <ProductReviews
        id={productData.id}
        rating={productData.rating}
        ratings={productData.ratings}
      />

      {/* ── Related products ── */}
      <RelatedProducts
        productCategoryId={productData.categoryId}
        rating={productData.rating}
      />
    </div>
  );
}
