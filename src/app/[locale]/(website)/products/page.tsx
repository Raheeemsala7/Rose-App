import ProductFilterPanel from '@/src/features/products/_components/sidebar-filters/product-filter-panel'
import { ProductsGrid } from '@/src/features/products/_components/products-grid'
import { ProductsGridSkeleton } from '@/src/features/products/skeletons/products-grid-skeleton'
import { Suspense } from 'react'

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string; categoryId: string; occasionId: string; minRating: number, minPrice?: number;
        maxPrice?: number;
    }>
}) {
    const { page, categoryId, occasionId, minRating, maxPrice, minPrice } = await searchParams
    const currentPage = Number(page) || 1

    return (
        <section className='py-12'>
            <div className="max-w-7xl mx-auto px-4">
                <div className='grid grid-cols-[300px_1fr] gap-6'>
                    <aside className='max-w-full overflow-hidden space-y-4'>
                        <ProductFilterPanel categoryId={categoryId} occasionId={occasionId} minRating={minRating} minPrice={minPrice} maxPrice={maxPrice} />
                    </aside>
                    <Suspense key={currentPage} fallback={<ProductsGridSkeleton />}>
                        <ProductsGrid page={currentPage} categoryId={categoryId} occasionId={occasionId} minRating={minRating} maxPrice={maxPrice} minPrice={minPrice} />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}
