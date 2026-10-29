import { Section } from '@/components/layout/Section';
import { WorkIndex } from '@/components/work/WorkIndex';
import { CaseFile } from '@/components/work/CaseFile';
import { Archive } from '@/components/work/Archive';
import { featuredProjects, archiveProjects } from '@/data/projects';

export function Work() {
  return (
    <Section id="work" index="01" label="Selected work">
      <div className="space-y-12 sm:space-y-16">
        <div className="space-y-6">
          <p className="text-body text-muted measure">
            Production web applications examined by problem, system architecture,
            and implementation decisions.
          </p>
          <WorkIndex projects={featuredProjects} />
        </div>

        <div className="space-y-12 sm:space-y-16">
          {featuredProjects.map((project, index) => (
            <CaseFile key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Archive projects={archiveProjects} />
      </div>
    </Section>
  );
}
