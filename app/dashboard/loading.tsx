export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Company Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="skeleton h-7 w-56" />
          <div className="flex items-center gap-3">
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* KPI Cards Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="skeleton w-10 h-10 rounded-xl" />
              <div className="skeleton h-4 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-8 w-16" />
              <div className="skeleton h-3.5 w-28" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line / Bar chart skeleton */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="skeleton h-5 w-40" />
            <div className="skeleton h-8 w-24 rounded-lg" />
          </div>
          {/* Chart area */}
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="skeleton h-3 w-8" />
                <div
                  className="skeleton flex-1"
                  style={{ height: `${20 + Math.random() * 60}px` }}
                />
              </div>
            ))}
          </div>
          {/* X-axis labels */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-3 w-8" />
            ))}
          </div>
        </div>

        {/* Completion by programme skeleton */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="skeleton h-5 w-48" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="skeleton h-3.5 w-36" />
                  <div className="skeleton h-3.5 w-10" />
                </div>
                <div className="skeleton h-2.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Table Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers skeleton */}
        <div className="glass-card p-6">
          <div className="skeleton h-5 w-32 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50"
              >
                <div className="skeleton w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-3 w-20" />
                </div>
                <div className="text-right space-y-1.5">
                  <div className="skeleton h-4 w-10" />
                  <div className="skeleton h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity skeleton */}
        <div className="glass-card p-6">
          <div className="skeleton h-5 w-36 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-slate-200 last:border-0 last:pb-0"
              >
                <div className="skeleton w-8 h-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="skeleton h-4 w-full max-w-[280px]" />
                  <div className="skeleton h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
