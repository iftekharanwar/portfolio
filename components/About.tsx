'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_DISTANCE,
  STAGGER_DELAY,
  SCROLL_TRIGGER_START,
} from '@/lib/animation-constants';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        gsap.set(['.about-text-line', '.stat-number'], {
          opacity: 1,
          y: 0,
        });
        if (imageContainerRef.current) {
          gsap.set(imageContainerRef.current, { opacity: 1, y: 0 });
        }

        if (prefersReducedMotion) {
          return;
        }

        const stats = document.querySelectorAll('.stat-number');
        if (stats && stats.length > 0) {
          stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target') || '0');
            const hasPlus = stat.textContent?.includes('+');

            const counter = { value: 0 };

            gsap.to(counter, {
              value: target,
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                once: true,
              },
              duration: ANIMATION_DURATION.verySlow,
              ease: 'power1.out',
              onUpdate: function () {
                const currentValue = Math.ceil(counter.value);
                stat.textContent = hasPlus ? currentValue.toString() + '+' : currentValue.toString();
              },
            });
          });
        }

        // Only apply pin and animations on desktop
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          if (sectionRef.current) {
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              pin: '.about-content',
              pinSpacing: false,
            });
          }

          // Image animation only on desktop
          if (imageContainerRef.current) {
            gsap.fromTo(imageContainerRef.current,
              {
                y: ANIMATION_DISTANCE.medium,
                opacity: 0,
              },
              {
                scrollTrigger: {
                  trigger: imageContainerRef.current,
                  start: SCROLL_TRIGGER_START.normal,
                  once: true,
                },
                y: 0,
                opacity: 1,
                duration: ANIMATION_DURATION.normal,
                ease: ANIMATION_EASING.energetic,
              }
            );
          }

          // Text animations only on desktop
          const textLines = document.querySelectorAll('.about-text-line');
          if (textLines && textLines.length > 0) {
            gsap.fromTo(textLines,
              {
                y: ANIMATION_DISTANCE.small,
                opacity: 0,
              },
              {
                scrollTrigger: {
                  trigger: textRef.current,
                  start: SCROLL_TRIGGER_START.normal,
                  once: true,
                },
                y: 0,
                opacity: 1,
                stagger: STAGGER_DELAY.normal,
                duration: ANIMATION_DURATION.normal,
                ease: ANIMATION_EASING.smooth,
              }
            );
          }
        });
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
    <section ref={sectionRef} id="about" className="relative bg-gold-dark lg:overflow-hidden">
      <div className="about-content relative w-full px-6 py-16 lg:px-0 lg:max-w-[95%] lg:mx-auto lg:min-h-screen lg:flex lg:items-center lg:py-16">
        <div className="w-full">
          <div className="flex flex-col space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

            {/* Left Side - Images */}
            <div ref={imageContainerRef} className="relative w-full">
              {/* Main Image */}
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/images/about/profile-portrait.webp"
                    alt="Iftekhar Anwar - Product Manager & Developer"
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
                    src="/images/about/workspace.webp"
                    alt="Iftekhar's workspace"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div ref={textRef} className="relative z-10 w-full space-y-8 lg:space-y-12">
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
                  className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-tight tracking-tighter text-cream"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  FROM IDEA
                  <br />
                  <span className="text-gold-light">TO</span>
                  <br />
                  DELIVERY
                </h2>
              </div>

              {/* Description */}
              <div className="about-text-line space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>
                  Final-year Computer Engineering student at <span className="text-gold-light font-bold">Politecnico di Torino</span>. Co-founded <span className="text-gold-light font-bold">Compex</span>, an AI infrastructure startup (EUR 5M valuation, EUR 150K pre-seed), where I led go-to-market strategy and enterprise sales with a 6/10 conversion rate.
                </p>
                <p>
                  I manage <span className="text-cream">end-to-end product delivery</span> — from requirement gathering and roadmap planning to stakeholder communication and launch. Delivered <span className="text-cream">15+ client projects across 5+ industries</span> at TogetherForBrands and Studio Napoli. Apple Developers Academy alumnus. 8x hackathon winner.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="about-text-line grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-gold-light/20">
                <div className="text-center md:text-left">
                  <div className="stat-number text-3xl md:text-4xl font-bold text-gold-light mb-2" data-target="15">
                    0+
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Client Projects<br />Delivered
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="stat-number text-3xl md:text-4xl font-bold text-gold-light mb-2" data-target="5">
                    0+
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Industries<br />Served
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="stat-number text-3xl md:text-4xl font-bold text-gold-light mb-2" data-target="8">
                    0
                  </div>
                  <div className="text-xs text-cream/60 uppercase tracking-wider">
                    Hackathons<br />Won
                  </div>
                </div>
              </div>

              {/* Skills tags */}
              <div className="about-text-line flex flex-wrap gap-3 justify-center md:justify-start">
                {['PRODUCT STRATEGY', 'AGILE / SCRUM', 'JIRA', 'FIGMA', 'STAKEHOLDER MGMT', 'USER RESEARCH', 'PYTHON', 'NOTION'].map((skill, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border border-gold-light/30 text-cream text-xs tracking-wider hover:bg-gold-light/10 transition-colors duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Background decorative text */}
      <div className="hidden lg:block absolute bottom-20 left-0 text-[15vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        PRODUCT LEADER
      </div>
    </section>
  );
}
