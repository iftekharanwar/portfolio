/**
  Animation constants
 */

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.5,
} as const;

export const ANIMATION_EASING = {
  smooth: 'power2.out',
  energetic: 'power3.out',
  dramatic: 'power4.out',
  bounce: 'back.out(1.5)',
  linear: 'none',
} as const;

export const SCROLL_TRIGGER_START = {
  early: 'top 85%',
  normal: 'top 75%',
  late: 'top 60%',
  veryLate: 'top 50%',
  top: 'top top',
} as const;

export const STAGGER_DELAY = {
  tight: 0.05,
  normal: 0.08,
  loose: 0.12,
  wide: 0.2,
} as const;

export const ANIMATION_DISTANCE = {
  small: 30,
  medium: 50,
  large: 100,
  extraLarge: 200,
} as const;

export const ROTATION = {
  slight: 45,
  quarter: 90,
  half: 180,
  full: 360,
} as const;
