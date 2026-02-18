export default function CertificatesLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-44" />
          <div className="skeleton h-3.5 w-64" />
        </div>
      </div>

      {/* Certificate Cards Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card overflow-hidden">
            {/* Gradient header area */}
            <div className="skeleton h-32 rounded-none" />
            {/* Card body */}
            <div className="p-6 space-y-4">
              {/* Programme title */}
              <div className="space-y-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-3.5 w-28 rounded-full" />
              </div>
              {/* Certificate details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-4 w-32" />
                </div>
                <div className="space-y-1.5">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-4 w-28" />
                </div>
              </div>
              {/* Certificate number */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="space-y-1.5">
                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton h-3.5 w-36" />
                </div>
                <div className="flex gap-2">
                  <div className="skeleton w-9 h-9 rounded-lg" />
                  <div className="skeleton w-9 h-9 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
