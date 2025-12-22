'use client';

import { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { getNextProject } from '@/data/projects';
import type { ProjectData } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const nextProject = getNextProject(project.id);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [project.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      tl.from(heroRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
      });

      // Title animation - split and reveal
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        tl.from(titleChars, {
          y: 200,
          rotateX: -90,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power4.out',
        }, '-=0.8');
      }

      // Parallax scroll effects
      gsap.to('.hero-image', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.2,
        y: '30%',
      });

      // Horizontal scroll gallery
      const gallery = document.querySelector('.horizontal-gallery');
      if (gallery) {
        const galleryWidth = gallery.scrollWidth;
        gsap.to(gallery, {
          scrollTrigger: {
            trigger: '.gallery-container',
            start: 'top top',
            end: () => `+=${galleryWidth}`,
            scrub: 1,
            pin: true,
          },
          x: () => -(galleryWidth - window.innerWidth),
          ease: 'none',
        });
      }

      // Metrics count-up animation
      gsap.from('.metric-value', {
        scrollTrigger: {
          trigger: '.metrics-section',
          start: 'top 70%',
        },
        textContent: '0',
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        stagger: 0.1,
      });

      // Process timeline animation
      gsap.from('.process-step', {
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 70%',
        },
        x: -100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Reveal animations
      gsap.utils.toArray('.reveal').forEach((element: any) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [project.id]);

  // Split title into characters for animation
  const splitTitle = project.title.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ transformOrigin: 'bottom' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <main ref={mainRef} className="bg-cream">
      {/* HERO SECTION - Full screen with massive typography */}
      <section className="hero-section relative h-screen overflow-hidden bg-gold-dark">
        <div
          ref={heroRef}
          className="hero-image absolute inset-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gold-dark via-gold-dark/50 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gold-light text-xs md:text-sm tracking-[0.5em] uppercase mb-6"
          >
            {project.category} · {project.year}
          </motion.div>

          <h1
            ref={titleRef}
            className="text-[clamp(4rem,15vw,18rem)] font-bold leading-[0.85] tracking-tighter text-cream mb-8"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {splitTitle}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-cream/90 text-xl md:text-3xl max-w-4xl leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.heroTagline}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-24 bg-cream/30">
            <motion.div
              className="w-px h-12 bg-gold"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* PROJECT INFO BAR */}
      <section className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b-2 border-gold/20">
        <div className="max-w-[95%] mx-auto px-8 py-6 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-8 flex-wrap">
            <div>
              <div className="text-xs text-gold-dark/50 uppercase tracking-wider mb-1">Context</div>
              <div className="text-gold-dark font-bold">{project.context}</div>
            </div>
            <div>
              <div className="text-xs text-gold-dark/50 uppercase tracking-wider mb-1">Role</div>
              <div className="text-gold-dark font-bold">{project.role}</div>
            </div>
            <div>
              <div className="text-xs text-gold-dark/50 uppercase tracking-wider mb-1">Duration</div>
              <div className="text-gold-dark font-bold">{project.duration}</div>
            </div>
            {project.achievement && (
              <div>
                <div className="text-xs text-gold-dark/50 uppercase tracking-wider mb-1">Achievement</div>
                <div className="text-gold-dark font-bold">{project.achievement}</div>
              </div>
            )}
          </div>
          <button
            onClick={() => router.push('/#projects')}
            className="px-6 py-3 bg-gold-dark text-cream hover:bg-gold transition-all duration-300 font-bold tracking-wider text-sm"
          >
            BACK TO PROJECTS
          </button>
        </div>
      </section>

      {/* CHALLENGE & SOLUTION */}
      <section className="reveal py-32 px-8 md:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            {/* Challenge */}
            <div>
              <div className="text-gold text-xs tracking-[0.3em] uppercase mb-8">THE CHALLENGE</div>
              <h2
                className="text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tighter text-gold-dark mb-12"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                THE
                <br />
                <span className="text-gold">PROBLEM</span>
              </h2>
              <p className="text-2xl text-gold-dark/80 leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="lg:pt-32">
              <div className="text-gold text-xs tracking-[0.3em] uppercase mb-8">THE SOLUTION</div>
              <h2
                className="text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tighter text-gold-dark mb-12"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                OUR
                <br />
                <span className="text-gold">APPROACH</span>
              </h2>
              <p className="text-2xl text-gold-dark/80 leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL GALLERY*/}
      <section className="gallery-container relative bg-gold-dark overflow-hidden">
        <div className="horizontal-gallery flex gap-8 px-8 py-32">
          {project.gallery.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] h-[70vh] relative group"
            >
              <Image
                src={img.url}
                alt={img.caption || `Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="80vw"
              />
              {img.caption && (
                <div className="absolute bottom-8 left-8 text-cream text-2xl font-bold tracking-wider">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* METRICS*/}
      <section className="metrics-section reveal py-32 px-8 md:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-[clamp(3rem,10vw,10rem)] font-bold leading-none tracking-tighter text-gold-dark text-center mb-24"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            IMPACT
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className="metric-value text-[clamp(4rem,8vw,8rem)] font-bold text-gold leading-none mb-4"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  {metric.value}
                </div>
                <div className="text-gold-dark font-bold text-xl mb-2 tracking-wider">
                  {metric.label}
                </div>
                <div className="text-gold-dark/60 text-sm">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="process-section py-32 px-8 md:px-16 bg-gold-dark">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-[clamp(3rem,10vw,10rem)] font-bold leading-none tracking-tighter text-cream mb-24"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            PROCESS
          </h2>

          <div className="space-y-12">
            {project.process.map((step, index) => (
              <div key={index} className="process-step flex gap-8 items-start">
                <div
                  className="text-[clamp(4rem,10vw,10rem)] font-bold text-gold/20 leading-none flex-shrink-0"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="pt-8">
                  <h3 className="text-4xl font-bold text-gold-light mb-4 tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-xl text-cream/80 leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK*/}
      {project.feedback && (
        <section className="reveal py-32 px-8 md:px-16 bg-cream">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[clamp(5rem,20vw,20rem)] text-gold/10 leading-none mb-8" style={{ fontFamily: 'var(--font-cursive)' }}>
              "
            </div>
            <blockquote
              className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-gold-dark mb-12"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {project.feedback.quote}
            </blockquote>
            <div className="text-gold-dark">
              <div className="text-2xl font-bold mb-2">{project.feedback.author}</div>
              <div className="text-gold-dark/60 tracking-wider">{project.feedback.role}</div>
            </div>
          </div>
        </section>
      )}

      {/* TAGS */}
      <section className="reveal py-20 px-8 md:px-16 bg-gold-dark/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-8 py-4 bg-gold-dark text-cream text-sm font-bold tracking-widest uppercase border-2 border-gold-dark hover:bg-cream hover:text-gold-dark transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT PROJECT*/}
      {nextProject && (
        <section className="relative h-screen group cursor-pointer" onClick={() => router.push(`/projects/${nextProject.slug}`)}>
          <div className="absolute inset-0">
            <Image
              src={nextProject.image}
              alt={nextProject.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gold-dark/70 group-hover:bg-gold-dark/50 transition-all duration-700" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-light text-sm tracking-[0.5em] uppercase mb-6"
            >
              NEXT PROJECT
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(4rem,15vw,16rem)] font-bold leading-none tracking-tighter text-cream mb-8 group-hover:tracking-wide transition-all duration-700"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              {nextProject.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 text-cream text-xl font-bold tracking-wider group-hover:gap-8 transition-all duration-500"
            >
              <span>VIEW PROJECT</span>
              <span className="text-4xl">→</span>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
