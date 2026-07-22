export default function ProductCardSkeleton({ i }: { i: number }) {
  return (
    <div key={i} className="w-75.5 animate-pulse">
      <div className="h-[300px] w-full rounded-2xl bg-gray-100" />
      <div className="h-6 w-full bg-gray-100 rounded mt-3 mb-2.5" />
      <div className="h-6 w-1/2 bg-gray-100 rounded mb-2" />
      <div className="flex gap-2">
        <div className="h-4 w-16 bg-gray-100 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
