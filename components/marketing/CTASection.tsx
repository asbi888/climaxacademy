import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Container from '@/components/ui/Container';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-r from-sky-500 to-cyan-500">
      {/* Decorative radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(255,255,255,0.1) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Logo watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none select-none">
        <Logo variant="icon" size="xl" linkTo="" />
      </div>

      {/* Decorative border glow top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <Container size="narrow" className="relative z-10">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/80 mb-6">
            Get Started Today
          </span>

          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            <span className="text-white/90">Your Team?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Join leading Mauritius organisations who trust Climax Academy to
            develop their most valuable asset &mdash; their people.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-base font-semibold px-8 py-3.5 rounded-xl bg-white text-sky-600 hover:bg-white/90 hover:shadow-lg transition-all duration-200"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-base font-semibold px-8 py-3.5 rounded-xl bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-xs text-white/50">
            No commitment required &middot; Custom packages available &middot;
            Free consultation
          </p>
        </div>
      </Container>
    </section>
  );
}
