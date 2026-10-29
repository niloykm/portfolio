import type { ReactNode, HTMLAttributes } from 'react';
import { MonoText } from '@/components/Typography';

type GridContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  children: ReactNode;
  borderedTop?: boolean;
  borderedBottom?: boolean;
};

export function GridContainer({
  as: Component = 'div',
  children,
  borderedTop = false,
  borderedBottom = true,
  className = '',
  ...rest
}: GridContainerProps) {
  const topBorder = borderedTop ? 'border-t border-border-subtle' : '';
  const bottomBorder = borderedBottom ? 'border-b border-border-subtle' : '';

  return (
    <Component
      className={`grid grid-cols-1 lg:grid-cols-12 ${topBorder} ${bottomBorder} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}

type GridSectionProps = {
  id: string;
  index: string;
  label: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

export function GridSection({
  id,
  index,
  label,
  meta,
  children,
  className = '',
}: GridSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-14 border-b border-border-subtle ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 3-column blueprint rail */}
        <div className="min-w-0 border-b border-border-subtle bg-bg-primary px-4 py-4 sm:px-6 lg:col-span-3 lg:border-b-0 lg:border-r lg:py-8">
          <div className="lg:sticky lg:top-20 space-y-2 min-w-0">
            <h2
              id={headingId}
              className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider text-ink break-words"
            >
              <span className="text-accent" aria-hidden="true">{"//"}</span>
              <span className="tabular-nums">{index}</span>
              <span className="break-all">[{label}]</span>
            </h2>
            {meta && (
              <MonoText as="p" variant="meta" muted className="text-[11px] break-words">
                {meta}
              </MonoText>
            )}
          </div>
        </div>

        {/* Right 9-column blueprint content area */}
        <div className="min-w-0 bg-bg-primary lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
