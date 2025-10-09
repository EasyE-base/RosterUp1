export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 2s infinite',
      }}
    />
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden">
      <div className="md:flex">
        {/* Logo skeleton */}
        <div className="md:w-56 h-56 bg-slate-100 flex-shrink-0">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-10 w-24 ml-4" />
          </div>

          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-5" />

          <div className="flex flex-wrap gap-3 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
