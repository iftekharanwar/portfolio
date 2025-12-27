import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';
import { SCROLL_TRIGGER_START } from '@/lib/animation-constants';

interface AnimationConfig {
  selector: string;
  from: gsap.TweenVars;
  start?: string;
  delay?: number;
}

interface UseScrollAnimationOptions {
  animations: AnimationConfig[];
  trigger?: string;
  once?: boolean;
}

/**
  Reusable hook for scroll-triggered GSAP animations
  Automatically handles reduced motion preferences and cleanup

  @example
  ```tsx
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimation(sectionRef, {
  animations: [
    {
      selector: '.heading',
      from: { y: 50, opacity: 0, duration: 0.8 },
     },
    {
      selector: '.card',
      from: { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 },
      start: 'top 80%',
     },
  ],
  once: true,
 });
  ```
 */
export function useScrollAnimation(
  sectionRef: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions
) {
  const prefersReducedMotion = useReducedMotion();
  const { animations, trigger, once = true } = options;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      try {
        if (prefersReducedMotion) {
          animations.forEach(({ selector }) => {
            const elements = document.querySelectorAll(selector);
            if (elements && elements.length > 0) {
              gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });
            }
          });
          return;
        }

        animations.forEach(({ selector, from, start, delay }) => {
          const elements = document.querySelectorAll(selector);
          if (elements && elements.length > 0) {
            gsap.from(elements, {
              scrollTrigger: {
                trigger: trigger || sectionRef.current,
                start: start || SCROLL_TRIGGER_START.normal,
                once,
              },
              ...from,
              ...(delay ? { delay } : {}),
            });
          }
        });
      } catch (error) {
        console.error('Scroll animation error:', error);
        animations.forEach(({ selector }) => {
          const elements = document.querySelectorAll(selector);
          if (elements && elements.length > 0) {
            gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, animations, trigger, once, prefersReducedMotion]);
}
