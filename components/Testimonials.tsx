'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechVision Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    text: 'Working with Iftekhar was an absolute pleasure. His attention to detail and creative vision transformed our brand into something truly exceptional.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder',
    company: 'StartupX',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    text: 'The level of craftsmanship and innovation Iftekhar brings to every project is unmatched. Our website now stands out in a crowded market.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    company: 'Design Studio',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    text: "Iftekhar's ability to blend aesthetic beauty with functional design is remarkable. He delivered beyond our expectations every single time.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-12 bg-gold-dark overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-1/4 left-0 text-[20vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
        style={{ fontFamily: 'var(--font-cursive)' }}
      >
        REVIEWS
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-20">
          <span className="text-gold-light text-xs tracking-[0.3em] uppercase mb-6 block">
            CLIENT TESTIMONIALS
          </span>
          <h2
            className="text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tighter text-cream mb-6"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            KIND
            <br />
            <span className="text-gold-light">WORDS</span>
          </h2>
          <p className="text-cream/70 text-xl max-w-2xl mx-auto">
            What clients say about working together
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-lg p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Client Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold-dark" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p
                    className="text-xl md:text-2xl text-cream leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Client Info */}
                  <div>
                    <h4 className="text-xl font-bold text-cream mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gold-light text-sm">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-2 border-cream/20 hover:border-gold-light flex items-center justify-center text-cream hover:text-gold-light transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-gold' : 'bg-cream/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 border-cream/20 hover:border-gold-light flex items-center justify-center text-cream hover:text-gold-light transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gold-light/10 blur-3xl" />
    </section>
  );
}
