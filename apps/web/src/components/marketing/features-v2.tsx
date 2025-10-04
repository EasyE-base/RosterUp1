'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Users, Calendar, DollarSign, MessageSquare, BarChart3, Globe } from 'lucide-react';

const features = [
  {
    title: 'Browse Teams',
    description: 'Discover travel sports teams in your area. Filter by sport, age group, skill level, and location to find the perfect fit.',
    icon: Globe,
    image: '/streaming-preview.jpg',
    link: '/browse/listings',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Showcase Talent',
    description: 'Create your player profile with stats, videos, and achievements. Stand out to coaches recruiting for their rosters.',
    icon: Users,
    image: '/manage-preview.jpg',
    link: '/features/profiles',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Manage Tryouts',
    description: 'Coaches: streamline your recruitment process. Accept applications, schedule tryouts, and build your dream roster.',
    icon: Calendar,
    image: '/recruit-preview.jpg',
    link: '/features/tryouts',
    color: 'from-green-500 to-emerald-500',
  },
];

export function FeaturesV2() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Container>
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Get More With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                RosterUp
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Whether you're a player seeking the right team or a coach building your roster, RosterUp connects you with opportunities to compete at the next level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800" asChild>
              <Link href="/features">
                Explore RosterUp Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-lg text-gray-300 mb-6">
                  {feature.description}
                </p>

                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href={feature.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl transform rotate-3 scale-105 opacity-20 blur-xl`} />
                  
                  {/* Feature preview */}
                  <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-700 to-gray-800 p-8">
                      {/* Placeholder for feature preview */}
                      <div className="h-full flex items-center justify-center">
                        <feature.icon className="w-24 h-24 text-gray-600" />
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                    >
                      LIVE
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
