'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';
import { HeroGraphic } from './hero-graphic';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-200 opacity-30 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-200 opacity-30 blur-[100px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              <span className="mr-2">🎉</span>
              New: Team mini-sites now available
              <ChevronRight className="ml-1 h-3 w-3" />
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The All-in-One Platform for{' '}
            <GradientText gradient="blue">Youth Sports</GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-xl leading-8 text-gray-600 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Simplify team management, streamline tryouts, and connect parents with the perfect teams. 
            All in one beautiful platform.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="xl" asChild>
              <Link href="/auth/signup">
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/demo">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-12 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-gray-500">Trusted by teams nationwide</p>
            <div className="mt-4 flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Teams</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">10k+</p>
                <p className="text-sm text-gray-600">Parents</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">50k+</p>
                <p className="text-sm text-gray-600">Applications</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero image/graphic */}
        <motion.div
          className="mt-16 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HeroGraphic />
        </motion.div>
      </Container>
    </section>
  );
}
