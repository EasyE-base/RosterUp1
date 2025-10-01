'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Up to 1 team',
      '20 roster spots',
      'Basic tryout listings',
      'Parent messaging',
      'Mobile app access',
    ],
    notIncluded: [
      'Custom team site',
      'Payment processing',
      'Advanced analytics',
    ],
    cta: 'Start Free',
    href: '/auth/signup',
    popular: false,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'Everything you need to grow',
    features: [
      'Unlimited teams',
      'Unlimited roster spots',
      'Custom team sites',
      'Payment processing',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access',
    ],
    notIncluded: [],
    cta: 'Start Trial',
    href: '/auth/signup?plan=team',
    popular: true,
  },
  {
    name: 'Organization',
    price: 'Custom',
    description: 'For leagues and large clubs',
    features: [
      'Everything in Team',
      'Multi-org management',
      'Advanced permissions',
      'Custom integrations',
      'Dedicated support',
      'Onboarding assistance',
      'Volume discounts',
      'SLA guarantee',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    href: '/contact-sales',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple pricing that{' '}
            <GradientText gradient="blue">scales with you</GradientText>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start free and upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={cn(
                  "relative h-full p-8",
                  plan.popular && "border-2 border-blue-600 shadow-lg"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                {/* Plan header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features list */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-600 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start text-gray-400">
                      <X className="mr-3 h-5 w-5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Button 
                  size="lg" 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Prices in USD. Taxes may apply.
          </p>
        </div>
      </Container>
    </section>
  );
}
