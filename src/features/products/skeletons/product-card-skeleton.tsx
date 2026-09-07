export default function ProductCardSkeleton({ i }: { i: number }) {
  return (
    <div key={i} className="flex flex-col rounded-2xl overflow-hidden animate-pulse bg-white dark:bg-burgundy-900 border border-cream-200 dark:border-burgundy-800">
      {/* Image placeholder */}
      <div className="h-52 w-full bg-cream-200 dark:bg-burgundy-800" />

      {/* Body placeholder */}
      <div className="p-3.5 flex flex-col gap-2.5">
        {/* Stars row */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="h-3 w-3 rounded-full bg-cream-300 dark:bg-burgundy-700" />
          ))}
        </div>
        {/* Title */}
        <div className="h-4 w-full rounded bg-cream-300 dark:bg-burgundy-700" />
        <div className="h-4 w-3/4 rounded bg-cream-300 dark:bg-burgundy-700" />
        {/* Price + button */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-1">
            <div className="h-5 w-20 rounded bg-cream-300 dark:bg-burgundy-700" />
            <div className="h-3 w-16 rounded bg-cream-200 dark:bg-burgundy-800" />
          </div>
          <div className="h-9 w-9 rounded-xl bg-cream-300 dark:bg-burgundy-700" />
        </div>
      </div>
    </div>
  );
}
