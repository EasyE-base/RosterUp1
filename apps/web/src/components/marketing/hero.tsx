'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-16 pb-20 sm:pt-24 sm:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-100 opacity-50 blur-3xl" />
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

        {/* Hero image/graphic placeholder */}
        <motion.div
          className="mt-16 mx-auto max-w-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1">
            <div className="rounded-xl bg-white p-8">
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
