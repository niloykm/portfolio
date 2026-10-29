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
  title = 'SYSTEM_TOPOLOGY',
  className = '',
}: ArchDiagramProps) {
  if (!layers || layers.length === 0) return null;

  return (
    <figure className={`bg-bg-primary p-4 sm:p-5 ${className}`.trim()}>
      <figcaption className="mb-3 flex items-center justify-between border-b border-border-subtle pb-2 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span>{"// "}{title}</span>
        <span>[{layers.length}_LAYERS]</span>
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
      <div aria-hidden="true" className="space-y-2 font-mono text-xs">
        {layers.map((layer, index) => (
          <div key={layer.name}>
            <div className="border border-border-subtle bg-bg-primary p-2.5">
              <div className="mb-1.5 text-[11px] uppercase tracking-wider text-muted">
                [{layer.name.toUpperCase()}]
              </div>
              <div className="flex flex-wrap gap-1.5">
                {layer.nodes.map((node) => (
                  <span
                    key={node}
                    className="border border-border-subtle bg-bg-primary px-2 py-0.5 font-mono text-[11px] text-ink"
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {index < layers.length - 1 && (
              <div className="flex items-center justify-center py-0.5 font-mono text-[10px] leading-none text-muted">
                |
              </div>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
