'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from('.contact-heading', {
        scrollTrigger: {
          trigger: '.contact-heading',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      // Contact info cards
      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: '.contact-cards',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mpqapldz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          duration: 5000,
          style: {
            background: '#C9A961',
            color: '#1a1612',
            fontWeight: 'bold',
            padding: '16px 24px',
            fontSize: '16px',
          },
          iconTheme: {
            primary: '#1a1612',
            secondary: '#F5F1E8',
          },
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Please try again.', {
        duration: 5000,
        style: {
          background: '#C9A961',
          color: '#1a1612',
          fontWeight: 'bold',
          padding: '16px 24px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#F5F1E8',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 md:px-12 bg-gold-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 text-[20vw] font-bold text-cream/5 pointer-events-none whitespace-nowrap"
           style={{ fontFamily: 'var(--font-cursive)' }}>
        CONTACT
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="contact-heading text-center mb-20">
          <span className="text-gold-light text-xs tracking-[0.3em] uppercase mb-6 block">GET IN TOUCH</span>
          <h2
            className="text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tighter text-cream mb-6"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            LET'S CREATE
            <br />
            <span className="text-gold-light">TOGETHER</span>
          </h2>
          <p className="text-cream/70 text-xl max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'name' || formData.name
                    ? '-top-6 text-xs text-gold-light'
                    : 'top-4 text-base text-cream/50'
                }`}
              >
                YOUR NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-b-2 border-cream/20 focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'email' || formData.email
                    ? '-top-6 text-xs text-gold-light'
                    : 'top-4 text-base text-cream/50'
                }`}
              >
                YOUR EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-b-2 border-cream/20 focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none"
                required
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'message' || formData.message
                    ? '-top-6 text-xs text-gold-light'
                    : 'top-4 text-base text-cream/50'
                }`}
              >
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={4}
                className="w-full bg-transparent border-b-2 border-cream/20 focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-6 bg-gold text-gold-dark font-bold text-lg tracking-wider overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </span>
                ) : (
                  'SEND MESSAGE'
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gold-light"
                initial={{ x: '-100%' }}
                whileHover={!isSubmitting ? { x: 0 } : {}}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>

          {/* Contact Information */}
          <div className="contact-cards space-y-6">
            {/* Email Card */}
            <div className="contact-card group relative p-8 bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold-light transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gold-light text-sm tracking-wider uppercase mb-2">EMAIL</h3>
                  <a href="mailto:hello@yourname.com" className="text-cream text-xl hover:text-gold-light transition-colors">
                    hello@yourname.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-card group relative p-8 bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold-light transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gold-light text-sm tracking-wider uppercase mb-2">PHONE</h3>
                  <a href="tel:+1234567890" className="text-cream text-xl hover:text-gold-light transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-card group relative p-8 bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold-light transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gold-light text-sm tracking-wider uppercase mb-2">LOCATION</h3>
                  <p className="text-cream text-xl">
                    New York, NY<br />United States
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-card p-8 bg-cream/5 backdrop-blur-sm border border-cream/10">
              <h3 className="text-gold-light text-sm tracking-wider uppercase mb-6">FOLLOW ME</h3>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full border-2 border-cream/20 hover:border-gold-light flex items-center justify-center text-cream hover:text-gold-light transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold-light/10 blur-3xl" />
    </section>
  );
}
