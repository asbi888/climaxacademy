export default function LearnLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Card Skeleton */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-8 w-64" />
            <div className="skeleton h-4 w-48" />
          </div>
          <div className="hidden md:block">
            <div className="skeleton w-16 h-16 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Stats Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center gap-4">
              <div className="skeleton w-12 h-12 rounded-xl" />
              <div className="space-y-2 flex-1">
                <div className="skeleton h-7 w-12" />
                <div className="skeleton h-3.5 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning Skeleton */}
      <div>
        <div className="skeleton h-5 w-40 mb-4" />
        <div className="glass-card overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 h-32 lg:h-auto skeleton rounded-none" />
            <div className="flex-1 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="skeleton h-5 w-28 rounded-full" />
                  <div className="skeleton h-6 w-72" />
                </div>
                <div className="skeleton w-[60px] h-[60px] rounded-full" />
              </div>
              <div className="skeleton h-2 w-full rounded-full" />
              <div className="flex items-center justify-between">
                <div className="skeleton h-4 w-56" />
                <div className="skeleton h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Programmes Skeleton */}
      <div>
        <div className="skeleton h-5 w-36 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden">
              {/* Gradient header skeleton */}
              <div className="skeleton h-28 rounded-none" />
              {/* Card body */}
              <div className="p-5 space-y-4">
                <div className="skeleton h-5 w-3/4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="skeleton h-3.5 w-20" />
                    <div className="skeleton h-3.5 w-12" />
                  </div>
                  <div className="skeleton w-12 h-12 rounded-full" />
                </div>
                <div className="skeleton h-1.5 w-full rounded-full" />
                <div className="skeleton h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
