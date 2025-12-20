'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Circular Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
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
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gold"
              style={{
                pathLength: scrollYProgress,
              }}
              strokeLinecap="round"
              strokeDasharray="0 1"
            />
          </svg>

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span className="text-xs font-bold text-cream">
              {Math.round(scrollYProgress.get() * 100)}%
            </motion.span>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute inset-0 w-14 h-14 rounded-full bg-gold-dark/80 backdrop-blur-sm hover:bg-gold-dark transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
        </motion.button>
      </motion.div>
    </>
  );
}
