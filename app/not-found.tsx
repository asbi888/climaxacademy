import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg relative flex items-center justify-center overflow-hidden">
      {/* Animated gradient background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-emerald/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo variant="full" size="lg" linkTo="/" />
        </div>

        {/* 404 number */}
        <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-serif font-bold leading-none text-gradient mb-2 select-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-brand-muted max-w-md mx-auto mb-10 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTA Button */}
        <Link href="/">
          <Button variant="primary" size="lg">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
