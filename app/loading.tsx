import Logo from '@/components/ui/Logo';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Logo with glow pulse */}
        <div className="flex justify-center mb-6 animate-glow-pulse rounded-2xl p-4">
          <Logo variant="full" size="xl" linkTo="" />
        </div>

        {/* Loading text */}
        <p className="text-brand-muted text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
