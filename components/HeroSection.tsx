import Image from 'next/image';
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Calendar,
} from 'lucide-react';
import portraitImg from '@/public/images/profileNiloy.png';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { LocalClock } from '@/components/islands/LocalClock';
import { profile } from '@/data/profile';

export type HeroSectionProps = {
  lastPushIso?: string | null;
};

export function HeroSection({}: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="scroll-mt-24 pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-surface p-6 shadow-sm dark:border-zinc-800/80 sm:p-10">
        {/* Subtle top radial spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        />

        <div className="relative z-10 space-y-6">
          {/* Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{profile.statusText}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-bg-sunken/70 px-3 py-1 font-mono text-[11px] text-muted dark:border-zinc-800/80">
              <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
              <span>
                Dhaka • <LocalClock timeZone={profile.timeZone} /> UTC+6
              </span>
            </div>
          </div>

          {/* Identity Row: Avatar + Name + Role Badge */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-200/90 bg-bg-sunken shadow-sm dark:border-zinc-800">
              <Image
                src={portraitImg}
                alt={`Portrait of ${profile.name}`}
                width={64}
                height={64}
                sizes="64px"
                priority
                placeholder="blur"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-ink">
                  {profile.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-blue-700 dark:text-blue-300">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>{profile.badge}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted">
                {profile.title}
              </p>
            </div>
          </div>

          {/* Punchy High-Contrast Headline */}
          <div className="space-y-4 pt-1">
            <h1
              id="hero-heading"
              className="text-display max-w-4xl font-semibold tracking-tight text-ink"
            >
              {profile.headline}
            </h1>

            <p className="text-lead max-w-3xl text-muted">
              {profile.subheadline}
            </p>
          </div>

          {/* Primary CTAs & Social Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-sm transition-all duration-150 hover:opacity-90"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-zinc-300 bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm transition-all duration-150 hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-700"
              >
                <FileText className="h-4 w-4 text-muted" aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>
            )}

            <CopyEmail
              email={profile.email}
              label="Copy Email"
              variant="button"
            />

            <a
              href="#contact"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-zinc-200/80 bg-bg-sunken/70 px-4 py-2 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-ink/40 dark:border-zinc-800"
            >
              <Calendar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>Book a Technical Call</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink dark:border-zinc-800"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-surface text-muted transition-colors hover:border-ink/40 hover:text-ink dark:border-zinc-800"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Proof Bar (4 Metric Cards below Hero) */}
      <div
        aria-label="Engineering impact metrics"
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {profile.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bento-card flex flex-col justify-between p-5"
          >
            <div>
              <p className="font-mono text-2xl font-bold tracking-tight text-ink tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {metric.label}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
