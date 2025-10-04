'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const sports = [
  {
    name: 'Baseball',
    icon: '⚾',
    color: 'from-red-500 to-red-600',
    features: ['Travel teams', 'Showcase leagues', 'Elite programs']
  },
  {
    name: 'Softball',
    icon: '🥎',
    color: 'from-yellow-500 to-yellow-600',
    features: ['Fastpitch teams', 'Tournament rosters', 'Select programs']
  },
  {
    name: 'Basketball',
    icon: '🏀',
    color: 'from-orange-500 to-orange-600',
    features: ['AAU teams', 'Travel circuits', 'Elite academies']
  },
  {
    name: 'Football',
    icon: '🏈',
    color: 'from-green-600 to-green-700',
    features: ['7v7 teams', 'Travel squads', 'Elite programs']
  },
  {
    name: 'Volleyball',
    icon: '🏐',
    color: 'from-blue-500 to-blue-600',
    features: ['Club teams', 'Travel rosters', 'Competitive leagues']
  },
  {
    name: 'Soccer',
    icon: '⚽',
    color: 'from-emerald-500 to-emerald-600',
    features: ['Club teams', 'Academy programs', 'Select squads']
  },
  {
    name: 'Lacrosse',
    icon: '🥍',
    color: 'from-purple-500 to-purple-600',
    features: ['Club teams', 'Tournament rosters', 'Elite leagues']
  },
  {
    name: 'All Sports',
    icon: '🏆',
    color: 'from-gray-600 to-gray-700',
    features: ['Multi-sport athletes', 'Any competitive sport', 'All age groups']
  },
];

export function SportsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-950 to-black">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-white mb-4"
          >
            Robust tools for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              every coach
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            See how RosterUp can transform your team's season, no matter what sport you play.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/sports/${sport.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group relative h-64 rounded-xl overflow-hidden cursor-pointer">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-3">{sport.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{sport.name}</h3>
                      
                      {/* Features list */}
                      <ul className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {sport.features.map((feature) => (
                          <li key={feature} className="text-sm text-white/80">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link 
            href="/features"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Discover all RosterUp features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
