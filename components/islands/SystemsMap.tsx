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
    <div
      className="space-y-4"
      onMouseLeave={() => setActiveTool(null)}
    >
      <div className="divide-y divide-border border-y border-border">
        {layers.map((layer) => {
          const layerHasActiveTool =
            activeTool !== null && layer.tools.includes(activeTool);

          return (
            <div
              key={layer.id}
              className="py-5 grid grid-cols-1 gap-4 lg:grid-cols-9 lg:items-baseline lg:gap-6"
            >
              <div className="lg:col-span-2">
                <span className="text-label text-muted">{layer.layer}</span>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="flex flex-wrap items-center gap-y-1.5 text-body">
                  {layer.tools.map((tool, idx) => {
                    const isActive = activeTool === tool;
                    const isDimmed = activeTool !== null && !isActive;

                    return (
                      <span key={tool} className="inline-flex items-center">
                        <button
                          type="button"
                          onMouseEnter={() => setActiveTool(tool)}
                          onFocus={() => setActiveTool(tool)}
                          onBlur={() => setActiveTool(null)}
                          onClick={() =>
                            setActiveTool((prev) => (prev === tool ? null : tool))
                          }
                          className={`rounded-tag px-1 -mx-1 py-0.5 font-sans text-base transition-opacity duration-[150ms] ${
                            isActive
                              ? 'text-accent font-medium underline decoration-accent underline-offset-[3px]'
                              : 'text-ink hover:text-accent'
                          } ${isDimmed ? 'opacity-35' : 'opacity-100'}`}
                        >
                          {tool}
                        </button>
                        {idx < layer.tools.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="mx-2.5 text-faint select-none"
                          >
                            /
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>

                <p className="text-secondary text-muted measure">
                  {layer.usage}
                </p>

                {layerHasActiveTool && activeTool && (
                  <div className="pt-1 text-meta text-ink-2">
                    {activeMatchingProjects.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-muted">
                          Used in ({activeMatchingProjects.length}):
                        </span>
                        {activeMatchingProjects.map((proj) => (
                          <Link
                            key={proj.slug}
                            href={`/work/${proj.slug}`}
                            className="text-ink underline decoration-border-strong underline-offset-[3px] hover:text-accent hover:decoration-accent"
                          >
                            {proj.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">
                        Used across workflow and infrastructure.
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
        <p className="text-meta text-muted pt-1">
          Currently learning: {currentlyLearning.join(' · ')}
        </p>
      )}
    </div>
  );
}
