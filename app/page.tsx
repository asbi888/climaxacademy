import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/marketing/HeroSection';
import StatsBar from '@/components/marketing/StatsBar';
import FeaturedProgrammes from '@/components/marketing/FeaturedProgrammes';
import WhyClimaxSection from '@/components/marketing/WhyClimaxSection';
import TestimonialsCarousel from '@/components/marketing/TestimonialsCarousel';
import ClientLogos from '@/components/marketing/ClientLogos';
import CTASection from '@/components/marketing/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturedProgrammes />
        <WhyClimaxSection />
        <TestimonialsCarousel />
        <ClientLogos />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
