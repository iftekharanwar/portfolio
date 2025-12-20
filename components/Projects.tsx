'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'LUNAR LUXURY',
    category: 'E-COMMERCE',
    year: '2024',
    description: 'Next-gen shopping experience with immersive 3D product views',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    title: 'NOIR IDENTITY',
    category: 'BRANDING',
    year: '2024',
    description: 'Bold visual system for avant-garde fashion house',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=1200&fit=crop',
  },
  {
    id: 3,
    title: 'AURORA APP',
    category: 'MOBILE',
    year: '2024',
    description: 'Wellness platform with AI-powered personalization',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&h=1000&fit=crop',
  },
  {
    id: 4,
    title: 'VOGUE DIGITAL',
    category: 'EDITORIAL',
    year: '2023',
    description: 'Interactive magazine reimagined for the digital age',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Stagger project reveals
      gsap.from('.project-item', {
        scrollTrigger: {
          trigger: '.project-item',
          start: 'top 85%',
        },
        y: 150,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-12 bg-cream overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/4 left-0 text-[20vw] font-bold text-gold/5 pointer-events-none whitespace-nowrap"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        WORKS
      </div>

      <div className="max-w-[95%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="projects-title mb-24">
          <div className="flex items-end justify-between flex-wrap gap-8">
            <div>
              <span className="text-gold text-sm tracking-[0.3em] uppercase mb-4 block">SELECTED PROJECTS</span>
              <h2
                className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter text-gold-dark"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                FEATURED
                <br />
                <span className="text-gold">WORK</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-gold-dark/60 max-w-md text-lg">
                A curated collection of projects that push creative boundaries and challenge conventions.
              </p>
            </div>
          </div>
        </div>

        {/* Projects List - Magazine Style */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

function ProjectItem({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!itemRef.current || !imageRef.current || !titleRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = itemRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

      gsap.to(imageRef.current, {
        x,
        y,
        rotateY: x * 0.5,
        rotateX: -y * 0.5,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(titleRef.current, {
        x: -x * 0.3,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(titleRef.current, {
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const element = itemRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className="project-item relative group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
        {/* Image */}
        <div className={`relative h-[500px] ${!isEven ? 'lg:col-start-2' : ''}`}>
          <div className="relative h-full overflow-hidden">
            <div
              ref={imageRef}
              className="absolute inset-0 transform-gpu"
              style={{ perspective: '1000px' }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? 'scale-110 brightness-110' : 'scale-100'
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlay effects */}
            <div className={`absolute inset-0 bg-gold-dark mix-blend-multiply transition-opacity duration-700 ${
              isHovered ? 'opacity-0' : 'opacity-30'
            }`} />

            {/* Number overlay */}
            <div className="absolute top-8 right-8 text-9xl font-bold text-cream/10"
                 style={{ fontFamily: 'var(--font-cursive)' }}>
              {project.id.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Decorative frame */}
          <div className={`absolute -bottom-6 -right-6 w-full h-full border-4 border-gold transition-all duration-500 ${
            isHovered ? 'scale-105 border-gold-light' : 'scale-100'
          }`} />
        </div>

        {/* Content */}
        <div className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <div className="flex items-center gap-8">
            <span className="text-gold text-xs tracking-[0.3em] uppercase">{project.category}</span>
            <div className="w-px h-12 bg-gold/30" />
            <span className="text-gold-dark/40 text-sm">{project.year}</span>
          </div>

          <h3
            ref={titleRef}
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tighter text-gold-dark"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {project.title}
          </h3>

          <p className="text-xl text-gold-dark/70 leading-relaxed max-w-md"
             style={{ fontFamily: 'var(--font-serif)' }}>
            {project.description}
          </p>

          {/* CTA */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${
            isHovered ? 'translate-x-4' : 'translate-x-0'
          }`}>
            <span className="text-gold font-bold tracking-wider">VIEW PROJECT</span>
            <div className={`w-16 h-px bg-gold transition-all duration-500 ${
              isHovered ? 'w-32' : 'w-16'
            }`} />
            <div className={`text-gold transition-transform duration-500 ${
              isHovered ? 'translate-x-2' : 'translate-x-0'
            }`}>
              →
            </div>
          </div>

          {/* Stats/Tags */}
          <div className="flex gap-6 pt-8 border-t border-gold/20">
            <div>
              <div className="text-2xl font-bold text-gold-dark">15K</div>
              <div className="text-xs text-gold-dark/50 uppercase tracking-wider">Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold-dark">98%</div>
              <div className="text-xs text-gold-dark/50 uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
