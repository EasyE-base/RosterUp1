import { HeaderMinimal } from '@/components/marketing/header-minimal';
import { HeroMinimal } from '@/components/marketing/hero-minimal';
import { FeaturesV2 } from '@/components/marketing/features-v2';
import { StatsSection } from '@/components/marketing/stats-section';
import { SportsSection } from '@/components/marketing/sports-section';
import { TestimonialsV2 } from '@/components/marketing/testimonials-v2';
import { CTASectionV2 } from '@/components/marketing/cta-section-v2';
import { FooterV2 } from '@/components/marketing/footer-v2';

export default function HomePage() {
  return (
    <>
      <HeaderMinimal />
      <main>
        <HeroMinimal />
        <StatsSection />
        <FeaturesV2 />
        <SportsSection />
        <TestimonialsV2 />
        <CTASectionV2 />
      </main>
      <FooterV2 />
    </>
  );
}
