import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function ProductsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-500 p-4">
            <Skeleton className="aspect-square w-full rounded-lg bg-zinc-300 dark:bg-zinc-700" />

            <div className="mt-4 space-y-3">
                <Skeleton className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700" />
                <Skeleton className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-700" />

                <div className="flex justify-between">
                    <Skeleton className="h-5 w-20 bg-zinc-300 dark:bg-zinc-700" />
                    <Skeleton className="h-5 w-16 bg-zinc-300 dark:bg-zinc-700" />
                </div>
            </div>
        </div>
    );
}