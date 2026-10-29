'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import handsOnImg from '@/public/images/projects/handsOn.png';
import ndemyImg from '@/public/images/projects/ndemy1.png';
import newcareImg from '@/public/images/projects/newcare.png';
import inventoryImg from '@/public/images/projects/niloyinventory.png';
import nobotImg from '@/public/images/projects/nobot.png';
import nqrImg from '@/public/images/projects/nqr.png';
import nrlImg from '@/public/images/projects/nrl.png';

export const STATIC_PROJECT_IMAGES: Record<string, StaticImageData> = {
  '/images/projects/handsOn.png': handsOnImg,
  '/images/projects/ndemy1.png': ndemyImg,
  '/images/projects/newcare.png': newcareImg,
  '/images/projects/niloyinventory.png': inventoryImg,
  '/images/projects/nobot.png': nobotImg,
  '/images/projects/nqr.png': nqrImg,
  '/images/projects/nrl.png': nrlImg,
};

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
    <div className={`border border-border-subtle bg-bg-primary ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-bg-primary px-3 py-2 font-mono text-[11px]">
        <span className="truncate text-muted">{"// "}{displayHost}</span>

        <div className="flex items-center gap-3 shrink-0">
          {canLoadIframe && iframeLoaded && (
            <button
              type="button"
              onClick={() => setIframeLoaded(false)}
              className="font-mono text-[11px] uppercase text-muted underline underline-offset-2 hover:text-ink"
            >
              [STATIC]
            </button>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live preview of ${title} in a new tab`}
              className="font-mono text-[11px] uppercase text-ink hover:text-accent"
            >
              [OPEN -&gt;]
            </a>
          )}
        </div>
      </div>

      <div className="group/preview relative aspect-[16/10] w-full overflow-hidden bg-bg-primary">
        {canLoadIframe && iframeLoaded ? (
          <iframe
            src={liveUrl}
            title={`${title} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="no-referrer"
            className="h-full w-full border-0 bg-bg-primary"
          />
        ) : (
          <div className="relative h-full w-full">
            {imageSrc ? (
              <Image
                src={STATIC_PROJECT_IMAGES[imageSrc] ?? imageSrc}
                alt={imageAlt || `${title} screenshot`}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 600px, 100vw"
                placeholder={
                  STATIC_PROJECT_IMAGES[imageSrc] ? 'blur' : 'empty'
                }
                className="object-cover object-top grayscale contrast-125 transition-all duration-100 group-hover/preview:grayscale-0 group-hover/preview:contrast-100"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-xs text-muted">
                {"// "}PREVIEW: {displayHost}
              </div>
            )}

            {canLoadIframe && (
              <div className="absolute bottom-0 right-0 p-2">
                <button
                  type="button"
                  onClick={() => setIframeLoaded(true)}
                  aria-label={`Load interactive preview for ${title}`}
                  className="inline-flex min-h-[36px] items-center gap-1.5 border border-ink bg-bg-primary px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors duration-100 hover:bg-ink hover:text-bg"
                >
                  <span>[LOAD_LIVE_DOM -&gt;]</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
