import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { Testimonials } from '@/components/marketing/testimonials';
import { Pricing } from '@/components/marketing/pricing';
import { CTASection } from '@/components/marketing/cta-section';
import { Footer } from '@/components/marketing/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
