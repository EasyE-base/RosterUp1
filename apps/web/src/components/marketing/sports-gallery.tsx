'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

const sports = [
  {
    name: 'Baseball',
    icon: '⚾',
    tagline: 'Travel Teams · Showcase · Elite Programs',
    gradient: 'from-red-600/80 to-orange-600/80',
  },
  {
    name: 'Basketball',
    icon: '🏀',
    tagline: 'AAU Teams · Travel Circuits · Academies',
    gradient: 'from-orange-600/80 to-amber-600/80',
  },
  {
    name: 'Soccer',
    icon: '⚽',
    tagline: 'Club Teams · Academy Programs · Select',
    gradient: 'from-emerald-600/80 to-teal-600/80',
  },
  {
    name: 'Softball',
    icon: '🥎',
    tagline: 'Fastpitch · Tournament Rosters · Select',
    gradient: 'from-yellow-600/80 to-orange-600/80',
  },
  {
    name: 'Football',
    icon: '🏈',
    tagline: '7v7 Teams · Travel Squads · Elite Programs',
    gradient: 'from-green-700/80 to-emerald-700/80',
  },
  {
    name: 'Volleyball',
    icon: '🏐',
    tagline: 'Club Teams · Travel Rosters · Leagues',
    gradient: 'from-blue-600/80 to-indigo-600/80',
  },
  {
    name: 'Lacrosse',
    icon: '🥍',
    tagline: 'Club Teams · Tournament Rosters · Elite',
    gradient: 'from-purple-600/80 to-pink-600/80',
  },
  {
    name: 'All Sports',
    icon: '🏆',
    tagline: 'Multi-Sport Athletes · All Levels',
    gradient: 'from-gray-700/80 to-gray-600/80',
  },
];

export function SportsGallery() {
  return (
    <section className="relative py-32 bg-black">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Every Sport.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Every Level.
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Connect with elite programs across all major competitive sports.
          </p>
        </motion.div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <Link
                href={`/sports/${sport.name.toLowerCase().replace(' ', '-')}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-gray-900 to-black">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sport.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      {sport.icon}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {sport.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {sport.tagline}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sport.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
