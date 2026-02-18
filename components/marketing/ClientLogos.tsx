import Container from '@/components/ui/Container';

const clients = [
  'Rogers Capital',
  'IBL Group',
  'Currimjee Jeewanjee',
  'Harel Mallac',
  'Ceridian Mauritius',
  'MCB Group',
];

export default function ClientLogos() {
  return (
    <section className="relative py-16 md:py-20">
      {/* Divider lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <Container>
        <div className="text-center">
          {/* Heading */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-muted/60 mb-10">
            Trusted by Leading Mauritius Organisations
          </p>

          {/* Client names row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
            {clients.map((client) => (
              <span
                key={client}
                className="text-base md:text-lg font-semibold tracking-wider text-slate-300 hover:text-slate-400 transition-colors duration-300 select-none"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
