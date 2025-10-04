'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Browse Teams',
    description: 'Discover elite travel sports teams across the nation. Filter by sport, location, age group, and skill level to find your perfect match.',
    cta: 'Explore Teams',
    link: '/browse/listings',
    gradient: 'from-purple-600/50 to-pink-600/50',
  },
  {
    title: 'Showcase Your Talent',
    description: 'Create a standout player profile with stats, highlight videos, and achievements. Get discovered by coaches actively recruiting.',
    cta: 'Create Profile',
    link: '/features/profiles',
    gradient: 'from-blue-600/50 to-cyan-600/50',
  },
  {
    title: 'Streamlined Recruitment',
    description: 'Coaches: manage tryouts, review applications, and build championship rosters all in one powerful platform.',
    cta: 'For Coaches',
    link: '/coaches',
    gradient: 'from-emerald-600/50 to-teal-600/50',
  },
];

export function FeaturesMinimal() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Everything You Need to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Compete at the Highest Level
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            A comprehensive platform designed for ambitious athletes and championship-caliber programs.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Content */}
                <div className="relative px-12 py-16 lg:px-16 lg:py-20">
                  <div className="max-w-2xl">
                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                      {feature.description}
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm font-semibold rounded-full group-hover:border-white/60 transition-all duration-300"
                      asChild
                    >
                      <Link href={feature.link}>
                        {feature.cta}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Bottom gradient border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
