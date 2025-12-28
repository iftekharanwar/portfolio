'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_DISTANCE,
  SCROLL_TRIGGER_START,
} from '@/lib/animation-constants';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          gsap.set('.footer-content', {
            opacity: 1,
            y: 0,
          });
          return;
        }

        gsap.from('.footer-content', {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
          y: ANIMATION_DISTANCE.medium,
          opacity: 0,
          duration: ANIMATION_DURATION.slow,
          ease: ANIMATION_EASING.energetic,
        });
      } catch (error) {
        console.error('Footer animation error:', error);
        gsap.set('.footer-content', {
          opacity: 1,
          y: 0,
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative bg-gold-dark border-t border-cream/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 text-[15vw] font-bold text-cream/5 pointer-events-none leading-none"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        PORTFOLIO
      </div>

      <div className="footer-content relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6 group">
              <h3
                className="text-4xl md:text-5xl font-bold text-cream group-hover:text-gold-light transition-colors duration-300"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                Iftekhar Anwar
              </h3>
            </a>
            <p className="text-cream/60 text-lg leading-relaxed max-w-md">
              Designer and developer creating digital experiences that inspire and engage.
            </p>
          </div>

          {/* Navigation and Connect in 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Quick Links */}
            <div>
              <h4 className="text-gold-light text-sm tracking-wider uppercase mb-6">NAVIGATION</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Work', href: '#projects' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-cream/70 hover:text-gold-light transition-colors duration-300 text-lg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-gold-light text-sm tracking-wider uppercase mb-6">CONNECT</h4>
              <ul className="space-y-3">
                {[
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/iftekharanwar/' },
                  { name: 'GitHub', href: 'https://github.com/iftekharanwar' },
                  { name: 'Instagram', href: 'https://www.instagram.com/wespaxe/' },
                ].map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-cream/70 hover:text-gold-light transition-colors duration-300 text-lg"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cream/50 text-sm">
            © {currentYear} Iftekhar Anwar. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <a href="https://www.termsfeed.com/live/08af88bb-9e63-4129-8f53-5dede3a3d8bd" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold-light text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="https://www.termsfeed.com/live/c63079ea-ccba-443f-a416-127686235ac1" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold-light text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Decorative blob */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </footer>
  );
}
