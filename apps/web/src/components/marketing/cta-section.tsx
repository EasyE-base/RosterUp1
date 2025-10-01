'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/10" />

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to transform your team management?
          </h2>

          {/* Subheadline */}
          <p className="mt-6 text-xl text-blue-100">
            Join thousands of teams already using RosterUp to save time, 
            grow their programs, and focus on what matters most.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur"
              asChild
            >
              <Link href="/contact-sales">
                Talk to Sales
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14-day free trial
            </span>
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
