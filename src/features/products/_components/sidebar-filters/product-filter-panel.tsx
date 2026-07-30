import { Suspense } from "react";
import { CategoriesFilterSection } from "./categories-filter-section";
import { OccasionFilterSection } from "./occasion-filter-section";
import FilterRating from "./filter-rating";
import FilterPrice from "./filter-price";

export default function ProductFilterPanel({ categoryId, occasionId, minRating, maxPrice, minPrice }: {
    categoryId: string; occasionId: string; minRating: number; minPrice?: number;
    maxPrice?: number;
}) {
    return (
        <>
            {/* <Suspense fallback={<CategoriesSkeleton />}> */}
            <CategoriesFilterSection categoryId={categoryId} />
            {/* </Suspense> */}
            {/* <Suspense fallback={<CategoriesSkeleton />}> */}
            <OccasionFilterSection occasionId={occasionId} />
            {/* </Suspense> */}
            <FilterRating minRating={minRating} />
            <FilterPrice minPrice={minPrice} maxPrice={maxPrice} />
        </>
    );
}