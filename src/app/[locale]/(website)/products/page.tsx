import { Suspense } from 'react';
import ProductFilterPanel from '@/src/features/products/_components/sidebar-filters/product-filter-panel';
import MobileFilterDrawer from '@/src/features/products/_components/sidebar-filters/mobile-filter-drawer';
import { ProductsGrid } from '@/src/features/products/_components/products-grid';
import { ProductsGridSkeleton } from '@/src/features/products/skeletons/products-grid-skeleton';

interface SearchParams {
    page?: string;
    categoryId?: string;
    occasionId?: string;
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { page, categoryId, occasionId, minRating, maxPrice, minPrice } =
        await searchParams;
    const currentPage = Number(page) || 1;

    /* Shared filter props */
    const filterProps = {
        categoryId: categoryId || undefined,
        occasionId: occasionId || undefined,
        minRating: minRating ? Number(minRating) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    return (
        <section className="py-6 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Mobile: filter trigger button ── */}
                <div className="lg:hidden mb-4">
                    <MobileFilterDrawer>
                        <ProductFilterPanel {...filterProps} />
                    </MobileFilterDrawer>
                </div>

                {/* ── Layout: sidebar on desktop, full-width grid on mobile ── */}
                <div className="flex gap-6">

                    {/* Sidebar — desktop only */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24 rounded-2xl border border-cream-300 dark:border-burgundy-800 bg-white dark:bg-burgundy-900 p-5 space-y-6 shadow-sm">
                            <ProductFilterPanel {...filterProps} />
                        </div>
                    </aside>

                    {/* Products grid */}
                    <div className="flex-1 min-w-0">
                        <Suspense key={`${currentPage}-${JSON.stringify(filterProps)}`} fallback={<ProductsGridSkeleton />}>
                            <ProductsGrid page={currentPage} {...filterProps} />
                        </Suspense>
                    </div>

                </div>
            </div>
        </section>
    );
}
