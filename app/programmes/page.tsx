import type { Metadata } from 'next';
import { getDb } from '@/db';
import type { Programme } from '@/db';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Container from '@/components/ui/Container';
import ProgrammeCatalogueClient from '@/components/marketing/ProgrammeCatalogueClient';

export const metadata: Metadata = {
  title: 'Programme Catalogue | Climax Academy',
  description:
    'Discover world-class corporate training programmes in leadership, communication, conflict resolution, and more. Powered by Climax Production Ltd.',
};

export default function ProgrammesPage() {
  const db = getDb();

  const programmes = db
    .prepare('SELECT * FROM programmes ORDER BY id')
    .all() as Programme[];

  // Extract unique categories
  const categories = [...new Set(programmes.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background radials */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56,189,248,0.07) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(217,119,6,0.04) 0%, transparent 50%)',
          }}
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text mb-6 leading-tight">
              Programme{' '}
              <span className="text-gradient">Catalogue</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-muted leading-relaxed">
              Discover world-class training programmes designed to elevate your team&apos;s
              capabilities. From leadership essentials to advanced conflict resolution,
              find the perfect programme for your organisation.
            </p>
          </div>
        </Container>
      </section>

      {/* Catalogue section */}
      <section className="pb-24">
        <Container>
          <ProgrammeCatalogueClient
            programmes={programmes}
            categories={categories}
          />
        </Container>
      </section>

      <Footer />
    </div>
  );
}
