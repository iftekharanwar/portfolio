'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  speed?: number;
  scrambleSpeed?: number;
  characters?: string;
  className?: string;
  trigger?: boolean;
  onComplete?: () => void;
}

export default function TextScramble({
  text,
  speed = 50,
  scrambleSpeed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  trigger = true,
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = text.length * speed;

    const scramble = () => {
      let output = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < text.length; i++) {
        const charProgress = Math.max(0, Math.min(1, (progress - i / text.length) * text.length));

        if (charProgress >= 1) {
          output += text[i];
        } else if (charProgress > 0) {
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          output += randomChar;
        } else {
          output += ' ';
        }
      }

      setDisplayText(output);

      if (frame < totalFrames) {
        frame++;
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
        onComplete?.();
      }
    };

    scramble();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, speed, characters, trigger, onComplete]);

  return <span className={className}>{displayText}</span>;
}
