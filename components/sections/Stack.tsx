import { Section } from '@/components/layout/Section';
import {
  SystemsMap,
  type ToolProjectsMap,
} from '@/components/islands/SystemsMap';
import { stackLayers, currentlyLearning } from '@/data/stack';
import { projects } from '@/data/projects';

function buildToolProjectsMap(): ToolProjectsMap {
  const map: ToolProjectsMap = {};
  for (const layer of stackLayers) {
    for (const tool of layer.tools) {
      const normalizedTool = tool.toLowerCase().replace(/\s*\(learning\)/, '');
      const matches = projects
        .filter((project) =>
          project.stack.some((s) => {
            const normS = s.toLowerCase();
            return (
              normS === normalizedTool ||
              (normalizedTool === 'mongoose' && normS === 'mongodb')
            );
          })
        )
        .map((p) => ({
          slug: p.slug,
          title: p.title,
          featured: p.featured,
        }));
      map[tool] = matches;
    }
  }
  return map;
}

export function Stack() {
  const toolProjects = buildToolProjectsMap();

  return (
    <Section
      id="stack"
      index="02"
      label="Technical_Capabilities"
      meta="SYSTEM_STACK // NO_SKILL_BARS"
    >
      <div>
        <div className="border-b border-border-subtle px-4 py-4 sm:px-6">
          <p className="text-body text-muted measure">
            Categorized architecture capabilities. Select or hover a technology
            node to cross-reference production deployments.
          </p>
        </div>
        <SystemsMap
          layers={stackLayers}
          toolProjects={toolProjects}
          currentlyLearning={currentlyLearning}
        />
      </div>
    </Section>
  );
}
