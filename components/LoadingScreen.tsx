'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 15);

    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.from(chars, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.5,
          delay: 0.3,
          ease: 'power3.out',
        });
      }

      gsap.from('.divider-line', {
        scaleX: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.inOut',
      });

      if (counterRef.current) {
        gsap.from(counterRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 1,
          ease: 'power2.out',
        });
      }

      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }, 400);

      return () => {
        clearTimeout(timer);
      };
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${count}%`,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [count]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-gold-dark overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Name Animation */}
        <div className="mb-12">
          <h1
            ref={nameRef}
            className="text-7xl md:text-9xl font-bold text-cream mb-4"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {'Iftekhar'.split('').map((char, index) => (
              <span key={index} className="char inline-block">
                {char}
              </span>
            ))}
          </h1>

          <div className="divider-line h-1 w-48 mx-auto bg-gold origin-left" />
        </div>

        {/* Counter */}
        <div ref={counterRef} className="relative">
          <div className="text-8xl font-bold text-gold-light/50" style={{ fontFamily: 'var(--font-cursive)' }}>
            {count.toString().padStart(2, '0')}
            <span className="text-5xl">%</span>
          </div>

          {/* Loading bar */}
          <div className="mt-8 w-64 h-1 mx-auto bg-cream/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gold rounded-full"
              style={{ width: '0%' }}
            />
          </div>

          <p className="mt-6 text-cream/60 text-sm tracking-widest uppercase animate-pulse">
            Loading Experience
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border-4 border-gold-light/20 rounded-full" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-cream/10" />
      <div
        className="absolute top-1/2 right-1/4 w-24 h-24 bg-gold/10 backdrop-blur-sm"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
    </div>
  );
}
