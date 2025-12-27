'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogPosts, BlogPost } from '@/data/blog';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          gsap.set(['.blog-hero-text', '.blog-card'], {
            opacity: 1,
            y: 0,
          });
          return;
        }
        // Hero animation
        gsap.from('.blog-hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Blog cards animation
      gsap.from('.blog-card', {
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
      });
      } catch (error) {
        console.error('Blog page animation error:', error);
        gsap.set(['.blog-hero-text', '.blog-card'], {
          opacity: 1,
          y: 0,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <main ref={sectionRef} className="bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-8 md:px-16 bg-gold-dark overflow-hidden">
        <div className="absolute top-1/4 left-0 text-[20vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
             style={{ fontFamily: 'var(--font-cursive)' }}>
          ARTICLES
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="blog-hero-text">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 text-gold-light text-sm tracking-wider uppercase mb-12 hover:text-gold hover:-translate-x-1 transition-all duration-300"
            >
              <span className="text-2xl">←</span>
              BACK TO HOME
            </button>

            <h1
              className="text-[clamp(4rem,12vw,12rem)] font-bold leading-none tracking-tighter text-cream mb-8"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              ALL
              <br />
              <span className="text-gold">ARTICLES</span>
            </h1>

            <p className="text-2xl text-cream/80 max-w-3xl leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
              Insights on design, development, and the creative process. Exploring what makes digital experiences truly exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <div className="mb-12">
            <p className="text-gold-dark/60 text-lg">
              Showing <span className="font-bold text-gold-dark">{blogPosts.length}</span> {blogPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Grid */}
          <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                isHovered={hoveredCard === post.id}
                onHover={() => setHoveredCard(post.id)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter CTA (optional) */}
      <section className="py-32 px-8 md:px-16 bg-gold-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-[clamp(3rem,8vw,8rem)] font-bold leading-none tracking-tighter text-cream mb-8"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            STAY
            <br />
            <span className="text-gold">INSPIRED</span>
          </h2>
          <p className="text-lg md:text-xl text-cream/80 mb-12 leading-relaxed max-w-2xl mx-auto px-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Get the latest articles on design, development, and digital creativity delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto px-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-cream text-gold-dark text-base md:text-lg outline-none focus:ring-4 focus:ring-gold transition-all"
            />
            <button
              className="px-8 py-4 bg-gold text-gold-dark font-bold tracking-wider uppercase hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogCard({
  post,
  isHovered,
  onHover,
  onLeave,
}: {
  post: BlogPost;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="blog-card group relative cursor-pointer transition-transform duration-300 hover:-translate-y-2"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-cursor-hover
      >
        {/* Image */}
        <div className="relative h-[400px] overflow-hidden mb-6 bg-gold-dark/20">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'scale-105 brightness-90' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
          />

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gold-dark/40 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`} />

          {/* Category badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 bg-gold text-gold-dark text-xs font-bold tracking-widest uppercase">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gold-dark/50">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3
            className={`text-3xl font-bold leading-tight tracking-tight text-gold-dark transition-all duration-500 ${
              isHovered ? 'text-gold translate-x-2' : ''
            }`}
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gold-dark/70 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-serif)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 border border-gold-dark/20 text-gold-dark text-xs tracking-wider hover:bg-gold-dark/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className={`flex items-center gap-3 text-gold-dark font-bold text-sm tracking-wider pt-4 transition-all duration-500 ${
            isHovered ? 'translate-x-4' : 'translate-x-0'
          }`}>
            <span>READ MORE</span>
            <span className="text-xl">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
