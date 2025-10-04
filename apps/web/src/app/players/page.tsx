import { HeaderMinimal } from '@/components/marketing/header-minimal';
import { FooterMinimal } from '@/components/marketing/footer-minimal';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Users, Trophy, Sparkles } from 'lucide-react';

export default function PlayersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <HeaderMinimal />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Connect with elite youth sports teams looking for talented athletes like you.
              Browse opportunities, showcase your skills, and take your game to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
                asChild
              >
                <Link href="/browse/listings">Browse Teams</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg rounded-full"
                asChild
              >
                <Link href="/auth/signup">Create Profile</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-32 relative">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Discover Opportunities',
                description: 'Browse hundreds of teams across multiple sports and skill levels.',
              },
              {
                icon: Users,
                title: 'Connect Directly',
                description: 'Message coaches and teams directly to express your interest.',
              },
              {
                icon: Trophy,
                title: 'Showcase Skills',
                description: 'Create a profile that highlights your abilities and achievements.',
              },
              {
                icon: Sparkles,
                title: 'Get Noticed',
                description: 'Receive offers from teams actively looking for talent.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
              >
                <benefit.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gradient-to-b from-transparent to-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-400">
              Three simple steps to find your next team
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Sign up and build your athlete profile with your sports, positions, and achievements.',
              },
              {
                step: '02',
                title: 'Browse & Apply',
                description: 'Search for teams by sport, location, and age group. Apply to opportunities that match your skills.',
              },
              {
                step: '03',
                title: 'Get Selected',
                description: 'Coaches review your profile and reach out with offers. Connect and join your new team!',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-xl text-gray-400 leading-relaxed">{step.description}</p>
                </div>
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
              Join thousands of athletes finding their perfect team on RosterUp
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
              asChild
            >
              <Link href="/auth/signup">Create Free Profile</Link>
            </Button>
          </div>
        </Container>
      </section>

      <FooterMinimal />
    </div>
  );
}
