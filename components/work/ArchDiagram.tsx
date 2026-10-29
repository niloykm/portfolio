import { Label } from '@/components/ui/Label';

export type ArchLayer = {
  name: string;
  nodes: string[];
};

type ArchDiagramProps = {
  layers: ArchLayer[];
  title?: string;
  className?: string;
};

export function ArchDiagram({
  layers,
  title = 'Architecture layers',
  className = '',
}: ArchDiagramProps) {
  if (!layers || layers.length === 0) return null;

  return (
    <figure
      className={`rounded-panel border border-border bg-surface p-4 ${className}`}
    >
      <figcaption className="mb-3 flex items-center justify-between border-b border-border pb-2">
        <Label>{title}</Label>
        <span className="text-meta text-muted">{layers.length} layers</span>
      </figcaption>

      {/* Visually-hidden accessible equivalent */}
      <ol className="sr-only">
        {layers.map((layer) => (
          <li key={layer.name}>
            {layer.name}: {layer.nodes.join(', ')}
          </li>
        ))}
      </ol>

      {/* Decorative visual diagram */}
      <div aria-hidden="true" className="flex flex-col items-stretch">
        {layers.map((layer, index) => (
          <div key={layer.name} className="flex flex-col items-stretch">
            <div className="rounded-control border border-border bg-bg p-2.5">
              <div className="mb-1.5 text-label text-muted">{layer.name}</div>
              <div className="flex flex-wrap gap-1.5">
                {layer.nodes.map((node) => (
                  <span
                    key={node}
                    className="rounded-tag border border-border-strong bg-surface px-2 py-0.5 font-mono text-[12px] leading-snug text-ink"
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {index < layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  className="text-border-strong"
                >
                  <line
                    x1="6"
                    y1="0"
                    x2="6"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M3 12L6 16L9 12"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
