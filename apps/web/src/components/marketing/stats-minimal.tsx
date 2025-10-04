'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const stats = [
  { value: '10,000+', label: 'Active Teams' },
  { value: '50,000+', label: 'Players' },
  { value: '500+', label: 'Cities' },
  { value: '100%', label: 'Free to Browse' },
];

export function StatsMinimal() {
  return (
    <section className="relative py-32 bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-50" />

      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative inline-block">
                {/* Gradient glow effect */}
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                <div className="relative text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400 mb-3">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
