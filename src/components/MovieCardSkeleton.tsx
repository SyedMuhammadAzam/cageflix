export default function MovieCardSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="bg-zinc-800 rounded-md overflow-hidden">
        <div className="h-40 bg-zinc-700" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-3/4" />
          <div className="h-3 bg-zinc-600 rounded w-1/2" />
          <div className="h-3 bg-zinc-600 rounded w-full" />
        </div>
      </div>
    </div>
  );
}
