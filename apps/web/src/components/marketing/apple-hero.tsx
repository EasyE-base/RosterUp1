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
            Connect Players<br />With Organizations.
          </h1>
          <p className="text-lg md:text-[21px] text-white/90 leading-relaxed max-w-[660px] mx-auto mb-10">
            The premier marketplace for youth sports. Organizations manage multiple teams. Players build profiles and find their perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/auth/signup?type=organization" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full bg-blue-500 px-8 text-[17px] font-medium text-white hover:bg-blue-600 shadow-lg">
              Join as Organization
            </a>
            <a href="/auth/signup?type=player" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-8 text-[17px] font-medium text-white hover:bg-white/20">
              Join as Player
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Free to Browse</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secure Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trusted by Elite Programs</span>
            </div>
          </div>

          <div className="mt-12">
            <a href="#features" className="text-[17px] font-medium text-white/90 hover:text-white">Learn more →</a>
          </div>
        </div>
      </section>
    </>
  );
}
