import { HeaderMinimal } from '@/components/marketing/header-minimal';
import { FooterMinimal } from '@/components/marketing/footer-minimal';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus, Search, MessageSquare, CheckCircle, DollarSign, Shield } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <HeaderMinimal />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8">
              How{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                RosterUp
              </span>
              {' '}Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              The modern platform connecting youth athletes with elite teams.
              Simple, secure, and built for everyone in youth sports.
            </p>
          </div>
        </Container>
      </section>

      {/* For Players */}
      <section className="py-32 relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">For Players & Parents</h2>
            <p className="text-xl text-gray-400">
              Find and join the perfect team in four easy steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-20">
            {[
              {
                icon: UserPlus,
                step: '01',
                title: 'Create Your Profile',
                description: 'Sign up and build your athlete profile. Add sports, positions, age, and achievements. It takes just a few minutes and is completely free.',
                features: ['Free forever', 'Add multiple sports', 'Showcase achievements'],
              },
              {
                icon: Search,
                step: '02',
                title: 'Browse Teams',
                description: 'Search for teams by sport, location, age group, and more. Filter results to find exactly what you\'re looking for.',
                features: ['Filter by location', 'Multiple sports', 'Age-appropriate teams'],
              },
              {
                icon: MessageSquare,
                step: '03',
                title: 'Apply & Connect',
                description: 'Apply to roster openings that match your skills. Message coaches directly through our secure platform - no personal info shared.',
                features: ['Direct messaging', 'Privacy protected', 'Track applications'],
              },
              {
                icon: CheckCircle,
                step: '04',
                title: 'Join Your Team',
                description: 'Receive offers from interested coaches. Accept the offer, complete registration and payment, and you\'re ready to play!',
                features: ['Secure payments', 'Instant confirmation', 'Easy onboarding'],
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-6xl font-black text-white/10">{step.step}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-xl text-gray-400 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
              asChild
            >
              <Link href="/auth/signup">Create Player Profile</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* For Coaches */}
      <section className="py-32 bg-gradient-to-b from-transparent via-gray-950 to-transparent">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">For Coaches & Teams</h2>
            <p className="text-xl text-gray-400">
              Build your roster with the best talent in your area
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-20">
            {[
              {
                icon: UserPlus,
                step: '01',
                title: 'Set Up Your Team',
                description: 'Create your organization and team profile. Add your logo, colors, location, and team details. Customize your presence.',
                features: ['Team branding', 'Multiple teams', 'Custom domains'],
              },
              {
                icon: Search,
                step: '02',
                title: 'Post Roster Openings',
                description: 'Create listings for open roster spots. Specify positions, age groups, fees, and requirements. Reach qualified candidates instantly.',
                features: ['Unlimited listings', 'Age/skill filters', 'Set deadlines'],
              },
              {
                icon: MessageSquare,
                step: '03',
                title: 'Review Applications',
                description: 'See all applicants in one dashboard. Review athlete profiles, message families, and evaluate fit - all without sharing your personal contact info.',
                features: ['Centralized dashboard', 'Private messaging', 'Profile screening'],
              },
              {
                icon: DollarSign,
                step: '04',
                title: 'Send Offers & Get Paid',
                description: 'Send offers to top candidates with deadlines. When accepted, collect registration fees securely through integrated Stripe payments.',
                features: ['Secure payments', 'Automatic receipts', 'Refund management'],
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-6xl font-black text-white/10">{step.step}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-xl text-gray-400 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
              asChild
            >
              <Link href="/auth/signup">Start Recruiting</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Trust & Safety */}
      <section className="py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-5xl font-black text-white mb-6">Trust & Safety</h2>
            <p className="text-xl text-gray-400">
              Your privacy and security are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Private Messaging',
                description: 'All communications happen through our platform. No need to share personal email or phone numbers.',
              },
              {
                title: 'Secure Payments',
                description: 'Stripe-powered payment processing ensures your financial information stays safe.',
              },
              {
                title: 'Verified Teams',
                description: 'Team profiles are verified to ensure legitimacy and protect athletes and families.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-16">
            <h2 className="text-5xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of players and coaches using RosterUp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
                asChild
              >
                <Link href="/auth/signup">Sign Up Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg rounded-full"
                asChild
              >
                <Link href="/browse/listings">Browse Teams</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FooterMinimal />
    </div>
  );
}
