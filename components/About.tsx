'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          gsap.set(['.about-text-line', '.stat-number'], {
            opacity: 1,
            y: 0,
          });
          if (imageContainerRef.current) {
            gsap.set(imageContainerRef.current, { opacity: 1, y: 0 });
          }
          return;
        }
        // Only pin on desktop (lg breakpoint)
        const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: '.about-content',
          pinSpacing: false,
        });
      });

      // Simplified animations for better mobile performance
      if (imageContainerRef.current) {
        gsap.from(imageContainerRef.current, {
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Text animations
      const textLines = document.querySelectorAll('.about-text-line');
      if (textLines && textLines.length > 0) {
        gsap.from(textLines, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            once: true,
          },
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Stats counter animation
      const stats = document.querySelectorAll('.stat-number');
      if (stats && stats.length > 0) {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              once: true,
            },
            textContent: 0,
            duration: 1.5,
            ease: 'power1.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              stat.textContent = Math.ceil(parseFloat(stat.textContent as string)).toString() + '+';
            },
          });
        });
      }
      } catch (error) {
        console.error('About animation error:', error);
        gsap.set(['.about-text-line', '.stat-number'], {
          opacity: 1,
          y: 0,
        });
        if (imageContainerRef.current) {
          gsap.set(imageContainerRef.current, { opacity: 1, y: 0 });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-gold-dark overflow-hidden">
      <div className="about-content relative min-h-screen flex items-center">
        <div className="w-full max-w-[95%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Side - Images */}
            <div ref={imageContainerRef} className="relative">
              {/* Main Image */}
              <div className="relative h-[700px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/images/about/profile-portrait.png"
                    alt="Iftekhar Anwar - Creative Designer & Developer"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-dark/60 to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-full h-full border-4 border-gold-light/20" />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gold/30 rounded-full blur-3xl" />

                {/* Floating badge */}
                <div className="absolute top-12 right-12 w-32 h-32 bg-cream rounded-full flex items-center justify-center animate-spin-slow">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-dark">5+</div>
                    <div className="text-xs text-gold-dark/70">YEARS</div>
                  </div>
                </div>
              </div>

              {/* Secondary smaller image */}
              <div className="absolute -bottom-12 left-12 w-64 h-64 hidden lg:block">
                <div className="relative w-full h-full overflow-hidden border-8 border-gold-dark">
                  <Image
                    src="/images/about/workspace.png"
                    alt="Iftekhar's workspace"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div ref={textRef} className="space-y-12">
              {/* Section label */}
              <div className="about-text-line flex items-center gap-4">
                <div className="w-16 h-px bg-gold-light" />
                <span className="text-gold-light text-xs tracking-[0.3em] uppercase">
                  ABOUT ME
                </span>
              </div>

              {/* Main heading */}
              <div className="about-text-line">
                <h2
                  className="text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-tighter text-cream mb-6"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  CRAFTING
                  <br />
                  <span className="text-gold-light">DIGITAL</span>
                  <br />
                  EXCELLENCE
                </h2>
              </div>

              {/* Description */}
              <div className="about-text-line space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>
                  I'm a <span className="text-gold-light font-bold">multi-disciplinary designer & developer</span> obsessed with creating digital experiences that merge cutting-edge technology with stunning visual design.
                </p>
                <p>
                  With expertise spanning <span className="text-cream">UI/UX design, front-end development,</span> and <span className="text-cream">motion graphics,</span> I transform ambitious ideas into reality through meticulous attention to detail and innovative problem-solving.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="about-text-line grid grid-cols-3 gap-8 pt-8 border-t border-gold-light/20">
                <div>
                  <div className="stat-number text-4xl font-bold text-gold-light mb-2" data-target="50">
                    0+
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Projects<br />Completed
                  </div>
                </div>
                <div>
                  <div className="stat-number text-4xl font-bold text-gold-light mb-2" data-target="30">
                    0+
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Happy<br />Clients
                  </div>
                </div>
                <div>
                  <div className="stat-number text-4xl font-bold text-gold-light mb-2" data-target="15">
                    0+
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Awards<br />Won
                  </div>
                </div>
              </div>

              {/* Skills tags */}
              <div className="about-text-line flex flex-wrap gap-3">
                {['REACT', 'NEXT.JS', 'GSAP', 'FIGMA', 'THREE.JS', 'WEBGL'].map((skill, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border border-gold-light/30 text-cream text-xs tracking-wider hover:bg-gold-light/10 transition-colors duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="about-text-line pb-8 md:pb-0 text-center md:text-left">
                <a
                  href="/cv.pdf"
                  download
                  className="group inline-block px-10 py-5 bg-gold text-gold-dark font-bold text-sm tracking-wider hover:bg-gold-light transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">DOWNLOAD CV</span>
                  <div className="absolute inset-0 bg-cream transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative text */}
      <div className="absolute bottom-20 left-0 text-[15vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        CREATIVE DEVELOPER
      </div>
    </section>
  );
}
