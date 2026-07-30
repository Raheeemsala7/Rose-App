
import ProductCard from './product-card'
import { getProductsApi } from '../apis/products'
import PaginationProducts from './pagination-products'

export async function ProductsGrid({ page, categoryId }: { page: number; categoryId: string }) {
    const products = await getProductsApi({ page, limit: 12, categoryId, })

    if (!products.status) {
        return <p>Error</p>
    }

    const totalPages = Number(products.payload.metadata.totalPages)


    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.payload.data.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
            <PaginationProducts page={page} totalPages={totalPages} />
        </div>
    )
}
