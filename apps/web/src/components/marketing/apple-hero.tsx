import { AppleHeader } from "@/components/navigation/apple-header";

export function AppleHero() {
  return (
    <>
      <AppleHeader />
      <section className="relative min-h-[100vh] flex items-center justify-center bg-gray-50">
        <div className="relative z-10 mx-auto max-w-[980px] px-4 text-center">
          <h1 className="text-[80px] font-semibold leading-[1.05] tracking-[-0.015em] text-gray-900 mb-6">
            Where Elite<br />Athletes Meet<br />Their Teams.
          </h1>
          <p className="text-[21px] font-normal text-gray-600 leading-[1.381] tracking-[0.011em] max-w-[660px] mx-auto mb-12">
            The premier marketplace connecting exceptional talent with championship-caliber travel sports programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/browse/listings" className="inline-flex items-center justify-center px-8 py-4 text-[17px] font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all min-w-[200px]">
              Browse Teams
            </a>
            <a href="/auth/signup" className="inline-flex items-center justify-center px-8 py-4 text-[17px] font-medium rounded-full bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 transition-all min-w-[200px]">
              Join as Coach
            </a>
          </div>
          <div className="mt-16">
            <a href="#features" className="text-blue-500 hover:underline text-[17px]">
              Learn more →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
