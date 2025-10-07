import { AppleHero } from '@/components/marketing/apple-hero';
import { AppleFeatures } from '@/components/marketing/apple-features';

export default function HomePage() {
  return (
    <main>
      <AppleHero />
      <AppleFeatures />
      {/* Stats removed */}
    </main>
  );
}
