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
      ? 'bg-ink text-bg border border-ink hover:bg-bg hover:text-ink'
      : 'bg-bg text-ink border border-border-subtle hover:border-ink hover:bg-ink hover:text-bg';

  const baseClasses = `inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-wider leading-tight transition-colors duration-100 ${variantClasses} ${className}`;

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
