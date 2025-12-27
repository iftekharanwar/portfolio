'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 100;
    setIsVisible(scrolled);

    // Calculate scroll percentage
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollableHeight = documentHeight - windowHeight;
    const percentage = Math.round((scrollTop / scrollableHeight) * 100);

    setScrollPercentage(percentage);

    if (circleRef.current) {
      const circumference = 2 * Math.PI * 24; // radius is 24
      const offset = circumference - (percentage / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, []);

  useEffect(() => {
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 24;
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = circumference.toString();
    }

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 opacity-0 scale-0"
    >
      <div className="relative w-14 h-14">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-cream/20"
          />
          <circle
            ref={circleRef}
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gold transition-all duration-300 ease-out"
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span ref={percentageRef} className="text-xs font-bold text-cream">
            {scrollPercentage}%
          </span>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.5)',
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }}
        onMouseDown={(e) => {
          gsap.to(e.currentTarget, {
            scale: 0.9,
            duration: 0.1,
          });
        }}
        onMouseUp={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.1,
            duration: 0.1,
          });
        }}
        className="absolute inset-0 w-14 h-14 rounded-full bg-gold-dark/80 backdrop-blur-sm hover:bg-gold-dark transition-colors duration-300"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5 mx-auto text-cream"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
