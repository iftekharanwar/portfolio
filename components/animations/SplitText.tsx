'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animationType?: 'fade' | 'slide' | 'rotate';
  triggerOnScroll?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  animationType = 'slide',
  triggerOnScroll = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    const animations: Record<string, any> = {
      fade: {
        opacity: 0,
        duration: 0.6,
      },
      slide: {
        y: 100,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
      },
      rotate: {
        rotateZ: 180,
        opacity: 0,
        scale: 0,
        duration: 0.7,
      },
    };

    const ctx = gsap.context(() => {
      if (triggerOnScroll) {
        gsap.from(chars, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          ...animations[animationType],
          stagger,
          delay,
          ease: 'power4.out',
        });
      } else {
        gsap.from(chars, {
          ...animations[animationType],
          stagger,
          delay,
          ease: 'power4.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, stagger, animationType, triggerOnScroll]);

  const characters = text.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ transformOrigin: 'bottom', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {characters}
    </div>
  );
}
