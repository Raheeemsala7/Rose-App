import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function WishlistSkeleton() {
    return (
        <div className="flex flex-col gap-4 mt-2 rounded-2xl border border-ds-border-muted p-4 sm:p-5">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-ds-border-muted last:border-b-0 last:pb-0 sm:gap-4">
                    <Skeleton className="h-28 w-24 shrink-0 rounded-xl sm:h-32 sm:w-28" />
                    <div className="flex flex-1 flex-col justify-between gap-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-20 rounded" />
                            <Skeleton className="h-9 w-9 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
