'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  className,
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn("group relative", className)}
    >
      <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-blue-200">
        {/* Icon background */}
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>

        {/* Content */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Hover effect gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}
