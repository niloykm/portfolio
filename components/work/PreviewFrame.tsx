'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TextLink } from '@/components/ui/TextLink';

type PreviewFrameProps = {
  title: string;
  liveUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  allowIframe?: boolean;
  className?: string;
};

export function PreviewFrame({
  title,
  liveUrl,
  imageSrc,
  imageAlt,
  allowIframe = true,
  className = '',
}: PreviewFrameProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!liveUrl && !imageSrc) return null;

  const canLoadIframe = Boolean(liveUrl && allowIframe);
  const displayHost = liveUrl
    ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : title.toLowerCase();

  return (
    <div
      className={`overflow-hidden rounded-panel border border-border bg-surface ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-bg-sunken px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-2 w-2 shrink-0 rounded-full border border-border-strong bg-surface"
            aria-hidden="true"
          />
          <span className="truncate font-mono text-[12px] text-muted">
            {displayHost}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {canLoadIframe && iframeLoaded && (
            <button
              type="button"
              onClick={() => setIframeLoaded(false)}
              className="font-mono text-[11px] text-muted underline underline-offset-2 hover:text-ink"
            >
              Static view
            </button>
          )}
          {liveUrl && (
            <TextLink
              href={liveUrl}
              mono
              className="text-[12px]"
              aria-label={`Open live preview of ${title} in a new tab`}
            >
              Open
            </TextLink>
          )}
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full bg-bg">
        {canLoadIframe && iframeLoaded ? (
          <iframe
            src={liveUrl}
            title={`${title} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="no-referrer"
            className="h-full w-full border-0 bg-bg"
          />
        ) : (
          <div className="relative h-full w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || `${title} screenshot`}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 600px, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center text-meta text-muted">
                Preview available at {displayHost}
              </div>
            )}

            {canLoadIframe && (
              <div className="absolute inset-0 flex items-end justify-end bg-ink/10 p-3 transition-colors hover:bg-ink/20">
                <button
                  type="button"
                  onClick={() => setIframeLoaded(true)}
                  aria-label={`Load interactive preview for ${title}`}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-control border border-border-strong bg-surface px-3 py-1.5 font-mono text-[12px] text-ink transition-colors hover:border-ink hover:bg-surface-raised active:scale-[0.98]"
                >
                  <span>Load interactive preview</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
