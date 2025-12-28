'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_DISTANCE,
  SCROLL_TRIGGER_START,
} from '@/lib/animation-constants';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState(''); // Bot detection
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          gsap.set(['.contact-heading', formRef.current], {
            opacity: 1,
            y: 0,
          });
          return;
        }

        // Animate heading
        gsap.from('.contact-heading', {
          scrollTrigger: {
            trigger: '.contact-heading',
            start: SCROLL_TRIGGER_START.normal,
            once: true,
          },
          y: ANIMATION_DISTANCE.large,
          opacity: 0,
          duration: ANIMATION_DURATION.slow,
          ease: ANIMATION_EASING.dramatic,
        });

        // Form animation
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: SCROLL_TRIGGER_START.normal,
            once: true,
          },
          y: ANIMATION_DISTANCE.medium,
          opacity: 0,
          duration: ANIMATION_DURATION.slow,
          delay: ANIMATION_DURATION.fast,
          ease: ANIMATION_EASING.energetic,
        });
      } catch (error) {
        console.error('Contact animation error:', error);
        gsap.set(['.contact-heading', formRef.current], {
          opacity: 1,
          y: 0,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Sanitize input to prevent XSS attacks
    const sanitizedValue = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });

    setFormData({ ...formData, [name]: sanitizedValue });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (if filled, it's a bot)
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      // Silently fail for bots
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('Message sent successfully!', {
          duration: 3000,
          style: {
            background: '#C9A961',
            color: '#1a1612',
            fontWeight: 'bold',
            padding: '16px 24px',
          },
        });
      }, 1000);
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        duration: 3000,
        style: {
          background: '#C9A961',
          color: '#1a1612',
          fontWeight: 'bold',
          padding: '16px 24px',
        },
      });
      return;
    }

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
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unknown error occurred';
      console.error('Form submission error:', errorMessage);

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

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
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
                className={`w-full bg-transparent border-b-2 ${
                  errors.name ? 'border-red-400' : 'border-cream/20'
                } focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Honeypot Field (hidden from users, visible to bots) */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
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
                className={`w-full bg-transparent border-b-2 ${
                  errors.email ? 'border-red-400' : 'border-cream/20'
                } focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
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
                maxLength={1000}
                className={`w-full bg-transparent border-b-2 ${
                  errors.message ? 'border-red-400' : 'border-cream/20'
                } focus:border-gold-light py-4 text-cream text-lg transition-all duration-300 outline-none resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-400">
                  {errors.message}
                </p>
              )}
              <p className="mt-1 text-xs text-cream/40 text-right">
                {formData.message.length}/1000
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="ripple group relative w-full py-6 bg-gold hover:bg-gold-light text-gold-dark font-bold text-lg tracking-wider overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
            </button>
          </form>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold-light/10 blur-3xl" />
    </section>
  );
}
