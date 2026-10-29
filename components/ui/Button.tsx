import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', ...rest } = props;

  const variantClasses =
    variant === 'primary'
      ? 'bg-ink text-bg border border-ink hover:bg-ink-2 hover:border-ink-2'
      : 'bg-surface text-ink border border-border hover:border-border-strong hover:bg-surface-raised';

  const baseClasses = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-control px-4 py-2 font-mono text-[13px] leading-tight transition-all duration-[120ms] active:scale-[0.98] ${variantClasses} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<
      ButtonAsLink,
      keyof BaseProps
    >;
    const isExternal =
      external ?? (href.startsWith('http://') || href.startsWith('https://'));

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    if (href.startsWith('#') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={baseClasses} {...anchorRest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button type="button" className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
