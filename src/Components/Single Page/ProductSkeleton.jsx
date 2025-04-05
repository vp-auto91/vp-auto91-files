export default function ProductSkeleton() {
  return (
    <div className="px-5 py-16">
      <div className="animate-pulse">
        <div className="md:flex flex-col lg:flex-row gap-10">
          {/* Image + thumbnails - Matches ImageSlider dimensions */}
          <div className="md:w-2/3 space-y-4">
            {/* Main image skeleton - 16:9 aspect ratio */}
            <div className="relative w-full aspect-[16/9] bg-gray-300 rounded-lg shimmer" />

            {/* Thumbnails - matches ImageSlider */}
            <div className="flex justify-center gap-2 overflow-x-auto py-2">
              <div className="flex space-x-2 w-max mx-auto">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-16 h-16 bg-gray-300 rounded-lg shimmer"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="md:w-1/3 space-y-4 mt-6 md:mt-0">
            <div className="h-8 w-3/4 bg-gray-300 rounded shimmer" />
            <div className="h-6 w-1/3 bg-gray-300 rounded shimmer" />
            <div className="h-5 w-full bg-gray-300 rounded shimmer" />
            <div className="h-5 w-2/3 bg-gray-300 rounded shimmer" />
            <div className="h-5 w-4/5 bg-gray-300 rounded shimmer" />
            <div className="h-12 w-32 bg-gray-300 rounded-lg shimmer mt-6" />
          </div>
        </div>

        {/* Details section */}
        <div className="mt-16 space-y-4">
          <div className="h-6 w-1/4 bg-gray-300 rounded shimmer" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
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
