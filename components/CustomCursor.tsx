'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.5,
            ease: 'power2.out',
          });

          gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
          });

          animationFrameId = 0;
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: 'var(--gold)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'var(--gold-light)',
        duration: 0.3,
      });
    };

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          border: '2px solid var(--gold-light)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
      />

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          backgroundColor: 'var(--gold)',
          borderRadius: '50%',
        }}
      />
    </>
  );
}
