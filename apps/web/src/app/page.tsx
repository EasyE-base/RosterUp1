import { HeaderMinimal } from '@/components/marketing/header-minimal';
import { HeroMinimal } from '@/components/marketing/hero-minimal';
import { StatsMinimal } from '@/components/marketing/stats-minimal';
import { FeaturesMinimal } from '@/components/marketing/features-minimal';
import { SportsGallery } from '@/components/marketing/sports-gallery';
import { TestimonialsMinimal } from '@/components/marketing/testimonials-minimal';
import { CTAMinimal } from '@/components/marketing/cta-minimal';
import { FooterMinimal } from '@/components/marketing/footer-minimal';

export default function HomePage() {
  return (
    <>
      <HeaderMinimal />
      <main>
        <HeroMinimal />
        <StatsMinimal />
        <FeaturesMinimal />
        <SportsGallery />
        <TestimonialsMinimal />
        <CTAMinimal />
      </main>
      <FooterMinimal />
    </>
  );
}
