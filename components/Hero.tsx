'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          gsap.set(['.title-line', '.hero-subtext', '.hero-image-mask', '.floating-shape'], {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotateX: 0,
          });
          return;
        }

        // Dramatic entrance - main title
        const titleLines = mainTitleRef.current?.querySelectorAll('.title-line');
        if (titleLines && titleLines.length > 0) {
          gsap.from(titleLines, {
            y: 200,
            opacity: 0,
            rotateX: -90,
            stagger: 0.2,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.5,
          });
        }

      // Subtext reveal
      if (subTextRef.current) {
        gsap.from(subTextRef.current, {
          opacity: 0,
          x: -100,
          duration: 1.2,
          delay: 1.8,
          ease: 'power3.out',
        });
      }

      // Image mask reveal
      if (imageMaskRef.current) {
        gsap.from(imageMaskRef.current, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          duration: 1.8,
          delay: 1.2,
          ease: 'power4.inOut',
        });
      }

      // Floating elements animation
      const floatingItems = floatingElementsRef.current?.querySelectorAll('.float-item');
      if (floatingItems && floatingItems.length > 0) {
        floatingItems.forEach((item, index) => {
          gsap.to(item, {
            y: -30,
            repeat: -1,
            yoyo: true,
            duration: 2 + index * 0.5,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });

          gsap.to(item, {
            rotate: 360,
            repeat: -1,
            duration: 20 + index * 5,
            ease: 'none',
          });
        });
      }

      // Parallax scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0.3,
        });
      }
      } catch (error) {
        console.error('Hero animation error:', error);
        gsap.set(['.title-line', '.hero-subtext', '.hero-image-mask', '.floating-shape'], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gold-dark"
    >
      {/* Floating decorative elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="float-item absolute top-20 left-10 w-32 h-32 border-4 border-gold-light/20 rounded-full" />
        <div className="float-item absolute bottom-32 right-20 w-48 h-48 border-4 border-cream/10" />
        <div className="float-item absolute top-1/3 right-1/4 w-24 h-24 bg-gold/10 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        <div className="float-item absolute bottom-1/4 left-1/3 text-9xl text-gold-light/5" style={{ fontFamily: 'var(--font-cursive)' }}>✦</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Typography */}
          <div className="space-y-8">
            {/* Magazine-style small heading */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gold-light" />
              <span className="text-gold-light text-xs tracking-[0.3em] uppercase font-light">
                Portfolio 2025
              </span>
            </div>

            {/* Massive Title */}
            <div ref={mainTitleRef} className="space-y-2">
              <div className="title-line perspective-1000 overflow-hidden">
                <h1
                  className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter text-cream"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  CREATIVE
                </h1>
              </div>
              <div className="title-line flex items-center gap-4 overflow-hidden">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                </div>
                <h1
                  className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter text-cream flex-shrink-0"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  DESIGNER
                </h1>
              </div>
              <div className="title-line flex items-end gap-4 overflow-hidden">
                <div className="text-gold-light text-2xl mb-3 flex-shrink-0">&</div>
                <h1
                  className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    WebkitTextStroke: '2px var(--cream)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  DEVELOPER
                </h1>
              </div>
            </div>

            {/* Subtext */}
            <div ref={subTextRef}>
              <p className="text-xl md:text-2xl text-cream/80 max-w-md leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                Pushing boundaries between art & technology, crafting experiences that captivate & inspire.
              </p>

              <div className="flex gap-6 mt-8">
                <button
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group px-8 py-4 bg-gold text-gold-dark font-bold tracking-wider hover:bg-gold-light transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">VIEW WORK</span>
                  <div className="absolute inset-0 bg-cream transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border-2 border-cream text-cream font-bold tracking-wider hover:bg-cream hover:text-gold-dark transition-all duration-300"
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image with mask */}
          <div className="relative h-[600px] hidden lg:block">
            <div
              ref={imageMaskRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/hero/profile-main.png)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
            />

            {/* Overlays and effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold-dark via-transparent to-transparent" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />

            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border-4 border-gold-light/30" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cream/50 rounded-full" />
        </div>
        <span className="text-cream/50 text-xs tracking-widest rotate-90 origin-center mt-8">
          SCROLL
        </span>
      </div>
    </section>
  );
}
