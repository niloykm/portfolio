import Image from 'next/image';
import portraitImg from '@/public/images/profileNiloy.png';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Label } from '@/components/ui/Label';
import { LocalClock } from '@/components/islands/LocalClock';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { LineReveal } from '@/components/motion/LineReveal';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';
import { buildInfo, formatRelativeTime } from '@/lib/build-info';

type HeroProps = {
  lastPushIso?: string | null;
};

export function Hero({ lastPushIso }: HeroProps) {
  const relativeLastPush = lastPushIso ? formatRelativeTime(lastPushIso) : null;
  const relativeDeploy = formatRelativeTime(buildInfo.builtAtIso);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="scroll-mt-20 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-6">
          <div className="lg:col-span-8 space-y-8">
            <LineReveal
              id="hero-heading"
              className="text-display text-ink"
              lines={[
                'I build web products',
                'end to end, and keep them',
                <em key="italic" className="italic font-normal text-ink">
                  fast, accessible and easy to change.
                </em>,
              ]}
            />

            <p className="text-lead text-muted measure">
              Full-stack engineer in Dhaka. Co-founder of Gen Stella IT.
              Next.js, TypeScript, Node.js, PostgreSQL and MongoDB, shipped to
              production on Vercel.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Button href="#work" variant="primary">
                <span>Selected work</span>
                <span aria-hidden="true">↓</span>
              </Button>

              {isFilled(profile.github) && (
                <TextLink
                  href={`https://github.com/${profile.github}`}
                  mono
                  className="min-h-[44px]"
                >
                  GitHub
                </TextLink>
              )}

              <CopyEmail email={profile.email} />
            </div>
          </div>

          <aside
            aria-label="Status ledger"
            className="lg:col-span-4 border-t border-border pt-4 lg:border-t-0 lg:pt-0"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="space-y-1">
                <Label as="p">Spec / Status</Label>
                <p className="text-meta text-ink">{profile.name}</p>
                <p className="text-meta text-muted">{profile.role}</p>
              </div>
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-control border border-border bg-surface">
                <Image
                  src={portraitImg}
                  alt={`Portrait of ${profile.name}`}
                  width={96}
                  height={96}
                  sizes="96px"
                  placeholder="blur"
                  className="h-full w-full object-cover object-top grayscale transition-[filter] duration-200 hover:grayscale-0 focus:grayscale-0"
                />
              </div>
            </div>

            <dl className="divide-y divide-border border-b border-border text-meta">
              {isFilled(profile.location) && (
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-label text-muted">Based</dt>
                  <dd className="text-right text-ink">{profile.location}</dd>
                </div>
              )}

              {isFilled(profile.timeZone) && (
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-label text-muted">Local time</dt>
                  <dd className="text-right text-ink">
                    <LocalClock timeZone={profile.timeZone} />{' '}
                    <span className="text-muted">UTC+6</span>
                  </dd>
                </div>
              )}

              {isFilled(profile.now?.label) && (
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-label text-muted">Now</dt>
                  <dd className="text-right text-ink">
                    {isFilled(profile.now.href) ? (
                      <TextLink href={profile.now.href} mono>
                        {profile.now.label}
                      </TextLink>
                    ) : (
                      profile.now.label
                    )}
                  </dd>
                </div>
              )}

              {isFilled(profile.openTo) && (
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-label text-muted">Open to</dt>
                  <dd className="flex items-center justify-end gap-2 text-right text-ink">
                    {profile.availability === 'open' && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-success ring-2 ring-accent/25"
                        aria-hidden="true"
                      />
                    )}
                    <span>{profile.openTo}</span>
                  </dd>
                </div>
              )}

              {relativeLastPush && lastPushIso && (
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-label text-muted">Last push</dt>
                  <dd className="text-right text-ink">
                    <time dateTime={lastPushIso}>{relativeLastPush}</time>
                  </dd>
                </div>
              )}

              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-label text-muted">Deployed</dt>
                <dd className="text-right text-ink">
                  <code>{buildInfo.commitSha}</code> ·{' '}
                  <time dateTime={buildInfo.builtAtIso} className="text-muted">
                    {relativeDeploy}
                  </time>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
