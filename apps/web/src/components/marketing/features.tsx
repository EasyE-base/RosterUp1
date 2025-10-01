'use client';

import { 
  Users, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  BarChart3, 
  Globe,
  Shield,
  Zap,
  Heart
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { FeatureCard } from './feature-card';
import { GradientText } from '@/components/ui/gradient-text';

const features = [
  {
    icon: Users,
    title: 'Smart Team Management',
    description: 'Organize rosters, track player info, and manage multiple teams with ease. Everything in one place.',
  },
  {
    icon: Calendar,
    title: 'Streamlined Tryouts',
    description: 'Post openings, collect applications, and review candidates efficiently. No more spreadsheet chaos.',
  },
  {
    icon: MessageSquare,
    title: 'Built-in Messaging',
    description: 'Communicate directly with parents and players. Keep all conversations organized and accessible.',
  },
  {
    icon: CreditCard,
    title: 'Integrated Payments',
    description: 'Collect tryout fees and team payments seamlessly. Automatic payouts to your bank account.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track applications, monitor engagement, and understand what drives team growth.',
  },
  {
    icon: Globe,
    title: 'Beautiful Team Sites',
    description: 'Create stunning public pages for your team. No coding required - just drag, drop, and publish.',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Save 10+ Hours Per Week',
    description: 'Automate repetitive tasks and focus on what matters - coaching and developing players.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Bank-level security, COPPA compliant, and built with privacy in mind from day one.',
  },
  {
    icon: Heart,
    title: 'Parents Love It',
    description: 'Simple, intuitive interface that parents actually want to use. No more chasing down forms.',
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to{' '}
            <GradientText gradient="blue">run your team</GradientText>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From tryouts to championships, we've got you covered with powerful features 
            designed specifically for youth sports.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Built for the way you work
            </h3>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={benefit.title}
                {...benefit}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
