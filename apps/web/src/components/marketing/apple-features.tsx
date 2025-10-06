interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <h3 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-base md:text-[17px] text-gray-600 leading-[1.47] max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}

export function AppleFeatures() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white flex items-center justify-center">
      {/* Centered content wrapper */}
      <div className="w-full max-w-[980px] px-6">
        {/* Section Header - Centered */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold text-gray-900 tracking-[-0.003em] leading-[1.08] mb-6">
            Everything you need to
            <br />
            compete at the highest level.
          </h2>
          <p className="text-lg md:text-xl lg:text-[21px] text-gray-600 leading-[1.381] max-w-[660px] mx-auto">
            A comprehensive platform designed for ambitious athletes and championship-caliber programs.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <FeatureCard
            title="Browse Teams"
            description="Discover elite travel sports teams across the nation. Filter by sport, location, and skill level."
          />
          <FeatureCard
            title="Showcase Talent"
            description="Create a standout profile with stats and achievements. Get discovered by coaches actively recruiting."
          />
          <FeatureCard
            title="Streamlined Process"
            description="Manage tryouts, review applications, and build championship rosters all in one platform."
          />
        </div>
      </div>
    </section>
  );
}
