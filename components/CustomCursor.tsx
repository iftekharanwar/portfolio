'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on mobile and tablets
    if (window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;

      if (cursor && cursorDot) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      if (!cursor) return;
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: 'var(--gold)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      if (!cursor) return;
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
      cancelAnimationFrame(animationId);
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
        className="fixed w-8 h-8 pointer-events-none z-[10000] hidden md:block"
        style={{
          border: '2px solid var(--gold-light)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 pointer-events-none z-[10001] hidden md:block"
        style={{
          backgroundColor: 'var(--gold)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  );
}
