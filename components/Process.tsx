'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVERY',
    description: 'Deep dive into your vision, market research, and competitive analysis to establish a rock-solid foundation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'STRATEGY',
    description: 'Crafting a comprehensive roadmap with clear objectives, KPIs, and milestones for guaranteed success.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'DESIGN',
    description: 'Creating pixel-perfect interfaces that marry aesthetic beauty with intuitive user experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
        <path d="M14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM14 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'DEVELOPMENT',
    description: 'Building robust, scalable solutions with clean architecture and cutting-edge technologies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'TESTING',
    description: 'Rigorous quality assurance across devices, browsers, and edge cases for flawless performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'LAUNCH',
    description: 'Strategic deployment with performance optimization and ongoing support for continued excellence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from('.timeline-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        scaleY: 0,
        duration: 2,
        ease: 'power3.inOut',
      });

      // Animate each step
      const steps = document.querySelectorAll('.process-step');
      if (steps && steps.length > 0) {
        steps.forEach((step, index) => {
          // Step entrance
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });

          // Icon animation
          const icon = step.querySelector('.step-icon');
          if (icon) {
            gsap.from(icon, {
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
              },
              scale: 0,
              rotation: 180,
              duration: 0.8,
              delay: 0.3,
              ease: 'back.out(1.7)',
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-32 px-6 md:px-12 bg-cream overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 text-[25vw] font-bold text-gold/5 pointer-events-none"
           style={{ fontFamily: 'var(--font-cursive)', writingMode: 'vertical-rl' }}>
        PROCESS
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">HOW WE WORK</span>
          <h2
            className="text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tighter text-gold-dark mb-6"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            THE
            <br />
            <span className="text-gold">PROCESS</span>
          </h2>
          <p className="text-gold-dark/60 text-lg max-w-2xl mx-auto">
            A proven methodology refined through hundreds of successful projects
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-gold origin-top transform -translate-x-1/2 hidden lg:block" />

          {/* Steps */}
          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <ProcessStepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-light/10 blur-3xl" />
    </section>
  );
}

function ProcessStepItem({ step, index }: { step: ProcessStep; index: number }) {
  const stepRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={stepRef}
      className="process-step relative"
    >
      <div className={`lg:grid lg:grid-cols-2 gap-12 items-center ${!isLeft ? 'lg:grid-flow-dense' : ''}`}>
        {/* Content */}
        <div className={`${!isLeft ? 'lg:col-start-2 lg:text-left' : 'lg:text-right'} mb-8 lg:mb-0`}>
          <div className={`inline-block ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-7xl font-bold text-gold/20" style={{ fontFamily: 'var(--font-cursive)' }}>
                {step.number}
              </span>
            </div>

            <h3
              className="text-4xl md:text-5xl font-bold mb-4 text-gold-dark tracking-tight"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              {step.title}
            </h3>

            <p className="text-gold-dark/70 text-lg leading-relaxed max-w-md">
              {step.description}
            </p>

            {/* Decorative line */}
            <div className={`flex items-center gap-3 mt-6 ${!isLeft ? '' : 'lg:justify-end'}`}>
              <div className="w-16 h-px bg-gold" />
              <div className="w-2 h-2 bg-gold rounded-full" />
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className={`${!isLeft ? 'lg:col-start-1 lg:row-start-1' : ''} flex justify-center`}>
          <div className="relative">
            {/* Icon container */}
            <div className="step-icon relative w-32 h-32 lg:w-40 lg:h-40 bg-gold-dark rounded-full flex items-center justify-center text-cream p-8 shadow-2xl">
              {step.icon}

              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gold animate-pulse" />
            </div>

            {/* Connection dot for timeline */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg"
                 style={{ [isLeft ? 'right' : 'left']: '-38px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
