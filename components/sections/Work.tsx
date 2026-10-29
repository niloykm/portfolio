import { Section } from '@/components/layout/Section';
import { WorkIndex } from '@/components/work/WorkIndex';
import { ProjectItem } from '@/components/ProjectItem';
import { Archive } from '@/components/work/Archive';
import { featuredProjects, archiveProjects } from '@/data/projects';

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected_Work"
      meta="DEEP_DIVE // ARCHITECTURE_EVIDENCE"
    >
      <div>
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <p className="text-body text-muted measure">
            Production web applications examined by problem statement, system
            architecture, and implementation decisions.
          </p>
        </div>

        <WorkIndex projects={featuredProjects} />

        <div>
          {featuredProjects.map((project, index) => (
            <ProjectItem
              key={project.slug}
              slug={project.slug}
              index={index}
              title={project.title}
              year={project.year}
              role={project.role}
              kind={project.kind}
              description={project.summary}
              problem={project.problem}
              approach={project.approach}
              tradeoffs={project.tradeoffs}
              impact={project.impact}
              architecture={project.architecture}
              stack={project.stack}
              links={project.links}
              imageSrc={project.preview?.src}
              imageAlt={project.preview?.alt}
            />
          ))}
        </div>

        <Archive projects={archiveProjects} />
      </div>
    </Section>
  );
}
