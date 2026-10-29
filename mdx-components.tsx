import type { MDXComponents } from 'mdx/types';
import { codeToHtml } from 'shiki';
import { TextLink } from '@/components/ui/TextLink';
import { Rule } from '@/components/ui/Rule';

async function HighlightedPre(props: React.ComponentPropsWithoutRef<'pre'>) {
  const child = props.children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;
  if (
    child &&
    typeof child === 'object' &&
    'props' in child &&
    typeof child.props?.children === 'string'
  ) {
    const rawCode = child.props.children.replace(/\n$/, '');
    const className = child.props.className || '';
    const langMatch = className.match(/language-([a-z0-9-]+)/i);
    const lang = langMatch ? langMatch[1] : 'text';

    try {
      const html = await codeToHtml(rawCode, {
        lang,
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
      });

      return (
        <div
          className="my-6 overflow-x-auto rounded-panel border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      // Fallback to plain pre/code if language is unknown
    }
  }

  return (
    <pre
      className="my-6 overflow-x-auto rounded-panel border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-ink"
      {...props}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-h2 mt-10 mb-4 text-ink" {...props} />,
    h2: (props) => <h2 className="text-h3 mt-10 mb-3 text-ink" {...props} />,
    h3: (props) => (
      <h3 className="mt-8 mb-2 font-sans text-lg font-medium text-ink" {...props} />
    ),
    p: (props) => (
      <p className="text-body measure my-4 text-ink-2" {...props} />
    ),
    ul: (props) => (
      <ul
        className="text-body measure my-4 list-disc space-y-1.5 pl-5 text-ink-2"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="text-body measure my-4 list-decimal space-y-1.5 pl-5 text-ink-2"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="measure my-6 border-l-2 border-border-strong pl-4 italic text-muted"
        {...props}
      />
    ),
    hr: () => <Rule className="my-8" />,
    a: ({ href = '', children, ...rest }) => (
      <TextLink href={href} {...rest}>
        {children}
      </TextLink>
    ),
    code: (props) => (
      <code
        className="rounded-tag border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-ink"
        {...props}
      />
    ),
    pre: HighlightedPre,
    ...components,
  };
}
