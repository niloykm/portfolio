import { Section } from '@/components/layout/Section';
import { ExperienceList } from '@/components/ExperienceList';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <Section
      id="experience"
      badge="03 // Career Timeline"
      label="Engineering Leadership & Experience"
      subtitle="Co-founding Gen Stella IT, scaling full-stack SaaS portals, and optimizing production systems."
    >
      <ExperienceList items={experience} />
    </Section>
  );
}
