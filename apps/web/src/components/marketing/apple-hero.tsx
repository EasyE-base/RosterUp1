import { AppleHeader } from "@/components/navigation/apple-header";

export function AppleHero() {
  return (
    <>
      <AppleHeader />
      <section className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-14">
        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[980px] px-6 text-center">
          {/* Headline - Properly Centered */}
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-semibold leading-[1.05] tracking-[-0.015em] text-gray-900 mb-6 mx-auto">
            Where Elite
            <br />
            Athletes Meet
            <br />
            Their Teams.
          </h1>

          {/* Subheadline - Centered with max-width */}
          <p className="text-lg md:text-xl lg:text-[21px] font-normal text-gray-600 leading-[1.381] tracking-[0.011em] max-w-[660px] mx-auto mb-12">
            The premier marketplace connecting exceptional talent with championship-caliber travel sports programs.
          </p>

          {/* CTAs - Properly styled buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/browse/listings"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[17px] font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-sm hover:shadow-md min-w-[200px]"
            >
              Browse Teams
            </a>
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[17px] font-medium rounded-full bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 transition-all min-w-[200px]"
            >
              Join as Coach
            </a>
          </div>

          {/* Learn More Link */}
          <div className="mt-16">
            <a
              href="#features"
              className="text-blue-500 hover:text-blue-600 hover:underline text-[17px] transition-colors"
            >
              Learn more →
            </a>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>
    </>
  );
}
