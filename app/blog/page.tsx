'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogPosts, getAllCategories } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = ['All', ...getAllCategories()];
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.blog-hero-text', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Category filter animation
      gsap.from('.category-button', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(1.7)',
      });

      // Blog cards animation
      gsap.from('.blog-card', {
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 75%',
        },
        y: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when category changes
  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(cards,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all', // Clear inline styles after animation
        }
      );
    }
  }, [selectedCategory]);

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
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 text-gold-light text-sm tracking-wider uppercase mb-12 hover:text-gold transition-colors"
              whileHover={{ x: -5 }}
            >
              <span className="text-2xl">←</span>
              BACK TO HOME
            </motion.button>

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

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-gold/20 py-6 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-gold-dark font-bold text-sm tracking-wider uppercase whitespace-nowrap">
              FILTER:
            </span>
            <div className="flex gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-button px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gold-dark text-cream'
                      : 'bg-transparent border-2 border-gold-dark/20 text-gold-dark hover:border-gold-dark hover:bg-gold-dark/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <div className="mb-12">
            <p className="text-gold-dark/60 text-lg">
              Showing <span className="font-bold text-gold-dark">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
              {selectedCategory !== 'All' && <span> in <span className="font-bold text-gold-dark">{selectedCategory}</span></span>}
            </p>
          </div>

          {/* Grid */}
          <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                isHovered={hoveredCard === post.id}
                onHover={() => setHoveredCard(post.id)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-4xl font-bold text-gold-dark/30 mb-6" style={{ fontFamily: 'var(--font-cursive)' }}>
                No articles found
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-gold-dark underline hover:text-gold transition-colors"
              >
                View all articles
              </button>
            </div>
          )}
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
          <p className="text-xl text-cream/80 mb-12 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-serif)' }}>
            Get the latest articles on design, development, and digital creativity delivered straight to your inbox.
          </p>
          <div className="flex gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-cream text-gold-dark text-lg outline-none focus:ring-4 focus:ring-gold transition-all"
            />
            <motion.button
              className="px-8 py-4 bg-gold text-gold-dark font-bold tracking-wider uppercase hover:bg-gold-light transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SUBSCRIBE
            </motion.button>
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
  post: any;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Magnetic effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        ref={cardRef}
        className="blog-card group relative cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={() => {
          onLeave();
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
        data-cursor-hover
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        {/* Image */}
        <div className="relative h-[400px] overflow-hidden mb-6">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-75' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      </motion.div>
    </Link>
  );
}
