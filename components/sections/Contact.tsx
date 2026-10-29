import { Section } from '@/components/layout/Section';
import { Heading, Body } from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';

export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      meta="DIRECT_TRANSMISSION"
    >
      <div className="divide-y divide-border-subtle">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {"// "}INITIATE_CONNECTION
            </p>
            <Heading as="h3" size="h2" className="max-w-[28ch]">
              Have something that needs building, or fixing? Write to me.
            </Heading>
            <Body size="base" muted measure>
              Available for full-time software engineering roles and high-impact
              product architecture engagements.
            </Body>
          </div>

          <div className="space-y-4 pt-2">
            <div className="font-mono text-base sm:text-xl font-semibold text-ink break-all">
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                className="inline-flex items-center gap-2 border border-border-subtle bg-bg-primary px-4 py-3 transition-colors duration-100 hover:border-ink hover:bg-ink hover:text-bg"
              >
                <span>{profile.email}</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <CopyEmail
                email={profile.email}
                label="[COPY_EMAIL]"
                variant="button"
              />
              <Button
                href={`mailto:${profile.email}`}
                variant="primary"
                aria-label={`Send email to ${profile.email}`}
              >
                <span>[SEND_EMAIL]</span>
                <span aria-hidden="true">-&gt;</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-y-0 sm:divide-x font-mono text-xs">
          {isFilled(profile.github) && (
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niloy Kumar Mohonta on GitHub"
              className="flex min-h-[48px] items-center justify-between px-6 py-3 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              <span>[GITHUB :: @{profile.github}]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          )}

          <a
            href={`mailto:${profile.email}`}
            aria-label="Direct mailto link"
            className="flex min-h-[48px] items-center justify-between px-6 py-3 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
          >
            <span>[STATUS :: {profile.availability.toUpperCase()}]</span>
            <span aria-hidden="true">-&gt;</span>
          </a>

          {isFilled(profile.linkedin) && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niloy Kumar Mohonta on LinkedIn"
              className="flex min-h-[48px] items-center justify-between px-6 py-3 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              <span>[LINKEDIN]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          )}

          {isFilled(profile.x) && (
            <a
              href={profile.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niloy Kumar Mohonta on X"
              className="flex min-h-[48px] items-center justify-between px-6 py-3 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              <span>[X_TWITTER]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          )}

          {isFilled(profile.resumeUrl) && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download résumé PDF"
              className="flex min-h-[48px] items-center justify-between px-6 py-3 uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              <span>[RESUME_PDF]</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
