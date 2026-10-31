import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { profile } from '@/data/profile';

export function Contact() {
  return (
    <Section
      id="contact"
      badge="04 // Initiate Connection"
      label="Ready to ship your next product or scale your engineering team?"
      subtitle="Available for Senior Full-Stack, AI Product, and Technical Lead roles — On-Site in Dhaka or Remote worldwide."
    >
      <div className="bento-card relative overflow-hidden p-6 sm:p-10">
        {/* Subtle decorative spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 h-64 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Cols: Pitch & Primary CTAs */}
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Engineering &amp; Leadership Inquiries</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              Let&apos;s architect something fast, resilient, and built to scale.
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-muted max-w-xl">
              Whether you&apos;re hiring a Senior Full-Stack &amp; AI Engineer,
              looking for a Technical Lead, or building an end-to-end SaaS
              product from scratch—reach out directly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <CopyEmail
                email={profile.email}
                showEmailText
                variant="button"
              />

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-sm transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp ({profile.phone})</span>
              </a>
            </div>
          </div>

          {/* Right 5 Cols: Quick Contact Channels Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5">
            <a
              href={`tel:${profile.phone}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 transition-colors hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-800"
            >
              <div className="flex items-center justify-between text-muted">
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Phone / Call
                </p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-ink">
                  {profile.phone}
                </p>
              </div>
            </a>

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 transition-colors hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-800"
              >
                <div className="flex items-center justify-between text-muted">
                  <Linkedin className="h-4 w-4 text-accent" aria-hidden="true" />
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    LinkedIn
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-semibold text-ink truncate">
                    /in/niloykumarmohonta000
                  </p>
                </div>
              </a>
            )}

            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 transition-colors hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-800"
            >
              <div className="flex items-center justify-between text-muted">
                <Github className="h-4 w-4 text-accent" aria-hidden="true" />
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  GitHub
                </p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-ink">
                  @{profile.github}
                </p>
              </div>
            </a>

            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 transition-colors hover:border-ink/40 hover:bg-bg-sunken dark:border-zinc-800"
              >
                <div className="flex items-center justify-between text-muted">
                  <FileText className="h-4 w-4 text-accent" aria-hidden="true" />
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Curriculum Vitae
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-semibold text-ink">
                    Download Resume PDF
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-bg-sunken/50 p-4 dark:border-zinc-800">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <div className="mt-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Base Location
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-semibold text-ink">
                    Dhaka • Remote
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Location & Availability Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-5 text-xs text-muted dark:border-zinc-800/70">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>{profile.location}</span>
          </span>
          <span className="font-mono text-[11px]">
            niloykumarmohonta@gmail.com • +8801518323782
          </span>
        </div>
      </div>
    </Section>
  );
}
