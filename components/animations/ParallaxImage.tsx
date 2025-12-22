'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.5,
  scale = 1.2,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: `${speed * 100}%`,
        ease: 'none',
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        scale: scale,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
