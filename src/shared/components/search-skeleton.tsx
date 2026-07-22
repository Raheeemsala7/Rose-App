import { Skeleton } from "./ui/skeleton";

export const SearchResultSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-start gap-4">
                    <Skeleton className="bg-zinc-300 dark:bg-zinc-600 size-20 rounded-md" />

                    <div className="flex flex-1 justify-between">
                        <div className="space-y-2">
                            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-5 w-44" />
                            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-24" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-28" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};