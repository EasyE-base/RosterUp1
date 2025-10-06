interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <h3 className="text-[28px] font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-[17px] text-gray-600 leading-[1.47]">{description}</p>
    </div>
  );
}

export function AppleFeatures() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="mx-auto max-w-[980px] px-4">
        <div className="text-center mb-20">
          <h2 className="text-[48px] font-semibold text-gray-900 tracking-[-0.003em] leading-[1.08] mb-4">
            Everything you need to
            <br />
            compete at the highest level.
          </h2>
          <p className="text-[21px] text-gray-600 max-w-[660px] mx-auto">
            A comprehensive platform designed for ambitious athletes and championship-caliber programs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
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
