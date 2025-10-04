'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "I love seeing highlights of my daughter's games and also being able to see the play-by-play replay. So cool!",
    author: "Melitza Santiago",
    role: "Softball Parent",
    rating: 5,
  },
  {
    content: "I am handicapped so my mobility is quite limited. This app allows me to enjoy my grandson's baseball games!",
    author: "Chris Bosworth",
    role: "Baseball Grandparent",
    rating: 5,
  },
  {
    content: "RosterUp is the easiest app I have used to communicate with my team, schedule events, and keep track of live scoring. I manage three teams at a time and I have no issue keeping everything straight!",
    author: "Ryan Beaumont",
    role: "Baseball Coach",
    rating: 5,
  },
];

export function TestimonialsV2() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20" />
      </div>

      <Container className="relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tight"
          >
            A Few Words From Our Cheering Section
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 rounded-2xl p-8 h-full flex flex-col relative">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-700" />

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg text-gray-300 mb-6 flex-grow">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
