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


export function SectionHeading({
  children,
  className = '',
}: PropsWithChildren<TypographyProps>) {
  return (
    <h3
      className={`text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tighter ${className}`}
      style={{ fontFamily: 'var(--font-cursive)' }}
    >
      {children}
    </h3>
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


export function Badge({
  children,
  className = '',
  variant = 'default',
}: PropsWithChildren<TypographyProps & { variant?: 'default' | 'outline' }>) {
  const baseClasses = 'px-4 py-2 text-xs font-bold tracking-widest uppercase';
  const variantClasses =
    variant === 'outline'
      ? 'border border-gold/30 text-gold-dark hover:bg-gold/20'
      : 'bg-gold text-gold-dark';

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}


export function BodyText({
  children,
  className = '',
}: PropsWithChildren<TypographyProps>) {
  return (
    <p className={`text-lg leading-relaxed ${className}`} style={{ fontFamily: 'var(--font-serif)' }}>
      {children}
    </p>
  );
}
