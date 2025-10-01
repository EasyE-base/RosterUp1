import { HeaderV2 } from '@/components/marketing/header-v2';
import { HeroV2 } from '@/components/marketing/hero-v2';
import { FeaturesV2 } from '@/components/marketing/features-v2';
import { StatsSection } from '@/components/marketing/stats-section';
import { SportsSection } from '@/components/marketing/sports-section';
import { TestimonialsV2 } from '@/components/marketing/testimonials-v2';
import { CTASectionV2 } from '@/components/marketing/cta-section-v2';
import { FooterV2 } from '@/components/marketing/footer-v2';

export default function HomePage() {
  return (
    <>
      <HeaderV2 />
      <main>
        <HeroV2 />
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
