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
    { label: 'LinkedIn', href: 'https://linkedin.com/in/niloykumarmohonta000' },
    { label: 'Email', href: 'mailto:niloykumarmohonta@gmail.com' },
  ],
}: FooterProps) {
  const indexLinks: FooterLink[] = [
    { label: 'Top', href: '/#top' },
    { label: 'Featured Work', href: '/#work' },
    { label: 'AI & Architecture', href: '/#stack' },
    { label: 'Experience', href: '/#experience' },
    ...(showNotes ? [{ label: 'Notes', href: '/#notes' }] : []),
    { label: 'Contact', href: '/#contact' },
  ];

  const relativeDeploy = formatRelativeTime(buildInfo.builtAtIso);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-zinc-200/80 bg-bg-primary dark:border-zinc-800/80">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-ink">{name}</p>
            <p className="text-xs text-muted">
              Senior Full-Stack &amp; AI Product Engineer • Co-Founder @ Gen Stella IT
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-muted">
              <span>
                Dhaka, BD (<LocalClock timeZone={timeZone} /> UTC+6)
              </span>
              <span aria-hidden="true">•</span>
              <span>
                Build <code>{buildInfo.commitSha}</code> ({relativeDeploy})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            {indexLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-zinc-200/60 pt-6 text-xs text-muted dark:border-zinc-800/60 sm:flex-row sm:items-center">
          <span>
            © {currentYear} {name}. Crafted with Next.js, TypeScript &amp; Tailwind CSS.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {elsewhere.map((item) => {
              const isExternal =
                item.href.startsWith('http://') ||
                item.href.startsWith('https://');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
