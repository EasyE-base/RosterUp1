import { AppleHeader } from '@/components/navigation/apple-header';
import Image from 'next/image';

export function AppleHero() {
  return (
    <>
      <AppleHeader />
      <section className="relative min-h-[100vh] flex items-center justify-center pt-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-baseball-field.jpg"
            alt="Baseball field at sunset"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[980px] px-6 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-[80px] font-semibold leading-tight tracking-tight text-white mb-6">
            Where Elite<br />Athletes Meet<br />Their Teams.
          </h1>
          <p className="text-lg md:text-[21px] text-white/90 leading-relaxed max-w-[660px] mx-auto mb-10">
            The premier marketplace connecting exceptional talent with championship‑caliber travel sports programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/browse/listings" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full bg-blue-500 px-8 text-[17px] font-medium text-white hover:bg-blue-600 shadow-lg">
              Browse Teams
            </a>
            <a href="/auth/signup" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-8 text-[17px] font-medium text-white hover:bg-white/20">
              Join as Coach
            </a>
          </div>
          <div className="mt-12">
            <a href="#features" className="text-[17px] font-medium text-white/90 hover:text-white">Learn more →</a>
          </div>
        </div>
      </section>
    </>
  );
}
