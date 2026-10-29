import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  external?: boolean;
  mono?: boolean;
};

export function TextLink({
  href,
  children,
  external,
  mono = false,
  className = '',
  ...props
}: TextLinkProps) {
  const isExternal =
    external ?? (href.startsWith('http://') || href.startsWith('https://'));

  const baseClass = `${
    mono ? 'text-meta' : ''
  } inline-flex items-center gap-1 underline decoration-border-strong underline-offset-[3px] transition-colors duration-[120ms] hover:text-accent hover:decoration-accent ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="text-[0.85em] leading-none">
          ↗
        </span>
      </a>
    );
  }

  if (href.startsWith('#') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={baseClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClass} {...props}>
      {children}
    </Link>
  );
}
