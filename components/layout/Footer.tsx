import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Label } from '@/components/ui/Label';
import { TextLink } from '@/components/ui/TextLink';
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
    { label: 'Top', href: '#top' },
    { label: 'Selected work', href: '#work' },
    { label: 'Stack', href: '#stack' },
    { label: 'Experience', href: '#experience' },
    ...(showNotes ? [{ label: 'Notes', href: '#notes' }] : []),
    { label: 'Contact', href: '#contact' },
  ];

  const relativeDeploy = formatRelativeTime(buildInfo.builtAtIso);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-8">
      <Container>
        <Rule />
        <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3 space-y-3">
            <Label as="p">Index</Label>
            <ul className="space-y-1.5 text-secondary">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} mono>
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <Label as="p">Elsewhere</Label>
            <ul className="space-y-1.5 text-secondary">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} mono>
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-6 space-y-3">
            <Label as="p">Colophon</Label>
            <p className="text-secondary text-muted measure">
              Set in Instrument Serif, Geist and JetBrains Mono. Built with
              Next.js, deployed on Vercel. Commit{' '}
              <code className="font-mono text-ink">{buildInfo.commitSha}</code>,
              deployed{' '}
              <time
                dateTime={buildInfo.builtAtIso}
                title={buildInfo.builtAtIso}
                className="font-mono text-ink-2 tabular-nums"
              >
                {relativeDeploy}
              </time>
              .
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-meta text-muted">
              <span>
                Dhaka · <LocalClock timeZone={timeZone} />
              </span>
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
              <span>
                © {currentYear} {name}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
