import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function WishlistItemSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-ds-border-subtle py-4">
      <Skeleton className="size-20 shrink-0 rounded-lg" />

      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="flex flex-col items-end gap-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}