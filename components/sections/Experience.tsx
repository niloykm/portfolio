import { Section } from '@/components/layout/Section';
import { ExperienceList } from '@/components/ExperienceList';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      meta="CHRONOLOGICAL_TIMELINE"
    >
      <div>
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <p className="text-body text-muted measure">
            Engineering leadership, contract product delivery, and computer
            science foundation.
          </p>
        </div>
        <ExperienceList items={experience} />
      </div>
    </Section>
  );
}
