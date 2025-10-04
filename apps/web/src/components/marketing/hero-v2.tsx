'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Star, Download, Users, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 pt-32 pb-48">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Manage teams,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                find players,
              </span>
              <br />
              connect families
            </h1>

            <p className="mt-6 text-xl text-gray-300 max-w-lg">
              Streamline your season with the #1-rated youth sports management platform. 
              Always free for coaches!
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="xl" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                <Download className="mr-2 h-5 w-5" />
                Download RosterUp
              </Button>
              <Button size="xl" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Learn More
              </Button>
            </div>

            {/* App store buttons */}
            <div className="mt-8 flex gap-4">
              <Link href="#" className="inline-block">
                <div className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-900 transition">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Link>
              <Link href="#" className="inline-block">
                <div className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-900 transition">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.919V2.733a1 1 0 0 1 .609-.919zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Ratings */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-gray-300">
                <span className="font-bold text-white">4.9</span> / 100K+ Reviews
              </div>
            </div>
          </motion.div>

          {/* Right column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative mx-auto w-72 h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[3rem] transform rotate-6 scale-105 opacity-20 blur-xl" />
                <div className="relative bg-gray-900 rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl">
                  {/* Phone screen content */}
                  <div className="bg-white h-full">
                    {/* App header */}
                    <div className="bg-blue-600 px-6 pt-12 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-lg">RosterUp</h3>
                        <div className="flex gap-2">
                          <div className="w-6 h-6 bg-white/20 rounded-full" />
                          <div className="w-6 h-6 bg-white/20 rounded-full" />
                        </div>
                      </div>
                      <div className="text-white/80 text-sm">Welcome, Coach!</div>
                    </div>

                    {/* Stats cards */}
                    <div className="p-4 space-y-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-sm opacity-80">Active Players</div>
                          </div>
                          <Users className="w-8 h-8 opacity-80" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm opacity-80">New Applications</div>
                          </div>
                          <Calendar className="w-8 h-8 opacity-80" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">8-2</div>
                            <div className="text-sm opacity-80">Season Record</div>
                          </div>
                          <Trophy className="w-8 h-8 opacity-80" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                      <div className="flex justify-around py-3">
                        <div className="p-2">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                          </svg>
                        </div>
                        <div className="p-2">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                        </div>
                        <div className="p-2">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="p-2">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -left-4 bg-white rounded-lg shadow-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">New Application</div>
                    <div className="text-sm font-semibold">Sarah Johnson</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Payment Received</div>
                    <div className="text-sm font-semibold">$150 - Tryout Fee</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
