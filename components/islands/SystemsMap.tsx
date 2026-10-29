'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { StackLayer } from '@/data/stack';

export type ToolProjectsMap = Record<
  string,
  { slug: string; title: string; featured: boolean }[]
>;

type SystemsMapProps = {
  layers: StackLayer[];
  toolProjects: ToolProjectsMap;
  currentlyLearning?: string[];
};

export function SystemsMap({
  layers,
  toolProjects,
  currentlyLearning = [],
}: SystemsMapProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const activeMatchingProjects = activeTool ? toolProjects[activeTool] ?? [] : [];

  return (
    <div onMouseLeave={() => setActiveTool(null)}>
      <div className="divide-y divide-border-subtle">
        {layers.map((layer) => {
          const layerHasActiveTool =
            activeTool !== null && layer.tools.includes(activeTool);

          return (
            <div
              key={layer.id}
              className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-12 md:divide-y-0 md:divide-x"
            >
              <div className="p-4 sm:p-6 md:col-span-4 space-y-1.5">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {layer.code ?? `[${layer.layer.toUpperCase()}]`}
                </p>
                <p className="text-secondary text-muted">{layer.usage}</p>
              </div>

              <div className="p-4 sm:p-6 md:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {layer.tools.map((tool) => {
                    const isActive = activeTool === tool;
                    const isDimmed = activeTool !== null && !isActive;

                    return (
                      <button
                        key={tool}
                        type="button"
                        onMouseEnter={() => setActiveTool(tool)}
                        onFocus={() => setActiveTool(tool)}
                        onBlur={() => setActiveTool(null)}
                        onClick={() =>
                          setActiveTool((prev) => (prev === tool ? null : tool))
                        }
                        className={`border px-2.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-100 ${
                          isActive
                            ? 'border-ink bg-ink text-bg font-semibold'
                            : 'border-border-subtle bg-bg-primary text-ink hover:border-ink hover:bg-ink hover:text-bg'
                        } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>

                {layerHasActiveTool && activeTool && (
                  <div className="border-t border-border-subtle pt-3 font-mono text-xs">
                    {activeMatchingProjects.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-muted">
                          {"// "}DEPLOYED_IN [{activeMatchingProjects.length}]:
                        </span>
                        {activeMatchingProjects.map((proj) => (
                          <Link
                            key={proj.slug}
                            href={`/work/${proj.slug}`}
                            className="inline-flex items-center gap-1 border border-border-subtle px-2 py-0.5 text-ink transition-colors duration-100 hover:border-accent hover:bg-accent hover:text-white"
                          >
                            <span>{proj.title}</span>
                            <span aria-hidden="true">-&gt;</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">
                        {"// "}DEPLOYED ACROSS CORE INFRASTRUCTURE &amp; WORKFLOW
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Polite live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeTool
          ? activeMatchingProjects.length > 0
            ? `${activeTool}: used in ${activeMatchingProjects
                .map((p) => p.title)
                .join(', ')}`
            : `${activeTool}: used across workflow and infrastructure`
          : ''}
      </div>

      {currentlyLearning.length > 0 && (
        <div className="border-t border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs text-muted">
          <span>{"// "}CURRENT_FOCUS: </span>
          <span className="text-ink">
            {currentlyLearning.map((item) => `[${item.toUpperCase()}]`).join(' ')}
          </span>
        </div>
      )}
    </div>
  );
}
