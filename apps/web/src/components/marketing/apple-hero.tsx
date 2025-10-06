import { AppleHeader } from '@/components/navigation/apple-header';

export function AppleHero() {
  return (
    <>
      <AppleHeader />
      <section className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-28">
        <div className="mx-auto max-w-[980px] px-6 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-[80px] font-semibold leading-tight tracking-tight text-gray-900 mb-6">
            Where Elite<br />Athletes Meet<br />Their Teams.
          </h1>
          <p className="text-lg md:text-[21px] text-gray-600 leading-relaxed max-w-[660px] mx-auto mb-10">
            The premier marketplace connecting exceptional talent with championship‑caliber travel sports programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/browse/listings" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full bg-blue-500 px-8 text-[17px] font-medium text-white hover:bg-blue-600">
              Browse Teams
            </a>
            <a href="/auth/signup" className="inline-flex min-w-[220px] h-12 items-center justify-center rounded-full border border-blue-500 bg-white px-8 text-[17px] font-medium text-blue-500 hover:bg-blue-50">
              Join as Coach
            </a>
          </div>
          <div className="mt-12">
            <a href="#features" className="text-[17px] font-medium text-blue-600 hover:text-blue-700">Learn more →</a>
          </div>
        </div>
      </section>
    </>
  );
}
