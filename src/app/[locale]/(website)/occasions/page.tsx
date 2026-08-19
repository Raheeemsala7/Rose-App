import OccasionsGrid from "@/src/features/occasions/components/occasions-grid";
import OccasionsPageHeader from "@/src/features/occasions/components/occasions-page-header";
import { Suspense } from "react";


export default function OccasionsPage() {
    return (
        <main className="max-w-7xl w-full mx-auto px-4 py-8">
            <div className="space-y-12">
                <OccasionsPageHeader />
                {/* <Suspense fallback={<OccasionsGridSkeleton />}> */}
                    <OccasionsGrid />
                {/* </Suspense> */}
            </div>
        </main>
    );
}