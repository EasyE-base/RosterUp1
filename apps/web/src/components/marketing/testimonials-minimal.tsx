'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "RosterUp connected my son with an elite travel team that has transformed his game. The platform made the entire process seamless.",
    author: "Marcus Johnson",
    role: "Parent · Baseball",
    rating: 5,
  },
  {
    content: "As a coach, finding the right talent used to take months. With RosterUp, I built a championship roster in weeks.",
    author: "Sarah Chen",
    role: "Head Coach · Softball",
    rating: 5,
  },
  {
    content: "The exposure I got through my RosterUp profile landed me on a nationally-ranked AAU team. Game changer.",
    author: "Tyler Rodriguez",
    role: "Player · Basketball",
    rating: 5,
  },
];

export function TestimonialsMinimal() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-[128px] opacity-10" />
      </div>

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Trusted by Athletes
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              & Coaches Nationwide
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-cyan-400 text-cyan-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-bold text-white mb-1">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
