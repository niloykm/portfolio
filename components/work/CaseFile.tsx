import type { Project } from '@/data/projects';
import { ProjectItem } from '@/components/ProjectItem';

type CaseFileProps = {
  project: Project;
  index: number;
};

export function CaseFile({ project, index }: CaseFileProps) {
  return (
    <ProjectItem
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
  );
}
