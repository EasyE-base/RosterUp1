import { HeaderMinimal } from '@/components/marketing/header-minimal';
import { FooterMinimal } from '@/components/marketing/footer-minimal';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, MessageSquare, Calendar, DollarSign, Shield, Zap } from 'lucide-react';

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <HeaderMinimal />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8">
              Build Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dream Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              The modern platform for youth sports coaches to recruit talent, manage rosters,
              and build championship teams. Simplify everything from applications to payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
                asChild
              >
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg rounded-full"
                asChild
              >
                <Link href="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              Everything You Need to Manage Your Team
            </h2>
            <p className="text-xl text-gray-400">
              From recruiting to payments, RosterUp has you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Smart Recruiting',
                description: 'Post roster openings and connect with qualified athletes in your area.',
              },
              {
                icon: MessageSquare,
                title: 'Built-in Messaging',
                description: 'Chat directly with players and parents without sharing personal contact info.',
              },
              {
                icon: Calendar,
                title: 'Application Management',
                description: 'Review applications, track candidates, and send offers all in one place.',
              },
              {
                icon: DollarSign,
                title: 'Integrated Payments',
                description: 'Collect registration fees securely with built-in Stripe processing.',
              },
              {
                icon: Shield,
                title: 'Privacy Protected',
                description: 'Keep your personal information private with platform-managed communications.',
              },
              {
                icon: Zap,
                title: 'Team Websites',
                description: 'Create beautiful team pages with custom domains and branding.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Simple to Get Started</h2>
            <p className="text-xl text-gray-400">
              Launch your team in minutes, not days
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {[
              {
                step: '01',
                title: 'Create Your Team',
                description: 'Set up your organization and team profile with your logo, colors, and details.',
              },
              {
                step: '02',
                title: 'Post Open Positions',
                description: 'Create roster spot listings with details about positions, age groups, and fees.',
              },
              {
                step: '03',
                title: 'Review & Recruit',
                description: 'Review athlete applications, message families, and send offers to top candidates.',
              },
              {
                step: '04',
                title: 'Manage Your Roster',
                description: 'Track accepted offers, collect payments, and manage your season all in one place.',
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

      {/* Testimonials Section */}
      <section className="py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Loved by Coaches</h2>
            <p className="text-xl text-gray-400">
              See what coaches are saying about RosterUp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "RosterUp transformed how we recruit. We filled our roster in half the time it used to take.",
                author: "Sarah M.",
                role: "Travel Baseball Coach",
              },
              {
                quote: "The built-in messaging keeps everything organized. No more lost emails or text threads.",
                author: "Mike T.",
                role: "Soccer Club Director",
              },
              {
                quote: "Payment processing is seamless. Parents love how easy it is, and we get paid faster.",
                author: "Jennifer K.",
                role: "Volleyball Academy Coach",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
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
              Ready to Build Your Team?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join coaches who are streamlining recruiting with RosterUp
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 text-lg rounded-full shadow-2xl shadow-cyan-500/30"
              asChild
            >
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>
        </Container>
      </section>

      <FooterMinimal />
    </div>
  );
}
