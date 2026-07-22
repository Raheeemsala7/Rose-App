
import ProductCard from './product-card'
import { getProductsApi } from '../apis/products'

export async function ProductsGrid() {
    const  products = await getProductsApi({})

    if (!products.status) {
        return <p>Error</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products?.payload.data.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}
