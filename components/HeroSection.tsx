import Image from 'next/image';
import portraitImg from '@/public/images/profileNiloy.png';
import { Heading, Body, MonoText } from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { LocalClock } from '@/components/islands/LocalClock';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';
import { buildInfo, formatRelativeTime } from '@/lib/build-info';

export type HeroSectionProps = {
  lastPushIso?: string | null;
};

export function HeroSection({ lastPushIso }: HeroSectionProps) {
  const relativeLastPush = lastPushIso ? formatRelativeTime(lastPushIso) : null;
  const relativeDeploy = formatRelativeTime(buildInfo.builtAtIso);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="scroll-mt-14 border-b border-border-subtle bg-bg-primary"
    >
      {/* Top Blueprint Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle px-4 py-2.5 sm:px-6 font-mono text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-2">
          <span className="text-accent" aria-hidden="true">{"//"}</span>
          <span>00 [SYSTEM_INDEX :: ARCHITECTURE &amp; ENGINEERING]</span>
        </div>
        <div className="flex items-center gap-3 tabular-nums">
          <span>BUILD: {buildInfo.commitSha}</span>
          <span aria-hidden="true">|</span>
          <span>TZ: UTC+06:00</span>
        </div>
      </div>

      {/* Main 12-Column Monolithic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 7 Columns: Monolithic Statement & Primary Controls */}
        <div className="min-w-0 flex flex-col justify-between border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-10">
          <div className="space-y-6 min-w-0">
            <div className="inline-flex flex-wrap items-center gap-2 border border-border-subtle px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-muted">
              <span>[{profile.role}]</span>
              <span aria-hidden="true">{"//"}</span>
              <span className="text-ink">{profile.name}</span>
            </div>

            <Heading
              id="hero-heading"
              as="h1"
              size="display"
              className="tracking-tight"
            >
              I build web products end to end, and keep them fast, accessible
              and easy to change.
            </Heading>

            <Body size="lead" muted measure>
              Full-stack software engineer in Dhaka and co-founder of Gen Stella
              IT. Architecting production web systems with Next.js, TypeScript,
              Node.js, PostgreSQL, and MongoDB.
            </Body>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-6">
            <Button href="#work" variant="primary">
              <span>[SELECTED_WORK]</span>
              <span aria-hidden="true">-&gt;</span>
            </Button>

            {isFilled(profile.github) && (
              <Button
                href={`https://github.com/${profile.github}`}
                variant="secondary"
                external
              >
                <span>[GITHUB]</span>
                <span aria-hidden="true">-&gt;</span>
              </Button>
            )}

            <CopyEmail email={profile.email} label="[COPY_EMAIL]" />
          </div>
        </div>

        {/* Right 5 Columns: Strict Monospace Terminal / JSON Metadata Grid */}
        <aside
          aria-label="System metadata and status ledger"
          className="min-w-0 flex flex-col justify-between bg-bg-primary lg:col-span-5"
        >
          {/* Identity Header Cell */}
          <div className="flex items-stretch justify-between border-b border-border-subtle">
            <div className="flex min-w-0 flex-col justify-between p-4 sm:p-6">
              <MonoText as="p" variant="label" muted>
                {"// "}NODE_IDENTITY
              </MonoText>
              <div className="mt-3 space-y-1 font-mono text-xs min-w-0">
                <p className="font-semibold uppercase text-ink truncate">
                  {profile.name}
                </p>
                <p className="text-muted break-all">{profile.email}</p>
              </div>
            </div>
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 border-l border-border-subtle bg-bg-primary">
              <Image
                src={portraitImg}
                alt={`Portrait of ${profile.name}`}
                width={112}
                height={112}
                sizes="112px"
                placeholder="blur"
                className="h-full w-full object-cover object-top grayscale contrast-125 transition-all duration-100 hover:grayscale-0 focus:grayscale-0"
              />
            </div>
          </div>

          {/* Strict Monospace Key/Value Ledger */}
          <dl className="divide-y divide-border-subtle font-mono text-xs">
            {isFilled(profile.location) && (
              <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
                <dt className="col-span-5 uppercase tracking-wider text-muted">
                  &quot;location&quot;:
                </dt>
                <dd className="col-span-7 text-right text-ink">
                  &quot;{profile.location}&quot;
                </dd>
              </div>
            )}

            {isFilled(profile.timeZone) && (
              <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
                <dt className="col-span-5 uppercase tracking-wider text-muted">
                  &quot;local_time&quot;:
                </dt>
                <dd className="col-span-7 text-right text-ink tabular-nums">
                  &quot;<LocalClock timeZone={profile.timeZone} /> UTC+6&quot;
                </dd>
              </div>
            )}

            {isFilled(profile.now?.label) && (
              <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
                <dt className="col-span-5 uppercase tracking-wider text-muted">
                  &quot;current_role&quot;:
                </dt>
                <dd className="col-span-7 text-right text-ink">
                  &quot;{profile.now.label}&quot;
                </dd>
              </div>
            )}

            {isFilled(profile.openTo) && (
              <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
                <dt className="col-span-5 uppercase tracking-wider text-muted">
                  &quot;availability&quot;:
                </dt>
                <dd className="col-span-7 flex items-center justify-end gap-2 text-right text-ink">
                  {profile.availability === 'open' && (
                    <span
                      className="h-2 w-2 shrink-0 bg-success"
                      aria-hidden="true"
                    />
                  )}
                  <span>&quot;{profile.openTo}&quot;</span>
                </dd>
              </div>
            )}

            {relativeLastPush && lastPushIso && (
              <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
                <dt className="col-span-5 uppercase tracking-wider text-muted">
                  &quot;last_push&quot;:
                </dt>
                <dd className="col-span-7 text-right text-ink tabular-nums">
                  <time dateTime={lastPushIso}>
                    &quot;{relativeLastPush}&quot;
                  </time>
                </dd>
              </div>
            )}

            <div className="grid grid-cols-12 items-baseline px-4 py-3 sm:px-6">
              <dt className="col-span-5 uppercase tracking-wider text-muted">
                &quot;deploy_sha&quot;:
              </dt>
              <dd className="col-span-7 text-right text-ink tabular-nums">
                <code>{buildInfo.commitSha}</code>{' '}
                <span className="text-muted">({relativeDeploy})</span>
              </dd>
            </div>
          </dl>

          {/* Bottom Quick Links Row */}
          <div className="grid grid-cols-2 divide-x divide-border-subtle border-t border-border-subtle font-mono text-xs">
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-between px-4 py-2.5 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg sm:px-6"
            >
              <span>[GITHUB]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex min-h-[44px] items-center justify-between px-4 py-2.5 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg sm:px-6"
            >
              <span>[EMAIL_DIRECT]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
