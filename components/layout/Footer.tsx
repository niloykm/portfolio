import { LocalClock } from '@/components/islands/LocalClock';
import { buildInfo, formatRelativeTime } from '@/lib/build-info';

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  name?: string;
  timeZone?: string;
  showNotes?: boolean;
  elsewhere?: FooterLink[];
};

export function Footer({
  name = 'Niloy Kumar Mohonta',
  timeZone = 'Asia/Dhaka',
  showNotes = false,
  elsewhere = [
    { label: 'GitHub', href: 'https://github.com/niloykm' },
    { label: 'Email', href: 'mailto:niloykumarmohonta@gmail.com' },
  ],
}: FooterProps) {
  const indexLinks: FooterLink[] = [
    { label: 'Top', href: '/#top' },
    { label: 'Selected work', href: '/#work' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Experience', href: '/#experience' },
    ...(showNotes ? [{ label: 'Notes', href: '/#notes' }] : []),
    { label: 'Contact', href: '/#contact' },
  ];

  const relativeDeploy = formatRelativeTime(buildInfo.builtAtIso);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-b border-border-subtle bg-bg-primary">
      <div className="mx-auto w-full max-w-container border-x border-border-subtle">
        <div className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <div className="p-6 lg:col-span-3 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {"// "}INDEX
            </p>
            <ul className="space-y-1.5 font-mono text-xs">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 py-0.5 text-ink transition-colors duration-100 hover:text-accent"
                  >
                    <span className="text-muted" aria-hidden="true">
                      -&gt;
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 lg:col-span-3 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {"// "}ELSEWHERE
            </p>
            <ul className="space-y-1.5 font-mono text-xs">
              {elsewhere.map((item) => {
                const isExternal =
                  item.href.startsWith('http://') ||
                  item.href.startsWith('https://');
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 py-0.5 text-ink transition-colors duration-100 hover:text-accent"
                    >
                      <span>[{item.label}]</span>
                      <span className="text-muted" aria-hidden="true">
                        -&gt;
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="p-6 sm:col-span-2 lg:col-span-6 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {"// "}COLOPHON &amp; BUILD_INFO
            </p>
            <p className="text-secondary text-muted measure">
              Set in Geist and JetBrains Mono. Built with Next.js, deployed on
              Vercel. Commit{' '}
              <code className="border border-border-subtle px-1.5 py-0.5 font-mono text-xs text-ink">
                {buildInfo.commitSha}
              </code>
              , deployed{' '}
              <time
                dateTime={buildInfo.builtAtIso}
                title={buildInfo.builtAtIso}
                className="font-mono text-ink tabular-nums"
              >
                {relativeDeploy}
              </time>
              .
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-xs text-muted">
              <span>
                LOC: DHAKA // <LocalClock timeZone={timeZone} />
              </span>
              <span aria-hidden="true">{"//"}</span>
              <span>
                © {currentYear} {name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
