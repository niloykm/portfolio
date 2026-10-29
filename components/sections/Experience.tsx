import { Section } from '@/components/layout/Section';
import { TextLink } from '@/components/ui/TextLink';
import { experience } from '@/data/experience';
import { isFilled } from '@/lib/filled';

export function Experience() {
  return (
    <Section id="experience" index="03" label="Experience">
      <div className="space-y-6">
        <p className="text-body text-muted measure">
          Engineering roles, studio leadership, and academic background.
        </p>

        {/* Desktop semantic table */}
        <div className="hidden md:block border-y border-border">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">
              Professional experience and education ledger
            </caption>
            <thead>
              <tr className="border-b border-border text-label text-muted">
                <th scope="col" className="py-2.5 pr-4 font-normal w-[22%]">
                  Period
                </th>
                <th scope="col" className="py-2.5 px-4 font-normal w-[33%]">
                  Role · Organisation
                </th>
                <th scope="col" className="py-2.5 pl-4 font-normal w-[45%]">
                  What I did
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-secondary">
              {experience.map((entry) => {
                const hasLink = isFilled(entry.href);
                const hasPeriod = isFilled(entry.period);

                return (
                  <tr
                    key={`${entry.organisation}-${entry.role}`}
                    className={
                      hasLink
                        ? 'group transition-colors duration-[120ms] hover:bg-surface'
                        : ''
                    }
                  >
                    <td className="py-4 pr-4 text-meta text-muted align-top">
                      {hasPeriod ? (
                        <span>{entry.period}</span>
                      ) : (
                        <span className="text-muted">
                          {entry.kind === 'education' ? 'Education' : 'Role'}
                        </span>
                      )}
                    </td>
                    <th
                      scope="row"
                      className="py-4 px-4 font-normal text-ink align-top"
                    >
                      <div className="font-medium text-ink">
                        <span>{entry.role}</span>
                        <span className="text-muted"> · </span>
                        {hasLink && entry.href ? (
                          <TextLink href={entry.href}>
                            {entry.organisation}
                          </TextLink>
                        ) : (
                          <span>{entry.organisation}</span>
                        )}
                      </div>
                      {isFilled(entry.location) && (
                        <div className="mt-0.5 text-meta text-muted">
                          {entry.location}
                        </div>
                      )}
                    </th>
                    <td className="py-4 pl-4 text-ink-2 align-top">
                      {entry.summary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile (<md) stacked definition blocks */}
        <div className="md:hidden divide-y divide-border border-y border-border">
          {experience.map((entry) => {
            const hasLink = isFilled(entry.href);
            const hasPeriod = isFilled(entry.period);

            return (
              <dl
                key={`${entry.organisation}-${entry.role}`}
                className="py-4 space-y-1.5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <dt className="sr-only">Role and Organisation</dt>
                    <dd className="font-sans text-base font-medium text-ink">
                      <span>{entry.role}</span>
                      <span className="text-muted"> · </span>
                      {hasLink && entry.href ? (
                        <TextLink href={entry.href}>
                          {entry.organisation}
                        </TextLink>
                      ) : (
                        <span>{entry.organisation}</span>
                      )}
                    </dd>
                  </div>

                  {hasPeriod && (
                    <div>
                      <dt className="sr-only">Period</dt>
                      <dd className="text-meta text-muted">{entry.period}</dd>
                    </div>
                  )}
                </div>

                <div>
                  <dt className="sr-only">What I did</dt>
                  <dd className="text-secondary text-ink-2">{entry.summary}</dd>
                </div>
              </dl>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
