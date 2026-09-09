import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function AddressStepSkeleton() {
    return (
        <div className="space-y-3 max-h-88">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="relative rounded-2xl border-2 border-ds-border-subtle bg-ds-plain px-4 py-3.5"
                >
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-32 rounded-md" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-5 w-28 rounded-md" />
                        </div>
                    </div>
                    <Skeleton className="mt-3 h-8 w-56 rounded-full" />
                </div>
            ))}
        </div>
    );
}
