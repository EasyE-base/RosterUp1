'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Search, Star, Link as LinkIcon } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Discover Teams',
    description: 'Explore thousands of travel teams nationwide',
  },
  {
    icon: Star,
    title: 'Showcase Skills',
    description: 'Create your profile and get discovered by coaches',
  },
  {
    icon: LinkIcon,
    title: 'Join Rosters',
    description: 'Apply to teams and secure your spot',
  },
];

export function HeroMinimal() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Background - Stadium Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Placeholder for stadium image - will use unsplash or custom image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

        {/* Gradient overlays for premium edge lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-pink-500/20 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Subtle noise texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative h-full flex flex-col justify-between py-32">
        {/* Main Headline - Left Side */}
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tight mb-8">
              Where Elite
              <br />
              Athletes Meet
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Their Teams
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mb-12 leading-relaxed">
              The premier marketplace connecting exceptional talent with
              championship-caliber travel sports programs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-10 rounded-full shadow-2xl shadow-white/20"
                asChild
              >
                <Link href="/browse/listings">Browse Teams</Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 rounded-full"
                asChild
              >
                <Link href="/auth/signup">Join as Coach</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl ml-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/50 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-300" />

                <div className="relative">
                  <div className="mb-4">
                    <feature.icon className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
          <span className="text-xs text-white/50 uppercase tracking-wider">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
