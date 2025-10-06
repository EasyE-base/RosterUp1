import { AppleHero } from "@/components/marketing/apple-hero";
import { AppleFeatures } from "@/components/marketing/apple-features";

export default function HomePage() {
  return (
    <main>
      <AppleHero />
      <AppleFeatures />
      
      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[980px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[48px] font-semibold text-gray-900">10K+</div>
              <div className="text-[17px] text-gray-600">Active Teams</div>
            </div>
            <div>
              <div className="text-[48px] font-semibold text-gray-900">50K+</div>
              <div className="text-[17px] text-gray-600">Players</div>
            </div>
            <div>
              <div className="text-[48px] font-semibold text-gray-900">500+</div>
              <div className="text-[17px] text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-[48px] font-semibold text-gray-900">100%</div>
              <div className="text-[17px] text-gray-600">Free to Browse</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-[660px] px-4 text-center">
          <h2 className="text-[48px] font-semibold text-gray-900 tracking-[-0.003em] leading-[1.08] mb-6">
            Start your journey today.
          </h2>
          <p className="text-[21px] text-gray-600 mb-12">
            Join thousands of athletes and coaches connecting on the premier platform for competitive youth sports.
          </p>
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-[17px] font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            Get Started Free
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-[980px] px-4">
          <div className="text-center text-[14px] text-gray-500">
            <p className="mb-4">© 2025 RosterUp. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-6">
              <a href="/privacy" className="hover:text-gray-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-700">Terms of Service</a>
              <a href="/contact" className="hover:text-gray-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
