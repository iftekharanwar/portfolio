'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [post.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from('.blog-hero', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
      });

      // Content reveal animations
      gsap.utils.toArray('.reveal').forEach((element: any) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // Parallax on images
      gsap.utils.toArray('.parallax-image').forEach((element: any) => {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: '20%',
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [post.id]);

  return (
    <main ref={mainRef} className="bg-cream">
      {/* Hero Section */}
      <section className="blog-hero relative h-screen overflow-hidden bg-gold-dark">
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gold-dark via-gold-dark/70 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-24">
          {/* Category & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <span className="px-4 py-2 bg-gold text-gold-dark text-xs font-bold tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-gold-light text-sm">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-cream/50 text-sm">•</span>
            <span className="text-cream/50 text-sm">{post.readTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-[clamp(3rem,10vw,10rem)] font-bold leading-[0.9] tracking-tighter text-cream mb-12 max-w-5xl"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            {post.title}
          </motion.h1>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <div className="text-cream font-bold text-lg">{post.author.name}</div>
              <div className="text-cream/60 text-sm">Designer & Developer</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-8 md:px-16 py-32">
        {/* Intro */}
        <div className="reveal mb-24">
          <p className="text-3xl leading-relaxed text-gold-dark" style={{ fontFamily: 'var(--font-serif)' }}>
            {post.content.intro}
          </p>
        </div>

        {/* Content Sections */}
        {post.content.sections.map((section, index) => (
          <div key={index} className="reveal mb-24">
            {/* Section Heading */}
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-gold-dark mb-8"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              {section.heading}
            </h2>

            {/* Section Content */}
            <p className="text-xl leading-relaxed text-gold-dark/80 mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
              {section.content}
            </p>

            {/* Section Image */}
            {section.image && (
              <div className="relative h-[600px] -mx-8 md:-mx-16 mb-12 overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.heading}
                  fill
                  className="parallax-image object-cover"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className="reveal mb-24 pt-12 border-t-4 border-gold/20">
          <p className="text-2xl leading-relaxed text-gold-dark font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
            {post.content.conclusion}
          </p>
        </div>

        {/* Tags */}
        <div className="reveal flex flex-wrap gap-4 mb-24">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-6 py-3 bg-gold-dark text-cream text-sm font-bold tracking-wider uppercase hover:bg-gold transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author Card */}
        <div className="reveal p-12 bg-gold-dark/5 border-2 border-gold/20">
          <div className="flex items-start gap-8">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={120}
              height={120}
              className="rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="text-3xl font-bold text-gold-dark mb-4" style={{ fontFamily: 'var(--font-cursive)' }}>
                Written by {post.author.name}
              </h3>
              <p className="text-lg text-gold-dark/70 leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                Designer, developer, and creative technologist focused on crafting exceptional digital experiences. Passionate about pushing the boundaries of web design and animation.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="py-32 px-8 md:px-16 bg-gold-dark">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(3rem,8vw,8rem)] font-bold leading-none tracking-tighter text-cream mb-12"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            MORE TO
            <br />
            <span className="text-gold">EXPLORE</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => router.push('/#blog')}
              className="group px-12 py-6 bg-transparent border-4 border-gold text-gold font-bold text-lg tracking-widest uppercase hover:bg-gold hover:text-gold-dark transition-all duration-500"
            >
              BACK TO BLOG
              <span className="inline-block ml-4 group-hover:-translate-x-2 transition-transform duration-300">←</span>
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
