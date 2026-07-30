import { Suspense } from "react";
import { CategoriesFilterSection } from "./categories-filter-section";




export default function ProductFilterPanel({ categoryId, occasionId }: { categoryId: string; occasionId: string }) {

    return (
        <>
            {/* <Suspense fallback={<CategoriesSkeleton />}> */}
            <CategoriesFilterSection categoryId={categoryId} />
            {/* </Suspense> */}
        </>
    );
}