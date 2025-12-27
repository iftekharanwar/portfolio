'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Navbar entrance animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    });

    // Scroll detection
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'WORK', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="relative z-50 py-6 bg-transparent"
      >
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span
              className="text-2xl font-bold text-cream tracking-tight group-hover:text-gold-light transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              Iftekhar Anwar
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group relative text-sm font-bold text-cream tracking-widest hover:text-gold-light transition-colors duration-300"
                data-cursor-hover
              >
                {item.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-light group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden lg:block group px-6 py-3 bg-gold text-gold-dark font-bold text-sm tracking-wider hover:bg-gold-light transition-all duration-300 relative overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10">LET'S TALK</span>
            <div className="absolute inset-0 bg-cream transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            data-cursor-hover
          >
            <span
              className={`w-6 h-0.5 bg-cream transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-cream transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-cream transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gold-dark z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-5xl font-bold text-cream hover:text-gold-light transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-cursive)',
                transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(50px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              setTimeout(() => scrollToSection('#contact'), 300);
            }}
            className="mt-8 px-12 py-4 bg-gold text-gold-dark font-bold text-lg tracking-wider hover:bg-gold-light transition-all duration-300"
            style={{
              transitionDelay: isMenuOpen ? `${menuItems.length * 0.1}s` : '0s',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(50px)',
              opacity: isMenuOpen ? 1 : 0,
            }}
          >
            LET'S TALK
          </button>
        </div>
      </div>
    </>
  );
}
