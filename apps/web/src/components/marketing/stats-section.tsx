'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const stats = [
  { value: '50K+', label: 'Teams' },
  { value: '2M+', label: 'Games Managed' },
  { value: '5M+', label: 'Active Users' },
  { value: '4.9/5', label: 'App Rating' },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-gray-950/50 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {stat.value}
              </div>
              <div className="mt-2 text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
