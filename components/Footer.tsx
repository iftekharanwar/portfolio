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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6 group">
              <h3
                className="text-4xl md:text-5xl font-bold text-cream group-hover:text-gold-light transition-colors duration-300"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                Iftekhar Anwar
              </h3>
            </a>
            <p className="text-cream/60 text-lg leading-relaxed max-w-md">
              Creative designer & developer crafting premium digital experiences that inspire and engage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-light text-sm tracking-wider uppercase mb-6">NAVIGATION</h4>
            <ul className="space-y-3">
              {['Work', 'About', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-cream/70 hover:text-gold-light transition-colors duration-300 text-lg"
                  >
                    {item}
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

        {/* Divider */}
        <div className="h-px bg-cream/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cream/50 text-sm">
            © {currentYear} Iftekhar Anwar. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <a href="https://www.termsfeed.com/live/b4e4e9c5-8f41-4b3a-9a29-8e3f5a6b7c8d" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold-light text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="https://www.termsfeed.com/live/c5f5f0d6-9g52-5c4b-0b30-9f4g6b7c8e9e" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold-light text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-cream/70 hover:text-gold-light transition-colors duration-300"
          >
            <span className="text-sm tracking-wider">BACK TO TOP</span>
            <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative blob */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </footer>
  );
}
