export function SkeletonCard() {
  return (
    <div className="bg-bg-surface border border-border-default rounded-card overflow-hidden">
      {/* Image skeleton */}
      <div
        className="aspect-[4/3] bg-bg-surface2"
        style={{
          backgroundImage:
            'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div
          className="h-5 w-3/4 rounded bg-bg-surface2"
          style={{
            backgroundImage:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
          }}
        />
        <div
          className="h-3 w-1/2 rounded bg-bg-surface2"
          style={{
            backgroundImage:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite 0.1s',
          }}
        />
        <div className="flex justify-between items-center pt-2">
          <div
            className="h-4 w-20 rounded bg-bg-surface2"
            style={{
              backgroundImage:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite 0.2s',
            }}
          />
          <div
            className="h-3 w-16 rounded bg-bg-surface2"
            style={{
              backgroundImage:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite 0.3s',
            }}
          />
        </div>
      </div>
    </div>
  );
}
