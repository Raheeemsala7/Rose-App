import { ProductsGrid } from '@/src/features/products/_components/products-grid'
import { ProductsGridSkeleton } from '@/src/features/products/skeletons/products-grid-skeleton'
import { Suspense } from 'react'

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const { page } = await searchParams
    const currentPage = Number(page) || 1

    return (
        <section className='py-12'>
            <div className="max-w-7xl mx-auto px-4">
                <div className='grid grid-cols-[300px_1fr] gap-6'>
                    <div className='bg-red-400'>
                        SIDEBAR
                    </div>
                       <Suspense key={currentPage} fallback={<ProductsGridSkeleton />}>
                        <ProductsGrid page={currentPage} />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}
