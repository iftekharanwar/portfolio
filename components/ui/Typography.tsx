import { PropsWithChildren } from 'react';

interface TypographyProps {
  className?: string;
}

export function DisplayHeading({
  children,
  className = '',
}: PropsWithChildren<TypographyProps>) {
  return (
    <h2
      className={`text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter text-gold-dark ${className}`}
      style={{ fontFamily: 'var(--font-cursive)' }}
    >
      {children}
    </h2>
  );
}

export function SectionLabel({
  children,
  className = '',
}: PropsWithChildren<TypographyProps>) {
  return (
    <span className={`text-gold text-xs tracking-[0.3em] uppercase ${className}`}>
      {children}
    </span>
  );
}
