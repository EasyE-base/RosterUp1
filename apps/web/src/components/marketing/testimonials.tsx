'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { GradientText } from '@/components/ui/gradient-text';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Baseball Coach',
    team: 'Dallas Elite 12U',
    content: 'RosterUp has completely transformed how we handle tryouts. What used to take weeks now takes days. Parents love how easy it is to apply.',
    rating: 5,
    image: '/api/placeholder/64/64',
  },
  {
    name: 'Mike Chen',
    role: 'Soccer Club Director',
    team: 'FC Lightning',
    content: 'The payment integration alone saves us hours every week. No more chasing down checks or managing spreadsheets. Everything just works.',
    rating: 5,
    image: '/api/placeholder/64/64',
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Parent of 3 Athletes',
    team: '',
    content: 'Finally, one place to manage all my kids\' sports activities. The mobile app is fantastic - I can track applications and communicate with coaches on the go.',
    rating: 5,
    image: '/api/placeholder/64/64',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by{' '}
            <GradientText gradient="blue">coaches and parents</GradientText>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full p-8">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-gray-200" />

                {/* Rating stars */}
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-6 text-gray-700 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author info */}
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.team && ` • ${testimonial.team}`}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-20 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-1"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="rounded-xl bg-white p-12">
            <div className="grid gap-8 sm:grid-cols-3 text-center">
              <div>
                <p className="text-4xl font-bold text-gray-900">98%</p>
                <p className="mt-2 text-gray-600">Customer satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-900">4.9/5</p>
                <p className="mt-2 text-gray-600">Average rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-900">2 hours</p>
                <p className="mt-2 text-gray-600">Average time saved per week</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
