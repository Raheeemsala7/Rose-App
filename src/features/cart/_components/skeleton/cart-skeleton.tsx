import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <>
      {/* Cart Head Skeleton */}
      <div className="cart-head flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 bg-zinc-300 dark:bg-zinc-700" />
          <Skeleton className="h-6 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
        <Skeleton className="h-10 w-28 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      </div>

      {/* Cart Total Price Skeleton */}
      <div className="flex items-center justify-between mt-6">
        <Skeleton className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700" />
        <Skeleton className="h-8 w-24 bg-zinc-300 dark:bg-zinc-700" />
      </div>

      {/* Cart Body Skeleton */}
      <div className="cart-body flex flex-col gap-5 p-5 mt-6 border border-zinc-200 dark:border-zinc-500 rounded-lg">
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>

      {/* Continue Shopping Button Skeleton */}
      <Skeleton className="w-53.25 h-11 rounded-md mt-6 bg-zinc-300 dark:bg-zinc-700" />
    </>
  );
}

function CartItemSkeleton() {
  return (
    <div className="item pb-5 border-b border-zinc-200 dark:border-zinc-500 flex gap-4">
      {/* Image Box */}
      <Skeleton className="w-29.25 h-35 rounded-lg shrink-0 bg-zinc-300 dark:bg-zinc-700" />

      {/* Content */}
      <div className="content grow flex flex-col justify-between gap-2.5">
        {/* Details */}
        <div className="details flex items-center gap-1.5">
          <div className="left grow flex flex-col gap-1.5">
            {/* Title */}
            <Skeleton className="h-6 w-3/4 bg-zinc-300 dark:bg-zinc-700" />

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-5 w-16 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-5 w-20 bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>

          {/* Remove Button */}
          <Skeleton className="h-10 w-24 rounded-md bg-zinc-300 dark:bg-zinc-700" />
        </div>

        {/* Footer */}
        <div className="footer flex justify-between">
          {/* Price */}
          <Skeleton className="h-8 w-24 bg-zinc-300 dark:bg-zinc-700" />

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-12.25 h-12.25 rounded-md bg-zinc-300 dark:bg-zinc-700" />
            <Skeleton className="w-25.75 h-12.25 rounded-md bg-zinc-300 dark:bg-zinc-700" />
            <Skeleton className="w-12.25 h-12.25 rounded-md bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
