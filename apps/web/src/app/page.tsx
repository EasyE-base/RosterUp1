import { AppleHero } from '@/components/marketing/apple-hero';
import { AppleFeatures } from '@/components/marketing/apple-features';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { Footer } from '@/components/footer/footer';

export default function HomePage() {
  return (
    <main>
      <AppleHero />
      <AppleFeatures />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
