import ProductImageGallery from '@/src/features/products/_components/product/product-image-gallery'
import ProductInfo from '@/src/features/products/_components/product/product-info'
import ProductReviews from '@/src/features/products/_components/product/product-reviews/product-reviews';
import RelatedProducts from '@/src/features/products/_components/product/related-products/related-products';
import { getSingleProductApi } from '@/src/features/products/apis/products';

export default async function page({params} : {params: Promise<{id:string}>}) {
  const {id} = await params;
  const product = await getSingleProductApi(id);
  
  const productData = product.payload.product
  console.log("productData" , productData)
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Product gallery & info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-17.5">
        <ProductImageGallery product={productData} />
        <ProductInfo product={productData} /> 
    </div>

      {/* Product Reviews */}
      <ProductReviews id={productData.id} rating={productData.rating} ratings={productData.ratings} />

      {/* Related Product */}
      <RelatedProducts productCategoryId={productData.categoryId} rating={productData.rating} />
    </div>
  )
}
