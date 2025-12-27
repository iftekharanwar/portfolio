'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.blog-title', {
        scrollTrigger: {
          trigger: '.blog-title',
          start: 'top 80%',
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stagger blog card reveals
      gsap.from('.blog-card', {
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 75%',
          once: true,
        },
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <section ref={sectionRef} id="blog" className="relative py-32 px-6 md:px-12 bg-gold-dark overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/4 right-0 text-[20vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        BLOG
      </div>

      <div className="max-w-[95%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="blog-title mb-24">
          <div className="flex items-end justify-between flex-wrap gap-8">
            <div>
              <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">INSIGHTS & IDEAS</span>
              <h2
                className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter text-cream"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                LATEST
                <br />
                <span className="text-gold">ARTICLES</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-cream/70 max-w-md text-lg">
                Thoughts on design, development, and the creative process behind exceptional digital experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Post - Hero Style */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="relative mb-32 group cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
              {/* Image */}
              <div className="relative h-[70vh] overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gold-dark via-gold-dark/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16">
                <div className="flex items-center gap-6 mb-6">
                  <span className="px-4 py-2 bg-gold text-gold-dark text-xs font-bold tracking-widest uppercase">
                    FEATURED
                  </span>
                  <span className="text-gold-light text-xs tracking-wider uppercase">
                    {featuredPost.category}
                  </span>
                  <span className="text-cream/50 text-xs">•</span>
                  <span className="text-cream/50 text-xs">{featuredPost.readTime}</span>
                </div>

                <h3
                  className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-tight tracking-tighter text-cream mb-6 group-hover:text-gold-light transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  {featuredPost.title}
                </h3>

                <p className="text-xl text-cream/80 max-w-3xl leading-relaxed mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 text-gold-light font-bold tracking-wider group-hover:gap-6 transition-all duration-500">
                  <span>READ ARTICLE</span>
                  <span className="text-2xl">→</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recentPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              isHovered={hoveredCard === post.id}
              onHover={() => setHoveredCard(post.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-24">
          <Link href="/blog">
            <button className="group px-12 py-6 bg-transparent border-4 border-gold text-gold font-bold text-lg tracking-widest uppercase hover:bg-gold hover:text-gold-dark transition-all duration-500 hover:scale-105 active:scale-95">
              VIEW ALL ARTICLES
              <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute bottom-32 left-20 w-96 h-96 bg-gold/10 rounded-full blur-2xl pointer-events-none will-change-transform" />
      <div className="absolute top-32 right-20 w-64 h-64 bg-gold-light/10 rounded-full blur-2xl pointer-events-none will-change-transform" />
    </section>
  );
}

function BlogCard({
  post,
  isHovered,
  onHover,
  onLeave,
}: {
  post: any;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="blog-card group relative cursor-pointer transition-transform duration-300 hover:-translate-y-2"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-cursor-hover
      >
        {/* Image */}
        <div className="relative h-[400px] overflow-hidden mb-6">
          <div
            ref={imageRef}
            className="absolute inset-0"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-75' : 'scale-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

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
          <div className="flex items-center gap-4 text-xs text-gold-light/70">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3
            className={`text-3xl font-bold leading-tight tracking-tight text-cream transition-all duration-500 ${
              isHovered ? 'text-gold-light translate-x-2' : ''
            }`}
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-cream/70 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-serif)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 border border-gold/30 text-gold-light text-xs tracking-wider hover:bg-gold/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className={`flex items-center gap-3 text-gold font-bold text-sm tracking-wider pt-4 transition-all duration-500 ${
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
