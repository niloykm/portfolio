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
    <Section id="stack" index="02" label="Stack">
      <div className="space-y-6">
        <p className="text-body text-muted measure">
          Tools grouped by architectural layer. Hover or focus a tool to inspect
          the projects built with it.
        </p>
        <SystemsMap
          layers={stackLayers}
          toolProjects={toolProjects}
          currentlyLearning={currentlyLearning}
        />
      </div>
    </Section>
  );
}
