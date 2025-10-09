import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Managing all our age groups from 10U to 18U in one platform has been a game changer. We filled our roster spots faster than ever.",
    author: "David Martinez",
    role: "Organization Director",
    sport: "Baseball",
    rating: 5
  },
  {
    quote: "I created my profile and got invited to tryouts for three elite teams in my area. RosterUp made the process so simple.",
    author: "Jordan Williams",
    role: "Player",
    sport: "Soccer",
    rating: 5
  },
  {
    quote: "As a parent, I love that my daughter can showcase her skills and connect directly with organizations looking for talent.",
    author: "Sarah Johnson",
    role: "Parent",
    sport: "Softball",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50" style={{ textAlign: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 24px', margin: '0 auto' }}>
        <div className="mb-16" style={{ textAlign: 'center' }}>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Trusted by Players & Organizations
          </h2>
          <p className="text-lg text-gray-600" style={{ maxWidth: '600px', margin: '0 auto' }}>
            See what our community has to say about their experience with RosterUp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4" style={{ justifyContent: 'center' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed" style={{ textAlign: 'center' }}>
                "{testimonial.quote}"
              </p>

              <div style={{ textAlign: 'center' }}>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">
                  {testimonial.role} · {testimonial.sport}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>No Spam Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
