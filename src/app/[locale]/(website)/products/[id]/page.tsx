import ProductImageGallery from '@/src/features/products/_components/product/product-image-gallery'
import ProductInfo from '@/src/features/products/_components/product/product-info'
import { getProductApi } from '@/src/features/products/apis/products';
import React from 'react'

export default async function page({params} : {params: Promise<{id:string}>}) {
  const {id} = await params;
  console.log("id" , id)
  const product = await getProductApi(id);
  
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
      {/* <ProductReviews product={product} /> */}

      {/* Related Product */}
      {/* <RelatedProducts product={product} /> */}
    </div>
  )
}
