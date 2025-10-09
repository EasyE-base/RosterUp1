import { AppleHero } from '@/components/marketing/apple-hero';
import { AppleFeatures } from '@/components/marketing/apple-features';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';

export default function HomePage() {
  return (
    <main>
      <AppleHero />
      <AppleFeatures />
      <TestimonialsSection />
    </main>
  );
}
