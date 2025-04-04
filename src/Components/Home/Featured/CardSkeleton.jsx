export default function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow p-4 space-y-3 shimmerr">
      {/* Image */}
      <div className="w-full h-40 bg-gray-300 rounded-lg" />

      {/* Title and price */}
      <div className="h-5 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/3 bg-gray-300 rounded" />

      {/* Info lines */}
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
      <div className="h-4 w-2/4 bg-gray-300 rounded" />
      <div className="h-4 w-3/5 bg-gray-300 rounded" />

      {/* Button */}
      <div className="h-10 w-full bg-gray-300 rounded-lg mt-2" />
    </div>
  );
}
