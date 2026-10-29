import type { ReactNode, HTMLAttributes } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'display' | 'h2' | 'h3';
  children: ReactNode;
};

export function Heading({
  as: Component = 'h2',
  size = 'h2',
  className = '',
  children,
  ...rest
}: HeadingProps) {
  const sizeClass =
    size === 'display'
      ? 'text-display'
      : size === 'h2'
        ? 'text-h2'
        : 'text-h3';

  return (
    <Component className={`${sizeClass} text-ink ${className}`} {...rest}>
      {children}
    </Component>
  );
}

type BodyProps = HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'div' | 'span';
  size?: 'lead' | 'base' | 'sm';
  muted?: boolean;
  measure?: boolean;
  children: ReactNode;
};

export function Body({
  as: Component = 'p',
  size = 'base',
  muted = false,
  measure = false,
  className = '',
  children,
  ...rest
}: BodyProps) {
  const sizeClass =
    size === 'lead'
      ? 'text-lead'
      : size === 'sm'
        ? 'text-secondary'
        : 'text-body';
  const toneClass = muted ? 'text-muted' : 'text-ink';
  const measureClass = measure ? 'measure' : '';

  return (
    <Component
      className={`${sizeClass} ${toneClass} ${measureClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}

type MonoTextProps = HTMLAttributes<HTMLElement> & {
  as?: 'span' | 'p' | 'div' | 'dt' | 'dd' | 'code';
  variant?: 'meta' | 'label';
  muted?: boolean;
  accent?: boolean;
  children: ReactNode;
};

export function MonoText({
  as: Component = 'span',
  variant = 'meta',
  muted = false,
  accent = false,
  className = '',
  children,
  ...rest
}: MonoTextProps) {
  const variantClass = variant === 'label' ? 'text-label' : 'text-meta';
  const toneClass = accent
    ? 'text-accent'
    : muted
      ? 'text-muted'
      : 'text-ink';

  return (
    <Component
      className={`${variantClass} ${toneClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
