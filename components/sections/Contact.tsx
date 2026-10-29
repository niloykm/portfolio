import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { CopyEmail } from '@/components/islands/CopyEmail';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';

export function Contact() {
  return (
    <Section id="contact" index="05" label="Contact">
      <div className="space-y-8">
        <p className="text-h2 text-ink max-w-[24ch]">
          Have something that needs building, or fixing? Write to me.
        </p>

        <div className="space-y-4">
          <div className="font-mono text-lg sm:text-2xl text-ink break-all">
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-border-strong underline-offset-4 transition-colors duration-[120ms] hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <CopyEmail email={profile.email} variant="button" />
            <Button
              href={`mailto:${profile.email}`}
              variant="secondary"
              aria-label={`Send email to ${profile.email}`}
            >
              Send email →
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-meta">
          {isFilled(profile.github) && (
            <TextLink
              href={`https://github.com/${profile.github}`}
              mono
              aria-label="Niloy Kumar Mohonta on GitHub"
            >
              GitHub (@{profile.github})
            </TextLink>
          )}

          {isFilled(profile.linkedin) && (
            <TextLink
              href={profile.linkedin}
              mono
              aria-label="Niloy Kumar Mohonta on LinkedIn"
            >
              LinkedIn
            </TextLink>
          )}

          {isFilled(profile.x) && (
            <TextLink
              href={profile.x}
              mono
              aria-label="Niloy Kumar Mohonta on X"
            >
              X
            </TextLink>
          )}

          {isFilled(profile.resumeUrl) && (
            <TextLink
              href={profile.resumeUrl}
              mono
              aria-label="Download résumé PDF"
            >
              Résumé (PDF)
            </TextLink>
          )}
        </div>
      </div>
    </Section>
  );
}
