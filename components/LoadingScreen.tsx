'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 15);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gold-dark overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background gradient static for performance */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent opacity-50" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Name Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h1
                className="text-7xl md:text-9xl font-bold text-cream mb-4"
                style={{ fontFamily: 'var(--font-cursive)' }}
              >
                {'Iftekhar'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.05,
                      ease: 'easeOut',
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="h-1 w-48 mx-auto bg-gold origin-left"
              />
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="relative"
            >
              <div className="text-8xl font-bold text-gold-light/50" style={{ fontFamily: 'var(--font-cursive)' }}>
                {count.toString().padStart(2, '0')}
                <span className="text-5xl">%</span>
              </div>

              {/* Loading bar */}
              <div className="mt-8 w-64 h-1 mx-auto bg-cream/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              <motion.p
                className="mt-6 text-cream/60 text-sm tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading Experience
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-gold-light/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-cream/10" />
          <div
            className="absolute top-1/2 right-1/4 w-24 h-24 bg-gold/10 backdrop-blur-sm"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
