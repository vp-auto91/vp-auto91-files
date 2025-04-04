export default function ProductSkeleton() {
  return (
    <div className="px-5 py-16">
      <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image + thumbnails */}
          <div className="w-2/3 space-y-4">
            {/* Main image skeleton */}
            <div className="w-full h-[400px] bg-gray-300 rounded-xl shimmer" />

            {/* Thumbnails */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-15 h-15 bg-gray-300 rounded shimmer"
                />
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="w-1/3 space-y-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded shimmer" />
            <div className="h-5 w-1/4 bg-gray-300 rounded shimmer" />
            <div className="h-5 w-3/4 bg-gray-300 rounded shimmer" />
            <div className="h-12 w-32 bg-gray-300 rounded-lg shimmer mt-4" />
          </div>
        </div>

        {/* Details section */}
        <div className="mt-10 space-y-4">
          <h3 className="text-lg font-semibold text-gray-400">Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border border-orange-200 rounded-xl bg-gray-100"
              >
                <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded shimmer" />
                <div className="h-5 w-3/4 bg-gray-300 rounded shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
